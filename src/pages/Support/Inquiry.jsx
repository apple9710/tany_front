import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Inquiry.module.css'

const Inquiry = () => {
  const subMenuItems = [
    { path: '/support/inquiry', label: '온라인 문의' },
    { path: '/support/resources', label: '자료실' },
    { path: '/support/blog', label: '블로그' },
    { path: '/support/instagram', label: '인스타그램' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_Inquiry_banner_img.png"
        titleEn="SUPPORT"
        titleKo="고객지원"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="ONLINE INQUIRY" titleKo="온라인 문의" />
        </div>
      </main>
    </div>
  )
}

export default Inquiry
