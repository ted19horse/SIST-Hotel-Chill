# 미사용 컴포넌트 및 데이터 파일 정리 문서

이 문서는 front-end/app/(main) 라우트 그룹 내의 페이지와 컴포넌트를 분석하여 사용하지 않는 컴포넌트와 데이터 파일들을 정리한 내용입니다.

## 미사용 컴포넌트 (비어있거나 최소한의 내용만 있는 파일)

### 1. dining 관련 미사용 컴포넌트

```
front-end/components/dining/CategoryGrid.tsx (비어있음)
front-end/components/dining/FeaturedProducts.tsx (비어있음)
front-end/components/dining/ProductFilters.tsx (비어있음)
front-end/components/dining/ShopInfo.tsx (비어있음)
front-end/components/dining/GiftShopSection.tsx (최소 내용)
front-end/components/dining/ProductGrid.tsx (최소 내용)
front-end/components/dining/ProductSearch.tsx (최소 내용)
front-end/components/dining/ShopIntro.tsx (최소 내용)
```

### 2. 미사용 gift-shop 관련 컴포넌트

gift-shop 디렉토리의 컴포넌트들을 확인한 결과, dining 컴포넌트에서 참조하고 있는 gift-shop 관련 코드가 있었으나 실제로 사용되지 않고 있는 것으로 보입니다.

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

## 권장 정리 작업

1. 비어있는 파일 및 최소 내용만 있는 파일 삭제
2. 중복 데이터 파일을 정리하고 하나의 소스를 사용하도록 표준화
3. dining/common 및 dining/restaurants 디렉토리 내의 사용되지 않는 파일들 정리
4. 미사용 데이터 파일들 정리

## 주의 사항

파일을 삭제하기 전에 다음 사항을 확인하세요:

1. 해당 컴포넌트나 데이터 파일이 다른 곳에서 import되어 사용되고 있는지 확인
2. 테스트 코드나 다른 영역에서 참조하고 있지 않은지 확인
3. 향후 개발 계획에 필요한 파일이 아닌지 확인

삭제 전에 백업하거나 별도의 브랜치에서 작업하는 것을 권장합니다.
