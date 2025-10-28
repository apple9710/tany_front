import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import ReferenceGrid from '../../components/features/references/ReferenceGrid'
import Pagination from '../../components/common/Pagination'
import styles from './LEDCases.module.css'

const LEDCases = () => {
  const subMenuItems = [
    { path: '/references/led-cases', label: 'LED전광판' },
    { path: '/references/stand-led', label: '스탠드 전광판' }
  ]

  const referenceData = [
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' },
    { title: '(주)타니 1, 2층 실외 LED 전광판', image: '/images/demo_refImg.png' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_reference_banner_img.png"
        titleEn="REFERENCE"
        titleKo="래퍼런스"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="LED DISPLAY SERIES REFERENCE" titleKo="LED 전광판 설치사례" />
          <ReferenceGrid data={referenceData} />
          <Pagination totalItems={referenceData.length} itemsPerPage={10} />
        </div>
      </main>
    </div>
  )
}

export default LEDCases
