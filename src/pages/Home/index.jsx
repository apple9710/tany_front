import MainBanner from '../../components/features/home/MainBanner'
import AboutSection from '../../components/features/home/AboutSection'
import ProductSection from '../../components/features/home/ProductSection'
import TrustSection from '../../components/features/home/TrustSection'
import LocationSection from '../../components/features/home/LocationSection'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.home}>
      <MainBanner />
      <AboutSection />
      <ProductSection />
      <TrustSection />
      <LocationSection />
    </div>
  )
}

export default Home
