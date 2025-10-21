import styles from './CertificationList.module.css'

const CertificationList = ({ data }) => {
  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.imageBox}>
            {item.image && <img src={item.image} alt={item.title} className={styles.image} />}
          </div>
          <div className={styles.titleBox}>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CertificationList
