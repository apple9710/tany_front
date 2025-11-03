<?php
/**
 * 로그인 상태 확인 API
 *
 * GET /api/auth/check.php
 */

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// GET 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'GET 요청만 허용됩니다'
    ]);
    exit;
}

// 로그인 상태 확인
if (isset($_SESSION['admin_user'])) {
    echo json_encode([
        'success' => true,
        'message' => '로그인 상태입니다',
        'user' => $_SESSION['admin_user']
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => '로그인이 필요합니다'
    ]);
}
