import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { get, post, put, del, uploadFile } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './Certifications.module.css'

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// PDF 옵션 (한글 폰트 지원을 위한 CMap 설정)
const pdfOptions = {
  cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
  standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`
}

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

  // 파일 경로 처리 (uploads는 루트에 있음)
  const getFileUrl = (filePath) => {
    if (!filePath) return null
    if (filePath.startsWith('http')) return filePath
    if (filePath.startsWith('/uploads')) {
      return `${window.location.origin}${filePath}`
    }
    return filePath
  }

  // PDF 파일인지 확인
  const isPdf = (filePath) => {
    return filePath && filePath.toLowerCase().endsWith('.pdf')
  }

  // PDF 썸네일 컴포넌트
  const PdfThumbnail = ({ file, width = 200 }) => {
    const [pdfLoading, setPdfLoading] = useState(true)
    const [pdfError, setPdfError] = useState(false)

    if (pdfError) {
      return <div className={styles.pdfError}>PDF 로드 실패</div>
    }

    return (
      <div className={styles.pdfWrapper}>
        {pdfLoading && <div className={styles.pdfLoading}>PDF 로딩...</div>}
        <Document
          file={file}
          options={pdfOptions}
          onLoadSuccess={() => setPdfLoading(false)}
          onLoadError={() => {
            setPdfLoading(false)
            setPdfError(true)
          }}
          loading=""
        >
          <Page
            pageNumber={1}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    )
  }

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const response = await uploadFile(API_ENDPOINTS.UPLOAD, file, { type: 'certification' })
      if (response.success) {
        setFormData(prev => ({ ...prev, image: response.data.file_path }))
        alert('PDF 업로드 완료')
      }
    } catch (error) {
      alert('PDF 업로드 실패: ' + error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.image) {
      alert('제목과 PDF 파일은 필수입니다')
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
                isPdf(item.image) ? (
                  <PdfThumbnail file={getFileUrl(item.image)} width={180} />
                ) : (
                  <img src={getFileUrl(item.image)} alt={item.title} className={styles.image} />
                )
              ) : (
                <div className={styles.noImage}>파일 없음</div>
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
                <label className={styles.label}>PDF 파일 *</label>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage && <p className={styles.uploadingText}>업로드 중...</p>}
                {formData.image && (
                  <div className={styles.preview}>
                    {isPdf(formData.image) ? (
                      <PdfThumbnail file={getFileUrl(formData.image)} width={300} />
                    ) : (
                      <img src={getFileUrl(formData.image)} alt="미리보기" />
                    )}
                  </div>
                )}
                <small className={styles.hint}>PDF 파일만 업로드 가능합니다</small>
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
