import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { get } from '../../../utils/api/client'
import { API_ENDPOINTS } from '../../../utils/api/config'
import { getPublicUrl } from '../../../utils/getPublicUrl'
import styles from './ProductSection.module.css'

const SLIDE_INTERVAL = 4000

const ProductSection = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    let cancelled = false
    get(API_ENDPOINTS.MAIN_PRODUCTS, { active: 1 })
      .then(res => {
        if (cancelled) return
        if (res.success) {
          const items = (res.data.items || []).filter(p => p.is_active)
          setProducts(items)
        }
      })
      .catch(() => {
        if (!cancelled) setProducts([])
      })
    return () => { cancelled = true }
  }, [])

  // 탭 전환 시 슬라이드 인덱스 리셋
  useEffect(() => {
    setSlideIdx(0)
  }, [activeIdx])

  const active = products[activeIdx]
  const slides = active?.images || []

  // 자동 슬라이드
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [slides.length, activeIdx])

  const getImageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    return path
  }

  const nextSlide = () => {
    if (slides.length === 0) return
    setSlideIdx(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (slides.length === 0) return
    setSlideIdx(prev => (prev - 1 + slides.length) % slides.length)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-up">PRODUCT</h2>
        <p className={styles.subtitle} data-aos="fade-up" data-aos-delay="100">LED 제품 종류</p>

        {/* 탭 버튼 */}
        <div className={styles.tabButtons} data-aos="fade-up" data-aos-delay="200">
          {products.map((tab, idx) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                activeIdx === idx ? styles.activeTab : ''
              }`}
              onClick={() => setActiveIdx(idx)}
            >
              {tab.tab_label}
            </button>
          ))}
        </div>

        {/* 컨텐츠 */}
        {active && (
          <div className={styles.tabContent} data-aos="fade-up" data-aos-delay="300">
            <div className={styles.contentLeft}>
              <h3 className={styles.contentTitle}>{active.title}</h3>
              <div className={styles.divider}></div>
              <p className={styles.description}>{active.description}</p>
              {active.link_path && (
                <button
                  className={styles.button}
                  onClick={() => {
                    if (active.link_path.startsWith('http')) {
                      window.open(active.link_path, '_blank')
                    } else {
                      navigate(active.link_path)
                    }
                  }}
                >
                  보러가기 &gt;
                </button>
              )}
            </div>

            {/* 슬라이드 영역 */}
            <div className={styles.imageArea}>
              {slides.length === 0 ? (
                <div className={styles.noSlide}>이미지 준비 중</div>
              ) : (
                <>
                  <div className={styles.slideTrack}>
                    {slides.map((img, idx) => (
                      <img
                        key={img.id ?? idx}
                        src={getImageUrl(img.image)}
                        alt={`${active.tab_label} ${idx + 1}`}
                        className={`${styles.slideImage} ${idx === slideIdx ? styles.slideActive : ''}`}
                      />
                    ))}
                  </div>

                  {slides.length > 1 && (
                    <>
                      <button
                        type="button"
                        className={`${styles.slideNav} ${styles.slidePrev}`}
                        onClick={prevSlide}
                        aria-label="이전 슬라이드"
                      >
                        <img src={getPublicUrl('/images/prev_btn.svg')} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.slideNav} ${styles.slideNext}`}
                        onClick={nextSlide}
                        aria-label="다음 슬라이드"
                      >
                        <img src={getPublicUrl('/images/next_btn.svg')} alt="" />
                      </button>

                      <div className={styles.indicators}>
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`${styles.indicator} ${idx === slideIdx ? styles.indicatorActive : ''}`}
                            onClick={() => setSlideIdx(idx)}
                            aria-label={`슬라이드 ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductSection
