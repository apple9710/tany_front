import SubPageBanner from '../../components/layout/SubPageBanner'
import styles from './IndoorLED.module.css'

const IndoorLED = () => {
  const subMenuItems = [
    { path: '/products/indoor-led', label: 'LED전광판' },
    { path: '/products/stand-led', label: '스탠드 전광판' },
    { path: '/products/banner-led', label: 'LED 현수막' },
    { path: '/products/signage', label: '사이니지' }
  ]

  const features = [
    {
      title: '다양한 라인업',
      description: '사용 용도에 따라 다양한 픽셀 피치 구성'
    },
    {
      title: '맞춤형 전문 설계 시공',
      description: '고객의 니즈에 따라 공간별 맞춤 전문 시공 설치'
    },
    {
      title: '쉽고 간편한 유지보수',
      description: '간편한 전면 탈착 형태의 모듈로 손쉬운 유지보수 관리'
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
    },
    {
      category: '1:1 캐비닛',
      models: [
        { name: 'SYS-LD-25', pixelPitch: '2.5 mm', ledType: 'SMD', cabinetSize: '480 x 480 x 50.8 mm', moduleSize: '240 x 240 mm', cabinetResolution: '192 x 192', moduleCount: '4', cabinetWeight: '5.55kg', power: '≤120W', brightness: '600 nit', refreshRate: '3,840Hz', identificationNumber: '25520497', price: '₩950,000' }
      ]
    }
  ]

  const optionData = [
    { name: 'THIN H310-i3', category: '영상정보디스플레이장치(4511189301) 옵션 물품', cpu: 'Intel i3 / DDR4 4GB / 128GB', os: 'Windows 10 Pro 이상', ioPort: 'HDMI x 1 / USB 2.0 x 2 / USB 3.0 x 2 / RJ45 x 1', identificationNumber: '23835993', price: '₩880,000' },
    { name: 'B360-i5', category: '영상정보디스플레이장치(4511189301) 옵션 물품', cpu: 'Intel i5 / DDR4 8GB / 256GB', os: 'Windows 10 Pro 이상', ioPort: 'HDMI x 1 / USB 2.0 x 2 / USB 3.0 x 2 / RJ45 x 1', identificationNumber: '23845155', price: '₩1,150,000' },
    { name: 'DIDMATE PLAYER v2.2.0', category: '영상정보디스플레이장치(4511189301) 옵션 물품', features: '- 관리자 PC 프로그램(기본)을 통한 영상기기 원격제어\n- 이미지 및 동영상 재생 / 화면분할 / 스케줄 재상 등', identificationNumber: '24020318', price: '₩660,000' },
    { name: 'SYS-8CH-MATRIX', category: 'AV스위쳐 (5216154001)본품', ioPort: 'HDMI 2.0(4K) x 1 / DVI-D x 1', features: '- 8x8 HDMI 매트릭스 스케일러 스위치\n- 최대 15M 장거리 전송 / 스케일러 기능 / 포트 전환 등', identificationNumber: '24140413', price: '₩7,900,000' }
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
            <h2 className={styles.productTitleEn}>INDOOR LED DISPLAY SERIES</h2>
            <h3 className={styles.productTitleKo}>실내용 LED 전광판</h3>
            <div className={styles.divider}></div>

            <p className={styles.productDescription}>
              실내용 LED 안내전광판은 베젤이 없는 슬림한 디자인으로 세미나, 연회장, 대강당 등의 실내 장소에서<br />
              형태별 맞춤형 전문 시공을 통해 세련된 공간을 연출하며, 밝고 생동감 넘치는 화면으로 몰입감을 더하여 효과적인 광고, 홍보 콘텐츠 전달이 가능합니다.
            </p>

            <div className={styles.productImageWrapper}>
              <img
                src="/images/product_indoor_led.png"
                alt="실내용 LED 전광판"
                className={styles.productImage}
              />
            </div>

            <button className={styles.referenceButton} onClick={handleReferenceClick}>
              설치사례 &gt;
            </button>
          </section>

          {/* 제품 이미지 섹션 */}
          <section className={styles.productImagesSection}>
            <div className={styles.imageLeft}>
              <img
                src="/images/product_led_img_01.png"
                alt="LED 제품 이미지 1"
                className={styles.productGalleryImage}
              />
            </div>
            <div className={styles.imageRight}>
              <img
                src="/images/product_led_img_02.png"
                alt="LED 제품 이미지 2"
                className={styles.productGalleryImage}
              />
              <img
                src="/images/product_led_img_03.png"
                alt="LED 제품 이미지 3"
                className={styles.productGalleryImage}
              />
            </div>
          </section>

          {/* 특징 섹션 */}
          <section className={styles.featuresSection}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
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
            <h2 className={styles.productTitleEn}>SPEC</h2>
            <h3 className={styles.productTitleKo}>제품 상세스펙</h3>
            <div className={styles.divider}></div>

            <table className={styles.table}>
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

          {/* OPTION 섹션 */}
          <section className={styles.optionSection}>
            <h2 className={styles.productTitleEn}>OPTION</h2>
            <h3 className={styles.productTitleKo}>추가 선택 옵션</h3>
            <div className={styles.divider}></div>

            <table className={styles.optionTable}>
              <thead>
                <tr>
                  <th>구분</th>
                  <th colSpan="2">16:9 캐비닛</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.rowHeader}>모델명</td>
                  <td>THIN H310-i3</td>
                  <td>B360-i5</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>세부품명</td>
                  <td>영상정보디스플레이장치(4511189301) 옵션 물품</td>
                  <td>영상정보디스플레이장치(4511189301) 옵션 물품</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>식별번호</td>
                  <td>23835993</td>
                  <td>24020318</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>가격</td>
                  <td>₩880,000</td>
                  <td>₩1,150,000</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>CPU/RAM/SSD</td>
                  <td>Intel i3 / DDR4 4GB / 128GB</td>
                  <td>Intel i5 / DDR4 8GB / 256GB</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>O/S</td>
                  <td>Windows 10 Pro 이상</td>
                  <td>Windows 10 Pro 이상</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>I/O PORT</td>
                  <td>HDMI x 1 / USB 2.0 x 2 / USB 3.0 x 2 / RJ45 x 1</td>
                  <td>HDMI 2.0(4K) x 1 / DVI-D x 1</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.tableDivider}></div>

            <table className={styles.optionTable}>
              <thead>
                <tr>
                  <th>구분</th>
                  <th colSpan="2">16:9 캐비닛</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.rowHeader}>모델명</td>
                  <td>DIDMATE PLAYER v2.2.0</td>
                  <td>SYS-8CH-MATRIX</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>세부품명</td>
                  <td>영상정보디스플레이장치(4511189301) 옵션 물품</td>
                  <td>AV스위쳐 (5216154001)본품</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>식별번호</td>
                  <td>23845155</td>
                  <td>24140413</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>가격</td>
                  <td>₩660,000</td>
                  <td>₩7,900,000</td>
                </tr>
                <tr>
                  <td className={styles.rowHeader}>주요 특징</td>
                  <td className={styles.featureCell}>- 관리자 PC 프로그램(기본)을 통한 영상기기 원격제어<br />- 이미지 및 동영상 재생 / 화면분할 / 스케줄 재상 등</td>
                  <td className={styles.featureCell}>- 8x8 HDMI 매트릭스 스케일러 스위치<br />- 최대 15M 장거리 전송 / 스케일러 기능 / 포트 전환 등</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  )
}

export default IndoorLED
