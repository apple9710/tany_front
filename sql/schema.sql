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
-- 스키마 생성 완료
-- ============================================
-- 확인 쿼리:
-- SHOW TABLES;
-- SELECT * FROM admin_users;
