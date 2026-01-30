<?php
/**
 * DB 연결 테스트 페이지
 * 사용 후 삭제할 것
 */

header('Content-Type: text/html; charset=utf-8');

require_once __DIR__ . '/config/database.php';

?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>DB 연결 테스트</title>
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .success { color: green; }
        .error { color: red; }
        .warning { color: orange; }
        .box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; background: #f9f9f9; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f0f0f0; }
        h2 { border-bottom: 2px solid #333; padding-bottom: 5px; }
        pre { background: #f0f0f0; padding: 10px; overflow-x: auto; }
    </style>
</head>
<body>

<h1>🔧 DB 연결 테스트</h1>

<h2>1. 현재 설정</h2>
<div class="box">
    <pre>
DB_HOST: <?= DB_HOST ?>

DB_USER: <?= DB_USER ?>

DB_PASS: <?= DB_PASS ? '********' : '(없음)' ?>

DB_NAME: <?= DB_NAME ?>
</pre>
</div>

<h2>2. MySQL 서버 연결 테스트</h2>
<?php
// 먼저 DB 없이 MySQL 서버에만 연결 시도
$serverConn = @new mysqli(DB_HOST, DB_USER, DB_PASS);

if ($serverConn->connect_error) {
    echo "<div class='box'>";
    echo "<p class='error'>❌ MySQL 서버 연결 실패: " . $serverConn->connect_error . "</p>";
    echo "<h3>확인사항:</h3>";
    echo "<ol>";
    echo "<li>MySQL/MariaDB가 실행 중인가요?</li>";
    echo "<li>호스트(DB_HOST)가 올바른가요?</li>";
    echo "<li>사용자명(DB_USER)이 올바른가요?</li>";
    echo "<li>비밀번호(DB_PASS)가 올바른가요?</li>";
    echo "</ol>";
    echo "</div>";
    exit;
}

echo "<div class='box'>";
echo "<p class='success'>✅ MySQL 서버 연결 성공!</p>";
echo "<p>MySQL 버전: " . $serverConn->server_info . "</p>";
echo "</div>";
?>

<h2>3. 데이터베이스 목록</h2>
<?php
$result = $serverConn->query("SHOW DATABASES");
$databases = [];
$targetDbExists = false;

echo "<div class='box'>";
if ($result && $result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>#</th><th>데이터베이스 이름</th><th>상태</th></tr>";
    $i = 1;
    while ($row = $result->fetch_array()) {
        $dbName = $row[0];
        $databases[] = $dbName;
        $isTarget = ($dbName === DB_NAME);
        if ($isTarget) $targetDbExists = true;

        $status = $isTarget ? "<span class='success'>← 현재 설정된 DB</span>" : "";
        echo "<tr><td>{$i}</td><td>{$dbName}</td><td>{$status}</td></tr>";
        $i++;
    }
    echo "</table>";
} else {
    echo "<p class='warning'>데이터베이스 목록을 가져올 수 없습니다.</p>";
}
echo "</div>";

// 설정된 DB 존재 여부 확인
if (!$targetDbExists) {
    echo "<div class='box'>";
    echo "<p class='error'>❌ 데이터베이스 '{DB_NAME}'이(가) 존재하지 않습니다!</p>";
    echo "<h3>해결방법:</h3>";
    echo "<pre>CREATE DATABASE `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;</pre>";
    echo "</div>";
    exit;
}

echo "<div class='box'><p class='success'>✅ 데이터베이스 '" . DB_NAME . "' 존재 확인!</p></div>";
?>

<h2>4. 데이터베이스 연결 테스트</h2>
<?php
try {
    $conn = getDBConnection();
    echo "<div class='box'>";
    echo "<p class='success'>✅ 데이터베이스 '" . DB_NAME . "' 연결 성공!</p>";
    echo "</div>";
} catch (Exception $e) {
    echo "<div class='box'>";
    echo "<p class='error'>❌ 데이터베이스 연결 실패: " . $e->getMessage() . "</p>";
    echo "</div>";
    exit;
}
?>

<h2>5. 테이블 목록</h2>
<?php
$result = $conn->query("SHOW TABLES");
echo "<div class='box'>";
if ($result && $result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>#</th><th>테이블 이름</th><th>행 수</th></tr>";
    $i = 1;
    while ($row = $result->fetch_array()) {
        $tableName = $row[0];
        $countResult = $conn->query("SELECT COUNT(*) as cnt FROM `{$tableName}`");
        $count = $countResult ? $countResult->fetch_assoc()['cnt'] : '?';
        echo "<tr><td>{$i}</td><td>{$tableName}</td><td>{$count}</td></tr>";
        $i++;
    }
    echo "</table>";
} else {
    echo "<p class='warning'>⚠️ 테이블이 없습니다. sql/schema.sql을 실행하세요.</p>";
    echo "<pre>mysql -u " . DB_USER . " -p " . DB_NAME . " < sql/schema.sql</pre>";
}
echo "</div>";
?>

<h2>6. admin_users 테이블 확인</h2>
<?php
$result = $conn->query("SELECT id, username, created_at FROM admin_users");
echo "<div class='box'>";
if ($result && $result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>ID</th><th>Username</th><th>Created</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>{$row['id']}</td><td>{$row['username']}</td><td>{$row['created_at']}</td></tr>";
    }
    echo "</table>";
} else {
    echo "<p class='warning'>⚠️ admin_users 테이블이 없거나 비어있습니다.</p>";
}
echo "</div>";
?>

<hr>
<p><small>⚠️ 이 파일은 테스트 후 삭제하세요: api/db-test.php</small></p>

</body>
</html>
