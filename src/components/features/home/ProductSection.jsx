import { useState } from 'react'
import styles from './ProductSection.module.css'

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 0, label: '실내형' },
    { id: 1, label: '실외형' },
    { id: 2, label: '현수막형' },
    { id: 3, label: '스텐드형' },
    { id: 4, label: '사이니지' },
    { id: 5, label: '비디오월' }
  ]

  const tabContent = {
    title: '실내용 LED 안내전광판',
    description: `실내용 LED 안내전광판은 베젤이 없는
슬림한 디자인으로 세미나, 연회장, 대강당 등의
실내 장소에서 형태별 맞춤형 전문 시공을 통해
세련된 공간을 연출하며, 밝고 생동감 넘치는
화면으로 몰입감을 더하여 효과적인 광고,
홍보 콘텐츠 전달이 가능합니다.`
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 주제목 */}
        <h2 className={styles.title}>PRODUCT</h2>

        {/* 부제목 */}
        <p className={styles.subtitle}>LED 제품 종류</p>

        {/* 탭 버튼들 */}
        <div className={styles.tabButtons}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div className={styles.tabContent}>
          <div className={styles.contentLeft}>
            {/* 타이틀 */}
            <h3 className={styles.contentTitle}>{tabContent.title}</h3>

            {/* 구분선 */}
            <div className={styles.divider}></div>

            {/* 설명 */}
            <p className={styles.description}>{tabContent.description}</p>

            {/* 버튼 */}
            <button className={styles.button}>보러가기 &gt;</button>
          </div>

          {/* 이미지 영역 */}
          <div className={styles.imageArea}></div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
