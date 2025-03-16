-- room_types 테이블 더미데이터
INSERT INTO room_types (name, grade, size, view_type, max_adults, max_children, description, weekday_price, weekend_price, peak_season_price, total_rooms)
VALUES 
('Chill Comfort Room', 6, 30, '가든 뷰', 2, 1, '심플하고 편안한 기본형 객실, 자연적 요소가 가미된 인테리어', 220000, 270000, 320000, 120),
('Chill Harmony Room', 5, 45, '가든 뷰', 2, 1, '넓은 공간과 고급스러운 인테리어, 휴식을 위한 추가 소파공간', 280000, 350000, 400000, 100),
('Chill Serenity Room', 4, 70, '가든 뷰', 2, 2, '고급 침구와 가구, 넓은 욕실, 일부 객실 테라스 포함', 380000, 450000, 520000, 60),
('Chill Family Suite', 3, 90, '숲 & 오솔길 뷰', 4, 2, '가족 단위 투숙객을 위한 분리된 거실과 침실, 울창한 숲과 아름다운 오솔길 전망', 520000, 650000, 750000, 40),
('Chill Lake Suite', 2, 100, '호수 & 산 뷰', 2, 2, '비즈니스와 휴식을 동시에, 넓은 업무공간과 휴식공간, 호수와 산이 어우러진 아름다운 전망', 680000, 820000, 950000, 20),
('Ultimate Chill Suite', 1, 120, '선택 가능 프리미엄 뷰', 4, 4, '최고급 시설과 개인 맞춤 서비스, 넓은 공간, 고객이 선호하는 프리미엄 전망 선택 가능', 950000, 1200000, 1500000, 10);



-- rooms 테이블 더미데이터 (등급별로 객실 번호 생성)
-- 6등급 Chill Comfort Room (F 건물, 각 층 30개, 총 4개 층) - 120개
INSERT INTO rooms (room_types_id, room_number, floor, status)
SELECT 1, CONCAT('F', floor, LPAD(room, 2, '0')), floor, 'AVAILABLE'
FROM (
    SELECT 
        a.floor,
        b.room
    FROM (
        SELECT 1 AS floor UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    ) AS a
    CROSS JOIN (
        SELECT ROW_NUMBER() OVER () AS room
        FROM information_schema.columns
        LIMIT 30
    ) AS b
) AS temp;
-- 5등급 Chill Harmony Room (E 건물, 각 층 25개, 총 4개 층) - 100개
INSERT INTO rooms (room_types_id, room_number, floor, status)
SELECT 2, CONCAT('E', floor, LPAD(room, 2, '0')), floor, 'AVAILABLE'
FROM (
    SELECT 
        a.floor,
        b.room
    FROM (
        SELECT 1 AS floor UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    ) AS a
    CROSS JOIN (
        SELECT ROW_NUMBER() OVER () AS room
        FROM information_schema.columns
        LIMIT 25
    ) AS b
) AS temp;
-- 4등급 Chill Serenity Room (D 건물, 각 층 15개, 총 4개 층) - 60개
INSERT INTO rooms (room_types_id, room_number, floor, status)
SELECT 3, CONCAT('D', floor, LPAD(room, 2, '0')), floor, 'AVAILABLE'
FROM (
    SELECT 
        a.floor,
        b.room
    FROM (
        SELECT 1 AS floor UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    ) AS a
    CROSS JOIN (
        SELECT ROW_NUMBER() OVER () AS room
        FROM information_schema.columns
        LIMIT 15
    ) AS b
) AS temp;
-- 3등급 Chill Family Suite (C 건물, 1~4층 각 층 10개) - 40개
INSERT INTO rooms (room_types_id, room_number, floor, status)
SELECT 4, CONCAT('C', floor, LPAD(room, 2, '0')), floor, 'AVAILABLE'
FROM (
    SELECT 
        a.floor,
        b.room
    FROM (
        SELECT 1 AS floor UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    ) AS a
    CROSS JOIN (
        SELECT ROW_NUMBER() OVER () AS room
        FROM information_schema.columns
        LIMIT 10
    ) AS b
) AS temp;
-- 2등급 Chill Lake Suite (B 건물, 1~4층 각 층 5개) - 20개
INSERT INTO rooms (room_types_id, room_number, floor, status)
SELECT 5, CONCAT('B', floor, LPAD(room, 2, '0')), floor, 'AVAILABLE'
FROM (
    SELECT 
        a.floor,
        b.room
    FROM (
        SELECT 1 AS floor UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    ) AS a
    CROSS JOIN (
        SELECT ROW_NUMBER() OVER () AS room
        FROM information_schema.columns
        LIMIT 5
    ) AS b
) AS temp;
-- 1등급 Ultimate Chill Suite (A 건물, 1~2층 각 층 4개, 총 8개) - 8개
INSERT INTO rooms (room_types_id, room_number, floor, status)
SELECT 6, CONCAT('A', LPAD(num, 2, '0')), CASE WHEN num <= 4 THEN 1 ELSE 2 END, 'AVAILABLE'
FROM (
    SELECT ROW_NUMBER() OVER () AS num
    FROM information_schema.columns
    LIMIT 8
) AS nums;



-- room_amenities 테이블 더미데이터
INSERT INTO room_amenities (name, icon, description, amenity_type) 
VALUES
-- 공통 어메니티 (COMMON)
('고급 침구', 'bed-icon.png', '덕다운 이불, 베개 메뉴', 'COMMON'),
('43인치 스마트 TV', 'tv-icon.png', '고화질 스마트 TV와 엔터테인먼트 서비스', 'COMMON'),
('고속 무선 인터넷', 'wifi-icon.png', '초고속 무료 와이파이', 'COMMON'),
('객실 내 금고', 'safe-icon.png', '디지털 객실 금고', 'COMMON'),
('미니바/미니 냉장고', 'minibar-icon.png', '음료 및 스낵 구비', 'COMMON'),
('친환경 욕실 용품 세트', 'amenities-icon.png', '고급 유기농 샴푸, 컨디셔너, 바디워시', 'COMMON'),
('슬리퍼 및 목욕 가운', 'bathrobe-icon.png', '편안한 슬리퍼와 목욕 가운', 'COMMON'),
('USB 충전 포트 및 멀티 어댑터', 'charger-icon.png', '다양한 기기 충전 가능', 'COMMON'),
('헤어 드라이어', 'hairdryer-icon.png', '전문가용 헤어 드라이어', 'COMMON'),
('커피/차 메이커', 'coffee-icon.png', '고품질 티백과 커피 캡슐', 'COMMON'),

