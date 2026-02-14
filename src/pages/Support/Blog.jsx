import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Blog.module.css'

const Blog = () => {
  const subMenuItems = [
    { path: '/support/inquiry', label: '온라인 문의' },
    { path: '/support/resources', label: '자료실' },
    { path: '/support/blog', label: '블로그' },
    { path: '/support/instagram', label: '인스타그램' }
  ]

  const handleBlogClick = () => {
    window.open('https://blog.naver.com/tanycompany_kr', '_blank', 'noopener,noreferrer')
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
          <PageTitle titleEn="BLOG" titleKo="블로그" />

          <div className={styles.blogContent}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/blog_screenshot.png"
                alt="블로그 스크린샷"
                className={styles.screenshot}
              />
            </div>

            <button
              className={styles.linkButton}
              onClick={handleBlogClick}
            >
              바로가기 &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Blog
