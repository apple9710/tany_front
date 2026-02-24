import { useRef, useEffect } from 'react'

const NaverMap = ({ address, name }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current || !window.naver || !naver.maps.Service) return

    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) return

      const result = response.v2.addresses[0]
      if (!result) return

      const position = new naver.maps.LatLng(Number(result.y), Number(result.x))

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
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
        mapInstanceRef.current = null
      }
    }
  }, [address, name])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', aspectRatio: '16 / 9' }}
    />
  )
}

export default NaverMap