-- 디럭스 추가 어메니티 (DELUXE)
('에스프레소 머신', 'espresso-icon.png', '고급 에스프레소 머신과 캡슐', 'DELUXE'),
('필로우 미스트', 'pillow-mist-icon.png', '수면 향상을 위한 아로마 스프레이', 'DELUXE'),
('욕실 체중계', 'scale-icon.png', '디지털 체중계', 'DELUXE'),
('추가 욕실 용품', 'bath-icon.png', '목욕 소금, 입욕제 세트', 'DELUXE'),
('블루투스 스피커', 'speaker-icon.png', '고품질 사운드의 스피커', 'DELUXE'),
('다회용 텀블러', 'tumbler-icon.png', '친환경 소재의 텀블러', 'DELUXE'),

-- 프리미엄 추가 어메니티 (PREMIUM)
('태블릿 객실 컨트롤 시스템', 'tablet-icon.png', '조명, 온도, 커튼 등 객실 통합 제어 태블릿', 'PREMIUM'),
('개별 공기청정기', 'air-purifier-icon.png', '최신형 공기청정기', 'PREMIUM'),
('전용 라운지 이용권', 'lounge-icon.png', '전용 라운지 무료 이용', 'PREMIUM'),
('턴다운 서비스', 'turndown-icon.png', '저녁 시간 특별 객실 정리 서비스', 'PREMIUM'),
('조식 무료 제공', 'breakfast-icon.png', '메인 레스토랑 조식 무료 이용', 'PREMIUM'),
('웰컴 과일 또는 스낵', 'welcome-icon.png', '입실 시 신선한 과일 또는 스낵 제공', 'PREMIUM'),

-- 프레지덴셜 추가 어메니티 (PRESIDENTIAL)
('개인 집사 서비스', 'butler-icon.png', '24시간 전담 집사 서비스', 'PRESIDENTIAL'),
('프라이빗 체크인/체크아웃', 'checkin-icon.png', '객실 내 개인 체크인/체크아웃', 'PRESIDENTIAL'),
('객실 내 자쿠지', 'jacuzzi-icon.png', '프라이빗 자쿠지', 'PRESIDENTIAL'),
('프리미엄 와인/주류 셀렉션', 'wine-icon.png', '엄선된 와인과 주류 컬렉션', 'PRESIDENTIAL'),
('프라이빗 다이닝 옵션', 'dining-icon.png', '객실 내 프라이빗 다이닝 서비스', 'PRESIDENTIAL'),
('스페셜 스파 트리트먼트 패키지', 'spa-icon.png', '맞춤형 스파 트리트먼트 1회 무료 제공', 'PRESIDENTIAL');



-- room_type_amenities 테이블 더미데이터
-- 각 객실 유형에 맞는 어메니티 연결

-- 공통 어메니티 - 모든 객실 타입에 적용 (1-10번 어메니티)
INSERT INTO room_type_amenities (room_types_id, room_amenities_id)
SELECT rt.room_types_id, ra.room_amenities_id
FROM room_types rt
CROSS JOIN room_amenities ra
WHERE ra.room_amenities_id BETWEEN 1 AND 10;

-- 디럭스 어메니티 - 5등급 이상 객실에 적용 (11-16번 어메니티)
INSERT INTO room_type_amenities (room_types_id, room_amenities_id)
SELECT rt.room_types_id, ra.room_amenities_id
FROM room_types rt
CROSS JOIN room_amenities ra
WHERE rt.grade <= 5 -- 5등급 이상 (숫자가 작을수록 높은 등급)
AND ra.room_amenities_id BETWEEN 11 AND 16;

-- 프리미엄 어메니티 - 4등급 이상 객실에 적용 (17-22번 어메니티)
INSERT INTO room_type_amenities (room_types_id, room_amenities_id)
SELECT rt.room_types_id, ra.room_amenities_id
FROM room_types rt
CROSS JOIN room_amenities ra
WHERE rt.grade <= 4 -- 4등급 이상
AND ra.room_amenities_id BETWEEN 17 AND 22;

-- 프레지덴셜 어메니티 - 1등급 객실에만 적용 (23-28번 어메니티)
INSERT INTO room_type_amenities (room_types_id, room_amenities_id)
SELECT rt.room_types_id, ra.room_amenities_id
FROM room_types rt
CROSS JOIN room_amenities ra
WHERE rt.grade = 1 -- 1등급만
AND ra.room_amenities_id BETWEEN 23 AND 28;



-- restaurants 테이블 더미데이터
INSERT INTO restaurants (name, concept, location, capacity, opening_time, closing_time, is_reservation_required, access_level)
VALUES 
('Chill Bites', '건강한 로컬 식재료 중심의 올데이 다이닝', '1층 중앙, 가든 뷰', 120, '06:30:00', '22:30:00', false, 'ALL'),
('Chill Garden', '가든 뷰가 있는 야외 테라스를 갖춘 캐주얼 다이닝', '가든 레벨, 실내 및 야외 테라스', 80, '11:30:00', '22:00:00', false, 'ALL'),
('Chill Elegance', '고급 모던 한식 및 퓨전 요리', '최상층, 파노라마 뷰', 40, '18:00:00', '22:00:00', true, 'SUITE_ONLY'),
('Chill Moments', '티 타임, 가벼운 식사, 칵테일을 즐길 수 있는 공간', '로비 인접, 정원 뷰', 60, '10:00:00', '24:00:00', false, 'ALL');



-- menu_categories 테이블 더미데이터
INSERT INTO menu_categories (restaurants_id, name, description, sort_order, availability_start, availability_end)
VALUES
-- Chill Bites (1번 레스토랑) 카테고리
(1, 'Morning Chill 조식 메뉴', '활기찬 아침을 위한 건강한 조식', 1, '06:30:00', '10:30:00'),
(1, 'Afternoon Vibe 점심 메뉴', '여유로운 점심을 위한 다양한 요리', 2, '11:30:00', '15:00:00'),
(1, 'Evening Zen 저녁 메뉴', '하루를 마무리하는 풍성한 저녁 식사', 3, '17:30:00', '22:30:00'),

