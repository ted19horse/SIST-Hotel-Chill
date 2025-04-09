# 컴포넌트 정리 가이드

이 문서는 SIST-Hotel-Chill 프로젝트의 프론트엔드 코드에서 미사용 컴포넌트를 정리하는 과정에 대한 지침서입니다.

## 배경

프로젝트 초기 단계에서 AI Generator를 사용하여 각 기능 단위(main 그룹의 라우트)별로 개발을 진행하면서, 코드 생성 방식이 일정하지 않았고 여러 중복 컴포넌트가 생성되었습니다. 현재 백엔드 개발 직전 단계에서 프론트엔드 코드를 정리하고 통일된 구조로 개선하고 있습니다.

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

## 참고사항

- 삭제 작업은 반드시 `refactoring/code-structure` 브랜치에서 진행하세요.
- 삭제 전에 전체 프로젝트를 백업하는 것이 안전합니다.
- 미사용으로 식별된 컴포넌트 중에서도 향후 필요할 수 있는 컴포넌트는 삭제하지 않고 별도로 보관할 수 있습니다.
