import styles from './Footer.module.css'
import { getPublicUrl } from '../../utils/getPublicUrl'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 로고 */}
        <img
          src={getPublicUrl('/images/logo_white.svg')}
          alt="TANY"
          className={styles.logo}
        />

        {/* 회사 정보 */}
        <div className={styles.info}>
          {/* 첫 번째 줄 */}
          <div className={styles.infoRow}>
            <span className={styles.infoItem}>
              <span className={styles.label}>상호</span>
              <span className={styles.value}>(주)타니</span>
            </span>
            <span className={styles.infoItem}>
              <span className={styles.label}>대표이사</span>
              <span className={styles.value}>김후연</span>
            </span>
            <span className={styles.infoItem}>
              <span className={styles.label}>전화</span>
              <span className={styles.value}>010-2482-4435</span>
            </span>
            <span className={styles.infoItem}>
              <span className={styles.label}>이메일</span>
              <span className={styles.value}>tanycompany@naver.com</span>
            </span>
          </div>

          {/* 두 번째 줄 */}
          <div className={styles.infoRow}>
            <span className={styles.infoItem}>
              <span className={styles.label}>공장</span>
              <span className={styles.value}>전북 김제시 월촌공단길 33, 1동, 2동(월촌농공단지)</span>
            </span>
            <span className={styles.infoItem}>
              <span className={styles.label}>전주지사</span>
              <span className={styles.value}>전북 전주시 덕진구 기린대로 281, 1층, 2층</span>
            </span>
            <span className={styles.infoItem}>
              <span className={styles.label}>대전지사</span>
              <span className={styles.value}>대전광역시 중구 오류동 199-1 킹콩LED</span>
            </span>
            <span className={styles.infoItem}>
              <span className={styles.label}>서울지사</span>
              <span className={styles.value}>서울특별시 강남구 선릉로 704, 상가동 12층 1235-3호 청담벤처프라자</span>
            </span>
          </div>
        </div>

        {/* 카피라이트 */}
        <p className={styles.copyright}>
          ⓒ 2025 (주)타니 All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
