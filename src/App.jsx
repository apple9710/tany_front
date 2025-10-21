import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import History from './pages/About/History'
import Certification from './pages/About/Certification'
import CI from './pages/About/CI'
import Location from './pages/About/Location'
import IndoorLED from './pages/Products/IndoorLED'
import BannerLED from './pages/Products/BannerLED'
import StandLED from './pages/Products/StandLED'
import Signage from './pages/Products/Signage'
import LEDCases from './pages/References/LEDCases'
import StandLEDRef from './pages/References/StandLED'
import Inquiry from './pages/Support/Inquiry'
import Resources from './pages/Support/Resources'
import Blog from './pages/Support/Blog'
import Instagram from './pages/Support/Instagram'
import './styles/variables.css'
import './styles/reset.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/certification" element={<Certification />} />
          <Route path="/about/ci" element={<CI />} />
          <Route path="/about/location" element={<Location />} />
          <Route path="/products/indoor-led" element={<IndoorLED />} />
          <Route path="/products/banner-led" element={<BannerLED />} />
          <Route path="/products/stand-led" element={<StandLED />} />
          <Route path="/products/signage" element={<Signage />} />
          <Route path="/references/led-cases" element={<LEDCases />} />
          <Route path="/references/stand-led" element={<StandLEDRef />} />
          <Route path="/support/inquiry" element={<Inquiry />} />
          <Route path="/support/resources" element={<Resources />} />
          <Route path="/support/blog" element={<Blog />} />
          <Route path="/support/instagram" element={<Instagram />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
