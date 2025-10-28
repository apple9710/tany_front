import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './CI.module.css'

const CI = () => {
  const subMenuItems = [
    { path: '/about/history', label: '연혁' },
    { path: '/about/certification', label: '기술인증' },
    { path: '/about/ci', label: 'CI' },
    { path: '/about/location', label: '오시는 길' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_CI_banner_img.png"
        titleEn="CI"
        titleKo="기업아이덴티티"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="CI" titleKo="기업아이덴티티" />
          <p className={styles.intro}>
            (주)타니의 핵심가치와 기업철학이 담긴 CI를 소개합니다
          </p>
          <div className={styles.divider}></div>

          <section className={styles.logoSection}>
            <h3 className={styles.sectionTitle}>LOGO</h3>
            <p className={styles.sectionDescription}>
              (주)타니의 기업 이미지를 시각적으로 형상화 한 로고입니다
            </p>
            <div className={styles.logoImageWrapper}>
              <img src="/images/ci_logo.png" alt="타니 CI 로고" className={styles.logoImage} />
            </div>
            <button className={styles.downloadButton}>CI 다운로드 &gt;</button>
          </section>
        </div>

        <section className={styles.guideSection}>
          <div className={styles.container}>
            <div className={styles.divider}></div>
            <h3 className={styles.sectionTitle}>CI GUIDE</h3>
            <p className={styles.guideDescription}>
              (주)타니의  CI 사용 규정 입니다
            </p>
          </div>

          <div className={styles.guideRow}>
            <div className={styles.guideText}>색상규정</div>
            <div className={styles.guideImage}>
              <img src="/images/ci_color.svg" alt="색상규정" />
            </div>
          </div>

          <div className={styles.guideRow}>
            <div className={styles.guideText}>
              영문서체<br />
              Helvetica Rounded
            </div>
            <div className={styles.guideImage}>
              <img src="/images/ci_font_en.svg" alt="영문서체" />
            </div>
          </div>

          <div className={styles.guideRow}>
            <div className={styles.guideText}>
              국문서체<br />
              Noto Sans CJK KR
            </div>
            <div className={styles.guideImage}>
              <img src="/images/ci_font_kr.svg" alt="국문서체" />
            </div>
          </div>

          <div className={styles.ciImageWrapper}>
            <img src="/images/ci_img.png" alt="CI 이미지" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default CI
