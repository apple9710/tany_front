<?php
/**
 * DB 연결 테스트 페이지
 * 사용 후 삭제할 것
 */

header('Content-Type: text/html; charset=utf-8');

echo "<h1>DB 연결 테스트</h1>";

// 현재 설정 표시
require_once __DIR__ . '/config/database.php';

echo "<h2>현재 설정</h2>";
echo "<pre>";
echo "DB_HOST: " . DB_HOST . "\n";
echo "DB_NAME: " . DB_NAME . "\n";
echo "DB_USER: " . DB_USER . "\n";
echo "DB_PASS: " . (DB_PASS ? '(설정됨)' : '(없음)') . "\n";
echo "</pre>";

// 연결 테스트
echo "<h2>연결 테스트</h2>";

try {
    $conn = getDBConnection();
    echo "<p style='color:green;'>✅ DB 연결 성공!</p>";

    // 테이블 목록 확인
    echo "<h3>테이블 목록</h3>";
    $result = $conn->query("SHOW TABLES");
    if ($result && $result->num_rows > 0) {
        echo "<ul>";
        while ($row = $result->fetch_array()) {
            echo "<li>" . $row[0] . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>테이블이 없습니다. schema.sql을 실행하세요.</p>";
    }

    // admin_users 테이블 확인
    echo "<h3>admin_users 테이블</h3>";
    $result = $conn->query("SELECT id, username, created_at FROM admin_users");
    if ($result && $result->num_rows > 0) {
        echo "<table border='1' cellpadding='5'>";
        echo "<tr><th>ID</th><th>Username</th><th>Created</th></tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr><td>{$row['id']}</td><td>{$row['username']}</td><td>{$row['created_at']}</td></tr>";
        }
        echo "</table>";
    } else {
        echo "<p>admin_users 테이블이 없거나 비어있습니다.</p>";
    }

} catch (Exception $e) {
    echo "<p style='color:red;'>❌ DB 연결 실패: " . $e->getMessage() . "</p>";

    echo "<h3>해결 방법</h3>";
    echo "<ol>";
    echo "<li>api/config/database.php 파일의 DB 설정을 확인하세요</li>";
    echo "<li>MySQL/MariaDB가 실행 중인지 확인하세요</li>";
    echo "<li>데이터베이스 'tany'가 생성되어 있는지 확인하세요</li>";
    echo "<li>sql/schema.sql을 실행하여 테이블을 생성하세요</li>";
    echo "</ol>";
}

echo "<hr>";
echo "<p><small>이 파일은 테스트 후 삭제하세요: api/db-test.php</small></p>";
