-- Tany 프로젝트 데이터베이스 스키마
-- 생성일: 2025-10-31
-- DB: MariaDB 10.x
-- 문자셋: UTF-8

-- 데이터베이스 문자셋 설정
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- ============================================
-- 1. 관리자 계정 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL COMMENT '관리자 ID',
  `password` VARCHAR(255) NOT NULL COMMENT '비밀번호 (bcrypt 해시)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='관리자 계정';

-- 초기 관리자 계정 생성 (admin / admin123)
-- bcrypt 해시: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO `admin_users` (`username`, `password`)
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE `username` = `username`;

-- ============================================
-- 2. 문의 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `inquiries` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='온라인 문의';

-- ============================================
-- 3. 설치사례 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `references` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('led', 'stand') NOT NULL COMMENT '제품 타입 (led: LED전광판, stand: 스탠드전광판)',
  `title` VARCHAR(200) NOT NULL COMMENT '제목',
  `image` VARCHAR(255) NOT NULL COMMENT '이미지 경로',
  `location` VARCHAR(100) DEFAULT NULL COMMENT '설치 위치',
  `description` TEXT DEFAULT NULL COMMENT '상세 설명',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  INDEX `idx_type` (`type`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='설치사례';

-- ============================================
-- 4. 자료실 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `resources` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL COMMENT '제목',
  `file_path` VARCHAR(255) NOT NULL COMMENT '파일 경로',
  `file_size` BIGINT DEFAULT 0 COMMENT '파일 크기 (bytes)',
  `downloads` INT DEFAULT 0 COMMENT '다운로드 횟수',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='자료실';

-- ============================================
-- 5. 기술인증 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `certifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL COMMENT '인증서명',
  `image` VARCHAR(255) NOT NULL COMMENT '이미지 경로',
  `display_order` INT DEFAULT 0 COMMENT '정렬 순서',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  INDEX `idx_display_order` (`display_order`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='기술인증';

-- ============================================
-- 테스트 데이터 삽입
-- ============================================

-- 설치사례 더미 데이터 (LED 전광판)
INSERT INTO `references` (`type`, `title`, `image`, `location`, `description`) VALUES
('led', '(주)타니 1, 2층 실외 LED 전광판', '/uploads/references/demo_ref_1.png', '서울 강남구', 'LED 전광판 설치 사례'),
('led', 'A 기업 외벽 LED 전광판', '/uploads/references/demo_ref_2.png', '서울 서초구', '외벽형 LED 전광판'),
('led', 'B 상가 LED 전광판', '/uploads/references/demo_ref_3.png', '경기 성남시', '상가 LED 전광판')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 설치사례 더미 데이터 (스탠드 전광판)
INSERT INTO `references` (`type`, `title`, `image`, `location`, `description`) VALUES
('stand', 'C 학교 스탠드형 전광판', '/uploads/references/demo_stand_1.png', '서울 송파구', '학교 스탠드형 전광판'),
('stand', 'D 병원 스탠드형 전광판', '/uploads/references/demo_stand_2.png', '인천 남동구', '병원 안내용 스탠드 전광판'),
('stand', 'E 관공서 스탠드형 전광판', '/uploads/references/demo_stand_3.png', '서울 영등포구', '관공서 전광판')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 자료실 더미 데이터
INSERT INTO `resources` (`title`, `file_path`, `file_size`, `downloads`) VALUES
('(주)타니 회사소개서', '/uploads/resources/company-introduction.pdf', 2048576, 0),
('정부조달제품 카탈로그', '/uploads/resources/government-catalog.pdf', 3145728, 0),
('학교 LED 전광판 카탈로그', '/uploads/resources/school-led-catalog.pdf', 1572864, 0),
('(주)타니 사업자등록증', '/uploads/resources/business-registration.pdf', 524288, 0)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 기술인증 더미 데이터
INSERT INTO `certifications` (`title`, `image`, `display_order`) VALUES
('여성기업확인서', '/uploads/certifications/cert_1.png', 1),
('벤처기업확인서', '/uploads/certifications/cert_2.png', 2),
('ISO 9001 인증서', '/uploads/certifications/cert_3.png', 3),
('KC 인증서', '/uploads/certifications/cert_4.png', 4),
('특허증', '/uploads/certifications/cert_5.png', 5),
('품질인증서', '/uploads/certifications/cert_6.png', 6)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 문의 더미 데이터 (테스트용)
INSERT INTO `inquiries` (`name`, `company`, `phone`, `email`, `message`, `status`) VALUES
('홍길동', 'A 회사', '010-1234-5678', 'hong@example.com', 'LED 전광판 견적 문의드립니다.', 'pending'),
('김철수', 'B 학교', '010-2345-6789', 'kim@example.com', '학교 전광판 설치 문의합니다.', 'pending'),
('이영희', 'C 병원', '010-3456-7890', 'lee@example.com', '실내 LED 사이니지 문의', 'completed')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- ============================================
-- 스키마 생성 완료
-- ============================================
-- 확인 쿼리:
-- SHOW TABLES;
-- SELECT * FROM admin_users;
-- SELECT * FROM references;
-- SELECT * FROM resources;
-- SELECT * FROM certifications;
-- SELECT * FROM inquiries;
