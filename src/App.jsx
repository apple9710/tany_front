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
import AdminLogin from './pages/Admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import Certifications from './pages/Admin/Certifications'
import AdminReferences from './pages/Admin/References'
import AdminResources from './pages/Admin/Resources'
import Inquiries from './pages/Admin/Inquiries'
import './styles/variables.css'
import './styles/reset.css'
import './styles/font.css'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* 어드민 로그인 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 어드민 페이지 (레이아웃 포함) */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="references" element={<AdminReferences />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="inquiries" element={<Inquiries />} />
        </Route>

        {/* 일반 페이지 라우트 (Header/Footer 포함) */}
        <Route path="/*" element={
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
        } />
      </Routes>
    </Router>
  )
}

export default App
