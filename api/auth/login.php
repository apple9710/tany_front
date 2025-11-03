<?php
/**
 * 관리자 로그인 API
 *
 * POST /api/auth/login.php
 * Body: { "username": "admin", "password": "password123" }
 */

session_start();

require_once __DIR__ . '/../config/database.php';

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

// JSON 입력 받기
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '잘못된 JSON 형식입니다'
    ]);
    exit;
}

// 필수 입력값 검증
$username = trim($input['username'] ?? '');
$password = trim($input['password'] ?? '');

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '아이디와 비밀번호를 입력해주세요'
    ]);
    exit;
}

try {
    $conn = getDBConnection();

    // 사용자 조회
    $stmt = $conn->prepare("SELECT id, username, password FROM admin_users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => '아이디 또는 비밀번호가 올바르지 않습니다'
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    // 비밀번호 검증
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => '아이디 또는 비밀번호가 올바르지 않습니다'
        ]);
        exit;
    }

    // 세션에 사용자 정보 저장
    $_SESSION['admin_user'] = [
        'id' => $user['id'],
        'username' => $user['username']
    ];

    echo json_encode([
        'success' => true,
        'message' => '로그인되었습니다',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username']
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '서버 오류가 발생했습니다'
    ]);
}
