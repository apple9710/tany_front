<?php
/**
 * CORS 설정
 */

function initCors() {
    // 허용할 Origin (개발 + 운영 환경)
    $allowedOrigins = [
        'http://localhost:3521',
        'http://localhost:3000',
        'http://127.0.0.1:3521',
        'http://127.0.0.1:3000',
        'http://tanycompany.com',
        'https://tanycompany.com',
        'http://www.tanycompany.com',
        'https://www.tanycompany.com'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // 개발 편의상 모든 origin 허용 (운영 시 제거)
        header("Access-Control-Allow-Origin: *");
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=utf-8');

    // OPTIONS 요청 (preflight) 처리
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}
