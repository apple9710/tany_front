import styles from './AboutSection.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const AboutSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 주제목 */}
        <h2 className={styles.title}>ABOUT TANY</h2>

        {/* 부제목 */}
        <p className={styles.subtitle}>LED 전광판 · 사이니지 전문기업</p>

        {/* 이미지 */}
        <div className={styles.imageWrapper}>
          <img
            src={getPublicUrl('/images/main_sec02_img.png')}
            alt="ABOUT TANY"
            className={styles.image}
          />
        </div>

        {/* 버튼 */}
        <button className={styles.button}>
          설치사례 &gt;
        </button>
      </div>
    </section>
  )
}

export default AboutSection
