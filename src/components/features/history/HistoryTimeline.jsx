import styles from './HistoryTimeline.module.css'
import { getPublicUrl } from '../../../utils/getPublicUrl'

const HistoryTimeline = ({ data }) => {
  return (
    <div className={styles.timeline}>
      {data.map((yearData, index) => (
        <div key={index} className={styles.yearSection} data-aos="fade-up" data-aos-delay={index * 100}>
          {/* 좌측: 연도 */}
          <div className={styles.yearHeader}>
            <h3 className={styles.year}>{yearData.year}</h3>
          </div>

          {/* 중앙: 이벤트 리스트 */}
          <div className={styles.eventList}>
            {yearData.events.map((event, eventIndex) => (
              <div key={eventIndex} className={styles.eventItem}>
                <span className={styles.date}>{event.date}</span>
                <span className={styles.description}>{event.description}</span>
              </div>
            ))}
          </div>

          {/* 우측: 이미지 (있을 경우만) */}
          {yearData.image && (
            <div className={styles.imageArea}>
              <img src={getPublicUrl(yearData.image)} alt={`${yearData.year} 이미지`} className={styles.image} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default HistoryTimeline
