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
        titleKo="CI"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="CI" titleKo="기업아이덴티티" />
        </div>
      </main>
    </div>
  )
}

export default CI
