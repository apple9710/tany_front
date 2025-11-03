/**
 * API 클라이언트
 */

import { API_BASE_URL } from './config'

/**
 * API 요청 함수
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include' // 세션 쿠키 포함
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '요청에 실패했습니다')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

/**
 * GET 요청
 */
export async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString()
  const url = queryString ? `${endpoint}?${queryString}` : endpoint

  return request(url, {
    method: 'GET'
  })
}

/**
 * POST 요청
 */
export async function post(endpoint, data = {}) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * PUT 요청
 */
export async function put(endpoint, data = {}) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

/**
 * DELETE 요청
 */
export async function del(endpoint) {
  return request(endpoint, {
    method: 'DELETE'
  })
}

/**
 * 파일 업로드
 */
export async function uploadFile(endpoint, file, params = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const queryString = new URLSearchParams(params).toString()
  const fullUrl = queryString ? `${url}?${queryString}` : url

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '파일 업로드에 실패했습니다')
    }

    return data
  } catch (error) {
    console.error('Upload Error:', error)
    throw error
  }
}
