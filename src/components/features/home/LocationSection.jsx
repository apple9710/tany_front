import styles from './LocationSection.module.css'

const LocationSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 타이틀 영역 */}
        <div className={styles.textArea}>
          <h2 className={styles.title}>LOCATION</h2>
          <p className={styles.subtitle}>오시는길</p>
        </div>

        {/* 이미지 */}
        <div className={styles.imageWrapper}>
          <img
            src="/images/main_map_img.png"
            alt="오시는길"
            className={styles.image}
          />
        </div>

        {/* 버튼 */}
        <button className={styles.button}>
          지도 보러가기 &gt;
        </button>
      </div>
    </section>
  )
}

export default LocationSection
