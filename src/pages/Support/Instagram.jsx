import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Instagram.module.css'

const Instagram = () => {
  const subMenuItems = [
    { path: '/support/inquiry', label: '온라인 문의' },
    { path: '/support/resources', label: '자료실' },
    { path: '/support/blog', label: '블로그' },
    { path: '/support/instagram', label: '인스타그램' }
  ]

  const handleInstagramClick = () => {
    // 인스타그램 URL로 이동 (추후 실제 URL로 변경)
    window.open('https://www.instagram.com/tany', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_customer_banner_img.png"
        titleEn="SUPPORT"
        titleKo="고객지원"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="INSTAGRAM" titleKo="인스타그램" />

          <div className={styles.instagramContent}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/instagram_screenshot.png"
                alt="인스타그램 스크린샷"
                className={styles.screenshot}
              />
            </div>

            <button
              className={styles.linkButton}
              onClick={handleInstagramClick}
            >
              바로가기 &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Instagram
