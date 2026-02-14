import { useRef, useEffect } from 'react'

const NaverMap = ({ lat, lng, name }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current || !window.naver) return

    const position = new naver.maps.LatLng(lat, lng)

    const map = new naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    })

    new naver.maps.Marker({
      position,
      map,
      title: name
    })

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
        mapInstanceRef.current = null
      }
    }
  }, [lat, lng, name])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', aspectRatio: '16 / 9' }}
    />
  )
}

export default NaverMap
