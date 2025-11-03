import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    references: { total: 0, led: 0, stand: 0 },
    resources: { total: 0 },
    certifications: { total: 0 },
    inquiries: { total: 0, pending: 0, completed: 0 }
  })
  const [recentInquiries, setRecentInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // 통계 데이터 로드
      const [referencesRes, resourcesRes, certificationsRes, inquiriesRes] = await Promise.all([
        get(API_ENDPOINTS.REFERENCES, { limit: 1000 }),
        get(API_ENDPOINTS.RESOURCES, { limit: 1000 }),
        get(API_ENDPOINTS.CERTIFICATIONS),
        get(API_ENDPOINTS.INQUIRIES, { limit: 1000 })
      ])

      // 설치사례 통계
      const references = referencesRes.data.items || []
      const ledCount = references.filter(r => r.type === 'led').length
      const standCount = references.filter(r => r.type === 'stand').length

      // 문의 통계
      const inquiries = inquiriesRes.data.items || []
      const pendingCount = inquiries.filter(i => i.status === 'pending').length
      const completedCount = inquiries.filter(i => i.status === 'completed').length

      setStats({
        references: {
          total: references.length,
          led: ledCount,
          stand: standCount
        },
        resources: {
          total: resourcesRes.data.items?.length || 0
        },
        certifications: {
          total: certificationsRes.data.items?.length || 0
        },
        inquiries: {
          total: inquiries.length,
          pending: pendingCount,
          completed: completedCount
        }
      })

      // 최근 문의 5개
      setRecentInquiries(inquiries.slice(0, 5))
    } catch (error) {
      console.error('대시보드 데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>데이터 로딩 중...</p>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>대시보드</h1>

      {/* 통계 카드 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>설치사례</h3>
            <p className={styles.statValue}>{stats.references.total}개</p>
            <p className={styles.statDetail}>
              LED {stats.references.led} / 스탠드 {stats.references.stand}
            </p>
          </div>
          <Link to="/admin/references" className={styles.statLink}>
            관리 →
          </Link>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>자료실</h3>
            <p className={styles.statValue}>{stats.resources.total}개</p>
            <p className={styles.statDetail}>파일 관리</p>
          </div>
          <Link to="/admin/resources" className={styles.statLink}>
            관리 →
          </Link>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>기술인증</h3>
            <p className={styles.statValue}>{stats.certifications.total}개</p>
            <p className={styles.statDetail}>인증서 관리</p>
          </div>
          <Link to="/admin/certifications" className={styles.statLink}>
            관리 →
          </Link>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>문의</h3>
            <p className={styles.statValue}>{stats.inquiries.total}개</p>
            <p className={styles.statDetail}>
              미처리 {stats.inquiries.pending} / 완료 {stats.inquiries.completed}
            </p>
          </div>
          <Link to="/admin/inquiries" className={styles.statLink}>
            관리 →
          </Link>
        </div>
      </div>

      {/* 최근 문의 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>최근 문의</h2>
          <Link to="/admin/inquiries" className={styles.viewAllLink}>
            전체보기 →
          </Link>
        </div>

        {recentInquiries.length > 0 ? (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>회사</th>
                  <th>연락처</th>
                  <th>문의일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.company || '-'}</td>
                    <td>{inquiry.phone}</td>
                    <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          inquiry.status === 'pending'
                            ? styles.badgePending
                            : styles.badgeCompleted
                        }`}
                      >
                        {inquiry.status === 'pending' ? '미처리' : '완료'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.emptyMessage}>문의가 없습니다</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
