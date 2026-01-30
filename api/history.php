<?php
/**
 * 연혁 API
 * GET: 목록 조회 (연도별 그룹핑)
 * POST: 등록 (관리자)
 * PUT: 수정 (관리자)
 * DELETE: 삭제 (관리자)
 */

session_start();

require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

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

    // GET - 목록 조회 (연도별 그룹핑)
    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;
        $grouped = $_GET['grouped'] ?? 'true'; // 기본값: 연도별 그룹핑

        if ($id) {
            // 단일 조회
            $stmt = $conn->prepare("SELECT * FROM `history` WHERE id = ?");
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
            $sql = "SELECT * FROM `history` ORDER BY `year` DESC, `display_order` ASC, `month` DESC";
            $result = $conn->query($sql);

            $items = [];
            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }

            // 연도별 그룹핑
            if ($grouped === 'true') {
                $groupedData = [];
                foreach ($items as $item) {
                    $year = $item['year'];
                    if (!isset($groupedData[$year])) {
                        $groupedData[$year] = [
                            'year' => $year,
                            'image' => null,
                            'events' => []
                        ];
                    }

                    // 해당 연도의 첫 번째 이미지를 대표 이미지로 설정
                    if ($item['image'] && !$groupedData[$year]['image']) {
                        $groupedData[$year]['image'] = $item['image'];
                    }

                    $groupedData[$year]['events'][] = [
                        'id' => $item['id'],
                        'month' => $item['month'],
                        'description' => $item['description'],
                        'image' => $item['image'],
                        'display_order' => $item['display_order']
                    ];
                }

                echo json_encode([
                    'success' => true,
                    'data' => array_values($groupedData)
                ]);
            } else {
                // 그룹핑 없이 전체 목록
                echo json_encode([
                    'success' => true,
                    'data' => $items
                ]);
            }
        }
    }

    // POST - 등록
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $year = trim($input['year'] ?? '');
        $month = trim($input['month'] ?? '');
        $description = trim($input['description'] ?? '');
        $image = $input['image'] ?? null;
        $display_order = intval($input['display_order'] ?? 0);

        if (empty($year) || empty($month) || empty($description)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => '연도, 월, 내용은 필수입니다']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO `history` (year, month, description, image, display_order) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssi', $year, $month, $description, $image, $display_order);

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

        $year = trim($input['year'] ?? '');
        $month = trim($input['month'] ?? '');
        $description = trim($input['description'] ?? '');
        $image = $input['image'] ?? null;
        $display_order = intval($input['display_order'] ?? 0);

        if (empty($year) || empty($month) || empty($description)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => '연도, 월, 내용은 필수입니다']);
            exit;
        }

        $stmt = $conn->prepare("UPDATE `history` SET year = ?, month = ?, description = ?, image = ?, display_order = ? WHERE id = ?");
        $stmt->bind_param('ssssii', $year, $month, $description, $image, $display_order, $id);

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

        $stmt = $conn->prepare("DELETE FROM `history` WHERE id = ?");
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => '삭제되었습니다']);
        } else {
            throw new Exception($conn->error);
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다: ' . $e->getMessage()]);
}