-- Chill Garden (2번 레스토랑) 카테고리
(2, '가든 인스피레이션 샐러드', '정원에서 영감을 얻은 신선한 샐러드', 1, '11:30:00', '22:00:00'),
(2, '파스타 & 리조또', '신선한 재료로 만든 파스타와 리조또', 2, '11:30:00', '22:00:00'),
(2, '그릴 스페셜', '엄선된 재료로 만든 그릴 요리', 3, '11:30:00', '22:00:00'),
(2, '디저트', '달콤한 마무리를 위한 디저트', 4, '11:30:00', '22:00:00'),

-- Chill Elegance (3번 레스토랑) 카테고리
(3, 'Serene Journey 코스', '5가지 코스로 즐기는 여정', 1, '18:00:00', '22:00:00'),
(3, 'Ultimate Chill 코스', '7가지 코스로 즐기는 최고의 경험', 2, '18:00:00', '22:00:00'),
(3, '음료 페어링', '요리에 어울리는 음료 페어링', 3, '18:00:00', '22:00:00'),

-- Chill Moments (4번 레스토랑) 카테고리
(4, '애프터눈 티 세트', '오후의 여유로운 티타임', 1, '14:00:00', '17:00:00'),
(4, '핑거 푸드', '가볍게 즐기는 다양한 간식', 2, '10:00:00', '24:00:00'),
(4, '시그니처 음료', '특별한 음료 컬렉션', 3, '10:00:00', '24:00:00');



-- menu_items 테이블 더미데이터
INSERT INTO menu_items (menu_categories_id, name, description, price, image_url, is_vegetarian, is_signature, is_available, allergens)
VALUES
-- Morning Chill 조식 메뉴 (1번 카테고리)
(1, '치킬리언 브런치 플레이트', '유기농 샐러드, 계란 요리, 홈메이드 소시지, 통곡물 토스트', 28000, '/images/menu/chillean-brunch.jpg', false, true, true, '계란, 글루텐, 유제품'),
(1, '웰빙 그래놀라 볼', '제철 과일, 그릭 요거트, 꿀, 견과류', 18000, '/images/menu/granola-bowl.jpg', true, false, true, '견과류, 유제품'),
(1, '플러피 팬케이크 스택', '베리 콤포트, 메이플 시럽, 마스카포네', 22000, '/images/menu/pancake-stack.jpg', true, false, true, '계란, 글루텐, 유제품'),
(1, '로컬 한식 조찬', '된장국, 계절 나물, 구운 생선, 유기농 쌀밥', 25000, '/images/menu/korean-breakfast.jpg', false, true, true, '생선, 대두'),

-- Afternoon Vibe 점심 메뉴 (2번 카테고리)
(2, '슬로우 라이프 샐러드', '현지 농장 채소, 퀴노아, 아보카도, 구운 견과류', 24000, '/images/menu/slow-life-salad.jpg', true, false, true, '견과류'),
(2, '바다의 여유 파스타', '지역 해산물, 레몬 오일, 신선한 허브', 32000, '/images/menu/seafood-pasta.jpg', false, true, true, '갑각류, 글루텐'),
(2, '치킬 그릴드 치킨', '허브 마리네이드 닭가슴살, 계절 채소, 퀴노아', 28000, '/images/menu/grilled-chicken.jpg', false, false, true, NULL),
(2, '평온한 비빔밥', '제철 나물, 고추장, 유기농 현미밥', 26000, '/images/menu/bibimbap.jpg', true, true, true, '계란, 대두'),

-- Evening Zen 저녁 메뉴 (3번 카테고리)
(3, '릴렉스 프라임 스테이크', '초이스급 한우, 구운 계절 채소, 트러플 감자 퓨레', 58000, '/images/menu/prime-steak.jpg', false, true, true, '유제품'),
(3, '바다의 명상 플래터', '신선한 해산물 모둠, 허브 마리네이드, 시트러스 드레싱', 65000, '/images/menu/seafood-platter.jpg', false, true, true, '갑각류, 조개류'),
(3, '힐링 비건 플레이트', '콜리플라워 스테이크, 버섯 라구, 퀴노아 리소토', 42000, '/images/menu/vegan-plate.jpg', true, false, true, NULL),
(3, '포레스트 컴포트 치킨', '로스트 치킨, 야생 버섯, 타임 주스', 45000, '/images/menu/comfort-chicken.jpg', false, false, true, NULL),

-- 가든 인스피레이션 샐러드 (4번 카테고리)
(4, '드리프트 어웨이 샐러드', '호텔 옥상 정원에서 채취한 허브, 꽃잎, 계절 과일', 26000, '/images/menu/drift-away-salad.jpg', true, true, true, '견과류'),
(4, '포레스트 워크 샐러드', '야생 버섯, 구운 견과류, 트러플 드레싱, 파르미산', 28000, '/images/menu/forest-walk-salad.jpg', true, false, true, '견과류, 유제품'),
(4, '써니 데이 카프레제', '국내산 모짜렐라, 토마토, 바질 페스토', 24000, '/images/menu/caprese.jpg', true, false, true, '유제품, 견과류'),

-- 파스타 & 리조또 (5번 카테고리)
(5, '젠 모먼트 파스타', '호텔 정원 바질 페스토, 파인 너트, 햇콩', 32000, '/images/menu/zen-moment-pasta.jpg', true, false, true, '글루텐, 견과류'),
(5, '레이크 뷰 해산물 링귀니', '제철 해산물, 화이트 와인 소스', 38000, '/images/menu/seafood-linguine.jpg', false, true, true, '갑각류, 글루텐, 유제품'),
(5, '포레스트 무드 리조또', '야생 버섯, 트러플 오일, 파르미잔', 34000, '/images/menu/forest-mood-risotto.jpg', true, true, true, '유제품'),

-- 그릴 스페셜 (6번 카테고리)
(6, '놀로 러쉬 스테이크', '그릴에 구운 채끝 등심, 루스틱 감자, 계절 채소', 55000, '/images/menu/no-rush-steak.jpg', false, true, true, NULL),
(6, '메도우 뷰 닭고기', '허브 마리네이드 닭고기, 로스팅 채소', 42000, '/images/menu/meadow-view-chicken.jpg', false, false, true, NULL),
(6, '치킬 앤 버블 생선', '오븐에 구운 제철 생선, 샴페인 소스, 미니 채소', 48000, '/images/menu/chill-fish.jpg', false, false, true, '생선, 유제품'),

