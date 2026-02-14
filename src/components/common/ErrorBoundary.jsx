import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: '20px',
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif"
        }}>
          <p style={{ fontSize: '18px', color: '#707070' }}>
            페이지를 불러오는 중 문제가 발생했습니다.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 32px',
              border: '1px solid #F26966',
              borderRadius: '9999px',
              backgroundColor: '#fff',
              color: '#F26966',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
