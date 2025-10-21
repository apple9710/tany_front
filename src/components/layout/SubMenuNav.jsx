import { NavLink } from 'react-router-dom'
import styles from './SubMenuNav.module.css'

const SubMenuNav = ({ items }) => {
  return (
    <nav className={styles.subMenu}>
      <div className={styles.container}>
        <div className={styles.list}>
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default SubMenuNav
