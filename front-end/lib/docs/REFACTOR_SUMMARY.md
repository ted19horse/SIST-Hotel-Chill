# 코드 구조 개선 요약

이 문서는 호텔 프로젝트의 프론트엔드 코드 구조 개선 작업에 대한 요약입니다. 백엔드 개발 전 마지막 단계로 프론트엔드 코드 리팩토링을 진행했습니다.

## 주요 개선 사항

### 1. 공통 컴포넌트 표준화

- **PageBanner**: 모든 페이지 상단에 공통으로 사용되는 배너 컴포넌트 표준화
- **ClientComponentWrapper**: 서버 컴포넌트에서 클라이언트 컴포넌트로의 데이터 전달을 위한 래퍼 컴포넌트 일관성 확보
- 컴포넌트 문서화: 모든 컴포넌트에 JSDoc 형식의 주석 추가

### 2. 라우트 구조 통일

- 모든 라우트에 동일한 패턴 적용:
  - `/app/(main)/[기능명]/page.tsx` - 메인 페이지
  - `/app/(main)/[기능명]/[id]/page.tsx` - 상세 페이지
  - `/app/(main)/[기능명]/booking|reserve/page.tsx` - 예약/구매 페이지

### 3. 타입 시스템 강화

- 모든 타입 정의에 자세한 주석 추가
- 더미 데이터와 일치하는 타입 구조 확보
- 열거형과 타입 연결성 강화

### 4. 데이터 관리 표준화

- 데이터 접근 함수 통일 (`data/[기능명]/index.ts`)
- API 서비스 구조 일관화 (`services/[기능명]Service.ts`)
- 에러 처리 패턴 표준화

### 5. 컴포넌트 구조 개선

- 거대한 컴포넌트를 작은 단위로 분리
  - 예: RoomBookingFormContent -> BookingForm, BookingSummary, BookingSuccess
- 컴포넌트 간 책임 분리 명확화
- 재사용 가능한 컴포넌트 식별 및 분리

### 6. 백엔드 연동 준비

- API 연결을 위한 서비스 레이어 준비
- 목업 데이터에서 실제 API로의 전환 지점 식별
- 비동기 처리 패턴 통일

## 특정 라우트별 개선 내용

### 객실 (rooms)

- 메인 페이지, 상세 페이지, 예약 페이지 구조 개선
- 컴포넌트 분리: RoomList, RoomCard, RoomDetail, RoomBookingForm 등
- 데이터 흐름 개선 및 더미 데이터 접근 표준화

### 다이닝 (dining)

- 동적 라우트([slug]) 구조 개선
- 컴포넌트 재정리: 미사용 컴포넌트 식별 및 정리
- 예약 기능 구조 통일

### 공통 컴포넌트

- 헤더, 푸터, 배너 등 공통 UI 요소 표준화
- 로딩 상태 처리 컴포넌트 통일 (Skeleton 패턴)
- 에러 처리 패턴 일관화

## 주석 규칙

모든 파일에는 다음과 같은 형식의 주석이 추가되었습니다:

```tsx
/**
 * 컴포넌트/파일 이름
 * 
 * 컴포넌트/파일에 대한 간략한 설명
 * 추가 설명이 필요한 경우 여기에 작성
 */

// 매개변수가 있는 함수나 컴포넌트의 경우
/**
 * 함수/컴포넌트 이름
 * 
 * @param props 매개변수 설명
 * @returns 반환값 설명
 */
```


# 미사용 컴포넌트 목록

이 문서는 프로젝트 내에서 현재 사용되지 않고 있는 컴포넌트들의 목록입니다. (main) 라우트의 모든 페이지와 컴포넌트 간의 관계를 분석한 결과입니다.

## 1. 다이닝(dining) 관련 미사용 컴포넌트

### 빈 파일 (0바이트)
- `front-end/components/dining/CategoryGrid.tsx` 
- `front-end/components/dining/FeaturedProducts.tsx`
- `front-end/components/dining/ProductFilters.tsx`
- `front-end/components/dining/ShopInfo.tsx`

