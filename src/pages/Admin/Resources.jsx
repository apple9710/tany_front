import { useState, useEffect } from 'react'
import { get, post, put, del, uploadFile } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './Resources.module.css'

const Resources = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    file_path: '',
    file_size: 0
  })
  const [uploadingFile, setUploadingFile] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await get(API_ENDPOINTS.RESOURCES)
      if (response.success) {
        setItems(response.data.items || [])
      }
    } catch (error) {
      alert('데이터 로드 실패: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingFile(true)
    try {
      const response = await uploadFile(API_ENDPOINTS.UPLOAD, file, { type: 'resource' })
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          file_path: response.data.file_path,
          file_size: response.data.file_size
        }))
        alert('파일 업로드 완료')
      }
    } catch (error) {
      alert('파일 업로드 실패: ' + error.message)
    } finally {
      setUploadingFile(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.file_path) {
      alert('제목과 파일은 필수입니다')
      return
    }

    try {
      if (editingItem) {
        await put(`${API_ENDPOINTS.RESOURCES}?id=${editingItem.id}`, formData)
        alert('수정되었습니다')
      } else {
        await post(API_ENDPOINTS.RESOURCES, formData)
        alert('등록되었습니다')
      }

      setShowModal(false)
      setEditingItem(null)
      setFormData({ title: '', file_path: '', file_size: 0 })
      loadData()
    } catch (error) {
      alert('저장 실패: ' + error.message)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      file_path: item.file_path,
      file_size: item.file_size || 0
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await del(`${API_ENDPOINTS.RESOURCES}?id=${id}`)
      alert('삭제되었습니다')
      loadData()
    } catch (error) {
      alert('삭제 실패: ' + error.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({ title: '', file_path: '', file_size: 0 })
  }

  const formatFileSize = (bytes) => {
    if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + ' MB'
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB'
    }
    return bytes + ' bytes'
  }

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>자료실 관리</h1>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + 자료 등록
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>제목</th>
              <th>파일 크기</th>
              <th>다운로드 수</th>
              <th>등록일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{formatFileSize(item.file_size)}</td>
                <td>{item.downloads || 0}회</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(item)}>
                    수정
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="5" className={styles.empty}>
                  등록된 자료가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingItem ? '자료 수정' : '자료 등록'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>제목 *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: (주)타니 회사소개서"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>파일 *</label>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                />
                {uploadingFile && <p className={styles.uploadingText}>업로드 중...</p>}
                {formData.file_path && (
                  <div className={styles.fileInfo}>
                    <p>파일: {formData.file_path.split('/').pop()}</p>
                    <p>크기: {formatFileSize(formData.file_size)}</p>
                  </div>
                )}
                <small className={styles.hint}>
                  허용 형식: PDF, DOC, XLS, PPT, ZIP (최대 50MB)
                </small>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>
                  취소
                </button>
                <button type="submit" className={styles.submitBtn}>
                  {editingItem ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Resources
