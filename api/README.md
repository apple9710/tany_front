# Tany API 문서

## 🚀 API 엔드포인트

### 인증 API

#### 1. 로그인
```
POST /api/auth/login.php
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**응답 (성공)**:
```json
{
  "success": true,
  "message": "로그인 성공",
  "data": {
    "id": 1,
    "username": "admin"
  }
}
```

#### 2. 로그아웃
```
POST /api/auth/logout.php
```

#### 3. 로그인 상태 확인
```
GET /api/auth/check.php
```

---

### 설치사례 API (`references`)

#### 1. 목록 조회
```
GET /api/references.php?type=led&page=1&limit=10
```

**파라미터**:
- `type` (선택): `led` | `stand`
- `page` (선택): 페이지 번호 (기본값: 1)
- `limit` (선택): 페이지당 개수 (기본값: 10)

#### 2. 단일 조회
```
GET /api/references.php?id=1
```

#### 3. 등록 (관리자 권한 필요)
```
POST /api/references.php
Content-Type: application/json

{
  "type": "led",
  "title": "(주)타니 1, 2층 실외 LED 전광판",
  "image": "/uploads/references/xxxxx.png",
  "location": "서울 강남구",
  "description": "LED 전광판 설치 사례"
}
```

#### 4. 수정 (관리자 권한 필요)
```
PUT /api/references.php?id=1
Content-Type: application/json

{
  "type": "led",
  "title": "수정된 제목",
  "image": "/uploads/references/xxxxx.png",
  "location": "서울 강남구",
  "description": "수정된 설명"
}
```

#### 5. 삭제 (관리자 권한 필요)
```
DELETE /api/references.php?id=1
```

---

### 자료실 API (`resources`)

#### 1. 목록 조회
```
GET /api/resources.php?page=1&limit=10
```

#### 2. 단일 조회
```
GET /api/resources.php?id=1
```

#### 3. 등록 (관리자 권한 필요)
```
POST /api/resources.php
Content-Type: application/json

{
  "title": "(주)타니 회사소개서",
  "file_path": "/uploads/resources/xxxxx.pdf",
  "file_size": 2048576
}
```

#### 4. 수정 (관리자 권한 필요)
```
PUT /api/resources.php?id=1
Content-Type: application/json

{
  "title": "수정된 제목",
  "file_path": "/uploads/resources/xxxxx.pdf",
  "file_size": 2048576
}
```

#### 5. 삭제 (관리자 권한 필요)
```
DELETE /api/resources.php?id=1
```

---

### 기술인증 API (`certifications`)

#### 1. 목록 조회
```
GET /api/certifications.php
```

#### 2. 단일 조회
```
GET /api/certifications.php?id=1
```

#### 3. 등록 (관리자 권한 필요)
```
POST /api/certifications.php
Content-Type: application/json

{
  "title": "여성기업확인서",
  "image": "/uploads/certifications/xxxxx.png",
  "display_order": 1
}
```

#### 4. 수정 (관리자 권한 필요)
```
PUT /api/certifications.php?id=1
Content-Type: application/json

{
  "title": "수정된 제목",
  "image": "/uploads/certifications/xxxxx.png",
  "display_order": 1
}
```

#### 5. 삭제 (관리자 권한 필요)
```
DELETE /api/certifications.php?id=1
```

---

### 문의 API (`inquiries`)

#### 1. 목록 조회 (관리자 권한 필요)
```
GET /api/inquiries.php?status=pending&page=1&limit=10
```

**파라미터**:
- `status` (선택): `pending` | `completed`
- `page` (선택): 페이지 번호
- `limit` (선택): 페이지당 개수

#### 2. 단일 조회 (관리자 권한 필요)
```
GET /api/inquiries.php?id=1
```

#### 3. 등록 (공개 - 로그인 불필요)
```
POST /api/inquiries.php
Content-Type: application/json

{
  "name": "홍길동",
  "company": "A 회사",
  "phone": "010-1234-5678",
  "email": "hong@example.com",
  "message": "LED 전광판 견적 문의드립니다."
}
```

#### 4. 상태 수정 (관리자 권한 필요)
```
PUT /api/inquiries.php?id=1
Content-Type: application/json

{
  "status": "completed"
}
```

#### 5. 삭제 (관리자 권한 필요)
```
DELETE /api/inquiries.php?id=1
```

---

### 파일 업로드 API

#### 파일 업로드 (관리자 권한 필요)
```
POST /api/upload.php?type=reference
Content-Type: multipart/form-data

file: [파일]
```

**파라미터**:
- `type` (필수): `reference` | `resource` | `certification`

**허용 파일 형식**:
- `reference`: jpg, jpeg, png, gif, webp (최대 10MB)
- `resource`: pdf, doc, docx, xls, xlsx, ppt, pptx, zip (최대 50MB)
- `certification`: jpg, jpeg, png, gif, webp, pdf (최대 10MB)

**응답 (성공)**:
```json
{
  "success": true,
  "message": "파일이 업로드되었습니다",
  "data": {
    "file_path": "/uploads/references/xxxxx_1234567890.png",
    "file_name": "xxxxx_1234567890.png",
    "file_size": 102400,
    "original_name": "photo.png"
  }
}
```

---

## 🔐 인증

관리자 권한이 필요한 API는 로그인 후 세션이 유지된 상태에서 호출해야 합니다.

**기본 관리자 계정**:
- ID: `admin`
- PW: `admin123`

---

## 📋 응답 형식

### 성공 응답
```json
{
  "success": true,
  "message": "성공 메시지",
  "data": { ... }
}
```

### 에러 응답
```json
{
  "success": false,
  "message": "에러 메시지",
  "errors": { ... }
}
```

### HTTP 상태 코드
- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `401`: 인증 필요
- `404`: 리소스 없음
- `405`: 허용되지 않은 메서드
- `500`: 서버 에러

---

## 📁 폴더 구조

```
api/
├── auth/
│   ├── login.php
│   ├── logout.php
│   └── check.php
├── config/
│   ├── database.php (gitignore)
│   └── database.example.php
├── includes/
│   ├── db.php
│   ├── auth.php
│   ├── cors.php
│   └── utils.php
├── references.php
├── resources.php
├── certifications.php
├── inquiries.php
├── upload.php
├── .htaccess
└── README.md
```

---

## 🛠 설정

1. `config/database.example.php`를 복사하여 `config/database.php` 생성
2. DB 연결 정보 입력:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   define('DB_NAME', 'your_database');
   ```
3. SQL 스키마 실행: `sql/schema.sql`

---

## 🔒 보안

- Prepared Statement 사용 (SQL Injection 방지)
- Password bcrypt 해시
- CORS 설정 (허용 도메인만 접근)
- 파일 업로드 검증 (확장자, 크기)
- 세션 보안 설정

---

**최종 업데이트**: 2025-11-03
