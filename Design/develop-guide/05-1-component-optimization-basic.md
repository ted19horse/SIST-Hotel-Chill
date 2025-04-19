# React 컴포넌트 최적화 가이드 - 기본 기법

이 문서는 Next.js와 React 애플리케이션에서 컴포넌트 최적화의 기본 기법에 대해 설명합니다. 효율적인 컴포넌트 설계와 렌더링 최적화 기법을 통해 웹 애플리케이션의 성능을 크게 향상시킬 수 있습니다.

## 목차

1. [컴포넌트 렌더링 이해하기](#컴포넌트-렌더링-이해하기)
2. [메모이제이션 기법](#메모이제이션-기법)
3. [상태 관리 최적화](#상태-관리-최적화)
4. [이벤트 핸들러 최적화](#이벤트-핸들러-최적화)

## 컴포넌트 렌더링 이해하기

React 컴포넌트는 다음과 같은 경우에 리렌더링됩니다:

1. **상태(state) 변경**: 컴포넌트 내부 상태가 `useState` 또는 `useReducer`로 변경될 때
2. **속성(props) 변경**: 부모 컴포넌트로부터 전달받은 속성이 변경될 때
3. **부모 컴포넌트 리렌더링**: 부모 컴포넌트가 리렌더링되면 기본적으로 모든 자식 컴포넌트도 리렌더링됨
4. **컨텍스트(context) 변경**: `useContext`로 사용 중인 컨텍스트 값이 변경될 때

불필요한 리렌더링을 방지하는 것이 성능 최적화의 핵심입니다.

### 렌더링 과정 디버깅

컴포넌트 렌더링을 디버깅하기 위해 React DevTools와 함께 다음과 같은 방법을 사용할 수 있습니다:

```tsx
// 개발 중 리렌더링 확인을 위한 로그 추가
function MyComponent() {
  console.log('MyComponent rendered');
  
  // ... 컴포넌트 내용
}

// 또는 useEffect 활용
useEffect(() => {
  console.log('MyComponent rendered');
}, []); // 빈 배열: 마운트 시에만 실행
```

## 메모이제이션 기법

메모이제이션은 이전에 계산한 결과를 저장하여 동일한 입력에 대해 계산을 반복하지 않는 최적화 기법입니다. React에서는 세 가지 주요 메모이제이션 도구를 제공합니다.

### React.memo

`React.memo`는 컴포넌트 자체를 메모이제이션하여, props가 변경되지 않으면 리렌더링을 방지합니다.

```tsx
import { memo } from 'react';

// 일반 컴포넌트
function MyComponent({ name, age }: { name: string; age: number }) {
  console.log('MyComponent rendered');
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

// 메모이제이션된 컴포넌트
const MemoizedComponent = memo(MyComponent);
// 또는 직접 정의
const MemoizedComponent = memo(function MyComponent({ name, age }) {
  // ...
});

// 사용
<MemoizedComponent name="John" age={25} />
```

**사용자 정의 비교 함수**:

```tsx
const MemoizedComponent = memo(MyComponent, (prevProps, nextProps) => {
  // true를 반환하면 리렌더링 건너뛰기
  // false를 반환하면 리렌더링 수행
  return prevProps.name === nextProps.name; // age 변경은 무시
});
```

### useMemo

`useMemo`는 계산 비용이 큰 값을 메모이제이션합니다. 의존성 배열의 값이 변경될 때만 재계산됩니다.

```tsx
import { useMemo } from 'react';

function ExpensiveComponent({ data, filter }: { data: any[]; filter: string }) {
  // 데이터 필터링과 같은 비용이 큰 계산을 메모이제이션
  const filteredData = useMemo(() => {
    console.log('Filtering data...');
    return data.filter(item => item.name.includes(filter));
  }, [data, filter]); // data나 filter가 변경될 때만 재계산
  
  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

`useMemo`를 사용하기 좋은 경우:
- 데이터 변환이나 필터링 같은 복잡한 계산
- 자식 컴포넌트에 전달되는 객체나 배열 (참조 비교 문제 방지)
- 렌더링 시마다 새로운 참조가 생성되는 객체

### useCallback

`useCallback`은 함수를 메모이제이션합니다. 의존성 배열의 값이 변경될 때만 새 함수가 생성됩니다.

```tsx
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 일반 함수 정의 - 컴포넌트가 리렌더링될 때마다 새로운 함수 생성
  const handleClick = () => {
    setCount(count + 1);
  };
  
  // 메모이제이션된 함수 - count가 변경될 때만 새로운 함수 생성
  const handleClickMemoized = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  // 의존성 없는 함수 (상태 업데이터 함수 사용)
  const handleClickOptimized = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // 빈 의존성 배열 - 컴포넌트 마운트 시 한 번만 생성
  
  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClickMemoized} />
    </div>
  );
}

// 메모이제이션된 자식 컴포넌트
const ChildComponent = memo(function ChildComponent({ onClick }) {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Increment</button>;
});
```

`useCallback`을 사용하기 좋은 경우:
- 메모이제이션된 자식 컴포넌트에 전달되는 함수
- 의존성 배열에 포함되는 함수 (useEffect 등)
- 동일성 비교가 필요한 함수 (ReactQuery의 쿼리 함수 등)

### 메모이제이션 사용 시 주의사항

1. **과도한 사용 금지**: 모든 컴포넌트와 함수를 메모이제이션하면 메모리 사용량이 증가하고 오히려 성능이 저하될 수 있습니다.
2. **적절한 사용 시점**:
   - 자주 리렌더링되는 컴포넌트
   - 계산 비용이 큰 작업
   - 자식 컴포넌트에 전달되는 함수나 객체
3. **올바른 의존성 배열 설정**: 의존성 배열을 잘못 설정하면 오래된 값(stale value)을 참조하는 버그가 발생할 수 있습니다.

## 상태 관리 최적화

상태 관리 최적화는 리렌더링을 최소화하고 애플리케이션 성능을 향상시키는 중요한 요소입니다.

### 상태 구조화

상태를 적절히 구조화하여 필요한 부분만 업데이트되도록 합니다:

```tsx
// 🔴 비효율적인 상태 구조
const [user, setUser] = useState({
  name: 'John',
  age: 25,
  address: {
    city: 'Seoul',
    zipcode: '12345'
  }
});

// 주소만 업데이트하려면 전체 객체를 복사해야 함
setUser({
  ...user,
  address: {
    ...user.address,
    city: 'Busan'
  }
});

// 🟢 효율적인 상태 분리
const [name, setName] = useState('John');
const [age, setAge] = useState(25);
const [address, setAddress] = useState({
  city: 'Seoul',
  zipcode: '12345'
});

// 주소만 업데이트
setAddress({
  ...address,
  city: 'Busan'
});
```

### 상태 끌어올리기 vs 상태 내리기

상태를 적절한 레벨에 위치시키는 것이 중요합니다:

1. **상태 끌어올리기**: 여러 컴포넌트가 같은 상태를 공유해야 할 때 공통 조상 컴포넌트로 상태를 이동시킵니다.
2. **상태 내리기**: 특정 컴포넌트에서만 사용되는 상태는 해당 컴포넌트 내부에 유지하여 불필요한 리렌더링을 방지합니다.

```tsx
// 🔴 모든 상태를 부모 컴포넌트에 유지
function ParentComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  return (
    <div>
      <ProfileForm 
        name={name} 
        email={email} 
        onNameChange={setName} 
        onEmailChange={setEmail} 
      />
      <AddressForm 
        address={address} 
        onAddressChange={setAddress} 
      />
    </div>
  );
}

