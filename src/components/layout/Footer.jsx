import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 회사 정보 */}
          <div className={styles.section}>
            <h3 className={styles.title}>TANY</h3>
            <div className={styles.info}>
              <p><strong>회사명:</strong> 타니(주)</p>
              <p><strong>대표:</strong> 홍길동</p>
              <p><strong>사업자등록번호:</strong> 123-45-67890</p>
              <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 123</p>
            </div>
          </div>

          {/* 연락처 */}
          <div className={styles.section}>
            <h3 className={styles.title}>Contact</h3>
            <div className={styles.info}>
              <p><strong>전화:</strong> 02-1234-5678</p>
              <p><strong>팩스:</strong> 02-1234-5679</p>
              <p><strong>이메일:</strong> info@tany.com</p>
              <p><strong>영업시간:</strong> 평일 09:00 - 18:00</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className={styles.section}>
            <h3 className={styles.title}>Quick Links</h3>
            <div className={styles.linkList}>
              <Link to="/about" className={styles.link}>기업소개</Link>
              <Link to="/products" className={styles.link}>제품소개</Link>
              <Link to="/references" className={styles.link}>레퍼런스</Link>
              <Link to="/support/inquiry" className={styles.link}>온라인문의</Link>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 TANY. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://blog.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="블로그"
            >
              B
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="인스타그램"
            >
              I
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
