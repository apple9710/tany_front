<?php
/**
 * 설치사례 API
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

try {
    $conn = getDBConnection();

    // GET - 목록 또는 단일 조회
    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;

        if ($id) {
            // 단일 조회
            $stmt = $conn->prepare("SELECT * FROM `references` WHERE id = ?");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $item = $result->fetch_assoc();

            if ($item) {
                echo json_encode(['success' => true, 'data' => $item]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => '항목을 찾을 수 없습니다']);
            }
        } else {
            // 목록 조회
            $type = $_GET['type'] ?? null;
            $page = intval($_GET['page'] ?? 1);
            $limit = intval($_GET['limit'] ?? 10);
            $offset = ($page - 1) * $limit;

            $where = "1=1";
            $params = [];
            $types = '';

            if ($type) {
                $where .= " AND type = ?";
                $params[] = $type;
                $types .= 's';
            }

            // 전체 개수
            $countSql = "SELECT COUNT(*) as total FROM `references` WHERE $where";
            if ($params) {
                $stmt = $conn->prepare($countSql);
                $stmt->bind_param($types, ...$params);
                $stmt->execute();
                $total = $stmt->get_result()->fetch_assoc()['total'];
            } else {
                $total = $conn->query($countSql)->fetch_assoc()['total'];
            }

            // 목록 조회
            $sql = "SELECT * FROM `references` WHERE $where ORDER BY display_order ASC, id DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;
            $types .= 'ii';

            $stmt = $conn->prepare($sql);
            if ($types) {
                $stmt->bind_param($types, ...$params);
            }
            $stmt->execute();
            $result = $stmt->get_result();

            $items = [];
            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => [
                    'items' => $items,
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit
                ]
            ]);
        }
    }

    // POST - 등록
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $type = $input['type'] ?? '';
        $title = $input['title'] ?? '';
        $location = $input['location'] ?? null;
        $description = $input['description'] ?? null;
        $image = $input['image'] ?? '';
        $display_order = intval($input['display_order'] ?? 0);

        if (empty($type) || empty($title) || empty($image)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => '필수 항목을 입력해주세요']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO `references` (type, title, location, description, image, display_order) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('sssssi', $type, $title, $location, $description, $image, $display_order);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => '등록되었습니다', 'id' => $conn->insert_id]);
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

        $type = $input['type'] ?? '';
        $title = $input['title'] ?? '';
        $location = $input['location'] ?? null;
        $description = $input['description'] ?? null;
        $image = $input['image'] ?? '';
        $display_order = intval($input['display_order'] ?? 0);

        $stmt = $conn->prepare("UPDATE `references` SET type = ?, title = ?, location = ?, description = ?, image = ?, display_order = ? WHERE id = ?");
        $stmt->bind_param('sssssii', $type, $title, $location, $description, $image, $display_order, $id);

        if ($stmt->execute()) {
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

        $stmt = $conn->prepare("DELETE FROM `references` WHERE id = ?");
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
