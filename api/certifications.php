<?php
/**
 * 기술인증 API
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
            $stmt = $conn->prepare("SELECT * FROM `certifications` WHERE id = ?");
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
            // 목록 조회 (전체)
            $sql = "SELECT * FROM `certifications` ORDER BY display_order ASC, id DESC";
            $result = $conn->query($sql);

            $items = [];
            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => [
                    'items' => $items
                ]
            ]);
        }
    }

    // POST - 등록
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $title = $input['title'] ?? '';
        $image = $input['image'] ?? '';
        $display_order = intval($input['display_order'] ?? 0);

        if (empty($title) || empty($image)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => '필수 항목을 입력해주세요']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO `certifications` (title, image, display_order) VALUES (?, ?, ?)");
        $stmt->bind_param('ssi', $title, $image, $display_order);

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

        $title = $input['title'] ?? '';
        $image = $input['image'] ?? '';
        $display_order = intval($input['display_order'] ?? 0);

        $stmt = $conn->prepare("UPDATE `certifications` SET title = ?, image = ?, display_order = ? WHERE id = ?");
        $stmt->bind_param('ssii', $title, $image, $display_order, $id);

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

        $stmt = $conn->prepare("DELETE FROM `certifications` WHERE id = ?");
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
