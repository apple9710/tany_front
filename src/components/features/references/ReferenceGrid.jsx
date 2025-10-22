import styles from './ReferenceGrid.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const ReferenceGrid = ({ data }) => {
  return (
    <div className={styles.grid}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.imageBox}>
            <img src={getPublicUrl(item.image)} alt={item.title} className={styles.image} />
            <div className={styles.textBox}>
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReferenceGrid
