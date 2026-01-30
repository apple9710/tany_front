import styles from './HistoryTimeline.module.css'

const HistoryTimeline = ({ data }) => {
  // 이미지 경로 처리 (uploads는 루트에 있음)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    // /uploads로 시작하면 루트 기준 경로 (api 없이)
    if (imagePath.startsWith('/uploads')) {
      // 현재 도메인 기준으로 경로 생성
      return `${window.location.origin}${imagePath}`
    }
    return imagePath
  }

  return (
    <div className={styles.timeline}>
      {data.map((yearData, index) => (
        <div
          key={yearData.year}
          className={styles.yearSection}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          {/* 좌측: 연도 */}
          <div className={styles.yearHeader}>
            <h3 className={styles.year}>{yearData.year}</h3>
          </div>

          {/* 중앙: 이벤트 리스트 */}
          <div className={styles.eventList}>
            {yearData.events.map((event, eventIndex) => (
              <div key={event.id || eventIndex} className={styles.eventItem}>
                <span className={styles.dot}></span>
                <span className={styles.date}>{event.month}.</span>
                <span className={styles.description}>{event.description}</span>
              </div>
            ))}
          </div>

          {/* 우측: 이미지 (해당 연도에 이미지가 있는 경우만) */}
          {yearData.image && (
            <div className={styles.imageArea}>
              <img
                src={getImageUrl(yearData.image)}
                alt={`${yearData.year}년 이미지`}
                className={styles.image}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default HistoryTimeline
