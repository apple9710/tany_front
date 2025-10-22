// public 폴더 파일의 올바른 URL을 반환하는 헬퍼 함수
export const getPublicUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  // path가 /로 시작하면 제거
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}
