<?php
/**
 * 유틸리티 함수
 *
 * JSON 응답, 파일 업로드, 입력 검증 등
 */

// ============================================
// JSON 응답 전송
// ============================================
function sendJSON($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ============================================
// 성공 응답
// ============================================
function sendSuccess($message = '성공', $data = null, $statusCode = 200) {
    $response = [
        'success' => true,
        'message' => $message
    ];

    if ($data !== null) {
        $response['data'] = $data;
    }

    sendJSON($response, $statusCode);
}

// ============================================
// 에러 응답
// ============================================
function sendError($message = '오류가 발생했습니다', $statusCode = 400, $errors = null) {
    $response = [
        'success' => false,
        'message' => $message
    ];

    if ($errors !== null) {
        $response['errors'] = $errors;
    }

    sendJSON($response, $statusCode);
}

// ============================================
// POST 데이터 가져오기 (JSON)
// ============================================
function getJSONInput() {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return [];
    }

    return $data ?? [];
}

// ============================================
// GET 파라미터 가져오기 (안전하게)
// ============================================
function getParam($key, $default = null) {
    return isset($_GET[$key]) ? trim($_GET[$key]) : $default;
}

// ============================================
// POST 파라미터 가져오기 (안전하게)
// ============================================
function postParam($key, $default = null) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : $default;
}

// ============================================
// 필수 입력 체크
// ============================================
function validateRequired($data, $requiredFields) {
    $errors = [];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            $errors[$field] = "$field 은(는) 필수 입력 항목입니다.";
        }
    }

    return $errors;
}

// ============================================
// 이메일 형식 검증
// ============================================
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// ============================================
// 전화번호 형식 검증 (한국)
// ============================================
function isValidPhone($phone) {
    // 숫자만 추출
    $phone = preg_replace('/[^0-9]/', '', $phone);

    // 10-11자리 숫자
    return preg_match('/^(01[0-9]|02|0[3-9][0-9])[0-9]{3,4}[0-9]{4}$/', $phone);
}

// ============================================
// 파일 업로드 처리
// ============================================
function uploadFile($fileInputName, $uploadDir, $allowedTypes = [], $maxSize = 10485760) {
    // 파일이 업로드되었는지 확인
    if (!isset($_FILES[$fileInputName]) || $_FILES[$fileInputName]['error'] !== UPLOAD_ERR_OK) {
        return [
            'success' => false,
            'message' => '파일 업로드 오류가 발생했습니다.'
        ];
    }

    $file = $_FILES[$fileInputName];

    // 파일 크기 체크 (기본 10MB)
    if ($file['size'] > $maxSize) {
        $maxSizeMB = round($maxSize / 1048576, 2);
        return [
            'success' => false,
            'message' => "파일 크기는 최대 {$maxSizeMB}MB까지 가능합니다."
        ];
    }

    // 파일 확장자 체크
    $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!empty($allowedTypes) && !in_array($fileExt, $allowedTypes)) {
        return [
            'success' => false,
            'message' => '허용되지 않는 파일 형식입니다. (' . implode(', ', $allowedTypes) . ')'
        ];
    }

    // 업로드 디렉토리 생성
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // 고유한 파일명 생성
    $newFileName = uniqid() . '_' . time() . '.' . $fileExt;
    $uploadPath = $uploadDir . '/' . $newFileName;

    // 파일 이동
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        return [
            'success' => false,
            'message' => '파일 저장에 실패했습니다.'
        ];
    }

    return [
        'success' => true,
        'file_path' => $uploadPath,
        'file_name' => $newFileName,
        'file_size' => $file['size'],
        'original_name' => $file['name']
    ];
}

// ============================================
// 파일 삭제
// ============================================
function deleteFile($filePath) {
    if (file_exists($filePath) && is_file($filePath)) {
        return unlink($filePath);
    }
    return false;
}

// ============================================
// 페이지네이션 계산
// ============================================
function calculatePagination($page, $limit, $total) {
    $page = max(1, (int)$page);
    $limit = max(1, min(100, (int)$limit)); // 최대 100개
    $totalPages = ceil($total / $limit);
    $offset = ($page - 1) * $limit;

    return [
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'total_pages' => $totalPages,
        'offset' => $offset,
        'has_more' => $page < $totalPages
    ];
}

// ============================================
// 파일 크기 포맷 (bytes -> KB, MB)
// ============================================
function formatFileSize($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}

// ============================================
// XSS 방지 (HTML 이스케이프)
// ============================================
function escapeHtml($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

// ============================================
// 날짜 포맷 (한국 형식)
// ============================================
function formatDate($datetime, $format = 'Y. m. d') {
    if ($datetime instanceof DateTime) {
        return $datetime->format($format);
    }
    return date($format, strtotime($datetime));
}

/**
 * 사용 예시:
 *
 * // JSON 응답
 * sendSuccess('저장 완료', ['id' => 1]);
 * sendError('입력값이 올바르지 않습니다', 400);
 *
 * // POST 데이터
 * $data = getJSONInput();
 *
 * // 필수 입력 체크
 * $errors = validateRequired($data, ['name', 'phone', 'message']);
 * if (!empty($errors)) {
 *     sendError('필수 입력값을 확인해주세요', 400, $errors);
 * }
 *
 * // 파일 업로드
 * $result = uploadFile('image', '../uploads/references', ['jpg', 'png', 'gif'], 5242880);
 *
 * // 페이지네이션
 * $pagination = calculatePagination(1, 10, 120);
 */
