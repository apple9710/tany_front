/**
 * API 설정
 */

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api'

// API 엔드포인트
export const API_ENDPOINTS = {
  // 인증
  LOGIN: '/auth/login.php',
  LOGOUT: '/auth/logout.php',
  CHECK_AUTH: '/auth/check.php',

  // 설치사례
  REFERENCES: '/references.php',

  // 자료실
  RESOURCES: '/resources.php',

  // 기술인증
  CERTIFICATIONS: '/certifications.php',

  // 문의
  INQUIRIES: '/inquiries.php',

  // 파일 업로드
  UPLOAD: '/upload.php'
}
