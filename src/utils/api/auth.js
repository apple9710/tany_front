/**
 * 인증 API
 */

import { get, post } from './client'
import { API_ENDPOINTS } from './config'

/**
 * 로그인
 */
export async function login(username, password) {
  return post(API_ENDPOINTS.LOGIN, { username, password })
}

/**
 * 로그아웃
 */
export async function logout() {
  return post(API_ENDPOINTS.LOGOUT)
}

/**
 * 로그인 상태 확인
 */
export async function checkAuth() {
  return get(API_ENDPOINTS.CHECK_AUTH)
}
