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
-- 6. 메인 프로덕트 섹션 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `home_main_products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tab_label` VARCHAR(50) NOT NULL COMMENT '탭 버튼 라벨',
  `title` VARCHAR(200) NOT NULL COMMENT '컨텐츠 타이틀',
  `description` TEXT NOT NULL COMMENT '설명 (줄바꿈 보존)',
  `link_path` VARCHAR(255) DEFAULT NULL COMMENT '보러가기 링크 (공백 가능)',
  `display_order` INT DEFAULT 0 COMMENT '탭 순서',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '노출 여부',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  INDEX `idx_display_order` (`display_order`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='메인 프로덕트 탭';

-- ============================================
-- 7. 메인 프로덕트 슬라이드 이미지 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS `home_main_product_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL COMMENT 'home_main_products.id',
  `image` VARCHAR(255) NOT NULL COMMENT '이미지 경로',
  `display_order` INT DEFAULT 0 COMMENT '슬라이드 순서',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  INDEX `idx_product_id` (`product_id`),
  INDEX `idx_display_order` (`display_order`),
  CONSTRAINT `fk_main_product_images` FOREIGN KEY (`product_id`)
    REFERENCES `home_main_products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='메인 프로덕트 슬라이드 이미지';

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
-- 메인 프로덕트 시드 데이터
-- ============================================

-- 탭 6개
INSERT INTO `home_main_products` (`id`, `tab_label`, `title`, `description`, `link_path`, `display_order`, `is_active`) VALUES
(1, '실내형', '실내용 LED 안내전광판', '실내용 LED 안내전광판은 베젤이 없는\n슬림한 디자인으로 세미나, 연회장, 대강당 등의\n실내 장소에서 형태별 맞춤형 전문 시공을 통해\n세련된 공간을 연출하며, 밝고 생동감 넘치는\n화면으로 몰입감을 더하여 효과적인 광고,\n홍보 콘텐츠 전달이 가능합니다.', '/products/indoor-led', 1, 1),
(2, '실외형', '실외용 LED 전광판', '실외용 LED 전광판은 외부 환경에 강한 내구성과\n고휘도 디스플레이로 광고탑, 옥외 간판,\n빌딩 외벽 등 다양한 실외 환경에서\n선명한 영상 전달이 가능하며, 방수·방진 설계로\n사계절 내내 안정적인 운영을 제공합니다.', NULL, 2, 1),
(3, '현수막형', 'LED 현수막', '기존 현수막을 대체하는 LED 현수막은\n학교, 관공서, 기업 외벽 등에 설치되어\n다양한 정보와 콘텐츠를 자유롭게 송출할 수 있으며,\n고밝기 디스플레이로 주야간 시인성이 뛰어나\n효과적인 안내 매체로 활용됩니다.', '/products/banner-led', 3, 1),
(4, '스텐드형', '스탠드 LED 전광판', '자립형 구조로 어디서나 손쉽게 설치할 수 있는\n스탠드 LED 전광판은 매장 입구, 안내 데스크,\n행사장 등에 최적화된 형태로\n이동성과 활용도가 높은 디스플레이 솔루션입니다.', '/products/stand-led', 4, 1),
(5, '플렉시블', '플렉시블 LED', '곡면, 원기둥, 비정형 공간에 자유롭게\n설치 가능한 플렉시블 LED는 디자인 자유도가 높아\n매장 인테리어, 전시 공간, 무대 연출 등\n창의적인 공간 연출에 활용됩니다.', NULL, 5, 1),
(6, '시계형', '시계형 LED 전광판', '정확한 시간 표시와 함께 다양한 정보를\n송출할 수 있는 시계형 LED 전광판은\n학교, 관공서, 야외 광장 등에 설치되어\n시간·온도·안내 메시지를 한눈에 확인할 수 있습니다.', NULL, 6, 1)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 슬라이드 이미지 (실내형 product_id=1)
INSERT INTO `home_main_product_images` (`product_id`, `image`, `display_order`) VALUES
(1, '/uploads/main_products/indoor_main.jpg', 1),
(1, '/uploads/main_products/indoor_01.jpg', 2),
(1, '/uploads/main_products/indoor_02.jpg', 3),
(1, '/uploads/main_products/indoor_03.jpg', 4),
(1, '/uploads/main_products/indoor_04.jpg', 5),
(1, '/uploads/main_products/indoor_05.jpg', 6),
(1, '/uploads/main_products/indoor_06.jpg', 7),
(1, '/uploads/main_products/indoor_07.jpg', 8);

-- 슬라이드 이미지 (실외형 product_id=2)
INSERT INTO `home_main_product_images` (`product_id`, `image`, `display_order`) VALUES
(2, '/uploads/main_products/outdoor_main.jpg', 1),
(2, '/uploads/main_products/outdoor_01.jpg', 2),
(2, '/uploads/main_products/outdoor_02.jpg', 3),
(2, '/uploads/main_products/outdoor_03.jpg', 4),
(2, '/uploads/main_products/outdoor_04.jpg', 5),
(2, '/uploads/main_products/outdoor_05.jpeg', 6),
(2, '/uploads/main_products/outdoor_06.jpg', 7),
(2, '/uploads/main_products/outdoor_07.jpg', 8),
(2, '/uploads/main_products/outdoor_08.jpg', 9);

-- 슬라이드 이미지 (현수막형 product_id=3)
INSERT INTO `home_main_product_images` (`product_id`, `image`, `display_order`) VALUES
(3, '/uploads/main_products/banner_main.jpg', 1),
(3, '/uploads/main_products/banner_01.jpg', 2),
(3, '/uploads/main_products/banner_02.jpg', 3),
(3, '/uploads/main_products/banner_03.jpg', 4),
(3, '/uploads/main_products/banner_04.jpg', 5),
(3, '/uploads/main_products/banner_05.jpg', 6),
(3, '/uploads/main_products/banner_06.jpg', 7),
(3, '/uploads/main_products/banner_07.jpg', 8),
(3, '/uploads/main_products/banner_08.jpg', 9);

-- 스텐드형(product_id=4)은 이미지 없음 (어드민에서 추후 업로드)

-- 슬라이드 이미지 (플렉시블 product_id=5)
INSERT INTO `home_main_product_images` (`product_id`, `image`, `display_order`) VALUES
(5, '/uploads/main_products/flexible_main.jpg', 1),
(5, '/uploads/main_products/flexible_01.jpg', 2),
(5, '/uploads/main_products/flexible_02.jpg', 3);

-- 슬라이드 이미지 (시계형 product_id=6)
INSERT INTO `home_main_product_images` (`product_id`, `image`, `display_order`) VALUES
(6, '/uploads/main_products/clock_main.jpg', 1),
(6, '/uploads/main_products/clock_01.jpg', 2),
(6, '/uploads/main_products/clock_02.jpg', 3);

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
