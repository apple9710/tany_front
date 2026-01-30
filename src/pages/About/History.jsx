import { useState, useEffect } from 'react'
import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import HistoryTimeline from '../../components/features/history/HistoryTimeline'
import { get } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './History.module.css'

const History = () => {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const subMenuItems = [
    { path: '/about/history', label: '연혁' },
    { path: '/about/certification', label: '기술인증' },
    { path: '/about/ci', label: 'CI' },
    { path: '/about/location', label: '오시는 길' }
  ]

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const response = await get(API_ENDPOINTS.HISTORY, { grouped: 'true' })
        if (response.success) {
          setHistoryData(response.data)
        } else {
          setError('데이터를 불러올 수 없습니다.')
        }
      } catch (err) {
        console.error('연혁 데이터 로드 실패:', err)
        setError('데이터를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_history_banner_img.png"
        titleEn="HISTORY"
        titleKo="연혁"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="HISTORY" titleKo="연혁" />

          {loading && (
            <div className={styles.loading}>데이터를 불러오는 중...</div>
          )}

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          {!loading && !error && historyData.length === 0 && (
            <div className={styles.empty}>등록된 연혁이 없습니다.</div>
          )}

          {!loading && !error && historyData.length > 0 && (
            <HistoryTimeline data={historyData} />
          )}
        </div>
      </main>
    </div>
  )
}

export default History
