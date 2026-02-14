import styles from './LocationList.module.css'
import NaverMap from './NaverMap'

const LocationList = ({ data }) => {
  const handleMapClick = (mapUrl) => {
    window.open(mapUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <div key={index} className={styles.item} data-aos="fade-up" data-aos-delay={index * 100}>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.address}>{item.address}</p>
          <div className={styles.mapWrapper}>
            <NaverMap lat={item.lat} lng={item.lng} name={item.name} />
          </div>
          <button className={styles.button} onClick={() => handleMapClick(item.mapUrl)}>지도 보러가기 &gt;</button>
        </div>
      ))}
    </div>
  )
}

export default LocationList
