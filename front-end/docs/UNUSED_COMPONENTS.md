# 미사용 컴포넌트 목록

이 문서는 프로젝트 내에서 현재 사용되지 않고 있는 컴포넌트들의 목록입니다. (main) 라우트의 모든 페이지와 컴포넌트 간의 관계를 분석한 결과입니다.

## 다이닝(dining) 관련 미사용 컴포넌트

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
- `front-end/components/dining/DiningSection.tsx` - 다이닝 관련 페이지에서 사용되지 않음
- `front-end/components/dining/DiningFilters.tsx` - RestaurantFilter가 대신 사용됨
- `front-end/components/dining/RestaurantGrid.tsx` - RestaurantCard를 직접 사용하고 있음

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

## 삭제 권장 순서

아래는 삭제 권장 순서입니다. 빈 파일부터 시작하여 점진적으로 진행하는 것이 안전합니다.

1. 빈 파일들 (0바이트)
2. 거의 비어 있는 파일들 (25바이트 미만)
3. 중복 기능 컴포넌트 (비슷한 기능을 하는 다른 컴포넌트로 대체된 경우)
4. 완전히 사용되지 않는 컴포넌트들

## 검토 및 주의사항

컴포넌트를 삭제하기 전에 다음 사항을 확인하세요:

1. 다른 컴포넌트에서 해당 컴포넌트를 import하고 있지 않은지 전체 코드베이스 검색
2. 향후 기능 확장 계획에 필요한 컴포넌트가 아닌지 검토
3. 삭제 전 백업이나 별도 브랜치에서 테스트 권장

## 추가 리팩토링 고려사항

- 중복된 기능의 컴포넌트들을 통합
- 컴포넌트 이름 규칙 통일
- 디렉토리 구조 일관성 확보
