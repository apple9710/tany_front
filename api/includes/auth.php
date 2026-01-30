<?php
/**
 * 인증 관련 함수
 */

session_start();

/**
 * 로그인 상태 확인
 */
function isLoggedIn() {
    return isset($_SESSION['admin_user']) && !empty($_SESSION['admin_user']['id']);
}

/**
 * 로그인 필수 체크 (미로그인 시 에러 반환)
 */
function requireAuth() {
    if (!isLoggedIn()) {
        sendError('로그인이 필요합니다', 401);
    }
}

/**
 * 현재 로그인 사용자 정보 반환
 */
function getCurrentUser() {
    return $_SESSION['admin_user'] ?? null;
}
