import styles from './ReferenceGrid.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const ReferenceGrid = ({ data }) => {
  // 이미지 경로 처리
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    // /uploads로 시작하면 루트 기준 경로
    if (imagePath.startsWith('/uploads')) {
      return `${window.location.origin}${imagePath}`
    }
    // 그 외 public 폴더 이미지
    return getPublicUrl(imagePath)
  }

  return (
    <div className={styles.grid}>
      {data.map((item, index) => (
        <div key={item.id || index} className={styles.item} data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
          <div className={styles.imageBox}>
            <img src={getImageUrl(item.image)} alt={item.title} className={styles.image} />
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
