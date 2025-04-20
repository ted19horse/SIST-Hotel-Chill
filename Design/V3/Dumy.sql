-- Chill Haven Resort & Spa 더미 데이터
-- MySQL 8.0, DBeaver 환경용 (외래키 제약 없음)

USE chill;

-- 1. 사용자 테이블 데이터
INSERT INTO users (email, password, name, phone, status) VALUES
('kim.minjun@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '김민준', '010-1234-5678', 'ACTIVE'),
('lee.sujin@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '이수진', '010-2345-6789', 'ACTIVE'),
('park.jiho@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '박지호', '010-3456-7890', 'ACTIVE'),
('choi.yuna@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '최유나', '010-4567-8901', 'ACTIVE'),
('jung.minho@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '정민호', '010-5678-9012', 'ACTIVE'),
('kang.eunbi@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '강은비', '010-6789-0123', 'ACTIVE'),
('han.junho@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '한준호', '010-7890-1234', 'ACTIVE'),
('yoon.seoyeon@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '윤서연', '010-8901-2345', 'ACTIVE'),
('shin.dongwoo@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '신동우', '010-9012-3456', 'ACTIVE'),
('moon.jiyoung@example.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '문지영', '010-0123-4567', 'ACTIVE'),
('admin@chillhaven.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '관리자', '010-9999-9999', 'ACTIVE'),
('staff@chillhaven.com', '$2a$10$6AvrItDi7XT6tX.zKSYvOeJN6r.D0Qz9bSJ5upLiIHneFHmj6XjFG', '스태프', '010-8888-8888', 'ACTIVE');



-- 2. 멤버십 테이블 데이터
INSERT INTO memberships (users_id, membership_tier, points, total_stays, total_spending, membership_number) VALUES
(1, 'DEEP_CHILL', 5200, 8, 3500000, 'CH00000001'),
(2, 'CHILL_FLOW', 1800, 4, 1200000, 'CH00000002'),
(3, 'CHILL_BREEZE', 300, 1, 450000, 'CH00000003'),
(4, 'CHILL_FLOW', 1200, 3, 950000, 'CH00000004'),
(5, 'CHILL_BREEZE', 200, 1, 280000, 'CH00000005'),
(6, 'DEEP_CHILL', 4500, 6, 3200000, 'CH00000006'),
(7, 'CHILL_BREEZE', 600, 2, 550000, 'CH00000007'),
(8, 'CHILL_FLOW', 2200, 5, 1600000, 'CH00000008'),
(9, 'CHILL_BREEZE', 100, 1, 220000, 'CH00000009'),
(10, 'DEEP_CHILL', 3800, 7, 4500000, 'CH00000010');



-- 3. 결제 수단 테이블 데이터
INSERT INTO payment_methods (users_id, card_type, last_four_digits, is_default) VALUES
(1, 'VISA', '1234', true),
(1, 'MASTERCARD', '5678', false),
(2, 'AMEX', '9012', true),
(3, 'VISA', '3456', true),
(4, 'MASTERCARD', '7890', true),
(5, 'VISA', '2345', true),
(6, 'AMEX', '6789', true),
(7, 'MASTERCARD', '0123', true),
(8, 'VISA', '4567', true),
(9, 'MASTERCARD', '8901', true),
(10, 'AMEX', '2345', true);



-- 어메니티 그룹 데이터 (수정된 아이콘 이름)
INSERT INTO amenity_groups (name, name_kor, icon_name, sort_order) VALUES
('standard', '스탠다드 어메니티', 'Bed', 1),
('deluxe', '디럭스 어메니티', 'CupSoda', 2),
('premium', '프리미엄 어메니티', 'TabletSmartphone', 3),
('presidential', '프레지덴셜 어메니티', 'Crown', 4);

-- 어메니티 아이템 데이터 (수정된 아이콘 이름)
INSERT INTO amenity_items (amenity_groups_id, name, icon_name, sort_order) VALUES
-- 스탠다드 어메니티
(1, '고급 침구', 'Bed', 1),
(1, '43인치 스마트 TV', 'Tv', 2),
(1, '고속 무선 인터넷', 'Wifi', 3),
(1, '객실 내 금고', 'ShieldCheck', 4),
(1, '미니바/미니 냉장고', 'Refrigerator', 5),
(1, '친환경 욕실 용품 세트', 'Droplet', 6),
(1, '슬리퍼 및 목욕 가운', 'Footprints', 7),
(1, 'USB 충전 포트 및 멀티 어댑터', 'BatteryCharging', 8),
(1, '헤어 드라이어', 'Fan', 9),
(1, '커피/차 메이커', 'Coffee', 10),

-- 디럭스 어메니티
(2, '에스프레소 머신', 'Coffee', 1),
(2, '필로우 미스트', 'CloudDrizzle', 2),
(2, '욕실 체중계', 'Weight', 3),
(2, '추가 욕실 용품', 'Bath', 4),
(2, '블루투스 스피커', 'Music', 5),
(2, '다회용 텀블러', 'CupSoda', 6),

-- 프리미엄 어메니티
(3, '태블릿 객실 컨트롤 시스템', 'TabletSmartphone', 1),
(3, '개별 공기청정기', 'Wind', 2),
(3, '전용 라운지 이용권', 'Sofa', 3),
(3, '턴다운 서비스', 'Moon', 4),
(3, '조식 무료 제공', 'UtensilsCrossed', 5),
(3, '웰컴 과일 또는 스낵', 'Apple', 6),

-- 프레지덴셜 어메니티
(4, '개인 집사 서비스', 'UserCheck', 1),
(4, '프라이빗 체크인/체크아웃', 'KeySquare', 2),
(4, '객실 내 자쿠지', 'Waves', 3),
(4, '프리미엄 와인/주류 셀렉션', 'GlassWater', 4),
(4, '프라이빗 다이닝 옵션', 'ChefHat', 5),
(4, '스페셜 스파 트리트먼트 패키지', 'Flower', 6);



-- 객실 유형 데이터
INSERT INTO room_types (
    name, description, size, max_adults, max_children,
    weekday_price, weekend_price, peak_season_price,
    building, floor_count, rooms_per_floor, view_type, view_type_kor
) VALUES
('Chill Comfort Room', 
 '심플하고 편안한 기본형 객실로, 자연적 요소가 가미된 인테리어와 가든 뷰를 제공하는 30㎡ 크기의 객실입니다.',
 30, 2, 1, 220000, 270000, 320000, 'F', 4, 30, 'GARDEN', '가든 뷰'),

('Chill Harmony Room',
 '넓은 공간과 고급스러운 인테리어, 휴식을 위한 전용 소파 공간이 있는 45㎡ 크기의 객실입니다.',
 45, 2, 1, 280000, 350000, 400000, 'E', 4, 25, 'GARDEN', '가든 뷰'),

('Chill Serenity Room',
 '고급 침구와 가구, 넓은 욕실, 일부 객실 테라스가 포함된 70㎡ 크기의 객실입니다.',
 70, 2, 2, 380000, 450000, 520000, 'D', 4, 15, 'GARDEN', '가든 뷰'),

('Chill Family Suite',
 '가족 단위 투숙객을 위한 분리된 거실과 침실, 울창한 숲과 아름다운 오솔길 전망을 제공하는 90㎡ 크기의 객실입니다.',
 90, 4, 2, 520000, 650000, 750000, 'C', 4, 10, 'FOREST_TRAIL', '숲 & 오솔길 뷰'),

('Chill Lake Suite',
 '비즈니스와 휴식을 동시에, 넓은 업무공간과 휴식공간, 호수와 산이 어우러진 아름다운 전망을 제공하는 100㎡ 크기의 객실입니다.',
 100, 2, 2, 680000, 820000, 950000, 'B', 4, 5, 'LAKE_MOUNTAIN', '호수 & 산 뷰'),

('Ultimate Chill Suite',
 '최고급 시설과 개인 맞춤 서비스, 넓은 공간, 고객이 선호하는 프리미엄 전망 선택이 가능한 120㎡ 크기의 객실입니다.',
 120, 4, 4, 950000, 1200000, 1500000, 'A', 2, 4, 'PREMIUM_CHOICE', '선택 가능 프리미엄 뷰');



-- 객실 유형별 어메니티 그룹 연결
INSERT INTO room_type_amenity_groups (room_types_id, amenity_groups_id)
SELECT rt.room_types_id, ag.amenity_groups_id
FROM room_types rt
CROSS JOIN amenity_groups ag
WHERE 
    (rt.name = 'Chill Comfort Room' AND ag.name = '스탠다드 어메니티')
    OR (rt.name = 'Chill Harmony Room' AND ag.name IN ('스탠다드 어메니티', '디럭스 어메니티'))
    OR (rt.name IN ('Chill Serenity Room', 'Chill Family Suite', 'Chill Lake Suite') 
        AND ag.name IN ('스탠다드 어메니티', '디럭스 어메니티', '프리미엄 어메니티'))
    OR (rt.name = 'Ultimate Chill Suite' 
        AND ag.name IN ('스탠다드 어메니티', '디럭스 어메니티', '프리미엄 어메니티', '프레지덴셜 어메니티'));



-- 5-1. 6등급: Chill Comfort Room (F 건물, 각 층 30개, 총 4개 층) - 120개
INSERT INTO rooms (room_types_id, room_number, status)
SELECT 1, 
       CONCAT('F', 
              FLOOR((id-1)/30) + 1, 
              LPAD(((id-1) % 30) + 1, 2, '0')), 
       CASE 
           WHEN id % 20 = 0 THEN 'MAINTENANCE' 
           WHEN id % 5 = 0 THEN 'OCCUPIED' 
           ELSE 'AVAILABLE' 
       END
FROM (
    SELECT ROW_NUMBER() OVER () as id 
    FROM information_schema.columns 
    LIMIT 120
) as numbers;

-- 5-2. 5등급: Chill Harmony Room (E 건물, 각 층 25개, 총 4개 층) - 100개
INSERT INTO rooms (room_types_id, room_number, status)
SELECT 2, 
       CONCAT('E', 
              FLOOR((id-1)/25) + 1, 
              LPAD(((id-1) % 25) + 1, 2, '0')), 
       CASE 
           WHEN id % 20 = 0 THEN 'MAINTENANCE' 
           WHEN id % 5 = 0 THEN 'OCCUPIED' 
           ELSE 'AVAILABLE' 
       END
FROM (
    SELECT ROW_NUMBER() OVER () as id 
    FROM information_schema.columns 
    LIMIT 100
) as numbers;

-- 5-3. 4등급: Chill Serenity Room (D 건물, 각 층 15개, 총 4개 층) - 60개
INSERT INTO rooms (room_types_id, room_number, status)
SELECT 3, 
       CONCAT('D', 
              FLOOR((id-1)/15) + 1, 
              LPAD(((id-1) % 15) + 1, 2, '0')), 
       CASE 
           WHEN id % 20 = 0 THEN 'MAINTENANCE' 
           WHEN id % 5 = 0 THEN 'OCCUPIED' 
           ELSE 'AVAILABLE' 
       END
FROM (
    SELECT ROW_NUMBER() OVER () as id 
    FROM information_schema.columns 
    LIMIT 60
) as numbers;

-- 5-4. 3등급: Chill Family Suite (C 건물, 각 층 10개, 총 4개 층) - 40개
INSERT INTO rooms (room_types_id, room_number, status)
SELECT 4, 
       CONCAT('C', 
              FLOOR((id-1)/10) + 1, 
              LPAD(((id-1) % 10) + 1, 2, '0')), 
       CASE 
           WHEN id % 20 = 0 THEN 'MAINTENANCE' 
           WHEN id % 5 = 0 THEN 'OCCUPIED' 
           ELSE 'AVAILABLE' 
       END
FROM (
    SELECT ROW_NUMBER() OVER () as id 
    FROM information_schema.columns 
    LIMIT 40
) as numbers;

-- 5-5. 2등급: Chill Lake Suite (B 건물, 각 층 5개, 총 4개 층) - 20개
INSERT INTO rooms (room_types_id, room_number, status)
SELECT 5, 
       CONCAT('B', 
              FLOOR((id-1)/5) + 1, 
              LPAD(((id-1) % 5) + 1, 2, '0')), 
       CASE 
           WHEN id % 20 = 0 THEN 'MAINTENANCE' 
           WHEN id % 5 = 0 THEN 'OCCUPIED' 
           ELSE 'AVAILABLE' 
       END
FROM (
    SELECT ROW_NUMBER() OVER () as id 
    FROM information_schema.columns 
    LIMIT 20
) as numbers;

-- 5-6. 1등급: Ultimate Chill Suite (A 건물, 각 층 4개, 총 2개 층) - 8개
INSERT INTO rooms (room_types_id, room_number, status)
SELECT 6, 
       CONCAT('A', 
              FLOOR((id-1)/4) + 1, 
              LPAD(((id-1) % 4) + 1, 2, '0')), 
       CASE 
           WHEN id % 7 = 0 THEN 'MAINTENANCE' 
           WHEN id % 3 = 0 THEN 'OCCUPIED' 
           ELSE 'AVAILABLE' 
       END
FROM (
    SELECT ROW_NUMBER() OVER () as id 
    FROM information_schema.columns 
    LIMIT 8
) as numbers;

-- 6. 예약 테이블 데이터 (객실 ID를 실제 존재하는 것으로 대체)
INSERT INTO room_reservations (users_id, rooms_id, check_in_date, check_out_date, adults, children, status, total_amount, payment_methods_id, reservation_number) VALUES
-- 확정된 예약 (미래 날짜)
-- 각 예약에는 다양한 등급의 객실을 사용합니다
(1, (SELECT rooms_id FROM rooms WHERE room_number = 'A101' LIMIT 1), '2025-03-25', '2025-03-27', 2, 0, 'CONFIRMED', 1900000, 1, 'RES20250325001'),
(2, (SELECT rooms_id FROM rooms WHERE room_number = 'E101' LIMIT 1), '2025-03-28', '2025-03-30', 2, 1, 'CONFIRMED', 560000, 3, 'RES20250328001'),
(3, (SELECT rooms_id FROM rooms WHERE room_number = 'F101' LIMIT 1), '2025-04-01', '2025-04-03', 2, 0, 'CONFIRMED', 440000, 4, 'RES20250401001'),
(4, (SELECT rooms_id FROM rooms WHERE room_number = 'D101' LIMIT 1), '2025-04-05', '2025-04-07', 2, 2, 'CONFIRMED', 760000, 5, 'RES20250405001'),
(6, (SELECT rooms_id FROM rooms WHERE room_number = 'B101' LIMIT 1), '2025-04-10', '2025-04-12', 2, 0, 'CONFIRMED', 1360000, 7, 'RES20250410001'),
(8, (SELECT rooms_id FROM rooms WHERE room_number = 'C101' LIMIT 1), '2025-04-15', '2025-04-17', 4, 2, 'CONFIRMED', 1040000, 9, 'RES20250415001'),
(10, (SELECT rooms_id FROM rooms WHERE room_number = 'A102' LIMIT 1), '2025-04-20', '2025-04-25', 4, 1, 'CONFIRMED', 4750000, 11, 'RES20250420001'),

-- 완료된 예약 (과거 날짜)
(1, (SELECT rooms_id FROM rooms WHERE room_number = 'F102' LIMIT 1), '2025-02-15', '2025-02-17', 2, 0, 'COMPLETED', 440000, 1, 'RES20250215001'),
(4, (SELECT rooms_id FROM rooms WHERE room_number = 'E102' LIMIT 1), '2025-02-20', '2025-02-22', 2, 1, 'COMPLETED', 560000, 5, 'RES20250220001'),
(6, (SELECT rooms_id FROM rooms WHERE room_number = 'C102' LIMIT 1), '2025-02-23', '2025-02-25', 4, 2, 'COMPLETED', 1040000, 7, 'RES20250223001'),
(8, (SELECT rooms_id FROM rooms WHERE room_number = 'B102' LIMIT 1), '2025-02-27', '2025-03-01', 2, 0, 'COMPLETED', 1360000, 9, 'RES20250227001'),
(10, (SELECT rooms_id FROM rooms WHERE room_number = 'A103' LIMIT 1), '2025-03-03', '2025-03-08', 4, 1, 'COMPLETED', 4750000, 11, 'RES20250303001'),

-- 취소된 예약
(1, (SELECT rooms_id FROM rooms WHERE room_number = 'F103' LIMIT 1), '2025-03-10', '2025-03-12', 2, 0, 'CANCELLED', 440000, 1, 'RES20250310001'),
(2, (SELECT rooms_id FROM rooms WHERE room_number = 'E103' LIMIT 1), '2025-03-12', '2025-03-14', 2, 1, 'CANCELLED', 560000, 3, 'RES20250312001');



-- 7. 레스토랑 테이블 데이터
INSERT INTO restaurants (name, capacity, opening_time, closing_time) VALUES
('Chill Bites', 120, '06:30:00', '22:30:00'),
('Chill Garden', 80, '11:30:00', '22:00:00'),
('Chill Elegance', 40, '18:00:00', '22:00:00'),
('Chill Moments', 60, '10:00:00', '24:00:00');



-- 8. 메뉴 카테고리 테이블 데이터
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



-- 9. 메뉴 아이템 테이블 데이터
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
(10, '프리미엄 와인 페어링', '코스에 어울리는 엄선된 와인 페어링', 80000, '/images/menu/wine-pairing.jpg', true, false, true, '알코올'),
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



-- 10. 다이닝 예약 테이블 데이터
INSERT INTO dining_reservations (users_id, restaurants_id, reservation_date, reservation_time, guests, status, reservation_number) VALUES
-- 확정된 다이닝 예약
(1, 3, '2025-03-25', '19:00:00', 2, 'CONFIRMED', 'DRES20250325001'),
(2, 2, '2025-03-28', '18:30:00', 3, 'CONFIRMED', 'DRES20250328001'),
(3, 1, '2025-04-01', '12:00:00', 2, 'CONFIRMED', 'DRES20250401001'),
(4, 4, '2025-04-05', '15:00:00', 4, 'CONFIRMED', 'DRES20250405001'),
(6, 3, '2025-04-10', '19:30:00', 2, 'CONFIRMED', 'DRES20250410001'),
(8, 2, '2025-04-15', '13:00:00', 6, 'CONFIRMED', 'DRES20250415001'),
(10, 3, '2025-04-20', '20:00:00', 4, 'CONFIRMED', 'DRES20250420001'),
-- 완료된 다이닝 예약
(1, 3, '2025-02-16', '19:00:00', 2, 'COMPLETED', 'DRES20250216001'),
(4, 1, '2025-02-21', '08:00:00', 3, 'COMPLETED', 'DRES20250221001'),
(6, 2, '2025-02-24', '12:30:00', 6, 'COMPLETED', 'DRES20250224001'),
(8, 3, '2025-02-28', '19:00:00', 2, 'COMPLETED', 'DRES20250228001'),
(10, 4, '2025-03-05', '14:30:00', 4, 'COMPLETED', 'DRES20250305001'),
-- 취소된 다이닝 예약
(1, 2, '2025-03-12', '12:00:00', 2, 'CANCELLED', 'DRES20250312001'),
(5, 4, '2025-03-15', '15:30:00', 3, 'CANCELLED', 'DRES20250315001');



-- 11. 상품 테이블 데이터
INSERT INTO products (category, name, price, stock, sku) VALUES
-- Chill Haven 시그니처 컬렉션
('SIGNATURE', '평온한 순간 아로마 디퓨저 세트', 85000, 50, 'SIG001'),
('SIGNATURE', '숲속의 휴식 향초 3종 세트', 65000, 75, 'SIG002'),
('SIGNATURE', 'Chill Haven 룸 스프레이', 45000, 100, 'SIG003'),
('SIGNATURE', 'Ultimate Chill 목욕 소금 & 입욕제 세트', 55000, 60, 'SIG004'),
('SIGNATURE', 'Chill Haven 바디케어 세트', 75000, 50, 'SIG005'),
('SIGNATURE', 'Chill Night 베개커버 세트', 120000, 40, 'SIG006'),
('SIGNATURE', 'Chill Comfort 고급 목욕 가운', 95000, 60, 'SIG007'),
('SIGNATURE', 'Chill Haven 로고 슬리퍼', 45000, 100, 'SIG008'),

-- 힐링 & 웰니스 컬렉션
('WELLNESS', '마음의 평화 명상 키트', 75000, 40, 'WELL001'),
('WELLNESS', 'Chill Yoga 요가 매트 & 액세서리', 90000, 30, 'WELL002'),
('WELLNESS', '내면의 고요 명상 쿠션', 65000, 40, 'WELL003'),
('WELLNESS', '깊은 휴식 수면 키트', 65000, 45, 'WELL004'),
('WELLNESS', '치킬 드림 라벤더 베개', 85000, 35, 'WELL005'),
('WELLNESS', '밤의 평온 수면 차 세트', 45000, 70, 'WELL006'),
('WELLNESS', '숲의 선물 아로마테라피 오일 세트', 70000, 50, 'WELL007'),
('WELLNESS', '호수의 평온 마사지 스톤', 45000, 60, 'WELL008'),
('WELLNESS', 'Chill Moment 스트레스 완화 볼', 25000, 100, 'WELL009'),

-- 에코 & 지속가능한 라이프스타일 제품
('ECO', '지구를 위한 휴식 친환경 텀블러', 35000, 80, 'ECO001'),
('ECO', '숲의 숨결 공기정화 미니 식물', 45000, 60, 'ECO002'),
('ECO', '에코 치킬 유기농 면 토트백', 25000, 120, 'ECO003'),
('ECO', '순수한 휴식 유기농 비누 & 샴푸 바', 40000, 70, 'ECO004'),
('ECO', '자연의 터치 대나무 칫솔 & 빗 세트', 30000, 90, 'ECO005'),
('ECO', '오가닉 펄스 핸드 & 바디 로션', 38000, 65, 'ECO006'),
('ECO', '여행하는 평화 재사용 가능 여행 키트', 55000, 45, 'ECO007'),
('ECO', '에코 트립 여행용 세면도구 세트', 42000, 60, 'ECO008'),
('ECO', '그린 웨이 휴대용 수저 세트', 28000, 80, 'ECO009'),

-- 휴식을 위한 식음료 제품
('FOOD', 'Chill Tea 시그니처 차 컬렉션', 45000, 65, 'FOOD001'),
('FOOD', '평온한 시간 티 세트', 85000, 40, 'FOOD002'),
('FOOD', 'Chill Moment 허브 티 블렌드', 35000, 75, 'FOOD003'),
('FOOD', '자연의 달콤함 유기농 꿀 & 잼 세트', 50000, 55, 'FOOD004'),
('FOOD', '소소한 행복 프리미엄 초콜릿 & 쿠키 세트', 40000, 65, 'FOOD005'),
('FOOD', '숲의 선물 견과류 & 말린 과일 세트', 30000, 80, 'FOOD006'),
('FOOD', '평온한 저녁 와인 셀렉션', 120000, 30, 'FOOD007'),
('FOOD', '치킬 모먼트 칵테일 키트', 85000, 25, 'FOOD008'),
('FOOD', '리프레싱 치킬 수제 에이드 세트', 40000, 50, 'FOOD009'),

-- 객실 등급별 맞춤 컬렉션
('ROOM', '간편한 힐링 미니 아로마 세트', 50000, 70, 'ROOM001'),
('ROOM', '휴식의 시작 베이직 웰니스 키트', 65000, 55, 'ROOM002'),
('ROOM', '가벼운 평온 여행용 목욕 세트', 45000, 85, 'ROOM003'),
('ROOM', '깊은 휴식 프리미엄 아로마 테라피 세트', 95000, 40, 'ROOM004'),
('ROOM', '평온한 밤 수면 향상 키트', 75000, 45, 'ROOM005'),
('ROOM', '마음의 평화 힐링 북 & 음악 세트', 65000, 50, 'ROOM006'),
('ROOM', '가족 힐링 타임 보드게임 컬렉션', 85000, 35, 'ROOM007'),
('ROOM', '함께하는 평온 가족 요가 & 명상 키트', 95000, 30, 'ROOM008'),
('ROOM', '즐거운 휴식 패밀리 스낵 박스', 65000, 50, 'ROOM009'),
('ROOM', '럭셔리 힐링 프리미엄 웰빙 박스', 250000, 15, 'ROOM010'),
('ROOM', '완벽한 평온 VIP 아로마 테라피 컬렉션', 180000, 20, 'ROOM011'),
('ROOM', '깊은 감동 한정판 아트 프린트', 150000, 10, 'ROOM012'),

-- 메모리 & 컬렉터블 아이템
('MEMORY', 'Chill Moment 포토 프레임', 45000, 60, 'MEM001'),
('MEMORY', '평온한 순간 아트 포스터 & 엽서 세트', 35000, 80, 'MEM002'),
('MEMORY', '휴식의 메모리 다이어리 & 펜 세트', 55000, 50, 'MEM003'),
('MEMORY', 'Chill Haven 드림 미니어처', 65000, 40, 'MEM004'),
('MEMORY', 'Chill Guy 캐릭터 인형', 40000, 70, 'MEM005'),
('MEMORY', '치킬 포레스트 미니 디오라마', 85000, 25, 'MEM006'),
('MEMORY', '계절의 평온 봄 에디션', 95000, 20, 'MEM007'),
('MEMORY', '선셋 치킬 여름 컬렉션', 95000, 20, 'MEM008'),
('MEMORY', '포레스트 뷰 가을 스페셜', 95000, 20, 'MEM009'),
('MEMORY', '치킬 윈터 겨울 에디션', 95000, 20, 'MEM010');



-- 12. 주문 테이블 데이터 다시 삽입 (고유한 주문 번호 사용)
INSERT INTO orders (users_id, total_amount, status, payment_methods_id, order_number, is_in_room_delivery) VALUES
-- 완료된 주문
(1, 190000, 'DELIVERED', 1, 'ORD20250216001', true),
(2, 85000, 'DELIVERED', 3, 'ORD20250221001', false),
(4, 120000, 'DELIVERED', 5, 'ORD20250221002', true),
(6, 255000, 'DELIVERED', 7, 'ORD20250224001', true),
(8, 135000, 'DELIVERED', 9, 'ORD20250228001', false),
(10, 370000, 'DELIVERED', 11, 'ORD20250305001', true),
-- 진행 중인 주문
(1, 150000, 'PAID', 1, 'ORD20250325001', true),
(3, 45000, 'PROCESSING', 4, 'ORD20250401001', false),
(6, 210000, 'PAID', 7, 'ORD20250410001', true),
(10, 250000, 'PROCESSING', 11, 'ORD20250420001', true),
-- 취소된 주문
(2, 65000, 'CANCELLED', 3, 'ORD20250318001', false),
(5, 75000, 'CANCELLED', 6, 'ORD20250320001', true);



-- 13. 주문 아이템 테이블 데이터 재삽입 (실제 orders_id 값을 서브쿼리로 조회하여 참조)
INSERT INTO order_items (orders_id, products_id, quantity, price, total_price) VALUES
-- 첫 번째 주문 - 김민준님 (ORD20250216001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250216001'), 1, 1, 85000, 85000),  -- 평온한 순간 아로마 디퓨저 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250216001'), 3, 1, 45000, 45000),  -- Chill Haven 룸 스프레이
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250216001'), 11, 1, 60000, 60000), -- 내면의 고요 명상 쿠션

-- 두 번째 주문 - 이수진님 (ORD20250221001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250221001'), 7, 1, 85000, 85000),  -- Chill Comfort 고급 목욕 가운

-- 세 번째 주문 - 최유나님 (ORD20250221002)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250221002'), 4, 1, 55000, 55000),  -- Ultimate Chill 목욕 소금 & 입욕제 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250221002'), 14, 1, 45000, 45000), -- 밤의 평온 수면 차 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250221002'), 20, 1, 20000, 20000), -- 기타 아이템

-- 네 번째 주문 - 강은비님 (ORD20250224001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250224001'), 5, 1, 75000, 75000),  -- Chill Haven 바디케어 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250224001'), 9, 1, 85000, 85000),  -- 치킬 드림 라벤더 베개
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250224001'), 17, 1, 95000, 95000), -- 함께하는 평온 가족 요가 & 명상 키트

-- 다섯 번째 주문 - 윤서연님 (ORD20250228001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250228001'), 3, 1, 45000, 45000),  -- Chill Haven 룸 스프레이
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250228001'), 19, 2, 35000, 70000), -- 에코 치킬 유기농 면 토트백 (2개)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250228001'), 22, 1, 20000, 20000), -- 그린 웨이 휴대용 수저 세트

-- 여섯 번째 주문 - 문지영님 (ORD20250305001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250305001'), 1, 2, 85000, 170000), -- 평온한 순간 아로마 디퓨저 세트 (2개)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250305001'), 2, 1, 65000, 65000),  -- 숲속의 휴식 향초 3종 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250305001'), 21, 1, 35000, 35000), -- 평온한 순간 아트 포스터 & 엽서 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250305001'), 30, 1, 100000, 100000), -- 럭셔리 힐링 프리미엄 웰빙 박스

-- 일곱 번째 주문 - 김민준님 (ORD20250325001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250325001'), 4, 1, 55000, 55000),  -- Ultimate Chill 목욕 소금 & 입욕제 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250325001'), 9, 1, 85000, 85000),  -- 치킬 드림 라벤더 베개
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250325001'), 20, 1, 10000, 10000), -- 기타 아이템

-- 여덟 번째 주문 - 박지호님 (ORD20250401001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250401001'), 3, 1, 45000, 45000),  -- Chill Haven 룸 스프레이

-- 아홉 번째 주문 - 강은비님 (ORD20250410001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250410001'), 5, 1, 75000, 75000),  -- Chill Haven 바디케어 세트
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250410001'), 10, 1, 90000, 90000), -- Chill Yoga 요가 매트 & 액세서리
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250410001'), 19, 1, 35000, 35000), -- 에코 치킬 유기농 면 토트백
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250410001'), 22, 1, 10000, 10000), -- 그린 웨이 휴대용 수저 세트

-- 열 번째 주문 - 문지영님 (ORD20250420001)
((SELECT orders_id FROM orders WHERE order_number = 'ORD20250420001'), 30, 1, 250000, 250000); -- 럭셔리 힐링 프리미엄 웰빙 박스



-- 14. 포인트 트랜잭션 테이블 데이터 재삽입 (실제 예약 ID와 주문 ID를 서브쿼리로 조회하여 참조)
INSERT INTO point_transactions 
(users_id, points, reference_id, reference_type, transaction_type, transaction_date) 
VALUES
-- 김민준 포인트 내역
(1, 300, (SELECT room_reservations_id FROM room_reservations WHERE reservation_number = 'RES20250215001'), 'ROOM', 'EARN_STAY', '2025-02-17 12:00:00'),
(1, 200, (SELECT dining_reservations_id FROM dining_reservations WHERE reservation_number = 'DRES20250216001'), 'DINING', 'EARN_DINING', '2025-02-16 21:30:00'),
(1, 190, (SELECT orders_id FROM orders WHERE order_number = 'ORD20250216001'), 'GIFTSHOP', 'EARN_SHOPPING', '2025-02-16 15:45:00'),
(1, -500, (SELECT room_reservations_id FROM room_reservations WHERE reservation_number = 'RES20250325001'), 'ROOM', 'REDEMPTION_ROOM', '2025-03-25 10:15:00'),

-- 이수진 포인트 내역
(2, 200, NULL, 'ROOM', 'EARN_STAY', '2025-02-22 14:30:00'), -- 이력이 없으므로 NULL 참조
(2, 85, (SELECT orders_id FROM orders WHERE order_number = 'ORD20250221001'), 'GIFTSHOP', 'EARN_SHOPPING', '2025-02-21 16:20:00'),

-- 최유나 포인트 내역
(4, 200, (SELECT room_reservations_id FROM room_reservations WHERE reservation_number = 'RES20250220001'), 'ROOM', 'EARN_STAY', '2025-02-22 11:45:00'),
(4, 150, (SELECT dining_reservations_id FROM dining_reservations WHERE reservation_number = 'DRES20250221001'), 'DINING', 'EARN_DINING', '2025-02-21 20:10:00'),
(4, 120, (SELECT orders_id FROM orders WHERE order_number = 'ORD20250221002'), 'GIFTSHOP', 'EARN_SHOPPING', '2025-02-21 10:30:00'),

-- 강은비 포인트 내역
(6, 300, (SELECT room_reservations_id FROM room_reservations WHERE reservation_number = 'RES20250223001'), 'ROOM', 'EARN_STAY', '2025-02-25 12:30:00'),
(6, 200, (SELECT dining_reservations_id FROM dining_reservations WHERE reservation_number = 'DRES20250224001'), 'DINING', 'EARN_DINING', '2025-02-24 21:15:00'),
(6, 255, (SELECT orders_id FROM orders WHERE order_number = 'ORD20250224001'), 'GIFTSHOP', 'EARN_SHOPPING', '2025-02-24 15:00:00'),

-- 윤서연 포인트 내역
(8, 300, (SELECT room_reservations_id FROM room_reservations WHERE reservation_number = 'RES20250227001'), 'ROOM', 'EARN_STAY', '2025-03-01 11:00:00'),
(8, 200, (SELECT dining_reservations_id FROM dining_reservations WHERE reservation_number = 'DRES20250228001'), 'DINING', 'EARN_DINING', '2025-02-28 20:45:00'),
(8, 135, (SELECT orders_id FROM orders WHERE order_number = 'ORD20250228001'), 'GIFTSHOP', 'EARN_SHOPPING', '2025-02-28 16:30:00'),

-- 문지영 포인트 내역
(10, 300, (SELECT room_reservations_id FROM room_reservations WHERE reservation_number = 'RES20250303001'), 'ROOM', 'EARN_STAY', '2025-03-08 12:15:00'),
(10, 150, (SELECT dining_reservations_id FROM dining_reservations WHERE reservation_number = 'DRES20250305001'), 'DINING', 'EARN_DINING', '2025-03-05 19:30:00'),
(10, 370, (SELECT orders_id FROM orders WHERE order_number = 'ORD20250305001'), 'GIFTSHOP', 'EARN_SHOPPING', '2025-03-05 14:45:00'),
(10, -1000, NULL, 'SPA', 'REDEMPTION_SPA', '2025-04-20 15:00:00'),

-- 포인트 가입 보너스
(3, 100, NULL, NULL, 'SIGNUP_BONUS', '2025-02-15 09:30:00'),
(5, 100, NULL, NULL, 'SIGNUP_BONUS', '2025-02-20 14:45:00'),
(7, 100, NULL, NULL, 'SIGNUP_BONUS', '2025-01-10 11:15:00'),
(9, 100, NULL, NULL, 'SIGNUP_BONUS', '2025-01-25 16:30:00');



-- 15. 멤버십 등급별 할인 혜택 데이터
INSERT INTO membership_discount_benefits
    (membership_tier, benefit_type, discount_percentage)
VALUES
    ('CHILL_BREEZE', 'ROOM', 5),
    ('CHILL_BREEZE', 'GIFT_SHOP', 5),
    ('CHILL_FLOW', 'ROOM', 10),
    ('CHILL_FLOW', 'DINING', 5),
    ('CHILL_FLOW', 'SPA', 10),
    ('CHILL_FLOW', 'GIFT_SHOP', 10),
    ('DEEP_CHILL', 'ROOM', 15),
    ('DEEP_CHILL', 'DINING', 10),
    ('DEEP_CHILL', 'SPA', 20),
    ('DEEP_CHILL', 'GIFT_SHOP', 15);



-- 16. 멤버십 등급별 포인트 적립 정책 데이터
INSERT INTO membership_point_policy
    (membership_tier, points_per_stay, points_per_spend_amount)
VALUES
    ('CHILL_BREEZE', 100, 0.0100), -- 1,000원당 10포인트
    ('CHILL_FLOW', 200, 0.0200),   -- 1,000원당 20포인트
    ('DEEP_CHILL', 300, 0.0300);   -- 1,000원당 30포인트