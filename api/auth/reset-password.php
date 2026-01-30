<?php
/**
 * 관리자 비밀번호 초기화 API
 * POST /api/auth/reset-password.php
 * 비밀번호를 admin123으로 초기화
 */

require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'POST 요청만 허용됩니다']);
    exit;
}

try {
    $conn = getDBConnection();

    // admin123을 bcrypt로 해시
    $newPassword = password_hash('admin123', PASSWORD_BCRYPT);

    // admin 계정 비밀번호 업데이트
    $stmt = $conn->prepare("UPDATE admin_users SET password = ? WHERE username = 'admin'");
    $stmt->bind_param('s', $newPassword);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => '비밀번호가 admin123으로 초기화되었습니다'
        ]);
    } else {
        // admin 계정이 없으면 생성
        $stmt2 = $conn->prepare("INSERT INTO admin_users (username, password) VALUES ('admin', ?)");
        $stmt2->bind_param('s', $newPassword);
        $stmt2->execute();

        echo json_encode([
            'success' => true,
            'message' => 'admin 계정이 생성되었습니다 (비밀번호: admin123)'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '서버 오류: ' . $e->getMessage()
    ]);
}
