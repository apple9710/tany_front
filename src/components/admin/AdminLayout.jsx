import { useState, useEffect } from 'react'
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom'
import { logout, checkAuth } from '../../utils/api/auth'
import styles from './AdminLayout.module.css'

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // 로그인 상태 확인
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth()
        if (response.success) {
          setUser(response.data)
        } else {
          navigate('/admin/login')
        }
      } catch (error) {
        navigate('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [navigate])

  // 로그아웃 처리
  const handleLogout = async () => {
    if (confirm('로그아웃하시겠습니까?')) {
      try {
        await logout()
        navigate('/admin/login')
      } catch (error) {
        console.error('로그아웃 실패:', error)
      }
    }
  }

  // 메뉴 항목
  const menuItems = [
    {
      path: '/admin/dashboard',
      label: '대시보드'
    },
    {
      path: '/admin/history',
      label: '연혁 관리'
    },
    {
      path: '/admin/references',
      label: '설치사례 관리'
    },
    {
      path: '/admin/resources',
      label: '자료실 관리'
    },
    {
      path: '/admin/certifications',
      label: '기술인증 관리'
    },
    {
      path: '/admin/inquiries',
      label: '문의 관리'
    }
  ]

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>로딩 중...</p>
      </div>
    )
  }

  return (
    <div className={styles.adminLayout}>
      {/* 사이드바 */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>TANY</h1>
          <p className={styles.subtitle}>Admin</p>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.label}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.username}>{user?.username}</span>
          </div>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <div className={styles.main}>
        {/* 헤더 */}
        <header className={styles.header}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="메뉴 토글"
          >
            {sidebarOpen ? '☰' : '☰'}
          </button>

          <div className={styles.headerRight}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </header>

        {/* 페이지 컨텐츠 */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
