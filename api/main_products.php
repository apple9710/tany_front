<?php
/**
 * 메인 프로덕트 섹션 API
 *
 * - GET    /api/main_products.php           : 목록(이미지 포함)
 * - GET    /api/main_products.php?id=1      : 단일(이미지 포함)
 * - POST   /api/main_products.php           : 등록 (이미지 배열 함께)
 * - PUT    /api/main_products.php?id=1      : 수정 (이미지 배열 전체 교체)
 * - DELETE /api/main_products.php?id=1      : 삭제 (이미지는 FK CASCADE)
 */

session_start();

require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// 인증 체크 (POST, PUT, DELETE만)
if (in_array($method, ['POST', 'PUT', 'DELETE'])) {
    if (!isset($_SESSION['admin_user'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '인증이 필요합니다']);
        exit;
    }
}

/**
 * 단일 product의 이미지 배열 조회
 */
function fetchImages($conn, $productId) {
    $stmt = $conn->prepare("SELECT id, image, display_order FROM `home_main_product_images` WHERE product_id = ? ORDER BY display_order ASC, id ASC");
    $stmt->bind_param('i', $productId);
    $stmt->execute();
    $result = $stmt->get_result();
    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
    return $images;
}

/**
 * product의 이미지 배열을 통째로 교체
 */
function replaceImages($conn, $productId, $images) {
    $stmt = $conn->prepare("DELETE FROM `home_main_product_images` WHERE product_id = ?");
    $stmt->bind_param('i', $productId);
    $stmt->execute();

    if (!is_array($images) || empty($images)) {
        return;
    }

    $insert = $conn->prepare("INSERT INTO `home_main_product_images` (product_id, image, display_order) VALUES (?, ?, ?)");
    foreach ($images as $idx => $img) {
        $path = is_array($img) ? ($img['image'] ?? '') : $img;
        $order = is_array($img) ? intval($img['display_order'] ?? ($idx + 1)) : ($idx + 1);
        if ($path === '') continue;
        $insert->bind_param('isi', $productId, $path, $order);
        $insert->execute();
    }
}

try {
    $conn = getDBConnection();

    // GET - 목록 또는 단일 조회
    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;

        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM `home_main_products` WHERE id = ?");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $item = $stmt->get_result()->fetch_assoc();

            if ($item) {
                $item['images'] = fetchImages($conn, $item['id']);
                echo json_encode(['success' => true, 'data' => $item]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => '항목을 찾을 수 없습니다']);
            }
        } else {
            $onlyActive = isset($_GET['active']) && $_GET['active'] === '1';
            $where = $onlyActive ? "WHERE is_active = 1" : "";
            $sql = "SELECT * FROM `home_main_products` $where ORDER BY display_order ASC, id ASC";
            $result = $conn->query($sql);

            $items = [];
            while ($row = $result->fetch_assoc()) {
                $row['images'] = fetchImages($conn, $row['id']);
                $items[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => ['items' => $items, 'total' => count($items)]
            ]);
        }
    }

    // POST - 등록
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $tab_label = trim($input['tab_label'] ?? '');
        $title = trim($input['title'] ?? '');
        $description = $input['description'] ?? '';
        $link_path = isset($input['link_path']) && $input['link_path'] !== '' ? $input['link_path'] : null;
        $display_order = intval($input['display_order'] ?? 0);
        $is_active = isset($input['is_active']) ? intval($input['is_active']) : 1;
        $images = $input['images'] ?? [];

        if ($tab_label === '' || $title === '' || $description === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => '탭 라벨, 타이틀, 설명은 필수입니다']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO `home_main_products` (tab_label, title, description, link_path, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssii', $tab_label, $title, $description, $link_path, $display_order, $is_active);

        if ($stmt->execute()) {
            $newId = $conn->insert_id;
            replaceImages($conn, $newId, $images);
            echo json_encode(['success' => true, 'message' => '등록되었습니다', 'id' => $newId]);
        } else {
            throw new Exception($conn->error);
        }
    }

    // PUT - 수정
    elseif ($method === 'PUT') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID가 필요합니다']);
            exit;
        }

        $input = json_decode(file_get_contents('php://input'), true);

        $tab_label = trim($input['tab_label'] ?? '');
        $title = trim($input['title'] ?? '');
        $description = $input['description'] ?? '';
        $link_path = isset($input['link_path']) && $input['link_path'] !== '' ? $input['link_path'] : null;
        $display_order = intval($input['display_order'] ?? 0);
        $is_active = isset($input['is_active']) ? intval($input['is_active']) : 1;
        $images = $input['images'] ?? null;

        if ($tab_label === '' || $title === '' || $description === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => '탭 라벨, 타이틀, 설명은 필수입니다']);
            exit;
        }

        $stmt = $conn->prepare("UPDATE `home_main_products` SET tab_label = ?, title = ?, description = ?, link_path = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->bind_param('ssssiii', $tab_label, $title, $description, $link_path, $display_order, $is_active, $id);

        if ($stmt->execute()) {
            // images가 명시적으로 전달된 경우에만 교체 (생략 시 기존 유지)
            if ($images !== null) {
                replaceImages($conn, $id, $images);
            }
            echo json_encode(['success' => true, 'message' => '수정되었습니다']);
        } else {
            throw new Exception($conn->error);
        }
    }

    // DELETE - 삭제
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID가 필요합니다']);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM `home_main_products` WHERE id = ?");
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => '삭제되었습니다']);
        } else {
            throw new Exception($conn->error);
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다']);
}
