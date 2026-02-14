import { useNavigate } from 'react-router-dom'
import styles from './LocationSection.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const LocationSection = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 타이틀 영역 */}
        <div className={styles.textArea} data-aos="fade-up">
          <h2 className={styles.title}>LOCATION</h2>
          <p className={styles.subtitle}>오시는길</p>
        </div>

        {/* 이미지 */}
        <div className={styles.imageWrapper} data-aos="fade-up" data-aos-delay="150">
          <img
            src={getPublicUrl('/images/main_map_img.png')}
            alt="오시는길"
            className={styles.image}
          />
        </div>

        {/* 버튼 */}
        <button className={styles.button} onClick={() => navigate('/about/location')} data-aos="fade-up" data-aos-delay="300">
          지도 보러가기 &gt;
        </button>
      </div>
    </section>
  )
}

export default LocationSection