-- 디저트 (7번 카테고리)
(7, '크라우드 나인 팬케이크', '리코타 팬케이크, 계절 베리, 꿀', 18000, '/images/menu/cloud-nine-pancake.jpg', true, true, true, '계란, 글루텐, 유제품'),
(7, '네이처 드림 파르페', '계절 과일, 그래놀라, 요거트', 16000, '/images/menu/nature-dream-parfait.jpg', true, false, true, '견과류, 유제품'),
(7, '포레스트 치킬', '다크 초콜릿 무스, 포레스트 베리 콤포트', 19000, '/images/menu/forest-chill.jpg', true, false, true, '유제품'),

-- Serene Journey 코스 (8번 카테고리)
(8, 'Serene Journey 코스 메뉴', '시작의 고요, 숲의 속삭임, 바다의 명상, 대지의 평온, 달콤한 휴식 등 5코스', 150000, '/images/menu/serene-journey.jpg', false, true, true, '갑각류, 글루텐, 유제품, 견과류, 계란'),

-- Ultimate Chill 코스 (9번 카테고리)
(9, 'Ultimate Chill 코스 메뉴', '여유로운 시작, 자연의 선물, 바다의 속삭임, 숲의 여행, 고요한 휴식, 대지의 풍요, 달콤한 여운 등 7코스', 220000, '/images/menu/ultimate-chill.jpg', false, true, true, '갑각류, 글루텐, 유제품, 견과류, 계란'),

-- 음료 페어링 (10번 카테고리)
(10, '프리미엄 와인 페어링', '코스에 어울리는 엄선된В 와인 페어링', 80000, '/images/menu/wine-pairing.jpg', true, false, true, '알코올'),
(10, '한국 전통주 페어링', '코스에 어울리는 프리미엄 전통주 페어링', 70000, '/images/menu/traditional-pairing.jpg', true, false, true, '알코올'),
(10, '수제 논알콜 페어링', '코스에 어울리는 특별 제작 논알콜 음료 페어링', 50000, '/images/menu/non-alcoholic-pairing.jpg', true, false, true, NULL),

-- 애프터눈 티 세트 (11번 카테고리)
(11, 'Dreamy Afternoon 세트', '스콘, 미니 샌드위치, 디저트 6종, 프리미엄 티 선택', 65000, '/images/menu/dreamy-afternoon.jpg', false, true, true, '계란, 글루텐, 유제품, 견과류'),
(11, 'Chill Moments 세트', '계절 디저트 5종, 과일 플레이트, 티 또는 커피 선택', 55000, '/images/menu/chill-moments.jpg', true, false, true, '글루텐, 유제품, 견과류'),

-- 핑거 푸드 (12번 카테고리)
(12, '마음의 여유 플레이트', '치즈 셀렉션, 과일, 견과류, 크래커', 35000, '/images/menu/peace-of-mind-plate.jpg', true, false, true, '유제품, 견과류, 글루텐'),
(12, '부드러운 바람 만두', '트러플 오일 딥핑 소스의 모둠 만두', 28000, '/images/menu/breeze-dumplings.jpg', false, false, true, '글루텐, 대두'),
(12, '치킬 바이트 미니 버거', '미니 와규 버거 3종', 32000, '/images/menu/chill-bite-burgers.jpg', false, true, true, '글루텐, 유제품, 계란'),
(12, '숲의 속삭임 플래터', '계절 채소 바스켓, 3종 딥', 26000, '/images/menu/forest-whisper-platter.jpg', true, false, true, '견과류'),

-- 시그니처 음료 (13번 카테고리)
(13, '마음의 평온', '청포도, 애플민트, 탄산수', 15000, '/images/menu/peace-of-mind-drink.jpg', true, false, true, NULL),
(13, '숲의 명상', '녹차, 레몬그라스, 꿀', 15000, '/images/menu/forest-meditation.jpg', true, true, true, NULL),
(13, '인피니티 블루', '블루 버터플라이 피, 레몬, 코코넛 워터', 16000, '/images/menu/infinity-blue.jpg', true, false, true, NULL),
(13, '치킬 모히토', '화이트 럼, 민트, 라임, 설탕', 22000, '/images/menu/chill-mojito.jpg', true, false, true, '알코올'),
(13, '포레스트 드림', '진, 로즈마리, 라임, 토닉', 22000, '/images/menu/forest-dream.jpg', true, false, true, '알코올'),
(13, '레이크 뷰 마티니', '보드카, 블루 큐라소, 라임 주스', 24000, '/images/menu/lake-view-martini.jpg', true, true, true, '알코올');



-- product_categories 테이블 더미데이터
INSERT INTO product_categories (product_categories_id, name, description, parent_id, sort_order, image_url)
VALUES
-- 대분류
(1, 'Chill Haven 시그니처 컬렉션', '호텔 로고와 시그니처 향이 담긴 제품들', NULL, 1, '/images/shop/category-signature.jpg'),
(2, '힐링 & 웰니스 컬렉션', '마음의 평화와 힐링을 위한 제품들', NULL, 2, '/images/shop/category-wellness.jpg'),
(3, '에코 & 지속가능한 라이프스타일 제품', '환경을 생각하는 지속가능한 제품들', NULL, 3, '/images/shop/category-eco.jpg'),
(4, '휴식을 위한 식음료 제품', '차와 음식으로 즐기는 휴식', NULL, 4, '/images/shop/category-food.jpg'),
(5, '객실 등급별 맞춤 컬렉션', '객실 타입에 맞는 특별 제품들', NULL, 5, '/images/shop/category-room.jpg'),
(6, '메모리 & 컬렉터블 아이템', '특별한 기념품과 컬렉션 아이템', NULL, 6, '/images/shop/category-memory.jpg'),

-- 중분류 - Chill Haven 시그니처 컬렉션
(7, '아로마 & 디퓨저', '향기로운 휴식을 위한 제품', 1, 1, '/images/shop/subcategory-aroma.jpg'),
(8, '목욕 제품', '호텔 스파 경험을 집에서도', 1, 2, '/images/shop/subcategory-bath.jpg'),
(9, '침구 & 가운', '편안한 수면과 휴식을 위한 제품', 1, 3, '/images/shop/subcategory-bedding.jpg'),

