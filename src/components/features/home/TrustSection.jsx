import styles from './TrustSection.module.css';

const TrustSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {/* 타이틀 */}
        <h2 className={styles.title} data-aos="fade-up">
          <span className={styles.firstLine}>
            안정된 기술 · 검증된 품질로 신뢰할 수 있는
          </span>
          <span className={styles.secondLine}>(주)타니의 LED 솔루션</span>
        </h2>

        {/* 설명 */}
        <p className={styles.description} data-aos="fade-up" data-aos-delay="150">
          설계부터 시공, 유지관리까지 모든 과정을 책임지고
          <br />
          완성도 높은 결과로 고객의 신뢰에 응답합니다.
        </p>
      </div>
    </section>
  );
};

export default TrustSection;
