import { useState, useEffect } from 'react'
import { get, post, put, del, uploadFile } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './Certifications.module.css' // 같은 스타일 재사용

const References = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [filterType, setFilterType] = useState('all') // all, led, stand
  const [formData, setFormData] = useState({
    type: 'led',
    title: '',
    image: '',
    location: '',
    description: ''
  })
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadData()
  }, [filterType])

  const loadData = async () => {
    try {
      const params = filterType !== 'all' ? { type: filterType } : {}
      const response = await get(API_ENDPOINTS.REFERENCES, params)
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
      const response = await uploadFile(API_ENDPOINTS.UPLOAD, file, { type: 'reference' })
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

    if (!formData.type || !formData.title || !formData.image) {
      alert('타입, 제목, 이미지는 필수입니다')
      return
    }

    try {
      if (editingItem) {
        await put(`${API_ENDPOINTS.REFERENCES}?id=${editingItem.id}`, formData)
        alert('수정되었습니다')
      } else {
        await post(API_ENDPOINTS.REFERENCES, formData)
        alert('등록되었습니다')
      }

      setShowModal(false)
      setEditingItem(null)
      setFormData({ type: 'led', title: '', image: '', location: '', description: '' })
      loadData()
    } catch (error) {
      alert('저장 실패: ' + error.message)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      type: item.type,
      title: item.title,
      image: item.image,
      location: item.location || '',
      description: item.description || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await del(`${API_ENDPOINTS.REFERENCES}?id=${id}`)
      alert('삭제되었습니다')
      loadData()
    } catch (error) {
      alert('삭제 실패: ' + error.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({ type: 'led', title: '', image: '', location: '', description: '' })
  }

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>설치사례 관리</h1>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + 사례 등록
        </button>
      </div>

      {/* 필터 */}
      <div style={{ marginBottom: 'min(1.07143vw, 24px)' }}>
        <button
          onClick={() => setFilterType('all')}
          style={{
            padding: 'min(0.35714vw, 8px) min(0.71429vw, 16px)',
            marginRight: 'min(0.35714vw, 8px)',
            background: filterType === 'all' ? 'var(--color-primary)' : '#f0f0f0',
            color: filterType === 'all' ? 'white' : 'var(--color-gray-1)',
            border: 'none',
            borderRadius: 'min(0.17857vw, 4px)',
            cursor: 'pointer'
          }}
        >
          전체
        </button>
        <button
          onClick={() => setFilterType('led')}
          style={{
            padding: 'min(0.35714vw, 8px) min(0.71429vw, 16px)',
            marginRight: 'min(0.35714vw, 8px)',
            background: filterType === 'led' ? 'var(--color-primary)' : '#f0f0f0',
            color: filterType === 'led' ? 'white' : 'var(--color-gray-1)',
            border: 'none',
            borderRadius: 'min(0.17857vw, 4px)',
            cursor: 'pointer'
          }}
        >
          LED 전광판
        </button>
        <button
          onClick={() => setFilterType('stand')}
          style={{
            padding: 'min(0.35714vw, 8px) min(0.71429vw, 16px)',
            background: filterType === 'stand' ? 'var(--color-primary)' : '#f0f0f0',
            color: filterType === 'stand' ? 'white' : 'var(--color-gray-1)',
            border: 'none',
            borderRadius: 'min(0.17857vw, 4px)',
            cursor: 'pointer'
          }}
        >
          스탠드 전광판
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
              <div style={{ display: 'inline-block', padding: '2px 8px', background: item.type === 'led' ? '#e3f2fd' : '#fff3e0', borderRadius: '4px', fontSize: '11px', marginBottom: '8px' }}>
                {item.type === 'led' ? 'LED' : '스탠드'}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardOrder}>{item.location || '위치 정보 없음'}</p>
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
          <div className={styles.empty}>등록된 설치사례가 없습니다</div>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingItem ? '설치사례 수정' : '설치사례 등록'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>타입 *</label>
                <select
                  className={styles.input}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="led">LED 전광판</option>
                  <option value="stand">스탠드 전광판</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>제목 *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: (주)타니 1, 2층 실외 LED 전광판"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>위치</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="예: 서울 강남구"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>설명</label>
                <textarea
                  className={styles.input}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="설치사례에 대한 설명을 입력하세요"
                  rows="3"
                  style={{ resize: 'vertical' }}
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

export default References
