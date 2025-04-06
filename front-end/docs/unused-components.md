# `(main)` 라우터 미사용 객실 컴포넌트 목록

현재 `front-end/app/(main)` 라우터에서 사용하지 않는 객실 관련 컴포넌트들의 목록입니다.

## 필터 관련 컴포넌트

```
📁 front-end/components/rooms/
├─ RoomFilters.tsx
└─ RoomFiltersContent.tsx
```

- 필터 기능 제거로 현재 미사용
- `page.tsx`에서 import만 되어있고 실제로 사용되지 않음

## 리스트 관련 컴포넌트

```
📁 front-end/components/rooms/
├─ RoomList.tsx
└─ RoomListContent.tsx
```

- Grid 형태로 변경되어 현재 미사용
- `RoomGrid` 컴포넌트로 대체됨

## 캐러셀 관련 컴포넌트

```
📁 front-end/components/rooms/carousel/
└─ RoomCarousel.tsx
```

- 이전 버전의 캐러셀 컴포넌트
- 현재는 다른 UI 구조 사용 중

## 전체 파일 목록

```
front-end/components/rooms/
├─ RoomFilters.tsx
├─ RoomFiltersContent.tsx
├─ RoomList.tsx
├─ RoomListContent.tsx
└─ carousel/
   └─ RoomCarousel.tsx
```

## 참고사항

- `RoomBookingPage.tsx`와 `RoomBookingPageContent.tsx`는 `/rooms/booking` 라우터에서 사용 중
- `RoomSection.tsx`는 레이아웃 컴포넌트로 다른 페이지에서 재사용 가능
- `AmenityGroupComponent.tsx`는 `RoomDetailModal`에서 사용 중
