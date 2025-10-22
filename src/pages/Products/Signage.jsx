import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Signage.module.css'

const Signage = () => {
  const subMenuItems = [
    { path: '/products/indoor-led', label: 'LED전광판' },
    { path: '/products/stand-led', label: '스탠드 전광판' },
    { path: '/products/banner-led', label: 'LED 현수막' },
    { path: '/products/signage', label: '사이니지' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_Signage_banner_img.png"
        titleEn="PRODUCTS"
        titleKo="제품소개"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="SIGNAGE" titleKo="사이니지" />
        </div>
      </main>
    </div>
  )
}

export default Signage
