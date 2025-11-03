import { useState, useEffect } from 'react'
import { get, post, put, del, uploadFile } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './Certifications.module.css'

const Certifications = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    display_order: 0
  })
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await get(API_ENDPOINTS.CERTIFICATIONS)
      if (response.success) {
        setItems(response.data.items || [])
      }
    } catch (error) {
      alert('데이터 로드 실패: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const response = await uploadFile(API_ENDPOINTS.UPLOAD, file, { type: 'certification' })
      if (response.success) {
        setFormData(prev => ({ ...prev, image: response.data.file_path }))
        alert('이미지 업로드 완료')
      }
    } catch (error) {
      alert('이미지 업로드 실패: ' + error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.image) {
      alert('제목과 이미지는 필수입니다')
      return
    }

    try {
      if (editingItem) {
        // 수정
        await put(`${API_ENDPOINTS.CERTIFICATIONS}?id=${editingItem.id}`, formData)
        alert('수정되었습니다')
      } else {
        // 등록
        await post(API_ENDPOINTS.CERTIFICATIONS, formData)
        alert('등록되었습니다')
      }

      setShowModal(false)
      setEditingItem(null)
      setFormData({ title: '', image: '', display_order: 0 })
      loadData()
    } catch (error) {
      alert('저장 실패: ' + error.message)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      image: item.image,
      display_order: item.display_order || 0
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await del(`${API_ENDPOINTS.CERTIFICATIONS}?id=${id}`)
      alert('삭제되었습니다')
      loadData()
    } catch (error) {
      alert('삭제 실패: ' + error.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({ title: '', image: '', display_order: 0 })
  }

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>기술인증 관리</h1>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + 인증서 등록
        </button>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {item.image ? (
                <img src={item.image} alt={item.title} className={styles.image} />
              ) : (
                <div className={styles.noImage}>이미지 없음</div>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardOrder}>순서: {item.display_order}</p>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.editBtn} onClick={() => handleEdit(item)}>
                수정
              </button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className={styles.empty}>등록된 인증서가 없습니다</div>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingItem ? '인증서 수정' : '인증서 등록'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>인증서명 *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 여성기업확인서"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>이미지 *</label>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage && <p className={styles.uploadingText}>업로드 중...</p>}
                {formData.image && (
                  <div className={styles.preview}>
                    <img src={formData.image} alt="미리보기" />
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>정렬 순서</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0"
                />
                <small className={styles.hint}>숫자가 작을수록 앞에 표시됩니다</small>
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

export default Certifications
