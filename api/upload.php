<?php
/**
 * 파일 업로드 API
 *
 * POST /api/upload.php?type=reference|resource|certification
 *
 * 이미지 파일: jpg, jpeg, png, gif, webp (최대 10MB)
 * 문서 파일: pdf, doc, docx, xls, xlsx, ppt, pptx (최대 50MB)
 */

require_once __DIR__ . '/includes/cors.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/utils.php';

// CORS 초기화
initCors();

// POST 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('POST 요청만 허용됩니다', 405);
}

// 로그인 확인
requireAuth();

// 업로드 타입 확인
$type = getParam('type');
if (!$type || !in_array($type, ['reference', 'resource', 'certification'])) {
    sendError('type은 reference, resource, certification 중 하나여야 합니다', 400);
}

// 파일이 업로드되었는지 확인
if (!isset($_FILES['file'])) {
    sendError('파일이 업로드되지 않았습니다', 400);
}

// 업로드 디렉토리 설정
$uploadBaseDir = __DIR__ . '/../uploads';
$uploadDir = '';
$allowedTypes = [];
$maxSize = 10485760; // 기본 10MB

// 타입별 설정
switch ($type) {
    case 'reference':
        $uploadDir = $uploadBaseDir . '/references';
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $maxSize = 10485760; // 10MB
        break;

    case 'resource':
        $uploadDir = $uploadBaseDir . '/resources';
        $allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'];
        $maxSize = 52428800; // 50MB
        break;

    case 'certification':
        $uploadDir = $uploadBaseDir . '/certifications';
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];
        $maxSize = 10485760; // 10MB
        break;
}

// 파일 업로드 처리
$result = uploadFile('file', $uploadDir, $allowedTypes, $maxSize);

if ($result['success']) {
    // 웹 경로로 변환 (uploads 폴더부터 시작)
    $webPath = '/uploads/' . basename($uploadDir) . '/' . $result['file_name'];

    sendSuccess('파일이 업로드되었습니다', [
        'file_path' => $webPath,
        'file_name' => $result['file_name'],
        'file_size' => $result['file_size'],
        'original_name' => $result['original_name']
    ]);
} else {
    sendError($result['message'], 400);
}
