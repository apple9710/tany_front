import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { path: '/about/history', label: '기업소개' },
    { path: '/products/indoor-led', label: '제품소개' },
    { path: '/references/led-cases', label: '레퍼런스' },
    { path: '/support/inquiry', label: '고객지원' },
  ]

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        {/* 로고 - 왼쪽 */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src="/images/logo.png" alt="TANY" className={styles.logoImage} />
        </Link>

        {/* 네비게이션 - 가운데 */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 햄버거 메뉴 - 오른쪽 (기능 없음) */}
        <button
          className={styles.menuButton}
          aria-label="메뉴"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
