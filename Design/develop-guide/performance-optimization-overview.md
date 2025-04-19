# Next.js 프론트엔드 성능 최적화 가이드

이 문서는 Hotel Chill 프로젝트의 프론트엔드 성능 최적화 작업에 대한 개요입니다. 각 기능과 최적화 방법에 대한 상세 내용은 관련 문서를 참조하세요.

## 문제 배경

Hotel Chill 프로젝트의 메인 페이지(`front-end/app/page.tsx`)는 다음과 같은 성능 문제가 있었습니다:

- 컴파일 시간이 길고 약 2800개 이상의 모듈이 로드됨
- 클라이언트 사이드에서 많은 API 요청 발생
- 중첩된 컴포넌트와 무거운 렌더링 로직
- 최적화되지 않은 이미지 사용

## 최적화 전략 문서 목록

프론트엔드 성능 최적화를 위해 다음 문서들을 참조하세요:

1. [성능 문제 분석 및 Next.js 렌더링 이해](./performance-analysis.md)
2. [서버 컴포넌트 활용법](./server-components.md)
3. [코드 분할과 지연 로딩 전략](./code-splitting.md)
4. [이미지 최적화 가이드](./image-optimization.md)
5. [React 컴포넌트 최적화 기법](./component-optimization.md)
6. [Next.js 설정 최적화](./next-config-optimization.md)
7. [캐싱 전략](./caching-strategies.md)
8. [성능 측정 및 모니터링](./performance-monitoring.md)

## 주요 개선 결과

성능 최적화 작업 후 다음과 같은 개선 효과를 기대할 수 있습니다:

- 메인 페이지 초기 로드 시간 감소
- JavaScript 번들 크기 감소
- 컴파일되는 모듈 수 감소
- 사용자 인터페이스 반응성 향상
- Core Web Vitals 점수 향상

## 시작하기

최적화 작업을 시작하려면 먼저 [성능 문제 분석 및 Next.js 렌더링 이해](./performance-analysis.md) 문서를 확인하고, 프로젝트에 맞는 최적화 기법을 적용하세요.

Hotel Chill 프로젝트의 모든 최적화 작업은 `performance-optimization` 브랜치에 적용되어 있습니다.