### 거의 비어 있는 파일 (25바이트 미만)
- `front-end/components/dining/GiftShopSection.tsx`
- `front-end/components/dining/ProductGrid.tsx`
- `front-end/components/dining/ProductSearch.tsx`
- `front-end/components/dining/ShopIntro.tsx`

### 사용되지 않는 파일
- `front-end/components/dining/DiningIntro.tsx` - 다이닝 메인 또는 상세 페이지에서 사용되지 않음
- `front-end/components/dining/DiningMap.tsx` - 다이닝 관련 페이지에서 사용되지 않음
- `front-end/components/dining/DiningFilters.tsx` - RestaurantFilter가 대신 사용됨
- `front-end/components/dining/RestaurantGrid.tsx` - RestaurantCard를 직접 사용하고 있음

## 2. 미사용 gift-shop 관련 컴포넌트

gift-shop 디렉토리의 컴포넌트들을 확인한 결과, dining 컴포넌트에서 참조하고 있는 gift-shop 관련 코드가 있었으나 실제로 사용되지 않고 있는 것으로 보입니다.


## 상품(products) 관련 미사용 컴포넌트

### 미사용 파일
- `front-end/components/products/ProductCard.tsx` - products 페이지에서 직접 다른 카드 컴포넌트 사용
- `front-end/components/products/ProductList.tsx` - products 페이지에서 직접 목록 렌더링

## 예약(reservations) 관련 미사용 컴포넌트

### 미사용 파일
- `front-end/components/reservations/AvailabilityCalendar.tsx` - 관련 페이지에서 사용되지 않음
- `front-end/components/reservations/ReservationStatus.tsx` - my-account에서 다른 방식으로 예약 상태 표시

## 객실(rooms) 관련 미사용 컴포넌트

### 미사용 파일
- `front-end/components/rooms/RoomAmenities.tsx` - 객실 상세 페이지에서 사용되지 않음
- `front-end/components/rooms/RoomAvailability.tsx` - 예약 페이지에서 사용되지 않음

## 공통(common) 미사용 컴포넌트

### 미사용 파일
- `front-end/components/common/marketing/HeroSection.tsx` - 메인 페이지에서 다른 방식으로 히어로 섹션 구현
- `front-end/components/common/marketing/TestimonialSection.tsx` - 어느 페이지에서도 사용되지 않음
- `front-end/components/common/ui/FormGroup.tsx` - 폼에서 직접 레이아웃 구현

## 회원(membership) 관련 미사용 컴포넌트

### 미사용 파일
- `front-end/components/membership/MembershipCard.tsx` - DigitalCard 컴포넌트가 대신 사용됨
- `front-end/components/membership/MemberForm.tsx` - RegistrationForm 컴포넌트가 대신 사용됨

## 중복 또는 불필요한 데이터 파일

### 1. 식당 데이터 중복

```
front-end/lib/data/dining/restaurants.ts
front-end/lib/data/static/restaurants.ts
```

`restaurants.ts` 파일이 두 곳에 존재하는 것으로 보이며, 현재 프론트엔드 코드는 `front-end/lib/data/dining/restaurants.ts` 파일을 참조하고 있습니다.

### 2. 미사용 데이터 파일

```
front-end/data/static/products.ts (사용하지 않는 것으로 보임)
front-end/data/static/menu.ts (사용하지 않는 것으로 보임)
```

## 사용하지 않는 서브 디렉토리 내 파일들

components/dining 디렉토리 내의 다음 서브 디렉토리들은 사용되지 않거나 일부 파일만 사용되고 있습니다:

```
front-end/components/dining/common/ 내 일부 파일들
front-end/components/dining/restaurants/ 내 일부 파일들
```

## 삭제 권장 순서

아래는 삭제 권장 순서입니다. 빈 파일부터 시작하여 점진적으로 진행하는 것이 안전합니다.

1. 빈 파일들 (0바이트)
2. 거의 비어 있는 파일들 (25바이트 미만)
3. 중복 기능 컴포넌트 (비슷한 기능을 하는 다른 컴포넌트로 대체된 경우)
4. 완전히 사용되지 않는 컴포넌트들

## 미사용 컴포넌트 정리 작업 단계

### 1. 미사용 컴포넌트 식별 (완료)

