import styles from './PageBanner.module.css'

const PageBanner = ({ title, description }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  )
}

export default PageBanner
