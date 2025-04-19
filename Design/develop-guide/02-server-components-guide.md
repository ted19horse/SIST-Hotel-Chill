# Next.js 서버 컴포넌트 최적화 가이드

이 문서는 Next.js 애플리케이션에서 서버 컴포넌트를 활용한 성능 최적화 방법에 대해 설명합니다. 서버 컴포넌트는 Next.js 13 이상에서 도입된 기능으로, 클라이언트 측 JavaScript 번들 크기를 줄이고 초기 로딩 성능을 향상시키는 데 도움이 됩니다.

## 목차

1. [서버 컴포넌트란?](#서버-컴포넌트란)
2. [서버 컴포넌트의 장점](#서버-컴포넌트의-장점)
3. [서버 컴포넌트 사용 방법](#서버-컴포넌트-사용-방법)
4. [서버 컴포넌트에서 데이터 페칭](#서버-컴포넌트에서-데이터-페칭)
5. [서버 컴포넌트와 클라이언트 컴포넌트 조합하기](#서버-컴포넌트와-클라이언트-컴포넌트-조합하기)
6. [Hotel Chill 프로젝트 적용 사례](#hotel-chill-프로젝트-적용-사례)

## 서버 컴포넌트란?

서버 컴포넌트는 서버에서 렌더링되어 HTML로 클라이언트에 전송되는 React 컴포넌트입니다. 서버 컴포넌트는 클라이언트 측 JavaScript 번들에 포함되지 않기 때문에, 클라이언트가 다운로드하고 실행해야 하는 JavaScript 양을 줄일 수 있습니다.

Next.js 13 이상에서는 모든 컴포넌트가 기본적으로 서버 컴포넌트로 취급됩니다. 클라이언트에서 실행되어야 하는 컴포넌트만 `'use client'` 지시문을 추가하면 됩니다.

```typescript
// 서버 컴포넌트 예시 (기본값)
export default function ServerComponent() {
  return <div>이 컴포넌트는 서버에서 렌더링됩니다</div>;
}

// 클라이언트 컴포넌트 예시
'use client';
import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      클릭 횟수: {count}
    </button>
  );
}
```

## 서버 컴포넌트의 장점

서버 컴포넌트를 사용하면 다음과 같은 장점이 있습니다:

1. **더 작은 JavaScript 번들 크기**
   - 서버 컴포넌트는 클라이언트에 JavaScript 코드를 전송하지 않음
   - 결과적으로 초기 페이지 로드 시간 단축

2. **서버 리소스 직접 접근**
   - 서버 컴포넌트는 데이터베이스, 파일 시스템 등 서버 리소스에 직접 접근 가능
   - API 라우트를 통한 중간 단계 없이 데이터 액세스 가능

3. **개선된 초기 로드 성능**
   - 사용자는 JavaScript 번들을 다운로드하고 실행하기 전에 HTML을 볼 수 있음
   - First Contentful Paint(FCP) 시간 향상

4. **향상된 SEO**
   - 검색 엔진은 JavaScript 실행 없이 완전한 HTML 콘텐츠를 볼 수 있음
   - 인덱싱 및 검색 랭킹 개선 가능성

## 서버 컴포넌트 사용 방법

Next.js 13 이상에서 서버 컴포넌트를 사용하는 방법은 매우 간단합니다:

1. **기본적으로 모든 컴포넌트는 서버 컴포넌트입니다**
   - 파일 상단에 `'use client'` 지시문이 없으면 서버 컴포넌트로 취급됨
   - app 디렉토리 내의 페이지와 레이아웃은 기본적으로 서버 컴포넌트

2. **서버 컴포넌트 제한사항 이해하기**
   - `useState`, `useEffect`, `useContext` 등의 React 훅 사용 불가
   - 브라우저 API(localStorage, window 등) 사용 불가
   - 이벤트 핸들러(onClick, onChange 등) 사용 불가

3. **클라이언트 컴포넌트로 전환하기**
   - 브라우저 API나 React 훅이 필요한 경우 파일 상단에 `'use client'` 추가
   - 가능한 최소한의 컴포넌트만 클라이언트 컴포넌트로 만들기

## 서버 컴포넌트에서 데이터 페칭

서버 컴포넌트의 가장 큰 장점 중 하나는 서버에서 직접 데이터를 가져올 수 있다는 것입니다. 이는 클라이언트 측에서 데이터를 가져오는 것보다 여러 가지 장점이 있습니다:

1. **직접 데이터베이스 접근**
   - API 요청 없이 데이터 소스에 직접 접근 가능
   - 네트워크 오버헤드 감소

2. **API 요청 숨기기**
   - API 키와 같은 민감한 정보를 클라이언트에 노출하지 않음
   - 더 안전한 데이터 액세스

3. **비동기 데이터 페칭**
   - `async/await`를 컴포넌트에서 직접 사용 가능
   - 클라이언트 컴포넌트에서는 필요한 `useEffect`와 상태 관리 코드 제거

### 서버 컴포넌트에서 데이터 페칭 예제

```typescript
// app/page.tsx (서버 컴포넌트)
import { getRoomTypes } from '@/lib/api/rooms';

// 서버 컴포넌트는 async/await 직접 사용 가능
export default async function HomePage() {
  // 서버에서 데이터 페칭
  const rooms = await getRoomTypes();
  
  return (
    <main>
      <h1>객실 안내</h1>
      <RoomList rooms={rooms} />
    </main>
  );
}
```

데이터 페칭 함수 예제:

```typescript
// lib/api/rooms.ts
export async function getRoomTypes() {
  try {
    // 서버에서 직접 fetch 사용
    const response = await fetch(`${process.env.API_URL}/api/rooms/getRoomTypes`, {
      cache: 'no-store', // 캐싱 옵션
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch room types: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching room types:', error);
    return []; // 에러 처리
  }
}
```

## 서버 컴포넌트와 클라이언트 컴포넌트 조합하기

대부분의 애플리케이션은 서버 컴포넌트와 클라이언트 컴포넌트를 함께 사용해야 합니다. 서버에서 데이터를 가져오고 기본 UI를 렌더링한 다음, 상호작용이 필요한 부분만 클라이언트 컴포넌트로 구현하는 것이 좋습니다.

### 데이터 흐름 패턴

서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 전달하는 일반적인 패턴:

```typescript
// 서버 컴포넌트
export default async function Page() {
  // 서버에서 데이터 페칭
  const data = await fetchData();
  
  // 클라이언트 컴포넌트에 props로 데이터 전달
  return <ClientComponent data={data} />;
}

// 클라이언트 컴포넌트
'use client';
export function ClientComponent({ data }) {
  // 서버에서 받은 데이터로 상호작용 UI 구현
  return <div>{/* ... */}</div>;
}
```

### "서버 컴포넌트 우선" 접근법

성능을 최적화하려면 "서버 컴포넌트 우선" 접근법을 따르는 것이 좋습니다:

1. 모든 컴포넌트를 서버 컴포넌트로 시작
2. 필요한 경우에만 `'use client'` 지시문 추가
3. 클라이언트 상태와 이벤트 핸들러가 필요한 컴포넌트만 클라이언트 컴포넌트로 전환
4. 가능한 클라이언트 컴포넌트를 작게 유지하고 복잡한 로직은 서버 컴포넌트로 이동

## Hotel Chill 프로젝트 적용 사례

Hotel Chill 프로젝트에서는 다음과 같이 서버 컴포넌트를 활용했습니다:

### 메인 페이지에서 서버 데이터 페칭

기존의 클라이언트 측 데이터 페칭 방식:

```typescript
// before: 클라이언트 컴포넌트에서 데이터 페칭
'use client';
import axios from 'axios';

export default function RoomSection() {
  const [rooms, setRooms] = useState([]);

  // 클라이언트 측에서 API 호출
  useEffect(() => {
    const getRoomsData = async () => {
      const response = await axios.get('/api/rooms/getRoomTypes');
      setRooms(response.data);
    };
    getRoomsData();
  }, []);

  return (
    <section>
      <RoomCarousel rooms={rooms} />
    </section>
  );
}
```

최적화 후 서버 컴포넌트에서 데이터 페칭:

```typescript
// after: 서버 컴포넌트에서 데이터 페칭
// app/page.tsx (서버 컴포넌트)
import { getRoomTypes } from '@/lib/api/rooms';
import RoomSection from '@/components/rooms/RoomSection';

export default async function Home() {
  // 서버 컴포넌트에서 데이터 페칭
  const rooms = await getRoomTypes();

  return (
    <main>
      {/* 데이터를 props로 전달 */}
      <RoomSection rooms={rooms} />
    </main>
  );
}

// components/rooms/RoomSection.tsx (클라이언트 컴포넌트)
'use client';

interface RoomSectionProps {
  rooms: RoomType[]; // 서버에서 전달받은 데이터
}

export default function RoomSection({ rooms = [] }: RoomSectionProps) {
  // 클라이언트에서 API 호출하는 코드 제거됨
  return (
    <section>
      <RoomCarousel rooms={rooms} />
    </section>
  );
}
```

### 성능 개선 결과

서버 컴포넌트로 리팩토링한 결과:

1. **클라이언트 번들 크기 감소**
   - 데이터 페칭 로직이 서버로 이동하여 클라이언트 코드 감소
   - axios 같은 라이브러리를 클라이언트에서 제거 가능

2. **초기 로드 시간 개선**
   - 데이터가 이미 서버에서 가져와져 HTML에 포함되어 전송됨
   - 클라이언트 측 데이터 로딩 지연 제거

3. **로딩 상태 관리 단순화**
   - 클라이언트 측 로딩 상태 관리 코드 제거
   - Suspense를 통한 더 효율적인 로딩 처리 가능
