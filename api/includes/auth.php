<?php
/**
 * 인증 헬퍼 함수
 *
 * 세션 관리, 로그인 체크, 비밀번호 해시/검증
 */

require_once __DIR__ . '/db.php';

// ============================================
// 세션 시작 (이미 시작된 경우 무시)
// ============================================
function startSession() {
    if (session_status() === PHP_SESSION_NONE) {
        // 세션 보안 설정
        ini_set('session.cookie_httponly', 1);
        ini_set('session.use_only_cookies', 1);
        ini_set('session.cookie_secure', 0); // HTTPS 사용 시 1로 변경

        session_start();
    }
}

// ============================================
// 관리자 로그인 여부 확인
// ============================================
function isLoggedIn() {
    startSession();
    return isset($_SESSION['admin_user_id']) && isset($_SESSION['admin_username']);
}

// ============================================
// 로그인한 관리자 정보 가져오기
// ============================================
function getLoggedInUser() {
    if (!isLoggedIn()) {
        return null;
    }

    return [
        'id' => $_SESSION['admin_user_id'],
        'username' => $_SESSION['admin_username']
    ];
}

// ============================================
// 관리자 로그인 처리
// ============================================
function loginUser($userId, $username) {
    startSession();

    // 세션 고정 공격 방지
    session_regenerate_id(true);

    $_SESSION['admin_user_id'] = $userId;
    $_SESSION['admin_username'] = $username;
    $_SESSION['login_time'] = time();

    return true;
}

// ============================================
// 로그아웃 처리
// ============================================
function logoutUser() {
    startSession();

    // 세션 변수 모두 제거
    $_SESSION = [];

    // 세션 쿠키 삭제
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }

    // 세션 파괴
    session_destroy();

    return true;
}

// ============================================
// 관리자 인증 체크 (미들웨어)
// ============================================
function requireAuth() {
    if (!isLoggedIn()) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => '로그인이 필요합니다.'
        ]);
        exit;
    }
}

// ============================================
// 비밀번호 해시 생성
// ============================================
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
}

// ============================================
// 비밀번호 검증
// ============================================
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// ============================================
// 사용자 인증 (로그인 시)
// ============================================
function authenticateUser($username, $password) {
    // DB에서 사용자 조회
    $user = dbQueryOne(
        "SELECT id, username, password FROM admin_users WHERE username = ?",
        [$username]
    );

    // 사용자 없음
    if (!$user) {
        return [
            'success' => false,
            'message' => '아이디 또는 비밀번호가 올바르지 않습니다.'
        ];
    }

    // 비밀번호 검증
    if (!verifyPassword($password, $user['password'])) {
        return [
            'success' => false,
            'message' => '아이디 또는 비밀번호가 올바르지 않습니다.'
        ];
    }

    // 로그인 성공 - 세션 생성
    loginUser($user['id'], $user['username']);

    return [
        'success' => true,
        'message' => '로그인 성공',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username']
        ]
    ];
}

// ============================================
// 비밀번호 변경
// ============================================
function changePassword($userId, $oldPassword, $newPassword) {
    // 현재 비밀번호 확인
    $user = dbQueryOne(
        "SELECT password FROM admin_users WHERE id = ?",
        [$userId]
    );

    if (!$user) {
        return [
            'success' => false,
            'message' => '사용자를 찾을 수 없습니다.'
        ];
    }

    // 현재 비밀번호 검증
    if (!verifyPassword($oldPassword, $user['password'])) {
        return [
            'success' => false,
            'message' => '현재 비밀번호가 올바르지 않습니다.'
        ];
    }

    // 새 비밀번호 해시 생성
    $newHash = hashPassword($newPassword);

    // DB 업데이트
    $result = dbUpdate(
        'admin_users',
        ['password' => $newHash],
        'id = ?',
        [$userId]
    );

    if ($result['success']) {
        return [
            'success' => true,
            'message' => '비밀번호가 변경되었습니다.'
        ];
    } else {
        return [
            'success' => false,
            'message' => '비밀번호 변경에 실패했습니다.'
        ];
    }
}

// ============================================
// 세션 타임아웃 체크 (선택적)
// ============================================
function checkSessionTimeout($timeout = 7200) { // 기본 2시간
    startSession();

    if (isLoggedIn() && isset($_SESSION['login_time'])) {
        $elapsed = time() - $_SESSION['login_time'];

        if ($elapsed > $timeout) {
            logoutUser();
            return false;
        }

        // 활동 시간 갱신
        $_SESSION['login_time'] = time();
    }

    return true;
}

/**
 * 사용 예시:
 *
 * // 로그인 필요한 페이지
 * require_once __DIR__ . '/../includes/auth.php';
 * requireAuth();
 *
 * // 로그인 처리
 * $result = authenticateUser('admin', 'admin123');
 *
 * // 로그인 확인
 * if (isLoggedIn()) {
 *     $user = getLoggedInUser();
 *     echo $user['username'];
 * }
 *
 * // 로그아웃
 * logoutUser();
 *
 * // 비밀번호 변경
 * $result = changePassword(1, 'admin123', 'newpassword');
 */
