import styles from './LocationList.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const LocationList = ({ data }) => {
  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.address}>{item.address}</p>
          <div className={styles.imageWrapper}>
            <img src={getPublicUrl(item.image)} alt={item.name} className={styles.image} />
          </div>
          <button className={styles.button}>지도 보러가기 &gt;</button>
        </div>
      ))}
    </div>
  )
}

export default LocationList
