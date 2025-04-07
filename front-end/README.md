# 호텔 프로젝트 프론트엔드

## 시작하기

1. 패키지 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 빌드

```bash
npm run build
```

## 백엔드 API 연동 가이드

### 1. 목업 데이터 사용 설정

개발 환경에서는 기본적으로 목업 데이터를 사용하도록 설정되어 있습니다. 이 설정은 `.env.local` 파일에서 관리됩니다:

```
NEXT_PUBLIC_USE_MOCK=true
```

목업 데이터를 사용하지 않고 실제 API 서버에 연결하려면 이 값을 `false`로 변경하세요.

### 2. API 클라이언트 사용법

API 요청은 다음과 같이 사용할 수 있습니다:

```typescript
import api from '@/lib/api';

// 레스토랑 목록 조회
const restaurants = await api.dining.getRestaurants({
  mealTime: 'lunch',
  diningStyle: 'casual',
  searchQuery: '테라스',
});

// 레스토랑 상세 조회
const restaurant = await api.dining.getRestaurant({ id: 1 });

// 이벤트 조회
const events = await api.dining.getEvents({ isActive: true });
```

### 3. useApi 훅 사용법

컴포넌트에서 API 요청 상태를 관리하려면 `useApi` 훅을 사용하세요:

```tsx
import { useApi } from '@/lib/hooks/useApi';
import api from '@/lib/api';

function RestaurantList() {
  const {
    data,
    isLoading,
    isError,
    error,
    execute: fetchRestaurants,
  } = useApi(
    'dining/getRestaurants',
    api.dining.getRestaurants,
    null,
    true // 컴포넌트 마운트 시 자동 실행
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h1>레스토랑 목록</h1>
      <ul>
        {data?.data.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
      <button onClick={() => fetchRestaurants({ mealTime: 'dinner' })}>저녁 식사 필터링</button>
    </div>
  );
}
```

### 4. API 추가 및 확장

1. 새 API 엔드포인트를 추가하려면 다음 단계를 따르세요:

   - `/lib/api/{모듈명}.ts` 파일에 새 함수 추가
   - 필요한 타입 정의를 `/types/api/{모듈명}.ts`에 추가
   - `/lib/api/index.ts`에 새 모듈이 있다면 등록

2. 목업 데이터 추가를 위해서는:

   - `/lib/api/mock-adapter.ts` 파일에 새 핸들러 함수 추가
   - 목업 데이터를 위한 함수 로직 구현
