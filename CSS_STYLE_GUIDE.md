# CSS 스타일 수정 규칙

## 기본 원칙

이 프로젝트는 **2240px 기준 뷰포트**를 사용하여 반응형 디자인을 구현합니다.

### 핵심 규칙

1. **모든 크기 값은 2240px 기준 vw로 변환**
2. **최대값은 2240px 기준의 px 값으로 제한**
3. **min() 함수를 사용하여 vw와 px의 최소값 적용**

---

## vw 변환 공식

```
vw = (px / 2240) * 100
```

### 계산 예시

| px 값 | 계산식 | vw 값 |
|-------|--------|-------|
| 1400px | (1400 / 2240) × 100 | 62.5vw |
| 48px | (48 / 2240) × 100 | 2.14286vw |
| 36px | (36 / 2240) × 100 | 1.60714vw |
| 24px | (24 / 2240) × 100 | 1.07143vw |
| 16px | (16 / 2240) × 100 | 0.71429vw |
| 8px | (8 / 2240) × 100 | 0.35714vw |
| 4px | (4 / 2240) × 100 | 0.17857vw |

---

## CSS 작성 규칙

### ✅ 올바른 사용법

```css
/* min() 함수로 vw와 최대 px 값 적용 */
.element {
  font-size: min(2.14286vw, 48px);
  width: min(62.5vw, 1400px);
  padding: min(1.42857vw, 32px);
  margin-bottom: min(2.85714vw, 64px);
  border-radius: min(0.35714vw, 8px);
}
```

### ❌ 잘못된 사용법

```css
/* 고정 px 값만 사용 (반응형 X) */
.element {
  font-size: 48px;
  width: 1400px;
  padding: 32px;
}

/* vw만 사용 (최대값 제한 없음) */
.element {
  font-size: 2.14286vw;
  width: 62.5vw;
}

/* max() 함수 사용 (잘못된 방향) */
.element {
  font-size: max(2.14286vw, 48px); /* ❌ */
}
```

---

## CSS 변수 사용

variables.css에 정의된 변수를 **최대한 활용**하세요.

### 폰트 크기

```css
/* CSS 변수 사용 (권장) */
.title {
  font-size: var(--font-size-h1); /* min(2.14286vw, 48px) */
}

/* 직접 입력 (변수가 없을 때만) */
.custom-title {
  font-size: min(2.67857vw, 60px);
}
```

### 간격 (Spacing)

```css
/* CSS 변수 사용 (권장) */
.section {
  padding: var(--spacing-3xl) 0; /* min(2.85714vw, 64px) */
  gap: var(--spacing-lg); /* min(1.07143vw, 24px) */
}

/* 직접 입력 (변수가 없을 때만) */
.custom-section {
  padding: min(5.35714vw, 120px) 0;
}
```

### 컨테이너

```css
.container {
  max-width: var(--container-max-width); /* min(62.5vw, 1400px) */
  padding: 0 var(--container-padding); /* 0px */
  margin: 0 auto;
}
```

---

## 예외 사항

### 변환하지 않는 값

다음 값들은 **px 고정값**을 유지합니다:

1. **보더 (Border)**
   ```css
   border: 1px solid #ccc; /* 고정 */
   border: 2px solid var(--color-primary); /* 고정 */
   ```

2. **뷰포트 단위 (vh, vw 자체)**
   ```css
   height: 100vh; /* 그대로 유지 */
   width: 100vw; /* 그대로 유지 */
   ```

3. **미디어 쿼리 Breakpoint**
   ```css
   /* 실제 디바이스 크기이므로 px 유지 */
   @media (max-width: 768px) { }
   @media (max-width: 1279px) { }
   @media (min-width: 1280px) { }
   ```

4. **트랜지션 시간**
   ```css
   transition: 250ms ease-in-out; /* 그대로 유지 */
   ```

---

## 주요 변수 목록

### 폰트 크기 (Font Sizes)

| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--font-size-h1` | min(2.14286vw, 48px) | 대제목 |
| `--font-size-h2` | min(1.60714vw, 36px) | 중제목 |
| `--font-size-h3` | min(1.25vw, 28px) | 소제목 |
| `--font-size-h4` | min(1.07143vw, 24px) | 작은 제목 |
| `--font-size-body` | min(0.71429vw, 16px) | 본문 |
| `--font-size-small` | min(0.625vw, 14px) | 작은 텍스트 |
| `--font-size-caption` | min(0.53571vw, 12px) | 캡션 |

### 간격 (Spacing)

| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--spacing-xs` | min(0.17857vw, 4px) | 최소 간격 |
| `--spacing-sm` | min(0.35714vw, 8px) | 작은 간격 |
| `--spacing-md` | min(0.71429vw, 16px) | 중간 간격 |
| `--spacing-lg` | min(1.07143vw, 24px) | 큰 간격 |
| `--spacing-xl` | min(1.42857vw, 32px) | 아주 큰 간격 |
| `--spacing-2xl` | min(2.14286vw, 48px) | 2배 큰 간격 |
| `--spacing-3xl` | min(2.85714vw, 64px) | 3배 큰 간격 |

### 테두리 반경 (Border Radius)

| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--radius-sm` | min(0.17857vw, 4px) | 작은 모서리 |
| `--radius-md` | min(0.35714vw, 8px) | 중간 모서리 |
| `--radius-lg` | min(0.53571vw, 12px) | 큰 모서리 |
| `--radius-xl` | min(0.71429vw, 16px) | 아주 큰 모서리 |

### 컨테이너

| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--container-max-width` | min(62.5vw, 1400px) | 컨테이너 최대 너비 |
| `--container-padding` | 0px | 컨테이너 좌우 패딩 |

---

## 실전 예시

### 섹션 스타일링

```css
.section {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: min(5.35714vw, 120px) 0; /* 120px 기준 */
}

.section__title {
  font-size: var(--font-size-h1);
  margin-bottom: var(--spacing-2xl);
}

.section__content {
  font-size: var(--font-size-body);
  line-height: 1.6;
}
```

### 카드 컴포넌트

```css
.card {
  width: min(19.64286vw, 440px); /* 440px 기준 */
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid #e0e0e0; /* 보더는 고정 */
}

.card__image {
  width: 100%;
  height: min(11.60714vw, 260px); /* 260px 기준 */
  border-radius: var(--radius-md);
}

.card__title {
  font-size: var(--font-size-h4);
  margin-top: var(--spacing-lg);
}
```

### 버튼

```css
.button {
  padding: min(0.80357vw, 18px) min(2.67857vw, 60px); /* 18px, 60px 기준 */
  font-size: var(--font-size-body);
  border-radius: min(1.5625vw, 35px); /* 35px 기준 */
  border: 2px solid var(--color-primary); /* 보더는 고정 */
  transition: var(--transition-normal);
}
```

---

## 빠른 변환 도구

### JavaScript 계산기

```javascript
function pxToVw(px, base = 2240) {
  const vw = (px / base) * 100;
  return `min(${vw.toFixed(5)}vw, ${px}px)`;
}

// 사용 예시
console.log(pxToVw(48));   // "min(2.14286vw, 48px)"
console.log(pxToVw(1400)); // "min(62.5vw, 1400px)"
console.log(pxToVw(120));  // "min(5.35714vw, 120px)"
```

### 온라인 계산

브라우저 콘솔에서 빠르게 계산:

```javascript
// 콘솔에 붙여넣기
const vw = (px) => `min(${((px / 2240) * 100).toFixed(5)}vw, ${px}px)`;

// 사용
vw(48)   // "min(2.14286vw, 48px)"
vw(120)  // "min(5.35714vw, 120px)"
```

---

## 체크리스트

새로운 CSS를 작성하거나 수정할 때 확인하세요:

- [ ] 크기 값(width, height, font-size 등)은 `min(vw, px)` 형식 사용
- [ ] 가능하면 variables.css의 CSS 변수 사용
- [ ] 변수가 없는 값은 2240px 기준으로 vw 계산
- [ ] 보더(1px, 2px)는 px 고정값 유지
- [ ] 뷰포트 단위(vh, vw)는 그대로 유지
- [ ] 미디어 쿼리 breakpoint는 px 유지
- [ ] 코드 리뷰 시 일관성 확인

---

## 참고 자료

- **변수 정의**: [src/styles/variables.css](src/styles/variables.css)
- **기준 뷰포트**: 2240px
- **컨테이너 최대 너비**: 1400px (2240px의 62.5%)
- **함수**: `min()` - vw와 px 중 작은 값 선택

---

**작성일**: 2025-10-27
**버전**: 1.0.0
