import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Resources.module.css'

const Resources = () => {
  const subMenuItems = [
    { path: '/support/inquiry', label: '온라인 문의' },
    { path: '/support/resources', label: '자료실' },
    { path: '/support/blog', label: '블로그' },
    { path: '/support/instagram', label: '인스타그램' }
  ]

  const resourcesData = [
    {
      id: 1,
      date: '2025. 10. 10',
      title: '(주)타니 회사소개서',
      file: '/downloads/company-introduction.pdf'
    },
    {
      id: 2,
      date: '2025. 10. 10',
      title: '정부조달제품 카달로그',
      file: '/downloads/government-procurement-catalog.pdf'
    },
    {
      id: 3,
      date: '2025. 10. 10',
      title: '학교 LED 전광판 카달로그',
      file: '/downloads/school-led-catalog.pdf'
    },
    {
      id: 4,
      date: '2025. 10. 10',
      title: '(주)타니 사업자등록증',
      file: '/downloads/business-registration.pdf'
    }
  ]

  const handleDownload = (file, title) => {
    // 다운로드 로직 (추후 구현)
    console.log('Download:', file, title)
    alert(`"${title}" 다운로드를 시작합니다.`)
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
          <PageTitle titleEn="DOWNLOADS" titleKo="자료실" />

          <div className={styles.resourcesList}>
            {resourcesData.map((resource, index) => (
              <div key={resource.id}>
                <div className={styles.resourceItem}>
                  <div className={styles.resourceInfo}>
                    <p className={styles.resourceDate}>{resource.date}</p>
                    <h3 className={styles.resourceTitle}>{resource.title}</h3>
                  </div>
                  <button
                    className={styles.downloadButton}
                    onClick={() => handleDownload(resource.file, resource.title)}
                  >
                    다운로드
                  </button>
                </div>
                {index < resourcesData.length - 1 && (
                  <div className={styles.divider}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Resources
