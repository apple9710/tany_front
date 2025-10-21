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

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/src/assets/images/sub_Blog_banner_img.png"
        titleEn="SUPPORT"
        titleKo="고객지원"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="BLOG" titleKo="블로그" />
        </div>
      </main>
    </div>
  )
}

export default Blog