-- 중분류 - 힐링 & 웰니스 컬렉션
(10, '명상 & 요가', '마음의 안정을 위한 제품', 2, 1, '/images/shop/subcategory-meditation.jpg'),
(11, '수면 & 릴렉스', '깊은 휴식을 위한 제품', 2, 2, '/images/shop/subcategory-sleep.jpg'),
(12, '아로마테라피', '자연의 향으로 치유하는 제품', 2, 3, '/images/shop/subcategory-aromatherapy.jpg'),

-- 중분류 - 에코 & 지속가능한 라이프스타일 제품
(13, '친환경 생활용품', '일상에서 사용하는 친환경 제품', 3, 1, '/images/shop/subcategory-eco-living.jpg'),
(14, '유기농 퍼스널 케어', '자연주의 개인 케어 제품', 3, 2, '/images/shop/subcategory-organic.jpg'),
(15, '지속가능한 여행용품', '환경을 생각하는 여행 필수품', 3, 3, '/images/shop/subcategory-sustainable.jpg'),

-- 중분류 - 휴식을 위한 식음료 제품
(16, '차 & 티웨어', '고품질 차와 티웨어', 4, 1, '/images/shop/subcategory-tea.jpg'),
(17, '유기농 식품', '건강한 먹거리', 4, 2, '/images/shop/subcategory-organic-food.jpg'),
(18, '와인 & 음료', '엄선된 와인과 음료', 4, 3, '/images/shop/subcategory-wine.jpg'),

-- 중분류 - 객실 등급별 맞춤 컬렉션
(19, '컴포트 & 하모니 컬렉션', '스탠다드 및 디럭스 객실 맞춤 제품', 5, 1, '/images/shop/subcategory-comfort.jpg'),
(20, '세레니티 컬렉션', '프리미엄 객실 맞춤 제품', 5, 2, '/images/shop/subcategory-serenity.jpg'),
(21, '패밀리 & 레이크 컬렉션', '스위트 객실 맞춤 제품', 5, 3, '/images/shop/subcategory-family.jpg'),
(22, '얼티메이트 컬렉션', '최고급 스위트 맞춤 제품', 5, 4, '/images/shop/subcategory-ultimate.jpg'),

-- 중분류 - 메모리 & 컬렉터블 아이템
(23, '포토 & 아트', '기억을 담는 사진과 예술 작품', 6, 1, '/images/shop/subcategory-photo.jpg'),
(24, '미니어처 & 피규어', '호텔과 관련된 소품', 6, 2, '/images/shop/subcategory-miniature.jpg'),
(25, '시즌 & 한정판 컬렉션', '특별한 시즌 및 한정판 제품', 6, 3, '/images/shop/subcategory-limited.jpg');



-- products 테이블 더미데이터
INSERT INTO products (category_id, name, description, price, discount_price, stock, sku, is_featured, is_new_arrival, is_limited_edition, related_room_type)
VALUES
-- 아로마 & 디퓨저 (7번 카테고리)
(7, '"평온한 순간" 아로마 디퓨저 세트', '호텔 로비와 객실에서 사용되는 시그니처 향', 85000, NULL, 50, 'SIGN-DIFF-001', true, false, false, NULL),
(7, '"숲속의 휴식" 향초 3종 세트', '숲, 호수, 허브 정원을 연상시키는 3가지 향', 65000, NULL, 75, 'SIGN-CNDL-001', true, true, false, NULL),
(7, '"Chill Haven" 룸 스프레이', '객실의 향기를 집에서도 즐길 수 있는 스프레이', 45000, NULL, 100, 'SIGN-SPRY-001', false, false, false, NULL),

-- 목욕 제품 (8번 카테고리)
(8, '"Ultimate Chill" 목욕 소금 & 입욕제 세트', '스위트 객실 전용 럭셔리 배스 제품', 55000, NULL, 30, 'BATH-SALT-001', false, false, false, 'SUITE'),
(8, '"Chill Haven" 바디케어 세트', '호텔에서 제공하는 바디워시, 로션, 핸드크림 세트', 75000, 65000, 55, 'BATH-BODY-001', true, false, false, NULL),
(8, '"포레스트 드림" 샤워 밤 세트', '숲의 향기로 채워지는 샤워 타임', 35000, NULL, 80, 'BATH-BOMB-001', false, true, false, NULL),

-- 침구 & 가운 (9번 카테고리)
(9, '"Chill Night" 베개커버 세트', '호텔에서 사용하는 것과 동일한 베개커버', 120000, NULL, 40, 'BED-PILW-001', false, false, false, NULL),
(9, '"Chill Comfort" 고급 목욕 가운', '호텔 로고가 새겨진 프리미엄 면 소재 가운', 95000, NULL, 60, 'BED-ROBE-001', true, false, false, NULL),
(9, 'Chill Haven 로고 슬리퍼', '객실에서 제공되는 것과 동일한 고급 슬리퍼', 45000, 40000, 100, 'BED-SLIP-001', false, false, false, NULL),

-- 명상 & 요가 (10번 카테고리)
(10, '"마음의 평화" 명상 키트', '명상 가이드북, 캔들, 명상 음악 앱 이용권', 75000, NULL, 25, 'WELL-MEDI-001', true, true, false, NULL),
(10, '"Chill Yoga" 요가 매트 & 액세서리', '친환경 소재 요가 매트, 블록, 스트랩', 90000, NULL, 30, 'WELL-YOGA-001', false, false, false, NULL),
(10, '"내면의 고요" 명상 쿠션', '편안한 명상을 위한 프리미엄 쿠션', 65000, NULL, 40, 'WELL-CUSH-001', false, false, false, NULL),

-- 수면 & 릴렉스 (11번 카테고리)
(11, '"깊은 휴식" 수면 키트', '수면 마스크, 베개 미스트, 이어플러그, 수면 유도 음악', 65000, NULL, 45, 'WELL-SLEEP-001', true, false, false, NULL),
(11, '"치킬 드림" 라벤더 베개', '숙면을 돕는 라벤더 향이 가득한 베개', 85000, 75000, 35, 'WELL-PILW-001', false, true, false, NULL),
(11, '"밤의 평온" 수면 차 세트', '숙면을 위한 허브 블렌딩 티 세트', 45000, NULL, 70, 'WELL-TEA-001', false, false, false, NULL),

