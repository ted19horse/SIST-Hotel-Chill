# Next.js 프론트엔드 성능 최적화 가이드 - 개요

이 문서는 Hotel Chill 프로젝트의 프론트엔드 성능 최적화 작업에 대한 상세 가이드의 개요입니다. Next.js와 React 초보자를 위해 최적화 방법과 각 기법의 효과를 소개합니다.

## 목차

1. [성능 최적화 가이드 - 개요](./01-performance-optimization-overview.md) (현재 문서)
2. [서버 컴포넌트 최적화 가이드](./02-server-components-guide.md)
3. [코드 분할 및 지연 로딩 가이드](./03-code-splitting-guide.md)
4. [이미지 최적화 가이드](./04-image-optimization-guide.md)
5. [컴포넌트 최적화 가이드](./05-component-optimization-guide.md)
6. [Next.js 설정 최적화 가이드](./06-nextjs-config-guide.md)

## 성능 문제 분석

Hotel Chill 프로젝트의 메인 페이지(`front-end/app/page.tsx`)는 다음과 같은 성능 문제가 있었습니다:

- 컴파일 시간이 길고 약 2800개 이상의 모듈이 로드됨
- 클라이언트 사이드에서 많은 API 요청 발생
- 중첩된 컴포넌트와 무거운 렌더링 로직
- 최적화되지 않은 이미지 사용
- 중복된 코드 및 컴포넌트

## Next.js 렌더링 방식 이해하기

Next.js 13 이상에서는 두 가지 주요 렌더링 방식이 있습니다:

**서버 컴포넌트(기본값)**: 
- 서버에서 렌더링되어 HTML로 클라이언트에 전송
- JavaScript 번들에 포함되지 않아 클라이언트 로드 시간 감소
- `'use client'` 지시문이 없으면 기본적으로 서버 컴포넌트임

**클라이언트 컴포넌트**: 
- `'use client'` 지시문으로 시작하는 컴포넌트
- 브라우저에서 실행되고 상호작용 처리
- React 상태와 효과를 사용할 수 있음

```typescript
// 서버 컴포넌트 예시 - 'use client' 지시문 없음
export default function ServerComponent() {
  return <div>서버에서 렌더링됨</div>;
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

## 성능 최적화 전략 요약

Hotel Chill 프로젝트의 성능 개선을 위해 다음과 같은 전략을 적용했습니다:

1. **서버 컴포넌트 활용**
   - 서버에서 데이터 페칭
   - 클라이언트로 전송되는 JS 번들 크기 감소

2. **코드 분할 및 지연 로딩**
   - 동적 임포트를 통한 코드 분할
   - React Suspense를 활용한 스트리밍 렌더링
   - 스켈레톤 UI 적용

3. **이미지 최적화**
   - Next.js Image 컴포넌트 활용
   - 이미지 크기 및 품질 최적화
   - 우선순위 및 지연 로딩 전략

4. **컴포넌트 최적화**
   - React.memo, useCallback, useMemo 활용
   - 불필요한 리렌더링 방지
   - 인터섹션 옵저버 최적화

5. **Next.js 설정 최적화**
   - next.config.js 설정
   - 웹 폰트 최적화
   - 메타데이터 최적화

6. **캐싱 전략**
   - React Query 설정 최적화
   - Next.js 데이터 캐싱 활용

## 개선 결과

성능 최적화 작업 후 다음과 같은 개선 효과를 확인할 수 있었습니다:

- 메인 페이지 초기 로드 시간 감소
- Time to Interactive (TTI) 개선
- Largest Contentful Paint (LCP) 개선
- 초기 JavaScript 번들 크기 감소
- 컴파일되는 모듈 수 감소
- 사용자 경험 개선

## 각 최적화 기법 세부 가이드

각 최적화 전략에 대한 세부 내용은 해당 문서를 참조하세요:

1. [서버 컴포넌트 최적화 가이드](./02-server-components-guide.md)
2. [코드 분할 및 지연 로딩 가이드](./03-code-splitting-guide.md)
3. [이미지 최적화 가이드](./04-image-optimization-guide.md)
4. [컴포넌트 최적화 가이드](./05-component-optimization-guide.md)
5. [Next.js 설정 최적화 가이드](./06-nextjs-config-guide.md)
