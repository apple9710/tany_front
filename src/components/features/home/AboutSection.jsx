import { useNavigate } from 'react-router-dom'
import styles from './AboutSection.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const AboutSection = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 주제목 */}
        <h2 className={styles.title} data-aos="fade-up">ABOUT TANY</h2>

        {/* 부제목 */}
        <p className={styles.subtitle} data-aos="fade-up" data-aos-delay="100">LED 전광판 · 사이니지 전문기업</p>

        {/* 이미지 */}
        <div className={styles.imageWrapper} data-aos="fade-up" data-aos-delay="200">
          <img
            src={getPublicUrl('/images/main_sec02_img.png')}
            alt="ABOUT TANY"
            className={styles.image}
          />
        </div>

        {/* 버튼 */}
        <button className={styles.button} data-aos="fade-up" data-aos-delay="300" onClick={() => navigate('/references/led-cases')}>
          설치사례 &gt;
        </button>
      </div>
    </section>
  )
}

export default AboutSection
