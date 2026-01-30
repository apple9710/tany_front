import { useState, useEffect } from 'react'
import { get } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Resources.module.css'

const Resources = () => {
  const [resourcesData, setResourcesData] = useState([])
  const [loading, setLoading] = useState(true)

  const subMenuItems = [
    { path: '/support/inquiry', label: '온라인 문의' },
    { path: '/support/resources', label: '자료실' },
    { path: '/support/blog', label: '블로그' },
    { path: '/support/instagram', label: '인스타그램' }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(API_ENDPOINTS.RESOURCES)
        if (response.success && response.data?.items) {
          setResourcesData(response.data.items)
        }
      } catch (error) {
        console.error('자료실 데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // 파일 경로 처리 (uploads는 루트에 있음)
  const getFileUrl = (filePath) => {
    if (!filePath) return null
    if (filePath.startsWith('http')) return filePath
    if (filePath.startsWith('/uploads')) {
      return `${window.location.origin}${filePath}`
    }
    return filePath
  }

  // 날짜 포맷
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`
  }

  const handleDownload = (file, title) => {
    const fileUrl = getFileUrl(file)
    if (fileUrl) {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = title
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_customer_banner_img.png"
        titleEn="SUPPORT"
        titleKo="고객지원"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="DOWNLOADS" titleKo="자료실" />

          {loading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : resourcesData.length === 0 ? (
            <div className={styles.empty}>등록된 자료가 없습니다.</div>
          ) : (
            <div className={styles.resourcesList}>
              {resourcesData.map((resource, index) => (
                <div key={resource.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className={styles.resourceItem}>
                    <div className={styles.resourceInfo}>
                      <p className={styles.resourceDate}>{formatDate(resource.created_at)}</p>
                      <h3 className={styles.resourceTitle}>{resource.title}</h3>
                    </div>
                    <button
                      className={styles.downloadButton}
                      onClick={() => handleDownload(resource.file_name, resource.title)}
                    >
                      다운로드
                    </button>
                  </div>
                  {index < resourcesData.length - 1 && (
                    <div className={styles.divider}></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Resources
