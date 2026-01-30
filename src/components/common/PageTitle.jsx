import styles from './PageTitle.module.css'

const PageTitle = ({ titleEn, titleKo }) => {
  return (
    <div className={styles.titleWrapper} data-aos="fade-up">
      <h2 className={styles.titleEn}>{titleEn}</h2>
      <h3 className={styles.titleKo}>{titleKo}</h3>
      <div className={styles.divider}></div>
    </div>
  )
}

export default PageTitle
