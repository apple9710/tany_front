import { useState, useEffect } from 'react'
import { get } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import CertificationList from '../../components/features/certification/CertificationList'
import styles from './Certification.module.css'

const Certification = () => {
  const [certificationData, setCertificationData] = useState([])
  const [loading, setLoading] = useState(true)

  const subMenuItems = [
    { path: '/about/history', label: '연혁' },
    { path: '/about/certification', label: '기술인증' },
    { path: '/about/ci', label: 'CI' },
    { path: '/about/location', label: '오시는 길' }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(API_ENDPOINTS.CERTIFICATIONS)
        if (response.success && response.data?.items) {
          setCertificationData(response.data.items)
        }
      } catch (error) {
        console.error('기술인증 데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_certification_banner_img.png"
        titleEn="CERTIFICATION"
        titleKo="기술인증"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="CERTIFICATION" titleKo="기술인증" />
          {loading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : (
            <CertificationList data={certificationData} />
          )}
        </div>
      </main>
    </div>
  )
}

export default Certification
