import { useState, useEffect } from 'react'
import { get, post, put, del, uploadFile } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './MainProducts.module.css'

// 제품 페이지 매핑 (select 옵션)
const PRODUCT_PAGE_OPTIONS = [
  { value: '', label: '— 매칭되는 제품 페이지 선택 —' },
  { value: '/products/indoor-led', label: 'LED 전광판 (실내)' },
  { value: '/products/stand-led', label: '스탠드 전광판' },
  { value: '/products/banner-led', label: 'LED 현수막' },
  { value: '/products/signage', label: '사이니지' }
]

const emptyForm = {
  tab_label: '',
  title: '',
  description: '',
  link_path: '',
  display_order: 0,
  is_active: 1,
  images: []
}

const MainProducts = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [linkMode, setLinkMode] = useState('none') // 'none' | 'select' | 'custom'
  const [uploadingImage, setUploadingImage] = useState(false)

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    if (imagePath.startsWith('/uploads')) {
      return `${window.location.origin}${imagePath}`
    }
    return imagePath
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await get(API_ENDPOINTS.MAIN_PRODUCTS)
      if (response.success) {
        setItems(response.data.items || [])
      }
    } catch (error) {
      alert('데이터 로드 실패: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // 링크 모드 결정 (편집 시)
  const detectLinkMode = (linkPath) => {
    if (!linkPath) return 'none'
    if (PRODUCT_PAGE_OPTIONS.some(o => o.value === linkPath)) return 'select'
    return 'custom'
  }

  const handleOpenNew = () => {
    setEditingItem(null)
    setFormData({ ...emptyForm, display_order: items.length + 1 })
    setLinkMode('none')
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      tab_label: item.tab_label,
      title: item.title,
      description: item.description,
      link_path: item.link_path || '',
      display_order: item.display_order,
      is_active: item.is_active,
      images: (item.images || []).map(img => ({
        image: img.image,
        display_order: img.display_order
      }))
    })
    setLinkMode(detectLinkMode(item.link_path))
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData(emptyForm)
    setLinkMode('none')
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploadingImage(true)
    try {
      const uploaded = []
      for (const file of files) {
        const response = await uploadFile(API_ENDPOINTS.UPLOAD, file, { type: 'main_product' })
        if (response.success) {
          uploaded.push(response.data.file_path)
        }
      }
      setFormData(prev => ({
        ...prev,
        images: [
          ...prev.images,
          ...uploaded.map((path, idx) => ({
            image: path,
            display_order: prev.images.length + idx + 1
          }))
        ]
      }))
    } catch (error) {
      alert('이미지 업로드 실패: ' + error.message)
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  const handleRemoveImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images
        .filter((_, i) => i !== idx)
        .map((img, i) => ({ ...img, display_order: i + 1 }))
    }))
  }

  const handleMoveImage = (idx, direction) => {
    const newIdx = idx + direction
    if (newIdx < 0 || newIdx >= formData.images.length) return
    setFormData(prev => {
      const arr = [...prev.images]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      return {
        ...prev,
        images: arr.map((img, i) => ({ ...img, display_order: i + 1 }))
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.tab_label.trim() || !formData.title.trim() || !formData.description.trim()) {
      alert('탭 라벨, 타이틀, 설명은 필수입니다')
      return
    }

    const payload = {
      ...formData,
      link_path: linkMode === 'none' ? '' : formData.link_path
    }

    try {
      if (editingItem) {
        await put(`${API_ENDPOINTS.MAIN_PRODUCTS}?id=${editingItem.id}`, payload)
        alert('수정되었습니다')
      } else {
        await post(API_ENDPOINTS.MAIN_PRODUCTS, payload)
        alert('등록되었습니다')
      }
      handleCloseModal()
      loadData()
    } catch (error) {
      alert('저장 실패: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까? 슬라이드 이미지도 함께 삭제됩니다.')) return
    try {
      await del(`${API_ENDPOINTS.MAIN_PRODUCTS}?id=${id}`)
      alert('삭제되었습니다')
      loadData()
    } catch (error) {
      alert('삭제 실패: ' + error.message)
    }
  }

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>메인 프로덕트 관리</h1>
        <button className={styles.addButton} onClick={handleOpenNew}>
          + 탭 등록
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>순서</th>
              <th style={{ width: '120px' }}>탭 라벨</th>
              <th>타이틀</th>
              <th style={{ width: '200px' }}>링크</th>
              <th style={{ width: '90px' }}>이미지</th>
              <th style={{ width: '80px' }}>노출</th>
              <th style={{ width: '160px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.display_order}</td>
                <td><strong>{item.tab_label}</strong></td>
                <td>{item.title}</td>
                <td className={styles.linkCell}>
                  {item.link_path
                    ? <code>{item.link_path}</code>
                    : <span className={styles.muted}>(없음)</span>}
                </td>
                <td>{(item.images || []).length}장</td>
                <td>
                  <span className={item.is_active ? styles.badgeOn : styles.badgeOff}>
                    {item.is_active ? '노출' : '숨김'}
                  </span>
                </td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(item)}>수정</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>삭제</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>등록된 탭이 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingItem ? '탭 수정' : '탭 등록'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>탭 라벨 *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.tab_label}
                    onChange={(e) => setFormData({ ...formData, tab_label: e.target.value })}
                    placeholder="예: 실내형"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>순서</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>컨텐츠 타이틀 *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 실내용 LED 안내전광판"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>설명 * <span className={styles.hint}>(줄바꿈은 그대로 노출됩니다)</span></label>
                <textarea
                  className={styles.textarea}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>보러가기 링크</label>
                <div className={styles.linkModeRow}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      checked={linkMode === 'none'}
                      onChange={() => { setLinkMode('none'); setFormData({ ...formData, link_path: '' }) }}
                    /> 링크 없음
                  </label>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      checked={linkMode === 'select'}
                      onChange={() => { setLinkMode('select'); setFormData({ ...formData, link_path: '' }) }}
                    /> 제품 페이지 선택
                  </label>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      checked={linkMode === 'custom'}
                      onChange={() => { setLinkMode('custom'); setFormData({ ...formData, link_path: '' }) }}
                    /> 직접 입력
                  </label>
                </div>

                {linkMode === 'select' && (
                  <select
                    className={styles.input}
                    value={formData.link_path}
                    onChange={(e) => setFormData({ ...formData, link_path: e.target.value })}
                  >
                    {PRODUCT_PAGE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}
                {linkMode === 'custom' && (
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.link_path}
                    onChange={(e) => setFormData({ ...formData, link_path: e.target.value })}
                    placeholder="예: /products/special-event 또는 https://..."
                  />
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>슬라이드 이미지 ({formData.images.length}장)</label>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage && <p className={styles.uploadingText}>업로드 중...</p>}

                {formData.images.length > 0 && (
                  <div className={styles.imageList}>
                    {formData.images.map((img, idx) => (
                      <div key={idx} className={styles.imageItem}>
                        <span className={styles.imageOrder}>{idx + 1}</span>
                        <img src={getImageUrl(img.image)} alt={`슬라이드 ${idx + 1}`} />
                        <div className={styles.imageActions}>
                          <button type="button" onClick={() => handleMoveImage(idx, -1)} disabled={idx === 0}>↑</button>
                          <button type="button" onClick={() => handleMoveImage(idx, 1)} disabled={idx === formData.images.length - 1}>↓</button>
                          <button type="button" className={styles.removeBtn} onClick={() => handleRemoveImage(idx)}>삭제</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={!!formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  />
                  메인 페이지에 노출
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>취소</button>
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

export default MainProducts
