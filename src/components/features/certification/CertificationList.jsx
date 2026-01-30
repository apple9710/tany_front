import styles from './CertificationList.module.css'

const CertificationList = ({ data }) => {
  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <div key={index} className={styles.item} data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
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
