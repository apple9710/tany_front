import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './BannerLED.module.css'

const BannerLED = () => {
  const subMenuItems = [
    { path: '/products/indoor-led', label: 'LED전광판' },
    { path: '/products/stand-led', label: '스탠드 전광판' },
    { path: '/products/banner-led', label: 'LED 현수막' },
    { path: '/products/signage', label: '사이니지' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_BannerLED_banner_img.png"
        titleEn="PRODUCTS"
        titleKo="제품소개"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="LED BANNER" titleKo="LED 현수막" />
        </div>
      </main>
    </div>
  )
}

export default BannerLED
