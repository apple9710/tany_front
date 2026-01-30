<?php
/**
 * 유틸리티 함수
 */

/**
 * 성공 응답 전송
 */
function sendSuccess($message, $data = []) {
    echo json_encode([
        'success' => true,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * 에러 응답 전송
 */
function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * GET/POST 파라미터 가져오기
 */
function getParam($key, $default = null) {
    // GET 파라미터
    if (isset($_GET[$key])) {
        return $_GET[$key];
    }

    // POST JSON body
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input[$key])) {
        return $input[$key];
    }

    // POST form data
    if (isset($_POST[$key])) {
        return $_POST[$key];
    }

    return $default;
}

/**
 * 파일 업로드 처리
 */
function uploadFile($fieldName, $uploadDir, $allowedTypes = [], $maxSize = 10485760) {
    // 업로드 디렉토리 생성
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            return ['success' => false, 'message' => '업로드 디렉토리 생성 실패'];
        }
    }

    // 파일 확인
    if (!isset($_FILES[$fieldName]) || $_FILES[$fieldName]['error'] !== UPLOAD_ERR_OK) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => '파일이 PHP 설정 크기를 초과했습니다',
            UPLOAD_ERR_FORM_SIZE => '파일이 폼 설정 크기를 초과했습니다',
            UPLOAD_ERR_PARTIAL => '파일이 부분적으로만 업로드되었습니다',
            UPLOAD_ERR_NO_FILE => '파일이 업로드되지 않았습니다',
            UPLOAD_ERR_NO_TMP_DIR => '임시 폴더가 없습니다',
            UPLOAD_ERR_CANT_WRITE => '디스크에 쓰기 실패',
            UPLOAD_ERR_EXTENSION => 'PHP 확장에 의해 업로드가 중지되었습니다'
        ];

        $error = $_FILES[$fieldName]['error'] ?? UPLOAD_ERR_NO_FILE;
        $message = $errorMessages[$error] ?? '알 수 없는 업로드 오류';

        return ['success' => false, 'message' => $message];
    }

    $file = $_FILES[$fieldName];

    // 파일 크기 확인
    if ($file['size'] > $maxSize) {
        $maxMB = $maxSize / 1048576;
        return ['success' => false, 'message' => "파일 크기는 {$maxMB}MB를 초과할 수 없습니다"];
    }

    // 확장자 확인
    $originalName = $file['name'];
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    if (!empty($allowedTypes) && !in_array($extension, $allowedTypes)) {
        $allowed = implode(', ', $allowedTypes);
        return ['success' => false, 'message' => "허용된 파일 형식: {$allowed}"];
    }

    // 고유한 파일명 생성
    $newFileName = uniqid() . '_' . time() . '.' . $extension;
    $targetPath = $uploadDir . '/' . $newFileName;

    // 파일 이동
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        return ['success' => false, 'message' => '파일 저장에 실패했습니다'];
    }

    return [
        'success' => true,
        'file_name' => $newFileName,
        'file_size' => $file['size'],
        'original_name' => $originalName
    ];
}

/**
 * JSON body 파싱
 */
function getJsonBody() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}
