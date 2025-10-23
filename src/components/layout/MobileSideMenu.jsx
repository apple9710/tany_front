import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './MobileSideMenu.module.css'

const MobileSideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [openAccordion, setOpenAccordion] = useState(null)

  const menuData = [
    {
      id: 'about',
      label: '기업소개',
      defaultPath: '/about/history',
      subItems: [
        { path: '/about/history', label: '연혁' },
        { path: '/about/certification', label: '기술인증' },
        { path: '/about/ci', label: 'CI' },
        { path: '/about/location', label: '오시는 길' }
      ]
    },
    {
      id: 'products',
      label: '제품소개',
      defaultPath: '/products/indoor-led',
      subItems: [
        { path: '/products/indoor-led', label: 'LED전광판' },
        { path: '/products/stand-led', label: '스탠드 전광판' },
        { path: '/products/banner-led', label: 'LED 현수막' },
        { path: '/products/signage', label: '사이니지' }
      ]
    },
    {
      id: 'references',
      label: '레퍼런스',
      defaultPath: '/references/led-cases',
      subItems: [
        { path: '/references/led-cases', label: 'LED전광판' },
        { path: '/references/stand-led', label: '스탠드 전광판' }
      ]
    },
    {
      id: 'support',
      label: '고객지원',
      defaultPath: '/support/inquiry',
      subItems: [
        { path: '/support/inquiry', label: '온라인 문의' },
        { path: '/support/resources', label: '자료실' },
        { path: '/support/blog', label: '블로그' },
        { path: '/support/instagram', label: '인스타그램' }
      ]
    }
  ]

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const handleSubItemClick = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />

      {/* 사이드 메뉴 */}
      <div className={`${styles.sideMenu} ${isOpen ? styles.sideMenuOpen : ''}`}>
        <div className={styles.menuHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <nav className={styles.menuList}>
          {menuData.map((menu) => (
            <div key={menu.id} className={styles.menuItem}>
              <button
                className={`${styles.menuButton} ${openAccordion === menu.id ? styles.menuButtonActive : ''}`}
                onClick={() => toggleAccordion(menu.id)}
              >
                <span>{menu.label}</span>
                <svg
                  className={`${styles.arrow} ${openAccordion === menu.id ? styles.arrowOpen : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`${styles.subMenu} ${openAccordion === menu.id ? styles.subMenuOpen : ''}`}>
                {menu.subItems.map((subItem) => (
                  <button
                    key={subItem.path}
                    className={styles.subMenuItem}
                    onClick={() => handleSubItemClick(subItem.path)}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileSideMenu
