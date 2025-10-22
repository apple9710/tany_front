import styles from './PageBanner.module.css'
import { getPublicUrl } from '../../utils/getPublicUrl'

const PageBanner = ({ title, description, backgroundImage }) => {
  const bannerStyle = backgroundImage
    ? { backgroundImage: `url(${getPublicUrl(backgroundImage)})` }
    : {}

  return (
    <div className={styles.banner} style={bannerStyle}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  )
}

export default PageBanner
