import { useState, useEffect } from 'react'
import { get, post, put, del, uploadFile } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './History.module.css'

const History = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    description: '',
    image: '',
    display_order: 0
  })
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // 그룹핑 없이 전체 목록 조회
      const response = await get(API_ENDPOINTS.HISTORY, { grouped: 'false' })
      if (response.success) {
        setItems(response.data || [])
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
      const response = await uploadFile(API_ENDPOINTS.UPLOAD, file, { type: 'history' })
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

    if (!formData.year || !formData.month || !formData.description) {
      alert('연도, 월, 내용은 필수입니다')
      return
    }

    try {
      if (editingItem) {
        // 수정
        await put(`${API_ENDPOINTS.HISTORY}?id=${editingItem.id}`, formData)
        alert('수정되었습니다')
      } else {
        // 등록
        await post(API_ENDPOINTS.HISTORY, formData)
        alert('등록되었습니다')
      }

      setShowModal(false)
      setEditingItem(null)
      setFormData({ year: '', month: '', description: '', image: '', display_order: 0 })
      loadData()
    } catch (error) {
      alert('저장 실패: ' + error.message)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      year: item.year,
      month: item.month,
      description: item.description,
      image: item.image || '',
      display_order: item.display_order || 0
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await del(`${API_ENDPOINTS.HISTORY}?id=${id}`)
      alert('삭제되었습니다')
      loadData()
    } catch (error) {
      alert('삭제 실패: ' + error.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({ year: '', month: '', description: '', image: '', display_order: 0 })
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
  }

  // 연도별로 그룹핑하여 표시
  const groupedItems = items.reduce((acc, item) => {
    const year = item.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(item)
    return acc
  }, {})

  // 연도 내림차순 정렬
  const sortedYears = Object.keys(groupedItems).sort((a, b) => b - a)

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>연혁 관리</h1>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + 연혁 등록
        </button>
      </div>

      {/* 연도별 그룹으로 표시 */}
      <div className={styles.yearGroups}>
        {sortedYears.map((year) => (
          <div key={year} className={styles.yearGroup}>
            <h2 className={styles.yearTitle}>{year}년</h2>
            <div className={styles.eventList}>
              {groupedItems[year]
                .sort((a, b) => a.display_order - b.display_order || b.month - a.month)
                .map((item) => (
                  <div key={item.id} className={styles.eventCard}>
                    <div className={styles.eventInfo}>
                      <span className={styles.eventMonth}>{item.month}월</span>
                      <span className={styles.eventDescription}>{item.description}</span>
                      {item.image && (
                        <span className={styles.hasImage} title="이미지 있음">
                          [이미지]
                        </span>
                      )}
                    </div>
                    <div className={styles.eventActions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(item)}>
                        수정
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className={styles.empty}>등록된 연혁이 없습니다</div>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingItem ? '연혁 수정' : '연혁 등록'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>연도 *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2025"
                    maxLength={4}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>월 *</label>
                  <select
                    className={styles.input}
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    required
                  >
                    <option value="">선택</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {i + 1}월
                      </option>
                    ))}
                  </select>
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
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>내용 *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="예: 법인 설립"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>이미지 (선택)</label>
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
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={handleRemoveImage}
                    >
                      이미지 제거
                    </button>
                  </div>
                )}
                <small className={styles.hint}>
                  해당 연도의 대표 이미지로 사용됩니다. 한 연도에 여러 이미지가 있으면 첫 번째 이미지가 표시됩니다.
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

export default History
