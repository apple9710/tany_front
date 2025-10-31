<?php
/**
 * 데이터베이스 연결 설정 예시 파일
 *
 * 이 파일을 복사하여 database.php로 이름을 변경하고
 * 실제 DB 정보를 입력하세요
 *
 * cp database.example.php database.php
 */

// ============================================
// DB 연결 정보 (사용자가 수정 필요)
// ============================================
define('DB_HOST', 'localhost');           // 카페24 내부 접속: localhost
define('DB_USER', 'xistdesign');          // DB 계정명
define('DB_PASS', 'YOUR_PASSWORD_HERE');  // ⚠️ 실제 DB 비밀번호로 변경 필요
define('DB_NAME', 'xistdesign');          // DB 이름 (계정명과 동일한 경우 많음)
define('DB_PORT', 3306);                  // 기본 포트
define('DB_CHARSET', 'utf8mb4');          // 문자셋

// ============================================
// DB 연결 함수
// ============================================
function getDBConnection() {
    static $conn = null;

    // 이미 연결된 경우 재사용
    if ($conn !== null) {
        return $conn;
    }

    try {
        // MySQLi 연결 생성
        $conn = new mysqli(
            DB_HOST,
            DB_USER,
            DB_PASS,
            DB_NAME,
            DB_PORT
        );

        // 연결 오류 체크
        if ($conn->connect_error) {
            throw new Exception('데이터베이스 연결 실패: ' . $conn->connect_error);
        }

        // 문자셋 설정
        if (!$conn->set_charset(DB_CHARSET)) {
            throw new Exception('문자셋 설정 실패: ' . $conn->error);
        }

        return $conn;

    } catch (Exception $e) {
        // 에러 로그 (운영 환경에서는 로그 파일로 기록 권장)
        error_log('DB Connection Error: ' . $e->getMessage());

        // 개발 환경에서만 에러 출력 (운영 환경에서는 제거)
        if (getenv('ENVIRONMENT') === 'development') {
            die('Database connection failed: ' . $e->getMessage());
        } else {
            die('Database connection failed. Please contact administrator.');
        }
    }
}

// ============================================
// DB 연결 종료 함수
// ============================================
function closeDBConnection($conn = null) {
    if ($conn === null) {
        $conn = getDBConnection();
    }

    if ($conn && !$conn->connect_error) {
        $conn->close();
    }
}

// ============================================
// 에러 리포팅 설정 (개발/운영 환경 구분)
// ============================================
// 개발 환경
if (getenv('ENVIRONMENT') === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}
// 운영 환경
else {
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../../logs/php_errors.log');
}

// ============================================
// 타임존 설정
// ============================================
date_default_timezone_set('Asia/Seoul');

/**
 * 사용 예시:
 *
 * require_once __DIR__ . '/../config/database.php';
 *
 * $conn = getDBConnection();
 * $result = $conn->query("SELECT * FROM admin_users");
 *
 * // 사용 후 연결은 자동으로 스크립트 종료 시 닫힘
 * // 필요시 명시적으로 closeDBConnection() 호출 가능
 */
