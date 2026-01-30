import { useState, useEffect } from 'react'
import { get } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import ReferenceGrid from '../../components/features/references/ReferenceGrid'
import Pagination from '../../components/common/Pagination'
import styles from './StandLED.module.css'

const StandLED = () => {
  const [referenceData, setReferenceData] = useState([])
  const [loading, setLoading] = useState(true)

  const subMenuItems = [
    { path: '/references/led-cases', label: 'LED전광판' },
    { path: '/references/stand-led', label: '스탠드 전광판' }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(API_ENDPOINTS.REFERENCES, { type: 'stand' })
        if (response.success && response.data?.items) {
          setReferenceData(response.data.items)
        }
      } catch (error) {
        console.error('설치사례 데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_reference_banner_img.png"
        titleEn="REFERENCE"
        titleKo="래퍼런스"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="STAND DISPLAY SERIES REFERENCE" titleKo="스탠드 전광판 설치사례" />
          {loading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : (
            <>
              <ReferenceGrid data={referenceData} />
              <Pagination totalItems={referenceData.length} itemsPerPage={10} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default StandLED
