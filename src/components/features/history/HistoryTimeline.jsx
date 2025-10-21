import styles from './HistoryTimeline.module.css'

const HistoryTimeline = ({ data }) => {
  return (
    <div className={styles.timeline}>
      {data.map((yearData, index) => (
        <div key={index} className={styles.yearSection}>
          {/* 연도와 점 */}
          <div className={styles.yearHeader}>
            <h3 className={styles.year}>{yearData.year}</h3>
            <div className={styles.dotActive}></div>
          </div>

          {/* 내용 영역 */}
          <div className={styles.contentWrapper}>
            {/* 좌측: 이벤트 리스트 */}
            <div className={styles.eventList}>
              {yearData.events.map((event, eventIndex) => (
                <div key={eventIndex} className={styles.eventItem}>
                  <div className={styles.dotGray}></div>
                  <span className={styles.date}>{event.date}</span>
                  <span className={styles.description}>{event.description}</span>
                </div>
              ))}
            </div>

            {/* 우측: 이미지 (있을 경우만) */}
            {yearData.image && (
              <div className={styles.imageArea}>
                <img src={yearData.image} alt={`${yearData.year} 이미지`} className={styles.image} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryTimeline
