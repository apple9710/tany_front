import { useState, useEffect } from 'react'
import styles from './MainBanner.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const MainBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: getPublicUrl('/images/main_base_banner_01.png'),
      text: '공간에 최적화된 기술력과 안정적인 품질로\nLED 디스플레이의 새로운 기준을 만듭니다'
    },
    {
      image: getPublicUrl('/images/main_base_banner_01.png'),
      text: '공간에 최적화된 기술력과 안정적인 품질로\nLED 디스플레이의 새로운 기준을 만듭니다'
    },
    {
      image: getPublicUrl('/images/main_base_banner_01.png'),
      text: '공간에 최적화된 기술력과 안정적인 품질로\nLED 디스플레이의 새로운 기준을 만듭니다'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.banner}>
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ''
            }`}
          >
            <img
              src={slide.image}
              alt={`배너 ${index + 1}`}
              className={styles.slideImage}
            />
            <div className={styles.slideContent}>
              <p className={styles.slideText}>
                {slide.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < slide.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 이전 버튼 */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={prevSlide}
        aria-label="이전 슬라이드"
      >
        <img src={getPublicUrl('/images/prev_btn.svg')} alt="이전" />
      </button>

      {/* 다음 버튼 */}
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={nextSlide}
        aria-label="다음 슬라이드"
      >
        <img src={getPublicUrl('/images/next_btn.svg')} alt="다음" />
      </button>

      {/* 인디케이터 */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.activeIndicator : ''
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default MainBanner
