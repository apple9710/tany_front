import { NavLink } from 'react-router-dom'
import styles from './SubPageBanner.module.css'

const SubPageBanner = ({
  backgroundImage,
  titleEn,
  titleKo,
  subMenuItems
}) => {
  return (
    <div className={styles.banner}>
      {/* 배경 이미지 */}
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.overlay}></div>
      </div>

      {/* 타이틀 영역 */}
      <div className={styles.titleArea}>
        <h2 className={styles.titleEn}>{titleEn}</h2>
        <h1 className={styles.titleKo}>{titleKo}</h1>
      </div>

      {/* 서브 메뉴 */}
      <nav className={styles.subMenu}>
        <div className={styles.subMenuContainer}>
          {subMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.subMenuItem} ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default SubPageBanner