// 🟢 컴포넌트별로 상태 분리
function ParentComponent() {
  return (
    <div>
      <ProfileForm />
      <AddressForm />
    </div>
  );
}

function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // 나머지 구현...
}

function AddressForm() {
  const [address, setAddress] = useState('');
  
  // 나머지 구현...
}
```

### 컨텍스트 최적화

React Context는 컴포넌트 트리 깊은 곳까지 상태를 전달할 수 있지만, 최적화하지 않으면 성능 문제가 발생할 수 있습니다:

```tsx
// 🔴 비효율적인 컨텍스트 사용
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({});
  
  // 모든 값을 하나의 객체로 전달
  const value = { user, setUser, theme, setTheme, settings, setSettings };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// 🟢 분리된 컨텍스트 사용
const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();

function AppProvider({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

## 이벤트 핸들러 최적화

이벤트 핸들러는 자주 생성되는 함수이므로 최적화가 중요합니다.

### 인라인 함수 지양하기

인라인 함수는 매 렌더링마다 새로 생성되므로, 자식 컴포넌트에 전달될 때는 useCallback을 사용하는 것이 좋습니다:

```tsx
// 🔴 인라인 함수 사용
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Child onClick={() => setCount(count + 1)} />
    </div>
  );
}

// 🟢 메모이제이션된 함수 사용
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return (
    <div>
      <Child onClick={handleClick} />
    </div>
  );
}
```

### 이벤트 위임 활용하기

많은 유사한 이벤트 핸들러가 있는 경우, 이벤트 위임(event delegation)을 사용하여 핸들러 수를 줄일 수 있습니다:

```tsx
// 🔴 각 항목마다 별도의 핸들러
function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// 🟢 이벤트 위임 사용
function ItemList({ items }) {
  const handleClick = useCallback((e) => {
    const itemId = e.target.dataset.id;
    if (itemId) {
      handleItemClick(itemId);
    }
  }, []);
  
  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

**다음 문서**에서는 리스트 렌더링 최적화, 조건부 렌더링 최적화, 컴포넌트 계층 구조 최적화, 그리고 Hotel Chill 프로젝트 적용 사례에 대해 알아보겠습니다.

[컴포넌트 최적화 고급 가이드 보기](./05-2-component-optimization-advanced.md)
