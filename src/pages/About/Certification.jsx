import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import CertificationList from '../../components/features/certification/CertificationList'
import styles from './Certification.module.css'

const Certification = () => {
  const subMenuItems = [
    { path: '/about/history', label: '연혁' },
    { path: '/about/certification', label: '기술인증' },
    { path: '/about/ci', label: 'CI' },
    { path: '/about/location', label: '오시는 길' }
  ]

  const certificationData = [
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' },
    { title: '여성기업확인서', image: '' }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_Certification_banner_img.png"
        titleEn="CERTIFICATION"
        titleKo="기술인증"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="CERTIFICATION" titleKo="기술인증" />
          <CertificationList data={certificationData} />
        </div>
      </main>
    </div>
  )
}

export default Certification