-- 아로마테라피 (12번 카테고리)
(12, '"숲의 선물" 아로마테라피 오일 세트', '야생 허브, 나무, 꽃에서 추출한 에센셜 오일', 70000, NULL, 50, 'WELL-OIL-001', true, false, false, NULL),
(12, '"호수의 평온" 마사지 스톤', '셀프 마사지용 옥돌 세트', 45000, NULL, 60, 'WELL-STON-001', false, false, false, NULL),
(12, '"Chill Moment" 스트레스 완화 볼', '손으로 쥐고 사용하는 스트레스 완화 볼', 25000, NULL, 100, 'WELL-BALL-001', false, true, false, NULL),

-- 친환경 생활용품 (13번 카테고리)
(13, '"지구를 위한 휴식" 친환경 텀블러', '재활용 소재로 만든 보온/보냉 텀블러', 35000, NULL, 80, 'ECO-TMBL-001', true, false, false, NULL),
(13, '"숲의 숨결" 공기정화 미니 식물', '작은 화분에 심어진 공기정화 식물', 45000, NULL, 40, 'ECO-PLNT-001', false, true, false, NULL),
(13, '"에코 치킬" 유기농 면 토트백', '호텔 로고가 새겨진 친환경 토트백', 25000, NULL, 120, 'ECO-BAG-001', false, false, false, NULL),

-- 유기농 퍼스널 케어 (14번 카테고리)
(14, '"순수한 휴식" 유기농 비누 & 샴푸 바', '환경에 무해한 고체 형태의 세면용품', 40000, NULL, 70, 'ECO-SOAP-001', true, false, false, NULL),
(14, '"자연의 터치" 대나무 칫솔 & 빗 세트', '생분해 가능한 천연 소재 제품', 30000, NULL, 90, 'ECO-BAMB-001', false, false, false, NULL),
(14, '"오가닉 펄스" 핸드 & 바디 로션', '유기농 성분으로 만든 보습 로션', 38000, NULL, 65, 'ECO-LOTN-001', false, true, false, NULL),

-- 지속가능한 여행용품 (15번 카테고리)
(15, '"여행하는 평화" 재사용 가능 여행 키트', '반복 사용 가능한 여행용 병, 파우치 등', 55000, 48000, 45, 'ECO-TRVL-001', true, false, false, NULL),
(15, '"에코 트립" 여행용 세면도구 세트', '생분해성 칫솔, 고체 치약, 샴푸 바', 42000, NULL, 60, 'ECO-BATH-001', false, false, false, NULL),
(15, '"그린 웨이" 휴대용 수저 세트', '스테인리스 수저와 친환경 케이스', 28000, NULL, 80, 'ECO-UTNS-001', false, true, false, NULL),

-- 차 & 티웨어 (16번 카테고리)
(16, '"Chill Tea" 시그니처 차 컬렉션', '호텔 레스토랑과 라운지에서 제공되는 차 모음', 45000, NULL, 60, 'FOOD-TEA-001', true, false, false, NULL),
(16, '"평온한 시간" 티 세트', '티팟, 티컵 2인 세트', 85000, NULL, 40, 'FOOD-TSET-001', false, false, false, NULL),
(16, '"Chill Moment" 허브 티 블렌드', '스트레스 완화, 수면 개선 등 목적별 블렌딩 티', 35000, NULL, 75, 'FOOD-HERB-001', false, true, false, NULL),

-- 유기농 식품 (17번 카테고리)
(17, '"자연의 달콤함" 유기농 꿀 & 잼 세트', '지역 농장에서 생산된 유기농 제품', 50000, NULL, 55, 'FOOD-HONY-001', true, false, false, NULL),
(17, '"소소한 행복" 프리미엄 초콜릿 & 쿠키 세트', '호텔 파티시에가 만든 디저트', 40000, 35000, 65, 'FOOD-CHOC-001', false, false, false, NULL),
(17, '"숲의 선물" 견과류 & 말린 과일 세트', '유기농 간식 세트', 30000, NULL, 80, 'FOOD-NUTS-001', false, true, false, NULL),

-- 와인 & 음료 (18번 카테고리)
(18, '"평온한 저녁" 와인 셀렉션', 'Chill Elegance 레스토랑에서 제공되는 와인', 120000, NULL, 30, 'FOOD-WINE-001', true, false, false, NULL),
(18, '"치킬 모먼트" 칵테일 키트', '시그니처 칵테일을 만들 수 있는 키트', 85000, NULL, 25, 'FOOD-CKTL-001', false, true, true, NULL),
(18, '"리프레싱 치킬" 수제 에이드 세트', '호텔 바에서 영감을 받은 수제 에이드 시럽', 40000, NULL, 50, 'FOOD-AID-001', false, false, false, NULL),

-- 컴포트 & 하모니 컬렉션 (19번 카테고리)
(19, '"간편한 힐링" 미니 아로마 세트', '컴팩트한 크기의 아로마 디퓨저와 오일', 50000, NULL, 70, 'ROOM-MINI-001', false, false, false, 'COMFORT,HARMONY'),
(19, '"휴식의 시작" 베이직 웰니스 키트', '입문자용 힐링 제품 세트', 65000, NULL, 55, 'ROOM-WELL-001', false, true, false, 'COMFORT,HARMONY'),
(19, '"가벼운 평온" 여행용 목욕 세트', '휴대하기 쉬운 미니 사이즈 제품', 45000, NULL, 85, 'ROOM-BATH-001', true, false, false, 'COMFORT,HARMONY'),

-- 세레니티 컬렉션 (20번 카테고리)
(20, '"깊은 휴식" 프리미엄 아로마 테라피 세트', '고급 디퓨저와 다양한 오일', 95000, NULL, 40, 'ROOM-PREM-001', true, true, false, 'SERENITY'),
(20, '"평온한 밤" 수면 향상 키트', '특별한 베개 스프레이, 허브티, 수면 마스크', 75000, NULL, 45, 'ROOM-SLEEP-001', false, false, false, 'SERENITY'),
(20, '"마음의 평화" 힐링 북 & 음악 세트', '명상 서적과 호텔 BGM 컬렉션', 65000, NULL, 50, 'ROOM-BOOK-001', false, false, false, 'SERENITY'),

