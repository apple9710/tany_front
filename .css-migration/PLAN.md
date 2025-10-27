# CSS 변환 작업 상세 계획

**프로젝트**: Tany - LED 전광판 웹사이트
**기준 뷰포트**: 2240px
**변환 방식**: `min(vw, px)` 함수 사용

---

## 🎯 작업 목표

1. 모든 CSS 파일의 px 값을 2240px 기준 vw로 변환
2. 최대값은 원본 px 값으로 제한 (min() 함수 사용)
3. 일관된 반응형 디자인 구현
4. CSS 변수 최대한 활용

---

## 📐 변환 규칙

### 변환 대상
- ✅ font-size (폰트 크기)
- ✅ width, max-width, min-width (너비)
- ✅ height, max-height, min-height (높이)
- ✅ padding, padding-* (안쪽 여백)
- ✅ margin, margin-* (바깥 여백)
- ✅ gap, row-gap, column-gap (간격)
- ✅ border-radius (테두리 반경)
- ✅ top, right, bottom, left (위치)

### 변환 제외
- ❌ border, border-width (1px, 2px 등 - 고정)
- ❌ box-shadow spread (고정)
- ❌ outline-width (고정)
- ❌ 100vh, 100vw (뷰포트 단위는 그대로)
- ❌ transition duration (시간은 그대로)
- ❌ media query breakpoints (디바이스 크기는 그대로)

### 변환 공식
```
vw = (px / 2240) * 100
CSS: min(vw, px)
```

---

## 🗂️ 파일별 작업 계획

### 1단계: 헤더 레이아웃 컴포넌트

#### 1.1 Header.module.css
**경로**: `src/components/layout/Header.module.css`

**예상 변환 항목**:
- height: 100px (데스크톱), 80px (태블릿), 60px (모바일)
- font-size: 22px (네비게이션)
- gap: 112px (네비게이션 아이템)
- padding 값들
- logo width/height

**특이사항**:
- fixed 포지션 유지
- 반응형 breakpoint 확인

---

#### 1.2 Footer.module.css
**경로**: `src/components/layout/Footer.module.css`

**예상 변환 항목**:
- padding: 82px (상단), 66px (하단)
- font-size: 14px
- gap 값들
- 로고 및 아이콘 크기

**특이사항**:
- 회사 정보 레이아웃
- 다단 레이아웃 확인

---

#### 1.3 MobileSideMenu.module.css
**경로**: `src/components/layout/MobileSideMenu.module.css`

**예상 변환 항목**:
- max-width: 400px
- width: 80%
- 닫기 버튼: 40px
- font-size: 16px (서브메뉴)
- padding, gap 값들

**특이사항**:
- fixed 포지션
- 애니메이션 유지

---

### 2단계: 공통 컴포넌트

#### 2.1 PageTitle.module.css
**경로**: `src/components/common/PageTitle.module.css`

**예상 변환 항목**:
- font-size: 38px
- 구분선 width: 375px (데스크톱), 320px (태블릿), 250px (모바일)
- margin-bottom: 56px

---

#### 2.2 PageBanner.module.css
**경로**: `src/components/layout/PageBanner.module.css`

**예상 변환 항목**:
- height 값
- font-size 값
- padding 값

---

#### 2.3 SubPageBanner.module.css
**경로**: `src/components/layout/SubPageBanner.module.css`

**예상 변환 항목**:
- height: 100px (데스크톱), 80px (태블릿)
- font-size: 40px (태블릿), 18px (서브메뉴)
- gap: 120px (서브메뉴 아이템)

---

#### 2.4 SubMenuNav.module.css
**경로**: `src/components/layout/SubMenuNav.module.css`

**예상 변환 항목**:
- sticky top: 80px
- height 값
- font-size 값
- border-bottom: 2px (유지)

---

### 3단계: 메인 페이지

#### 3.1 Home.module.css
**경로**: `src/pages/Home/Home.module.css`

