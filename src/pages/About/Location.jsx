import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import LocationList from '../../components/features/location/LocationList'
import styles from './Location.module.css'

const Location = () => {
  const subMenuItems = [
    { path: '/about/history', label: '연혁' },
    { path: '/about/certification', label: '기술인증' },
    { path: '/about/ci', label: 'CI' },
    { path: '/about/location', label: '오시는 길' }
  ]

  const locationData = [
    {
      name: '전주지사',
      address: '전북 전주시 덕진구 기린대로 281',
      mapUrl: 'https://naver.me/xiLQGsZR'
    },
    {
      name: '대전지사',
      address: '대전광역시 중구 오류동 199-1',
      mapUrl: 'https://map.naver.com/p/search/대전광역시 중구 오류동 199-1'
    },
    {
      name: '서울지사',
      address: '서울특별시 강남구 선릉로 704',
      mapUrl: 'https://map.naver.com/p/search/서울특별시 강남구 선릉로 704'
    },
    {
      name: '김제공장',
      address: '전북 김제시 월촌공단길 33',
      mapUrl: 'https://map.naver.com/p/search/전북 김제시 월촌공단길 33'
    }
  ]

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_location_banner_img.png"
        titleEn="LOCATION"
        titleKo="오시는 길"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="LOCATION" titleKo="오시는 길" />
          <LocationList data={locationData} />
        </div>
      </main>
    </div>
  )
}

export default Location