-- 패밀리 & 레이크 컬렉션 (21번 카테고리)
(21, '"가족 힐링 타임" 보드게임 컬렉션', '가족이 함께하는 보드게임 세트', 85000, NULL, 35, 'ROOM-GAME-001', true, false, false, 'FAMILY,LAKE'),
(21, '"함께하는 평온" 가족 요가 & 명상 키트', '아이들도 참여할 수 있는 힐링 제품', 95000, 85000, 30, 'ROOM-YOGF-001', false, true, false, 'FAMILY,LAKE'),
(21, '"즐거운 휴식" 패밀리 스낵 박스', '온 가족이 즐길 수 있는 건강 간식 모음', 65000, NULL, 50, 'ROOM-SNCK-001', false, false, false, 'FAMILY,LAKE'),

-- 얼티메이트 컬렉션 (22번 카테고리)
(22, '"럭셔리 힐링" 프리미엄 웰빙 박스', '최고급 힐링 제품 종합 세트', 250000, NULL, 15, 'ROOM-LUXE-001', true, false, true, 'ULTIMATE'),
(22, '"완벽한 평온" VIP 아로마 테라피 컬렉션', '희귀 오일과 고급 디퓨저 세트', 180000, NULL, 20, 'ROOM-VIP-001', false, true, true, 'ULTIMATE'),
(22, '"깊은 감동" 한정판 아트 프린트', '호텔의 아름다운 전경을 담은 한정판 작품', 150000, NULL, 10, 'ROOM-ART-001', false, false, true, 'ULTIMATE'),

-- 포토 & 아트 (23번 카테고리)
(23, '"Chill Moment" 포토 프레임', '호텔 로고가 새겨진 고급 사진 액자', 45000, NULL, 60, 'MEM-FRAM-001', false, false, false, NULL),
(23, '"평온한 순간" 아트 포스터 & 엽서 세트', '호수, 숲, 호텔 뷰를 담은 예술 작품', 35000, NULL, 75, 'MEM-POST-001', true, false, false, NULL),
(23, '"휴식의 메모리" 다이어리 & 펜 세트', '고급 필기구와 노트', 55000, NULL, 50, 'MEM-DIAR-001', false, true, false, NULL),

-- 미니어처 & 피규어 (24번 카테고리)
(24, '"Chill Haven 드림" 미니어처', '호텔 건물의 소형 모델', 65000, 55000, 30, 'MEM-MINI-001', true, false, true, NULL),
(24, '"Chill Guy" 캐릭터 인형', '호텔 마스코트 인형', 40000, NULL, 70, 'MEM-DOLL-001', false, true, false, NULL),
(24, '"치킬 포레스트" 미니 디오라마', '호텔 주변 자연을 담은 미니어처 풍경', 85000, NULL, 25, 'MEM-DIOR-001', false, false, true, NULL),

-- 시즌 & 한정판 컬렉션 (25번 카테고리)
(25, '"계절의 평온" 봄 에디션', '봄을 테마로 한 한정판 제품 세트', 95000, NULL, 20, 'MEM-SPRG-001', true, true, true, NULL),
(25, '"선셋 치킬" 여름 컬렉션', '여름 일몰을 테마로 한 한정판 제품', 95000, NULL, 20, 'MEM-SUMM-001', false, false, true, NULL),
(25, '"포레스트 뷰" 가을 스페셜', '가을 숲을 테마로 한 한정판 제품', 95000, NULL, 20, 'MEM-FALL-001', false, false, true, NULL),
(25, '"치킬 윈터" 겨울 에디션', '겨울 풍경을 테마로 한 한정판 제품', 95000, NULL, 20, 'MEM-WINT-001', false, false, true, NULL);



-- facilities 테이블 더미데이터
INSERT INTO facilities (name, category, location, description, opening_time, closing_time, is_reservation_required, is_chargeable, price)
VALUES
-- WELLNESS 카테고리
('무한 치킬 풀', 'WELLNESS', '호텔 메인동 1-2층', '호수 전망의 인피니티 실내/야외 수영장 (연중 온수)', '06:00:00', '22:00:00', false, false, NULL),
('Zen Zone', 'WELLNESS', '호텔 메인동 1층', '핀란드식 사우나, 아로마 스팀룸, 히말라야 솔트룸', '07:00:00', '22:00:00', false, false, NULL),
('24/7 Chill Fit', 'WELLNESS', '호텔 메인동 B1층', '최신 설비의 피트니스 센터', '00:00:00', '24:00:00', false, false, NULL),
('마인드 스튜디오', 'WELLNESS', '호텔 메인동 2층', '요가, 명상, 필라테스 클래스 공간', '08:00:00', '20:00:00', true, true, 35000),
('Chill Recovery', 'WELLNESS', '호텔 메인동 2층', '스포츠 마사지 및 회복 치료실', '10:00:00', '20:00:00', true, true, 50000),

-- SPA 카테고리
('Just Chill 마사지', 'SPA', '호텔 별관 전용 동', '호텔 시그니처 전신 마사지', '10:00:00', '21:00:00', true, true, 150000),
('Forest Calm', 'SPA', '호텔 별관 전용 동', '숲 향기를 이용한 아로마테라피 트리트먼트', '10:00:00', '21:00:00', true, true, 180000),
('Lake Reflection', 'SPA', '호텔 별관 전용 동', '수분 공급 및 회복 페이셜 트리트먼트', '10:00:00', '21:00:00', true, true, 160000),
('Couple\'s Retreat', 'SPA', '호텔 별관 전용 동', '커플 전용 프라이빗 스파 패키지', '10:00:00', '21:00:00', true, true, 350000),
('Ultimate Chill Experience', 'SPA', '호텔 별관 전용 동', '4시간 풀 바디 럭셔리 트리트먼트', '10:00:00', '17:00:00', true, true, 450000),

-- NATURE 카테고리
('Chill Path', 'NATURE', '호텔 외부 정원 및 주변 자연 환경', '호수와 숲을 잇는 4km 길이의 산책로/조깅 트랙', '06:00:00', '20:00:00', false, false, NULL),
('Silent Garden', 'NATURE', '호텔 외부 정원', '명상과 요가를 위한 조용한 정원 공간', '08:00:00', '19:00:00', false, false, NULL),
('Lake Chill Deck', 'NATURE', '호수 인접 지역', '호수 전망의 휴식 데크와 프라이빗 카바나', '09:00:00', '18:00:00', true, true, 100000),
('Herb Haven', 'NATURE', '호텔 옥상 정원', '방문객이 체험할 수 있는 허브 가든', '10:00:00', '17:00:00', true, false, NULL),
('Seasonal Chill', 'NATURE', '호텔 주변 자연 환경', '계절별 야외 액티비티', '09:00:00', '17:00:00', true, true, 80000),

