# React 컴포넌트 최적화 가이드 - 고급 기법

이 문서는 React 애플리케이션에서 컴포넌트 최적화의 고급 기법에 대해 설명합니다. 이전 문서의 [기본 최적화 기법](./05-1-component-optimization-basic.md)을 이해하고 있다는 전제하에 더 심화된 최적화 방법을 다룹니다.

## 목차

1. [리스트 렌더링 최적화](#리스트-렌더링-최적화)
2. [조건부 렌더링 최적화](#조건부-렌더링-최적화)
3. [컴포넌트 계층 구조 최적화](#컴포넌트-계층-구조-최적화)
4. [Hotel Chill 프로젝트 적용 사례](#hotel-chill-프로젝트-적용-사례)

## 리스트 렌더링 최적화

리스트 렌더링은 React 앱에서 가장 일반적인 성능 병목 중 하나입니다.

### 안정적인 key 사용하기

React는 key를 사용하여 리스트 항목을 식별하고 변경 사항을 효율적으로 처리합니다. 항상 고유하고 안정적인 key를 사용해야 합니다:

```tsx
// 🔴 인덱스를 key로 사용 (항목 재정렬 시 문제 발생)
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}

// 🔴 불안정한 key 사용
{items.map(item => (
  <ListItem key={Math.random()} item={item} />
))}

// 🟢 안정적인 고유 ID 사용
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

### 가상화(Virtualization) 적용하기

목록의 항목이 많은 경우, 화면에 보이는 항목만 렌더링하는 가상화 기법을 사용할 수 있습니다:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualizedList({ items }) {
  const parentRef = useRef();
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // 항목 높이 추정값
  });
  
  return (
    <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={items[virtualItem.index].id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

주요 가상화 라이브러리:
- `@tanstack/react-virtual`: 가장 현대적이고 유연한 가상화 라이브러리
- `react-window`: 가벼운 가상화 라이브러리
- `react-virtualized`: 더 많은 기능을 제공하지만 번들 크기가 큰 가상화 라이브러리

### 리스트 아이템 메모이제이션

리스트의 각 항목을 메모이제이션하여 특정 항목만 업데이트되도록 최적화할 수 있습니다:

```tsx
// 메모이제이션된 리스트 아이템 컴포넌트
const ListItem = memo(function ListItem({ item, onItemClick }) {
  return (
    <li onClick={() => onItemClick(item.id)}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </li>
  );
});

// 리스트 컴포넌트
function List({ items }) {
  // 각 항목별 클릭 핸들러를 한 번만 생성
  const itemClickHandlers = useMemo(() => {
    return items.reduce((handlers, item) => {
      handlers[item.id] = () => handleItemClick(item.id);
      return handlers;
    }, {});
  }, [items]);
  
  return (
    <ul>
      {items.map(item => (
        <ListItem 
          key={item.id} 
          item={item} 
          onItemClick={itemClickHandlers[item.id]} 
        />
      ))}
    </ul>
  );
}
```

## 조건부 렌더링 최적화

조건부 렌더링은 UI의 일부를 조건에 따라 표시하는 일반적인 패턴이지만, 잘못 사용하면 성능 문제가 발생할 수 있습니다.

### 불필요한 래퍼 요소 제거

조건부 렌더링 시 불필요한 래퍼 요소를 최소화합니다:

```tsx
// 🔴 불필요한 div 래퍼 사용
function Component({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user.name}</h2>
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
        </div>
      )}
    </div>
  );
}

// 🟢 래퍼 최소화
function Component({ isLoggedIn, user }) {
  return (
    <div>
      <h2>
        {isLoggedIn ? `Welcome, ${user.name}` : 'Please log in'}
      </h2>
    </div>
  );
}
```

### 렌더링 로직 최적화

조건부 렌더링 로직을 최적화하여 불필요한 계산을 피합니다:

```tsx
// 🔴 비효율적인 조건부 렌더링 - 두 조건 모두 계산
function UserGreeting({ user, isAdmin }) {
  // user가 null이어도 isAdmin 계산은 수행됨
  return (
    <div>
      {user && <p>Hello, {user.name}</p>}
      {isAdmin && <AdminPanel />}
    </div>
  );
}

// 🟢 단락 평가를 활용한 최적화
function UserGreeting({ user, isAdmin }) {
  // user가 null이면 아래 코드는 실행되지 않음
  if (!user) return null;
  
  return (
    <div>
      <p>Hello, {user.name}</p>
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

### 지연 렌더링 활용

모든 콘텐츠를 한 번에 렌더링하는 대신, 필요할 때만 렌더링하는 지연 렌더링 기법을 활용합니다:

```tsx
function TabPanel({ activeTab }) {
  // 🔴 모든 탭 콘텐츠를 렌더링하고 CSS로 숨김
  return (
    <div>
      <div style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}>
        <Tab1Content />
      </div>
      <div style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}>
        <Tab2Content />
      </div>
      <div style={{ display: activeTab === 'tab3' ? 'block' : 'none' }}>
        <Tab3Content />
      </div>
    </div>
  );
}

// 🟢 활성 탭만 렌더링
function TabPanel({ activeTab }) {
  return (
    <div>
      {activeTab === 'tab1' && <Tab1Content />}
      {activeTab === 'tab2' && <Tab2Content />}
      {activeTab === 'tab3' && <Tab3Content />}
    </div>
  );
}
```

### 콘텐츠 로드 스플리팅

복잡한 페이지의 경우, 현재 필요한 콘텐츠만 먼저 로드하고 나머지는 나중에 로드하는 전략을 사용할 수 있습니다:

```tsx
function Dashboard() {
  const [loadDetails, setLoadDetails] = useState(false);
  
  // 주요 콘텐츠가 렌더링된 후 세부 정보 로드
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadDetails(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      <MainStats /> {/* 즉시 렌더링 */}
      
      {loadDetails ? (
        <>
          <DetailedCharts /> {/* 지연 렌더링 */}
          <ActivityLogs />
        </>
      ) : (
        <Skeleton height="400px" />
      )}
    </div>
  );
}
```

## 컴포넌트 계층 구조 최적화

컴포넌트 계층 구조는 렌더링 성능에 큰 영향을 미칩니다.

### 컴포넌트 분할

큰 컴포넌트를 작은 단위로 분할하여 리렌더링 범위를 최소화합니다:

```tsx
// 🔴 단일 대형 컴포넌트
function ProfilePage({ user }) {
  const [activeTab, setActiveTab] = useState('posts');
  
  return (
    <div>
      <header>
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </header>
      
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'posts' && (
        <div>
          {user.posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
      
      {activeTab === 'photos' && (
        <div>
          {user.photos.map(photo => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
}

// 🟢 분할된 컴포넌트
function ProfilePage({ user }) {
  const [activeTab, setActiveTab] = useState('posts');
  
  return (
    <div>
      <ProfileHeader user={user} />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      <TabContent activeTab={activeTab} user={user} />
    </div>
  );
}

// 메모이제이션된 하위 컴포넌트들
const ProfileHeader = memo(({ user }) => (
  <header>
    <h1>{user.name}</h1>
    <p>{user.bio}</p>
  </header>
));

const TabContent = memo(({ activeTab, user }) => {
  switch (activeTab) {
    case 'posts':
      return <PostList posts={user.posts} />;
    case 'photos':
      return <PhotoGrid photos={user.photos} />;
    default:
      return null;
  }
});
```

### 컴포넌트 합성 활용

중첩된 렌더링 대신 컴포넌트 합성(composition)을 활용하여 불필요한 리렌더링을 방지합니다:

```tsx
// 🔴 props 드릴링 및 불필요한 리렌더링
function Page({ user }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Header user={user} />
      <Counter count={count} onIncrement={() => setCount(count + 1)} />
      <Footer user={user} />
    </div>
  );
}

// 🟢 컴포넌트 합성 활용
function Page({ user }) {
  const [count, setCount] = useState(0);
  
  // user가 변경되더라도 Counter 리렌더링 방지
  return (
    <PageLayout
      header={<Header user={user} />}
      content={<Counter count={count} onIncrement={() => setCount(count + 1)} />}
      footer={<Footer user={user} />}
    />
  );
}

function PageLayout({ header, content, footer }) {
  return (
    <div>
      <div className="header">{header}</div>
      <div className="content">{content}</div>
      <div className="footer">{footer}</div>
    </div>
  );
}
```

### Context를 사용한 상태 격리

Context를 사용하여 특정 상태와 관련된 컴포넌트만 리렌더링되도록 구현할 수 있습니다:

```tsx
// CounterContext.tsx
const CounterContext = createContext(null);

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);
  
  const value = useMemo(() => ({
    count,
    increment
  }), [count, increment]);
  
  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

// 앱 컴포넌트
function App() {
  return (
    <div>
      <UserProvider>
        <CounterProvider>
          <Page />
        </CounterProvider>
      </UserProvider>
    </div>
  );
}

// Page 컴포넌트
function Page() {
  // 유저가 변경되도 카운터 관련 컴포넌트는 리렌더링되지 않음
  return (
    <div>
      <UserInfo />
      <CounterDisplay />
      <OtherContent />
    </div>
  );
}

// CounterDisplay는 count가 변경될 때만 리렌더링
function CounterDisplay() {
  const { count, increment } = useContext(CounterContext);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## Hotel Chill 프로젝트 적용 사례

Hotel Chill 프로젝트에서는 다음과 같이 컴포넌트 최적화를 적용했습니다.

### 메인 캐러셀 컴포넌트 최적화

기존 코드 (최적화 전):

```tsx
// components/common/home/MainCarousel.tsx
export default function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">{slide.title}</h1>
              <p className="text-xl">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={goToPrevSlide}>Previous</button>
      <button onClick={goToNextSlide}>Next</button>
    </div>
  );
}
```

최적화 후:

```tsx
// components/common/home/MainCarousel.tsx
import { memo, useCallback, useEffect, useState } from 'react';

// 메모이제이션된 슬라이드 컴포넌트
const Slide = memo(function Slide({
  slide,
  isActive,
}: {
  slide: typeof slides[0];
  isActive: boolean;
}) {
  return (
    <div className={isActive ? 'opacity-100' : 'opacity-0'}>
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority={slide.id === 1}
        sizes="100vw"
        className="object-cover"
        quality={80}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">{slide.title}</h1>
          <p className="text-xl">{slide.subtitle}</p>
        </div>
      </div>
    </div>
  );
});

// 메모이제이션된 인디케이터 컴포넌트
const SlideIndicator = memo(function SlideIndicator({
  index,
  currentSlide,
  onClick,
  isAnimating,
}) {
  return (
    <button
      onClick={() => {
        if (isAnimating) return;
        onClick();
      }}
      className={index === currentSlide ? 'bg-white w-10' : 'bg-white/50'}
      aria-label={`Go to slide ${index + 1}`}
    />
  );
});

export default function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 메모이제이션된 핸들러 함수들
  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = useCallback((index) => {
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 6000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide) => (
        <Slide 
          key={slide.id} 
          slide={slide} 
          isActive={slides.indexOf(slide) === currentSlide} 
        />
      ))}
      
      <button onClick={goToPrevSlide} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button onClick={goToNextSlide} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <SlideIndicator
            key={index}
            index={index}
            currentSlide={currentSlide}
            onClick={() => goToSlide(index)}
            isAnimating={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}
```

### 성능 개선 결과

컴포넌트 최적화 적용 후 다음과 같은 개선 효과를 얻었습니다:

1. **리렌더링 최소화**
   - 메모이제이션을 통해 불필요한 리렌더링 방지
   - 슬라이드 전환 시 변경된 슬라이드만 리렌더링

2. **메모리 사용량 최적화**
   - 불필요한 함수 재생성 방지
   - 이벤트 핸들러 최적화

3. **사용자 경험 향상**
   - 슬라이드 전환 애니메이션이 더 부드러워짐
   - 인터랙션 응답성 개선

4. **코드 가독성 및 유지보수성 향상**
   - 관심사 분리로 코드 가독성 향상
   - 컴포넌트 재사용성 증가

[이전 문서: 컴포넌트 최적화 기본 가이드](./05-1-component-optimization-basic.md)

[다음 문서: Next.js 설정 최적화 가이드](./06-nextjs-config-guide.md)