**예상 변환 항목**:
- 전체 레이아웃 padding/margin

---

#### 3.2 MainBanner.module.css
**경로**: `src/components/features/home/MainBanner.module.css`

**예상 변환 항목**:
- height: 100vh (유지)
- 인디케이터: 12px (비활성), 32px (활성)
- 버튼 크기
- 모바일 height: 60vh (유지)

**특이사항**:
- 슬라이드 애니메이션 유지
- 네비게이션 버튼 위치

---

#### 3.3 AboutSection.module.css
**경로**: `src/components/features/home/AboutSection.module.css`

**예상 변환 항목**:
- font-size: 38px (타이틀)
- padding-bottom: 104px
- 버튼 width: 300px, height: 70px
- gap 값들

---

#### 3.4 ProductSection.module.css
**경로**: `src/components/features/home/ProductSection.module.css`

**예상 변환 항목**:
- font-size: 38px (타이틀), 26px (부제목), 22px (설명)
- 이미지: 788px
- 탭 버튼: width 159px, height 49px
- gap: 62px (탭 콘텐츠), 38px (탭 버튼)
- padding: 62px (탭 콘텐츠)
- margin-bottom: 61px (부제목)

**특이사항**:
- 탭 인터랙션 유지
- aspect-ratio: 16/9 (유지)

---

#### 3.5 TrustSection.module.css
**경로**: `src/components/features/home/TrustSection.module.css`

**예상 변환 항목**:
- height: 1000px
- font-size: 50px (타이틀)
- margin-bottom: 92px (타이틀)

---

#### 3.6 LocationSection.module.css
**경로**: `src/components/features/home/LocationSection.module.css`

**예상 변환 항목**:
- font-size: 38px (타이틀)
- 버튼 width: 300px, height: 70px
- margin-bottom: 56px (텍스트 영역)
- gap 값들

---

### 4단계: About 서브페이지

#### 4.1 History.module.css
**경로**: `src/pages/About/History.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 타임라인 관련 크기

---

#### 4.2 Certification.module.css
**경로**: `src/pages/About/Certification.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 인증서 이미지/박스 크기

---

#### 4.3 CI.module.css
**경로**: `src/pages/About/CI.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- CI 관련 크기

---

#### 4.4 Location.module.css
**경로**: `src/pages/About/Location.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 지도 및 정보 레이아웃

---

### 5단계: Products 서브페이지

#### 5.1 IndoorLED.module.css
**경로**: `src/pages/Products/IndoorLED.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 제품 이미지: 900px
- font-size: 30px (특징 설명)
- margin-top: 100px (특징 섹션)

---

#### 5.2 BannerLED.module.css
**경로**: `src/pages/Products/BannerLED.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 제품 관련 크기

---

#### 5.3 StandLED.module.css
**경로**: `src/pages/Products/StandLED.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 제품 관련 크기

---

#### 5.4 Signage.module.css
**경로**: `src/pages/Products/Signage.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- font-size: 30px (특징 설명)
- 제품 관련 크기

---

### 6단계: References 서브페이지

#### 6.1 LEDCases.module.css
**경로**: `src/pages/References/LEDCases.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 그리드 레이아웃

---

#### 6.2 StandLED.module.css (References)
**경로**: `src/pages/References/StandLED.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 그리드 레이아웃

---

### 7단계: Support 서브페이지

#### 7.1 Inquiry.module.css
**경로**: `src/pages/Support/Inquiry.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- font-size: 28px (폼 라벨), 24px (패딩 콘텐츠)
- 체크박스: 46px
- 체크박스 height: 60px
- 개인정보 패딩: 30px
- 입력 필드 padding: 16px

---

#### 7.2 Resources.module.css
**경로**: `src/pages/Support/Resources.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- font-size: 34px (리소스 타이틀)

---