-- ENTERTAINMENT 카테고리
('Book & Chill', 'ENTERTAINMENT', '호텔 메인동 3층', '조용한 독서와 휴식을 위한 북 라운지', '09:00:00', '23:00:00', false, false, NULL),
('Art of Chill', 'ENTERTAINMENT', '호텔 메인동 3층', '지역 예술가와 힐링 테마 작품을 전시하는 소규모 갤러리', '10:00:00', '20:00:00', false, false, NULL),
('Chill Vibes', 'ENTERTAINMENT', '호텔 메인동 3층', '주말 생음악 공연 및 문화 이벤트 공간', '18:00:00', '23:00:00', true, false, NULL),
('Digital Detox Den', 'ENTERTAINMENT', '호텔 메인동 3층', '디지털 기기 없이 즐기는 보드게임, 퍼즐 등의 공간', '10:00:00', '22:00:00', false, false, NULL),
('Chill Cinema', 'ENTERTAINMENT', '호텔 메인동 B1층', '소규모 영화 상영실', '14:00:00', '23:00:00', true, false, NULL),

-- BUSINESS 카테고리
('Productivity Lounge', 'BUSINESS', '호텔 메인동 B1층', '24시간 비즈니스 센터', '00:00:00', '24:00:00', false, false, NULL),
('Balance Rooms', 'BUSINESS', '호텔 메인동 B1층', '소/중형 회의실 (10-30인)', '08:00:00', '22:00:00', true, true, 200000),
('Harmony Hall', 'BUSINESS', '호텔 메인동 B1층', '대형 연회장 (최대 150인)', '09:00:00', '23:00:00', true, true, 1500000),
('Private Dining Chill', 'BUSINESS', '호텔 메인동 B1층', '프라이빗 다이닝룸 (최대 20인)', '11:00:00', '22:00:00', true, true, 500000),
('워크 & 치킬', 'BUSINESS', '호텔 메인동 B1층', '코워킹 스타일 업무 공간', '08:00:00', '20:00:00', false, true, 20000),

-- FAMILY 카테고리
('Mini Chill Zone', 'FAMILY', '호텔 메인동 B2층', '키즈 플레이룸 (전문 보육 스태프 상주)', '09:00:00', '20:00:00', false, false, NULL),
('Family Chill', 'FAMILY', '호텔 메인동 B2층', '가족 액티비티 공간 (게임, 공예 등)', '10:00:00', '20:00:00', false, false, NULL),
('Splash Chill', 'FAMILY', '호텔 메인동 1층', '어린이 전용 수영장과 워터 플레이 공간', '09:00:00', '19:00:00', false, false, NULL),
('Family Retreat Programs', 'FAMILY', '호텔 메인동 B2층', '부모와 자녀가 함께하는 힐링 프로그램', '10:00:00', '18:00:00', true, true, 65000),
('Teen Chill Lounge', 'FAMILY', '호텔 메인동 B2층', '청소년 전용 공간 (게임, 음악, 독서 등)', '10:00:00', '21:00:00', false, false, NULL);



-- membership_benefits 테이블 더미데이터
INSERT INTO membership_benefits (membership_tier, benefit_category, description, discount_percentage, is_active)
VALUES
-- CHILL_BREEZE 등급 혜택
('CHILL_BREEZE', 'ROOM', '객실 요금 5% 할인', 5, true),
('CHILL_BREEZE', 'DINING', '다이닝 이용 시 웰컴 드링크 제공', NULL, true),
('CHILL_BREEZE', 'GIFT_SHOP', '기프트샵 5% 할인', 5, true),
('CHILL_BREEZE', 'SPA', '스파 이용 시 웰컴 티 제공', NULL, true),
('CHILL_BREEZE', 'GENERAL', '생일 특별 혜택 (웰컴 디저트)', NULL, true),
('CHILL_BREEZE', 'GENERAL', '디지털 뉴스레터 구독', NULL, true),
('CHILL_BREEZE', 'GENERAL', '모바일 체크인/체크아웃', NULL, true),
('CHILL_BREEZE', 'GENERAL', '회원 전용 프로모션 접근권', NULL, true),

-- CHILL_FLOW 등급 혜택
('CHILL_FLOW', 'ROOM', '객실 요금 10% 할인', 10, true),
('CHILL_FLOW', 'ROOM', '레이트 체크아웃 (오후 2시까지, 가능 시)', NULL, true),
('CHILL_FLOW', 'DINING', '다이닝 이용 금액 5% 할인', 5, true),
('CHILL_FLOW', 'SPA', '스파 트리트먼트 10% 할인', 10, true),
('CHILL_FLOW', 'GIFT_SHOP', '기프트샵 10% 할인', 10, true),
('CHILL_FLOW', 'ROOM', '룸 업그레이드 1회 (가능 시, 연간)', NULL, true),
('CHILL_FLOW', 'GENERAL', '웰컴 어메니티 업그레이드', NULL, true),
('CHILL_FLOW', 'WELLNESS', '요가/명상 클래스 1회 무료 (연간)', NULL, true),

-- DEEP_CHILL 등급 혜택
('DEEP_CHILL', 'ROOM', '객실 요금 15% 할인', 15, true),
('DEEP_CHILL', 'ROOM', '아얼리 체크인 (오전 11시부터)/레이트 체크아웃 (오후 4시까지) (가능 시)', NULL, true),
('DEEP_CHILL', 'DINING', '다이닝 이용 금액 10% 할인', 10, true),
('DEEP_CHILL', 'SPA', '스파 트리트먼트 20% 할인', 20, true),
('DEEP_CHILL', 'GIFT_SHOP', '기프트샵 15% 할인', 15, true),
('DEEP_CHILL', 'GENERAL', '특별 감사 선물 (연 1회)', NULL, true),
('DEEP_CHILL', 'GENERAL', 'VIP 컨시어지 서비스', NULL, true),
('DEEP_CHILL', 'GENERAL', '멤버 전용 이벤트 초대', NULL, true),
('DEEP_CHILL', 'NATURE', '프라이빗 카바나 2시간 무료 이용 (연간 1회)', NULL, true),
('DEEP_CHILL', 'DINING', 'Chill Elegance 레스토랑 우선 예약권', NULL, true),
('DEEP_CHILL', 'DINING', '특별 기념일 케이크 및 샴페인 서비스 (예약 시 요청 가능)', NULL, true);