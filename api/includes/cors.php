<?php
/**
 * CORS (Cross-Origin Resource Sharing) 헤더 설정
 *
 * 동일 도메인 외 접근 차단
 */

// ============================================
// CORS 헤더 설정
// ============================================
function setCorsHeaders() {
    // 요청 출처 확인
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    // 허용할 도메인 목록
    $allowedOrigins = [
        'http://localhost:3521',           // 로컬 개발 환경
        'https://yourdomain.cafe24.com',   // ⚠️ 실제 카페24 도메인으로 변경 필요
        // 필요시 추가 도메인 등록
    ];

    // 출처가 허용 목록에 있는지 확인
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    }

    // 허용할 HTTP 메서드
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    // 허용할 헤더
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Preflight 요청 캐시 시간 (1시간)
    header("Access-Control-Max-Age: 3600");

    // Content-Type 설정
    header("Content-Type: application/json; charset=UTF-8");
}

// ============================================
// Preflight 요청 처리 (OPTIONS)
// ============================================
function handlePreflight() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        setCorsHeaders();
        http_response_code(200);
        exit;
    }
}

// ============================================
// 초기화 (모든 API 파일에서 호출)
// ============================================
function initCors() {
    setCorsHeaders();
    handlePreflight();
}

/**
 * 사용 예시:
 *
 * // API 파일 상단에 추가
 * require_once __DIR__ . '/../includes/cors.php';
 * initCors();
 */
