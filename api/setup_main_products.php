<?php
/**
 * 메인 프로덕트 마이그레이션 스크립트
 *
 * 실행 방법:
 *   https://yourdomain.com/api/setup_main_products.php?key=tany-main-products-2026
 *
 * 동작:
 *   1) home_main_products 테이블 생성 (없을 때만)
 *   2) home_main_product_images 테이블 생성 (없을 때만)
 *   3) 시드 데이터 INSERT (테이블이 비어있을 때만 — 멱등)
 *
 * ⚠️  실행 후 이 파일은 반드시 서버에서 삭제해주세요.
 */

// ============================================
// 시크릿 키 확인
// ============================================
$SECRET_KEY = 'tany-main-products-2026';

if (!isset($_GET['key']) || $_GET['key'] !== $SECRET_KEY) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo "접근 거부: 올바른 key 파라미터가 필요합니다.\n";
    exit;
}

require_once __DIR__ . '/config/database.php';

header('Content-Type: text/html; charset=utf-8');

$log = [];
$success = true;

function logMsg(&$log, $level, $msg) {
    $log[] = ['level' => $level, 'msg' => $msg];
}

try {
    $conn = getDBConnection();
    $conn->set_charset('utf8mb4');
    logMsg($log, 'info', 'DB 연결 성공');

    // ============================================
    // 1. home_main_products 테이블 생성
    // ============================================
    $checkTable = $conn->query("SHOW TABLES LIKE 'home_main_products'");
    $productsTableExists = $checkTable && $checkTable->num_rows > 0;

    if ($productsTableExists) {
        logMsg($log, 'skip', "테이블 'home_main_products' 이미 존재 — SKIP");
    } else {
        $sql = "CREATE TABLE IF NOT EXISTS `home_main_products` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `tab_label` VARCHAR(50) NOT NULL,
            `title` VARCHAR(200) NOT NULL,
            `description` TEXT NOT NULL,
            `link_path` VARCHAR(255) DEFAULT NULL,
            `display_order` INT DEFAULT 0,
            `is_active` TINYINT(1) DEFAULT 1,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_display_order` (`display_order`),
            INDEX `idx_is_active` (`is_active`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        if ($conn->query($sql)) {
            logMsg($log, 'ok', "테이블 'home_main_products' 생성 완료");
        } else {
            throw new Exception("테이블 'home_main_products' 생성 실패: " . $conn->error);
        }
    }

    // ============================================
    // 2. home_main_product_images 테이블 생성
    // ============================================
    $checkTable = $conn->query("SHOW TABLES LIKE 'home_main_product_images'");
    $imagesTableExists = $checkTable && $checkTable->num_rows > 0;

    if ($imagesTableExists) {
        logMsg($log, 'skip', "테이블 'home_main_product_images' 이미 존재 — SKIP");
    } else {
        $sql = "CREATE TABLE IF NOT EXISTS `home_main_product_images` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `product_id` INT NOT NULL,
            `image` VARCHAR(255) NOT NULL,
            `display_order` INT DEFAULT 0,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX `idx_product_id` (`product_id`),
            INDEX `idx_display_order` (`display_order`),
            CONSTRAINT `fk_main_product_images` FOREIGN KEY (`product_id`)
              REFERENCES `home_main_products` (`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        if ($conn->query($sql)) {
            logMsg($log, 'ok', "테이블 'home_main_product_images' 생성 완료");
        } else {
            throw new Exception("테이블 'home_main_product_images' 생성 실패: " . $conn->error);
        }
    }

    // ============================================
    // 3. 시드 데이터 — home_main_products
    // ============================================
    $countResult = $conn->query("SELECT COUNT(*) AS cnt FROM `home_main_products`");
    $existingCount = $countResult->fetch_assoc()['cnt'];

    if ($existingCount > 0) {
        logMsg($log, 'skip', "home_main_products에 이미 {$existingCount}건 존재 — 시드 SKIP");
    } else {
        $products = [
            [1, '실내형', '실내용 LED 안내전광판', "실내용 LED 안내전광판은 베젤이 없는\n슬림한 디자인으로 세미나, 연회장, 대강당 등의\n실내 장소에서 형태별 맞춤형 전문 시공을 통해\n세련된 공간을 연출하며, 밝고 생동감 넘치는\n화면으로 몰입감을 더하여 효과적인 광고,\n홍보 콘텐츠 전달이 가능합니다.", '/products/indoor-led', 1, 1],
            [2, '실외형', '실외용 LED 전광판', "실외용 LED 전광판은 외부 환경에 강한 내구성과\n고휘도 디스플레이로 광고탑, 옥외 간판,\n빌딩 외벽 등 다양한 실외 환경에서\n선명한 영상 전달이 가능하며, 방수·방진 설계로\n사계절 내내 안정적인 운영을 제공합니다.", null, 2, 1],
            [3, '현수막형', 'LED 현수막', "기존 현수막을 대체하는 LED 현수막은\n학교, 관공서, 기업 외벽 등에 설치되어\n다양한 정보와 콘텐츠를 자유롭게 송출할 수 있으며,\n고밝기 디스플레이로 주야간 시인성이 뛰어나\n효과적인 안내 매체로 활용됩니다.", '/products/banner-led', 3, 1],
            [4, '스텐드형', '스탠드 LED 전광판', "자립형 구조로 어디서나 손쉽게 설치할 수 있는\n스탠드 LED 전광판은 매장 입구, 안내 데스크,\n행사장 등에 최적화된 형태로\n이동성과 활용도가 높은 디스플레이 솔루션입니다.", '/products/stand-led', 4, 1],
            [5, '플렉시블', '플렉시블 LED', "곡면, 원기둥, 비정형 공간에 자유롭게\n설치 가능한 플렉시블 LED는 디자인 자유도가 높아\n매장 인테리어, 전시 공간, 무대 연출 등\n창의적인 공간 연출에 활용됩니다.", null, 5, 1],
            [6, '시계형', '시계형 LED 전광판', "정확한 시간 표시와 함께 다양한 정보를\n송출할 수 있는 시계형 LED 전광판은\n학교, 관공서, 야외 광장 등에 설치되어\n시간·온도·안내 메시지를 한눈에 확인할 수 있습니다.", null, 6, 1]
        ];

        $stmt = $conn->prepare("INSERT INTO `home_main_products` (id, tab_label, title, description, link_path, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $insertedProducts = 0;
        foreach ($products as $p) {
            $stmt->bind_param('isssssi', $p[0], $p[1], $p[2], $p[3], $p[4], $p[5], $p[6]);
            if ($stmt->execute()) {
                $insertedProducts++;
            } else {
                logMsg($log, 'error', "탭 #{$p[0]} INSERT 실패: " . $conn->error);
            }
        }
        logMsg($log, 'ok', "home_main_products 시드 {$insertedProducts}건 INSERT 완료");
    }

    // ============================================
    // 4. 시드 데이터 — home_main_product_images
    // ============================================
    $countResult = $conn->query("SELECT COUNT(*) AS cnt FROM `home_main_product_images`");
    $existingImageCount = $countResult->fetch_assoc()['cnt'];

    if ($existingImageCount > 0) {
        logMsg($log, 'skip', "home_main_product_images에 이미 {$existingImageCount}건 존재 — 시드 SKIP");
    } else {
        $images = [
            // 실내형 (id=1)
            [1, '/uploads/main_products/indoor_main.jpg', 1],
            [1, '/uploads/main_products/indoor_01.jpg', 2],
            [1, '/uploads/main_products/indoor_02.jpg', 3],
            [1, '/uploads/main_products/indoor_03.jpg', 4],
            [1, '/uploads/main_products/indoor_04.jpg', 5],
            [1, '/uploads/main_products/indoor_05.jpg', 6],
            [1, '/uploads/main_products/indoor_06.jpg', 7],
            [1, '/uploads/main_products/indoor_07.jpg', 8],

            // 실외형 (id=2)
            [2, '/uploads/main_products/outdoor_main.jpg', 1],
            [2, '/uploads/main_products/outdoor_01.jpg', 2],
            [2, '/uploads/main_products/outdoor_02.jpg', 3],
            [2, '/uploads/main_products/outdoor_03.jpg', 4],
            [2, '/uploads/main_products/outdoor_04.jpg', 5],
            [2, '/uploads/main_products/outdoor_05.jpeg', 6],
            [2, '/uploads/main_products/outdoor_06.jpg', 7],
            [2, '/uploads/main_products/outdoor_07.jpg', 8],
            [2, '/uploads/main_products/outdoor_08.jpg', 9],

            // 현수막형 (id=3)
            [3, '/uploads/main_products/banner_main.jpg', 1],
            [3, '/uploads/main_products/banner_01.jpg', 2],
            [3, '/uploads/main_products/banner_02.jpg', 3],
            [3, '/uploads/main_products/banner_03.jpg', 4],
            [3, '/uploads/main_products/banner_04.jpg', 5],
            [3, '/uploads/main_products/banner_05.jpg', 6],
            [3, '/uploads/main_products/banner_06.jpg', 7],
            [3, '/uploads/main_products/banner_07.jpg', 8],
            [3, '/uploads/main_products/banner_08.jpg', 9],

            // 스텐드형 (id=4)는 이미지 없음 (어드민에서 추후 업로드)

            // 플렉시블 (id=5)
            [5, '/uploads/main_products/flexible_main.jpg', 1],
            [5, '/uploads/main_products/flexible_01.jpg', 2],
            [5, '/uploads/main_products/flexible_02.jpg', 3],

            // 시계형 (id=6)
            [6, '/uploads/main_products/clock_main.jpg', 1],
            [6, '/uploads/main_products/clock_01.jpg', 2],
            [6, '/uploads/main_products/clock_02.jpg', 3]
        ];

        $stmt = $conn->prepare("INSERT INTO `home_main_product_images` (product_id, image, display_order) VALUES (?, ?, ?)");
        $insertedImages = 0;
        foreach ($images as $img) {
            $stmt->bind_param('isi', $img[0], $img[1], $img[2]);
            if ($stmt->execute()) {
                $insertedImages++;
            } else {
                logMsg($log, 'error', "이미지 INSERT 실패 (product_id={$img[0]}): " . $conn->error);
            }
        }
        logMsg($log, 'ok', "home_main_product_images 시드 {$insertedImages}건 INSERT 완료");
    }

    // ============================================
    // 5. 최종 검증
    // ============================================
    $verify = $conn->query("SELECT
        (SELECT COUNT(*) FROM `home_main_products`) AS products_count,
        (SELECT COUNT(*) FROM `home_main_product_images`) AS images_count");
    $row = $verify->fetch_assoc();
    logMsg($log, 'info', "최종 상태 — 탭: {$row['products_count']}건, 슬라이드 이미지: {$row['images_count']}건");

} catch (Exception $e) {
    $success = false;
    logMsg($log, 'error', '오류 발생: ' . $e->getMessage());
}

// ============================================
// 결과 출력 (HTML)
// ============================================
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>Tany — Main Products Setup</title>
<style>
  body { font-family: -apple-system, "Malgun Gothic", sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; }
  h1 { border-bottom: 2px solid #F26966; padding-bottom: 10px; }
  .status { padding: 12px 20px; border-radius: 6px; margin: 20px 0; font-weight: bold; }
  .status.success { background: #d4edda; color: #155724; }
  .status.fail { background: #f8d7da; color: #721c24; }
  .log { background: #f8f9fa; padding: 16px; border-radius: 6px; font-family: Consolas, monospace; font-size: 14px; }
  .log .row { padding: 4px 0; }
  .log .ok { color: #28a745; }
  .log .skip { color: #6c757d; }
  .log .info { color: #17a2b8; }
  .log .error { color: #dc3545; font-weight: bold; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: bold; min-width: 50px; text-align: center; margin-right: 10px; }
  .badge.ok { background: #28a745; color: white; }
  .badge.skip { background: #6c757d; color: white; }
  .badge.info { background: #17a2b8; color: white; }
  .badge.error { background: #dc3545; color: white; }
  .warning { background: #fff3cd; color: #856404; padding: 16px; border-radius: 6px; margin-top: 30px; border-left: 4px solid #ffc107; }
  code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
</style>
</head>
<body>
  <h1>🛠 Tany 메인 프로덕트 마이그레이션</h1>

  <div class="status <?= $success ? 'success' : 'fail' ?>">
    <?= $success ? '✓ 정상 완료' : '✗ 실패 — 아래 로그를 확인하세요' ?>
  </div>

  <h2>실행 로그</h2>
  <div class="log">
    <?php foreach ($log as $entry): ?>
      <div class="row">
        <span class="badge <?= htmlspecialchars($entry['level']) ?>"><?= strtoupper(htmlspecialchars($entry['level'])) ?></span>
        <span class="<?= htmlspecialchars($entry['level']) ?>"><?= htmlspecialchars($entry['msg']) ?></span>
      </div>
    <?php endforeach; ?>
  </div>

  <div class="warning">
    <strong>⚠️ 보안 안내</strong><br>
    이 스크립트는 마이그레이션 전용입니다. 작업이 완료되었다면 <strong>지금 바로</strong> 서버에서 이 파일(<code>api/setup_main_products.php</code>)을 삭제해주세요.
  </div>

  <h2>다음 확인</h2>
  <ol>
    <li><code>uploads/main_products/</code> 폴더에 32장 이미지가 올라와 있는지 확인</li>
    <li><code>/admin/main/products</code> 어드민 페이지 접속해서 6개 탭이 보이는지 확인</li>
    <li>메인 페이지(<code>/</code>)에서 PRODUCT 섹션 정상 동작 확인</li>
  </ol>
</body>
</html>
