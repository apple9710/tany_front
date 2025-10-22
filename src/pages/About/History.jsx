import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import HistoryTimeline from '../../components/features/history/HistoryTimeline'
import styles from './History.module.css'

const History = () => {
  const subMenuItems = [
    { path: '/about/history', label: '연혁' },
    { path: '/about/certification', label: '기술인증' },
    { path: '/about/ci', label: 'CI' },
    { path: '/about/location', label: '오시는 길' }
  ]

  const historyData = [
    {
      year: '2025',
      image: '/images/history_2025.jpg',
      events: [
        { date: '10.', description: '0000설립' },
        { date: '18.', description: '0000설립' },
        { date: '18.', description: '0000설립' },
        { date: '18.', description: '0000설립' }
      ]
    },
    {
      year: '2024',
      events: [
        { date: '10.', description: '0000설립' },
        { date: '18.', description: '0000설립' },
        { date: '18.', description: '0000설립' },
        { date: '18.', description: '0000설립' }
      ]
    },
    {
      year: '2023',
      image: '/images/history_2023.jpg',
      events: [
        { date: '10.', description: '0000설립' },
        { date: '18.', description: '0000설립' },
        { date: '18.', description: '0000설립' },
        { date: '18.', description: '0000설립' }
      ]
    }
  ]

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
          <HistoryTimeline data={historyData} />
        </div>
      </main>
    </div>
  )
}

export default History
