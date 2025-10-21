import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './StandLED.module.css'

const StandLED = () => {
  const subMenuItems = [
    { path: '/products/indoor-led', label: 'LED전광판' },
    { path: '/products/stand-led', label: '스탠드 전광판' },
    { path: '/products/banner-led', label: 'LED 현수막' },
    { path: '/products/signage', label: '사이니지' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/src/assets/images/sub_StandLED_banner_img.png"
        titleEn="PRODUCTS"
        titleKo="제품소개"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="STAND DISPLAY" titleKo="스탠드 전광판" />
        </div>
      </main>
    </div>
  )
}

export default StandLED