#### 7.3 Blog.module.css
**경로**: `src/pages/Support/Blog.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 이미지 max-width: 1200px

---

#### 7.4 Instagram.module.css
**경로**: `src/pages/Support/Instagram.module.css`

**예상 변환 항목**:
- padding: 129px (상단), 260px (하단)
- 이미지 max-width: 1200px

---

### 8단계: 피처 컴포넌트

#### 8.1 LocationList.module.css
**경로**: `src/components/features/location/LocationList.module.css`

**예상 변환 항목**:
- margin-bottom: 129px (아이템 간격)
- font-size 값들
- gap 값들

---

#### 8.2 CertificationList.module.css
**경로**: `src/components/features/certification/CertificationList.module.css`

**예상 변환 항목**:
- 이미지/박스: 300px
- 타이틀박스: 60px
- gap 값들

---

#### 8.3 ReferenceGrid.module.css
**경로**: `src/components/features/references/ReferenceGrid.module.css`

**예상 변환 항목**:
- 이미지박스: 449px
- 텍스트박스: 358px
- font-size: 19px
- border-radius: 15px
- gap 값들

---

#### 8.4 HistoryTimeline.module.css
**경로**: `src/components/features/history/HistoryTimeline.module.css`

**예상 변환 항목**:
- max-width: 1028px
- 이미지: 400px
- margin-top: 114px (시작)
- gap 값들

---

### 9단계: 테스트 및 검증

#### 9.1 데스크톱 테스트 (2240px 이상)
- [ ] 모든 페이지가 최대 px 값에 고정되는지 확인
- [ ] 레이아웃이 깨지지 않는지 확인
- [ ] 이미지 비율 유지 확인

#### 9.2 데스크톱 테스트 (1920px)
- [ ] vw 변환이 정상 작동하는지 확인
- [ ] 비율 유지 확인
- [ ] 가독성 확인

#### 9.3 태블릿 테스트 (768px~1279px)
- [ ] 미디어 쿼리 정상 작동 확인
- [ ] 레이아웃 변경 확인
- [ ] 터치 인터랙션 확인

#### 9.4 모바일 테스트 (767px 이하)
- [ ] 모바일 메뉴 작동 확인
- [ ] 레이아웃 스택 확인
- [ ] 스크롤 동작 확인

#### 9.5 페이지 네비게이션 테스트
- [ ] 모든 페이지 이동 확인
- [ ] 링크 작동 확인
- [ ] 라우팅 정상 작동 확인

#### 9.6 반응형 동작 확인
- [ ] 창 크기 조절 시 부드러운 변환 확인
- [ ] breakpoint 전환 확인
- [ ] 오버플로우 없는지 확인

---

## 🛠️ 작업 도구

### JavaScript 변환 함수
```javascript
function pxToVw(px, base = 2240) {
  const vw = (px / base) * 100;
  return `min(${vw.toFixed(5)}vw, ${px}px)`;
}
```

### VSCode 정규식 찾기/바꾸기
**찾기**: `(\d+)px`
**검토 후 수동 변환** (자동 변환은 위험)

---

## 📝 작업 시 주의사항

1. **CSS 변수 우선 사용**: variables.css에 있는 변수가 있으면 반드시 사용
2. **보더는 고정**: 1px, 2px 등 보더는 변환하지 않음
3. **뷰포트 단위 유지**: 100vh, 100vw는 그대로 유지
4. **미디어 쿼리 유지**: breakpoint는 px 고정
5. **트랜지션 유지**: 애니메이션 시간은 그대로
6. **aspect-ratio 유지**: 비율 속성은 변환 불필요
7. **한 번에 한 파일씩**: 작업 후 바로 테스트
8. **백업 확인**: Git으로 변경사항 추적

---

## 🔗 관련 문서

- [진행 상황](./PROGRESS.md)
- [변경 내역](./CHANGELOG.md)
- [CSS 스타일 가이드](../CSS_STYLE_GUIDE.md)

---

**최종 업데이트**: 2025-10-27
