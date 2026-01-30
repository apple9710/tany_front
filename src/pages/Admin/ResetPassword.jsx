import { useState } from 'react'
import { post } from '../../utils/api/client'

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleReset = async () => {
    if (!confirm('정말 비밀번호를 초기화하시겠습니까?\n\n아이디: admin\n비밀번호: admin123')) {
      return
    }

    setLoading(true)
    try {
      const response = await post('/auth/reset-password.php', {})
      setResult({
        success: true,
        message: response.message || '비밀번호가 초기화되었습니다'
      })
    } catch (error) {
      setResult({
        success: false,
        message: error.message || '초기화 실패'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>비밀번호 초기화</h1>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          관리자 비밀번호를 초기화합니다.<br />
          <strong>아이디:</strong> admin<br />
          <strong>비밀번호:</strong> admin123
        </p>

        <button
          onClick={handleReset}
          disabled={loading}
          style={{
            padding: '12px 40px',
            fontSize: '16px',
            background: '#F26966',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '초기화 중...' : '비밀번호 초기화'}
        </button>

        {result && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '4px',
            background: result.success ? '#e8f5e9' : '#ffebee',
            color: result.success ? '#2e7d32' : '#c62828'
          }}>
            {result.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
