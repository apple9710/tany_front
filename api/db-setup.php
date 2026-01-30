<?php
/**
 * DB 점검 및 초기화 페이지
 * 테이블/컬럼 확인 후 없으면 생성
 * 사용 후 삭제할 것
 */

header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/config/database.php';

?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>DB 점검 및 초기화</title>
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; padding: 20px; max-width: 900px; margin: 0 auto; }
        .success { color: green; }
        .error { color: red; }
        .warning { color: orange; }
        .info { color: blue; }
        .box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; background: #f9f9f9; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f0f0f0; }
        h2 { border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 30px; }
        pre { background: #f0f0f0; padding: 10px; overflow-x: auto; font-size: 12px; }
        .btn { padding: 10px 20px; margin: 5px; cursor: pointer; border: none; border-radius: 5px; font-size: 14px; }
        .btn-primary { background: #007bff; color: white; }
        .btn-success { background: #28a745; color: white; }
        .btn-danger { background: #dc3545; color: white; }
        .btn:hover { opacity: 0.8; }
    </style>
</head>
<body>

<h1>🔧 DB 점검 및 초기화</h1>

<?php
// 액션 처리
$action = $_GET['action'] ?? '';
$conn = null;

try {
    $conn = getDBConnection();
} catch (Exception $e) {
    echo "<div class='box'><p class='error'>❌ DB 연결 실패: {$e->getMessage()}</p></div>";
    exit;
}

// 필요한 테이블 정의
$requiredTables = [
    'admin_users' => [
        'sql' => "CREATE TABLE IF NOT EXISTS `admin_users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(50) UNIQUE NOT NULL COMMENT '관리자 ID',
            `password` VARCHAR(255) NOT NULL COMMENT '비밀번호 (bcrypt 해시)',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='관리자 계정'",
        'columns' => ['id', 'username', 'password', 'created_at', 'updated_at']
    ],
    'inquiries' => [
        'sql' => "CREATE TABLE IF NOT EXISTS `inquiries` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(100) NOT NULL COMMENT '성명',
            `company` VARCHAR(100) DEFAULT NULL COMMENT '회사명',
            `phone` VARCHAR(20) NOT NULL COMMENT '연락처',
            `email` VARCHAR(100) DEFAULT NULL COMMENT '이메일',
            `message` TEXT NOT NULL COMMENT '문의내용',
            `status` ENUM('pending', 'completed') DEFAULT 'pending' COMMENT '처리상태',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '문의일시',
            INDEX `idx_status` (`status`),
            INDEX `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='온라인 문의'",
        'columns' => ['id', 'name', 'company', 'phone', 'email', 'message', 'status', 'created_at']
    ],
    'references' => [
        'sql' => "CREATE TABLE IF NOT EXISTS `references` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `type` ENUM('led', 'stand') NOT NULL COMMENT '제품 타입',
            `title` VARCHAR(200) NOT NULL COMMENT '제목',
            `image` VARCHAR(255) NOT NULL COMMENT '이미지 경로',
            `location` VARCHAR(100) DEFAULT NULL COMMENT '설치 위치',
            `description` TEXT DEFAULT NULL COMMENT '상세 설명',
            `display_order` INT DEFAULT 0 COMMENT '정렬 순서',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
            INDEX `idx_type` (`type`),
            INDEX `idx_display_order` (`display_order`),
            INDEX `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='설치사례'",
        'columns' => ['id', 'type', 'title', 'image', 'location', 'description', 'display_order', 'created_at', 'updated_at']
    ],
    'resources' => [
        'sql' => "CREATE TABLE IF NOT EXISTS `resources` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(200) NOT NULL COMMENT '제목',
            `file_path` VARCHAR(255) NOT NULL COMMENT '파일 경로',
            `file_size` BIGINT DEFAULT 0 COMMENT '파일 크기 (bytes)',
            `downloads` INT DEFAULT 0 COMMENT '다운로드 횟수',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
            INDEX `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='자료실'",
        'columns' => ['id', 'title', 'file_path', 'file_size', 'downloads', 'created_at']
    ],
    'certifications' => [
        'sql' => "CREATE TABLE IF NOT EXISTS `certifications` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(200) NOT NULL COMMENT '인증서명',
            `image` VARCHAR(255) NOT NULL COMMENT '이미지 경로',
            `display_order` INT DEFAULT 0 COMMENT '정렬 순서',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
            INDEX `idx_display_order` (`display_order`),
            INDEX `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='기술인증'",
        'columns' => ['id', 'title', 'image', 'display_order', 'created_at', 'updated_at']
    ],
    'history' => [
        'sql' => "CREATE TABLE IF NOT EXISTS `history` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `year` VARCHAR(4) NOT NULL COMMENT '연도',
            `month` VARCHAR(2) NOT NULL COMMENT '월',
            `description` VARCHAR(255) NOT NULL COMMENT '내용',
            `image` VARCHAR(255) DEFAULT NULL COMMENT '이미지 경로 (선택)',
            `display_order` INT DEFAULT 0 COMMENT '정렬 순서',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
            INDEX `idx_year` (`year`),
            INDEX `idx_display_order` (`display_order`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='연혁'",
        'columns' => ['id', 'year', 'month', 'description', 'image', 'display_order', 'created_at', 'updated_at']
    ]
];

// 추가 컬럼 정의 (기존 테이블에 누락된 컬럼)
$additionalColumns = [
    'references' => [
        'display_order' => "ALTER TABLE `references` ADD COLUMN `display_order` INT DEFAULT 0 COMMENT '정렬 순서' AFTER `description`"
    ]
];

// 필요한 폴더 정의
$requiredDirs = [
    __DIR__ . '/uploads',
    __DIR__ . '/uploads/references',
    __DIR__ . '/uploads/resources',
    __DIR__ . '/uploads/certifications',
    __DIR__ . '/uploads/history'
];

// 액션 처리
if ($action === 'create_all') {
    echo "<h2>🚀 전체 생성 실행</h2><div class='box'>";

    // 테이블 생성
    foreach ($requiredTables as $tableName => $tableInfo) {
        if ($conn->query($tableInfo['sql'])) {
            echo "<p class='success'>✅ 테이블 '{$tableName}' 생성/확인 완료</p>";
        } else {
            echo "<p class='error'>❌ 테이블 '{$tableName}' 생성 실패: {$conn->error}</p>";
        }
    }

    // 누락 컬럼 추가
    foreach ($additionalColumns as $tableName => $columns) {
        foreach ($columns as $colName => $alterSql) {
            // 컬럼 존재 여부 확인
            $result = $conn->query("SHOW COLUMNS FROM `{$tableName}` LIKE '{$colName}'");
            if ($result && $result->num_rows === 0) {
                if ($conn->query($alterSql)) {
                    echo "<p class='success'>✅ 컬럼 '{$tableName}.{$colName}' 추가 완료</p>";
                } else {
                    echo "<p class='error'>❌ 컬럼 추가 실패: {$conn->error}</p>";
                }
            }
        }
    }

    // 폴더 생성
    foreach ($requiredDirs as $dir) {
        if (!is_dir($dir)) {
            if (mkdir($dir, 0755, true)) {
                echo "<p class='success'>✅ 폴더 생성: " . basename($dir) . "</p>";
            } else {
                echo "<p class='error'>❌ 폴더 생성 실패: " . basename($dir) . "</p>";
            }
        }
    }

    echo "</div>";
}

if ($action === 'create_admin') {
    echo "<h2>👤 관리자 계정 생성</h2><div class='box'>";

    // admin / admin123 계정 생성
    $username = 'admin';
    $password = password_hash('admin123', PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = ?");
    $stmt->bind_param('sss', $username, $password, $password);

    if ($stmt->execute()) {
        echo "<p class='success'>✅ 관리자 계정 생성/업데이트 완료</p>";
        echo "<p>ID: <strong>admin</strong></p>";
        echo "<p>PW: <strong>admin123</strong></p>";
    } else {
        echo "<p class='error'>❌ 관리자 계정 생성 실패: {$conn->error}</p>";
    }

    echo "</div>";
}

if ($action === 'insert_demo') {
    echo "<h2>📦 데모 데이터 삽입</h2><div class='box'>";

    // 설치사례 데모 데이터
    $demoReferences = [
        ['led', '(주)타니 1, 2층 실외 LED 전광판', '/uploads/references/demo_ref_1.png', '서울 강남구', 'LED 전광판 설치 사례', 1],
        ['led', 'A 기업 외벽 LED 전광판', '/uploads/references/demo_ref_2.png', '서울 서초구', '외벽형 LED 전광판', 2],
        ['led', 'B 상가 LED 전광판', '/uploads/references/demo_ref_3.png', '경기 성남시', '상가 LED 전광판', 3],
        ['stand', 'C 학교 스탠드형 전광판', '/uploads/references/demo_stand_1.png', '서울 송파구', '학교 스탠드형 전광판', 1],
        ['stand', 'D 병원 스탠드형 전광판', '/uploads/references/demo_stand_2.png', '인천 남동구', '병원 안내용 스탠드 전광판', 2]
    ];

    $stmt = $conn->prepare("INSERT INTO `references` (type, title, image, location, description, display_order) VALUES (?, ?, ?, ?, ?, ?)");
    $insertCount = 0;
    foreach ($demoReferences as $ref) {
        $stmt->bind_param('sssssi', $ref[0], $ref[1], $ref[2], $ref[3], $ref[4], $ref[5]);
        if ($stmt->execute()) $insertCount++;
    }
    echo "<p class='success'>✅ 설치사례 데모 데이터 {$insertCount}건 삽입</p>";

    // 기술인증 데모 데이터
    $demoCerts = [
        ['여성기업확인서', '/uploads/certifications/cert_1.png', 1],
        ['벤처기업확인서', '/uploads/certifications/cert_2.png', 2],
        ['ISO 9001 인증서', '/uploads/certifications/cert_3.png', 3],
        ['KC 인증서', '/uploads/certifications/cert_4.png', 4]
    ];

    $stmt = $conn->prepare("INSERT INTO `certifications` (title, image, display_order) VALUES (?, ?, ?)");
    $insertCount = 0;
    foreach ($demoCerts as $cert) {
        $stmt->bind_param('ssi', $cert[0], $cert[1], $cert[2]);
        if ($stmt->execute()) $insertCount++;
    }
    echo "<p class='success'>✅ 기술인증 데모 데이터 {$insertCount}건 삽입</p>";

    echo "</div>";
}
?>

<h2>1. 테이블 상태 점검</h2>
<div class="box">
    <table>
        <tr>
            <th>테이블</th>
            <th>상태</th>
            <th>행 수</th>
            <th>누락 컬럼</th>
        </tr>
        <?php
        $allTablesOk = true;
        $missingColumns = [];

        foreach ($requiredTables as $tableName => $tableInfo) {
            $result = $conn->query("SHOW TABLES LIKE '{$tableName}'");
            $exists = ($result && $result->num_rows > 0);

            if ($exists) {
                // 행 수 확인
                $countResult = $conn->query("SELECT COUNT(*) as cnt FROM `{$tableName}`");
                $rowCount = $countResult ? $countResult->fetch_assoc()['cnt'] : 0;

                // 컬럼 확인
                $colResult = $conn->query("SHOW COLUMNS FROM `{$tableName}`");
                $existingCols = [];
                while ($col = $colResult->fetch_assoc()) {
                    $existingCols[] = $col['Field'];
                }

                $missing = array_diff($tableInfo['columns'], $existingCols);
                $missingStr = empty($missing) ? '-' : "<span class='warning'>" . implode(', ', $missing) . "</span>";

                if (!empty($missing)) {
                    $missingColumns[$tableName] = $missing;
                    $allTablesOk = false;
                }

                echo "<tr>
                    <td>{$tableName}</td>
                    <td><span class='success'>✅ 존재</span></td>
                    <td>{$rowCount}</td>
                    <td>{$missingStr}</td>
                </tr>";
            } else {
                $allTablesOk = false;
                echo "<tr>
                    <td>{$tableName}</td>
                    <td><span class='error'>❌ 없음</span></td>
                    <td>-</td>
                    <td>-</td>
                </tr>";
            }
        }
        ?>
    </table>
</div>

<h2>2. 업로드 폴더 점검</h2>
<div class="box">
    <table>
        <tr>
            <th>폴더</th>
            <th>상태</th>
            <th>쓰기 권한</th>
        </tr>
        <?php
        $allDirsOk = true;
        foreach ($requiredDirs as $dir) {
            $dirName = str_replace(__DIR__, '', $dir);
            $exists = is_dir($dir);
            $writable = $exists && is_writable($dir);

            if (!$exists || !$writable) $allDirsOk = false;

            $statusIcon = $exists ? "<span class='success'>✅ 존재</span>" : "<span class='error'>❌ 없음</span>";
            $writeIcon = $writable ? "<span class='success'>✅</span>" : "<span class='error'>❌</span>";

            echo "<tr>
                <td>/api{$dirName}</td>
                <td>{$statusIcon}</td>
                <td>{$writeIcon}</td>
            </tr>";
        }
        ?>
    </table>
</div>

<h2>3. 실행 버튼</h2>
<div class="box">
    <?php if (!$allTablesOk || !$allDirsOk): ?>
        <p class="warning">⚠️ 누락된 테이블이나 폴더가 있습니다.</p>
        <a href="?action=create_all"><button class="btn btn-primary">🚀 전체 생성 (테이블 + 폴더)</button></a>
    <?php else: ?>
        <p class="success">✅ 모든 테이블과 폴더가 준비되었습니다.</p>
    <?php endif; ?>

    <br><br>

    <a href="?action=create_admin"><button class="btn btn-success">👤 관리자 계정 생성/리셋 (admin / admin123)</button></a>

    <a href="?action=insert_demo"><button class="btn btn-warning" style="background: orange;">📦 데모 데이터 삽입</button></a>
</div>

<h2>4. API 연결 정보</h2>
<div class="box">
    <table>
        <tr><th>항목</th><th>값</th></tr>
        <tr><td>API Base URL</td><td><code>http://tanycompany.com/api</code></td></tr>
        <tr><td>프론트엔드 .env</td><td><code>VITE_API_URL=http://tanycompany.com/api</code></td></tr>
    </table>

    <h3>API 엔드포인트</h3>
    <table>
        <tr><th>엔드포인트</th><th>설명</th></tr>
        <tr><td><code>/auth/login.php</code></td><td>로그인</td></tr>
        <tr><td><code>/auth/logout.php</code></td><td>로그아웃</td></tr>
        <tr><td><code>/auth/check.php</code></td><td>인증 상태 확인</td></tr>
        <tr><td><code>/history.php</code></td><td>연혁 CRUD</td></tr>
        <tr><td><code>/references.php</code></td><td>설치사례 CRUD</td></tr>
        <tr><td><code>/resources.php</code></td><td>자료실 CRUD</td></tr>
        <tr><td><code>/certifications.php</code></td><td>기술인증 CRUD</td></tr>
        <tr><td><code>/inquiries.php</code></td><td>문의 CRUD</td></tr>
        <tr><td><code>/upload.php</code></td><td>파일 업로드</td></tr>
    </table>
</div>

<hr>
<p><small>⚠️ 이 파일은 설정 완료 후 삭제하세요: api/db-setup.php</small></p>

</body>
</html>
