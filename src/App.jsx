import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import PageBanner from './components/layout/PageBanner'
import SubMenuNav from './components/layout/SubMenuNav'
import './styles/variables.css'
import './styles/reset.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={
            <main>
              <h1 style={{ marginTop: '120px', textAlign: 'center' }}>메인 페이지</h1>
              <p style={{ textAlign: 'center' }}>Tany - LED 전광판 제조/판매</p>
            </main>
          } />

          <Route path="/about/*" element={
            <>
              <PageBanner title="기업소개" description="TANY의 역사와 기술을 소개합니다" />
              <SubMenuNav items={[
                { path: '/about/history', label: '연혁' },
                { path: '/about/certification', label: '기술인증' },
                { path: '/about/ci', label: 'CI' },
                { path: '/about/location', label: '오시는 길' },
              ]} />
              <main className="content">
                <p>기업소개 페이지</p>
              </main>
            </>
          } />

          <Route path="/products/*" element={
            <>
              <PageBanner title="제품소개" description="다양한 LED 제품을 만나보세요" />
              <SubMenuNav items={[
                { path: '/products/led-display', label: 'LED전광판' },
                { path: '/products/stand-display', label: '스탠드 전광판' },
                { path: '/products/led-banner', label: 'LED 현수막' },
                { path: '/products/signage', label: '사이니지' },
              ]} />
              <main className="content">
                <p>제품소개 페이지</p>
              </main>
            </>
          } />

          <Route path="/references/*" element={
            <>
              <PageBanner title="레퍼런스" description="고객사 설치 사례" />
              <SubMenuNav items={[
                { path: '/references/led-cases', label: 'LED 전광판 설치사례' },
                { path: '/references/stand-cases', label: '스탠드 전광판 설치사례' },
              ]} />
              <main className="content">
                <p>레퍼런스 페이지</p>
              </main>
            </>
          } />

          <Route path="/support/*" element={
            <>
              <PageBanner title="고객지원" description="문의사항을 남겨주세요" />
              <SubMenuNav items={[
                { path: '/support/inquiry', label: '온라인문의' },
                { path: '/support/resources', label: '자료실' },
                { path: '/support/blog', label: '블로그' },
                { path: '/support/instagram', label: '인스타그램' },
              ]} />
              <main className="content">
                <p>고객지원 페이지</p>
              </main>
            </>
          } />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
