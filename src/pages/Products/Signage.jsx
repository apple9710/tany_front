import SubPageBanner from '../../components/layout/SubPageBanner'
import styles from './Signage.module.css'

const Signage = () => {
  const subMenuItems = [
    { path: '/products/indoor-led', label: 'LED전광판' },
    { path: '/products/stand-led', label: '스탠드 전광판' },
    { path: '/products/banner-led', label: 'LED 현수막' },
    { path: '/products/signage', label: '사이니지' }
  ]

  const features = [
    {
      title: 'USB Input (U TYPE)',
      description: '미디어 콘텐츠를 USB 저장 후 직접 삽입-사용'
    },
    {
      title: 'MagicInfo Premium (원격 네트워크)',
      description: 'USB 부착 및 관리자 PC를 통해 원격으로 콘텐츠 제어 가능'
    },
    {
      title: 'UHD 업스케일링',
      description: '하루 16시간 이상의 안정적인 플레이 운영'
    },
    {
      title: 'LED 디스플레이 전력 저감기술 적용',
      description: '캐소드 회로 및 스크린용 에너지 저감 기술을 통한 전력 절감'
    }
  ]

  const specData = [
    {
      category: '16:9 캐비닛',
      models: [
        { name: 'SYS-LD-12', pixelPitch: '1.25 mm', ledType: 'COB', cabinetSize: '600 x 337.5 x 31 mm', moduleSize: '150 x 168.75 mm', cabinetResolution: '480 x 270', moduleCount: '8', cabinetWeight: '4.5 kg', power: '≤90W', brightness: '600 nit', refreshRate: '3,840Hz', identificationNumber: '25520494', price: '₩3,500,000' },
        { name: 'SYS-LD-15', pixelPitch: '1.56 mm', ledType: 'SMD', cabinetSize: '600 x 337.5 x 31 mm', moduleSize: '300 x 168.75 mm', cabinetResolution: '384 x 216', moduleCount: '4', cabinetWeight: '4.05 kg', power: '≤90W', brightness: '600 nit', refreshRate: '3,840Hz', identificationNumber: '25520495', price: '₩1,990,000' },
        { name: 'SYS-LD-18', pixelPitch: '1.87 mm', ledType: 'SMD', cabinetSize: '600 x 337.5 x 31 mm', moduleSize: '300 x 168.75 mm', cabinetResolution: '320 x 180', moduleCount: '4', cabinetWeight: '4.05 kg', power: '≤90W', brightness: '600 nit', refreshRate: '3,840Hz', identificationNumber: '25520496', price: '₩1,560,000' }
      ]
    }
  ]

  const handleReferenceClick = () => {
    window.location.href = '/references/led-cases'
  }

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_product_banner_img.png"
        titleEn="PRODUCTS"
        titleKo="제품소개"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          {/* 제품 소개 섹션 */}
          <section className={styles.productIntro}>
            <h2 className={styles.productTitleEn} data-aos="fade-up">SIGNAGE SERIES</h2>
            <h3 className={styles.productTitleKo} data-aos="fade-up" data-aos-delay="50">사이니지</h3>
            <div className={styles.divider} data-aos="fade-up" data-aos-delay="100"></div>

            <p className={styles.productDescription} data-aos="fade-up" data-aos-delay="150">
              사이니지는 베젤이 거의 없는 디자인으로 감각적인 공간 연출과 몰입감을 선사합니다.<br />
              (주)타니는 고객사의 비즈니스 환경에 맞는 최적의 제품과 솔루션을 제공합니다.
            </p>

            <div className={styles.productImageWrapper} data-aos="fade-up" data-aos-delay="200">
              <img
                src="/images/product_signage.png"
                alt="사이니지"
                className={styles.productImage}
              />
            </div>

            <button className={styles.referenceButton} onClick={handleReferenceClick} data-aos="fade-up" data-aos-delay="250">
              설치사례 &gt;
            </button>
          </section>

          {/* 제품 이미지 섹션 */}
          <section className={styles.productImagesSection}>
            <div className={styles.imageLeft} data-aos="fade-right">
              <img
                src="/images/product_signage_img_01.png"
                alt="사이니지 제품 이미지 1"
                className={styles.productGalleryImage}
              />
            </div>
            <div className={styles.imageRight} data-aos="fade-left">
              <img
                src="/images/product_signage_img_02.png"
                alt="사이니지 제품 이미지 2"
                className={styles.productGalleryImage}
              />
            </div>
          </section>

          {/* 특징 섹션 */}
          <section className={styles.featuresSection}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={styles.featureContent}>
                  <div className={styles.featureTitleWrapper}>
                    <img
                      src="/images/check_point.svg"
                      alt="체크포인트"
                      className={styles.featureIcon}
                    />
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                  </div>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </section>

          {/* SPEC 섹션 */}
          <section className={styles.specSection}>
            <h2 className={styles.productTitleEn} data-aos="fade-up">SPEC</h2>
            <h3 className={styles.productTitleKo} data-aos="fade-up" data-aos-delay="50">제품 상세스펙</h3>
            <div className={styles.divider} data-aos="fade-up" data-aos-delay="100"></div>

            <table className={styles.table} data-aos="fade-up" data-aos-delay="150">
              <thead>
                <tr>
                  <th>구분</th>
                  <th colSpan="3">16:9 캐비닛</th>
                  <th>1:1 캐비닛</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.rowHeader}>모델명</td>
                  <td>SYS-LD-12</td>
                  <td>SYS-LD-15</td>
                  <td>SYS-LD-18</td>
                  <td>SYS-LD-25</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>식별번호</td>
                  <td>25520494</td>
                  <td>25520495</td>
                  <td>25520496</td>
                  <td>25520497</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>가격</td>
                  <td>₩3,500,000</td>
                  <td>₩1,990,000</td>
                  <td>₩1,560,000</td>
                  <td>₩950,000</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>Pixel Pitch</td>
                  <td>1.25 mm</td>
                  <td>1.56 mm</td>
                  <td>1.87 mm</td>
                  <td>2.5 mm</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>LED 타입</td>
                  <td>COB</td>
                  <td>SMD</td>
                  <td>SMD</td>
                  <td>SMD</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>밝기</td>
                  <td>600 nit</td>
                  <td>600 nit</td>
                  <td>600 nit</td>
                  <td>600 nit</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>캐비닛 사이즈</td>
                  <td>600 x 337.5 x 31 mm</td>
                  <td>600 x 337.5 x 31 mm</td>
                  <td>600 x 337.5 x 31 mm</td>
                  <td>480 x 480 x 50.8 mm</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>캐비닛 해상도 (Pixel)</td>
                  <td>480 x 270</td>
                  <td>384 x 216</td>
                  <td>320 x 180</td>
                  <td>192 x 192</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>캐비닛 무게</td>
                  <td>4.5 kg</td>
                  <td>4.05 kg</td>
                  <td>4.05 kg</td>
                  <td>5.55kg</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>캐비닛 정격 소비전력</td>
                  <td>≤90W</td>
                  <td>≤90W</td>
                  <td>≤90W</td>
                  <td>≤120W</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>모듈 사이즈</td>
                  <td>150 x 168.75 mm</td>
                  <td>300 x 168.75 mm</td>
                  <td>300 x 168.75 mm</td>
                  <td>240 x 240 mm</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>모듈 수</td>
                  <td>8</td>
                  <td>4</td>
                  <td>4</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>Refresh Rate</td>
                  <td>3,840Hz</td>
                  <td>3,840Hz</td>
                  <td>3,840Hz</td>
                  <td>3,840Hz</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>운영방식</td>
                  <td colSpan="4">(옵션) 컨트롤러, (옵션) 운영 PC, (옵션) CMS 프로그램</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Signage
