<?php
/**
 * 관리자 로그아웃 API
 *
 * POST /api/auth/logout.php
 */

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// POST 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'POST 요청만 허용됩니다'
    ]);
    exit;
}

// 세션 삭제
unset($_SESSION['admin_user']);
session_destroy();

echo json_encode([
    'success' => true,
    'message' => '로그아웃되었습니다'
]);
