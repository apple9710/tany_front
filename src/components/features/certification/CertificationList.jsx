import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import styles from './CertificationList.module.css'

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// PDF 옵션 (한글 폰트 지원을 위한 CMap 설정)
const pdfOptions = {
  cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
  standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`
}

const PdfThumbnail = ({ file, title }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (error) {
    return <div className={styles.pdfError}>PDF 로드 실패</div>
  }

  return (
    <div className={styles.pdfWrapper}>
      {loading && <div className={styles.pdfLoading}>로딩 중...</div>}
      <Document
        file={file}
        options={pdfOptions}
        onLoadSuccess={() => setLoading(false)}
        onLoadError={() => {
          setLoading(false)
          setError(true)
        }}
        loading=""
      >
        <Page
          pageNumber={1}
          width={280}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  )
}

const CertificationList = ({ data }) => {
  // 이미지 경로 처리 (uploads는 루트에 있음)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    // /uploads로 시작하면 루트 기준 경로
    if (imagePath.startsWith('/uploads')) {
      return `${window.location.origin}${imagePath}`
    }
    return imagePath
  }

  // PDF 파일인지 확인
  const isPdf = (filePath) => {
    return filePath && filePath.toLowerCase().endsWith('.pdf')
  }

  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <div key={item.id || index} className={styles.item} data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
          <div className={styles.imageBox}>
            {item.image && (
              isPdf(item.image) ? (
                <PdfThumbnail file={getImageUrl(item.image)} title={item.title} />
              ) : (
                <img src={getImageUrl(item.image)} alt={item.title} className={styles.image} />
              )
            )}
          </div>
          <div className={styles.titleBox}>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CertificationList