`front-end/docs/UNUSED_COMPONENTS.md` 파일에 미사용 컴포넌트 목록이 작성되어 있습니다. 이 목록은 (main) 라우트의 모든 페이지와 컴포넌트 간의 관계를 철저히 분석한 결과입니다.

### 2. 자동 삭제 스크립트 (준비 완료)

`front-end/scripts/remove-unused-components.js` 스크립트가 준비되어 있으며, 이 스크립트를 실행하면 미사용 컴포넌트들을 자동으로 삭제합니다. 삭제된 파일은 `front-end/backup-unused-components` 디렉토리에 백업됩니다.

### 3. 정리 작업 실행 방법

1. 먼저 현재 작업 내용을 커밋하고 브랜치를 최신 상태로 유지하세요:
   ```bash
   git pull origin refactoring/code-structure
   ```

2. 스크립트를 실행하여 미사용 컴포넌트를 삭제합니다:
   ```bash
   cd front-end
   node scripts/remove-unused-components.js
   ```

3. 삭제 결과를 확인하고 문제가 없으면 변경 사항을 커밋합니다:
   ```bash
   git commit -m "Remove unused components as per documentation"
   ```

### 4. 수동 검증 및 테스트

자동 삭제 후에는 다음 단계로 수동 검증이 필요합니다:

1. 프로젝트를 빌드하고 실행합니다:
   ```bash
   npm run dev   # 또는 yarn dev
   ```

2. 각 라우트 페이지를 방문하여 모든 기능이 정상적으로 작동하는지 확인합니다.

3. 오류가 발생한 경우, 백업 디렉토리에서 해당 컴포넌트를 복원합니다:
   ```bash
   cp backup-unused-components/[경로]/[파일명] [원래 경로]/[파일명]
   ```

## 추가 정리 작업 권장사항

미사용 컴포넌트 삭제 외에도 다음과 같은 추가 정리 작업을 고려할 수 있습니다:

### 1. 컴포넌트 네이밍 통일

모든 컴포넌트 이름이 일관된 규칙을 따르도록 합니다:
- 컴포넌트 이름은 PascalCase 사용
- 특정 기능 그룹에 속한 컴포넌트는 접두어 사용 (예: Room*, Dining*, etc.)
- 공통 컴포넌트는 의미 있는 이름 사용 (Button, Card, etc.)

### 2. 디렉토리 구조 통일

다음과 같은 디렉토리 구조를 일관되게 사용합니다:
```
components/
  ├── common/          # 공통 컴포넌트
  │   ├── ui/          # 기본 UI 컴포넌트
  │   ├── layout/      # 레이아웃 관련 컴포넌트
  │   └── form/        # 폼 관련 컴포넌트
  ├── [feature]/       # 기능별 컴포넌트
  │   ├── [subfeature]/# 하위 기능별 컴포넌트
  │   └── parts/       # 해당 기능 내부에서만 사용되는 작은 컴포넌트
```

### 3. 컴포넌트 문서화 표준

모든 컴포넌트에 일관된 JSDoc 스타일의 주석을 추가합니다:
```tsx
/**
 * 컴포넌트 이름
 * 
 * 컴포넌트에 대한 간략한 설명
 * 추가 설명이 필요한 경우 여기에 작성
 * 
 * @example
 * <ComponentName prop1="value" prop2={value} />
 */
export interface ComponentNameProps {
  // 프롭스 문서화
  prop1: string;
  prop2?: number;
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // 컴포넌트 구현
}
```

## 검토 및 주의사항

컴포넌트를 삭제하기 전에 다음 사항을 확인하세요:

1. 다른 컴포넌트에서 해당 컴포넌트를 import하고 있지 않은지 전체 코드베이스 검색
2. 향후 기능 확장 계획에 필요한 컴포넌트가 아닌지 검토
3. 삭제 전 백업이나 별도 브랜치에서 테스트 권장


## 후속 작업 제안

1. 실제 미사용 컴포넌트 삭제 작업 진행
2. 단위 테스트 추가
3. 백엔드 API 연동 시 서비스 레이어 구현
4. 상태 관리 도입 검토 (Redux, Zustand 등)
5. 국제화(i18n) 도입 검토
