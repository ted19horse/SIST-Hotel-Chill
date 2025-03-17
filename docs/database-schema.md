# 호텔 예약 시스템 데이터베이스 스키마

## 목차

1. [개요](#개요)
2. [사용자 관련 테이블](#사용자-관련-테이블)
   - [users](#users)
   - [memberships](#memberships)
   - [user_preferences](#user_preferences)
   - [payment_methods](#payment_methods)
3. [객실 관련 테이블](#객실-관련-테이블)
   - [room_types](#room_types)
   - [rooms](#rooms)
   - [room_amenities](#room_amenities)
   - [room_type_amenities](#room_type_amenities)
   - [room_images](#room_images)
4. [예약 관련 테이블](#예약-관련-테이블)
   - [reservations](#reservations)
   - [reservation_payments](#reservation_payments)
5. [다이닝 관련 테이블](#다이닝-관련-테이블)
   - [restaurants](#restaurants)
   - [restaurant_images](#restaurant_images)
   - [menu_categories](#menu_categories)
   - [menu_items](#menu_items)
   - [dining_reservations](#dining_reservations)
6. [기프트샵 관련 테이블](#기프트샵-관련-테이블)
   - [product_categories](#product_categories)
   - [products](#products)
   - [product_images](#product_images)
   - [shopping_carts](#shopping_carts)
   - [cart_items](#cart_items)
   - [orders](#orders)
   - [order_items](#order_items)
7. [부대시설 관련 테이블](#부대시설-관련-테이블)
   - [facilities](#facilities)
   - [facility_images](#facility_images)
   - [facility_reservations](#facility_reservations)
8. [포인트/혜택 관련 테이블](#포인트혜택-관련-테이블)
   - [point_transactions](#point_transactions)
   - [membership_benefits](#membership_benefits)
9. [컨텐츠 관리 테이블](#컨텐츠-관리-테이블)
   - [contents](#contents)
   - [content_images](#content_images)
   - [banners](#banners)
10. [시스템 관리 테이블](#시스템-관리-테이블)
    - [settings](#settings)
    - [audit_logs](#audit_logs)
    - [email_templates](#email_templates)
    - [email_logs](#email_logs)
11. [인덱스](#인덱스)

## 개요

이 문서는 호텔 예약 시스템의 데이터베이스 스키마를 설명합니다. 데이터베이스는 사용자 관리, 객실 관리, 예약 관리 등의 기능을 지원하기 위한 여러 테이블로 구성되어 있습니다.

## 사용자 관련 테이블

### users

사용자 계정 정보를 저장하는 테이블입니다.

| 컬럼명     | 데이터 타입  | 제약 조건                                                       | 설명                                       |
| ---------- | ------------ | --------------------------------------------------------------- | ------------------------------------------ |
| users_id   | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | 사용자 고유 식별자                         |
| email      | VARCHAR(100) | NOT NULL, UNIQUE                                                | 사용자 이메일 주소                         |
| password   | VARCHAR(60)  | NOT NULL                                                        | 암호화된 비밀번호                          |
| name       | VARCHAR(50)  | NOT NULL                                                        | 사용자 이름                                |
| phone      | VARCHAR(20)  | NOT NULL                                                        | 전화번호                                   |
| birth_date | DATE         | NULL                                                            | 생년월일                                   |
| address    | VARCHAR(255) | NULL                                                            | 주소                                       |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | 계정 생성 시간                             |
| updated_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 계정 정보 수정 시간                        |
| last_login | TIMESTAMP    | NULL                                                            | 마지막 로그인 시간                         |
| status     | VARCHAR(20)  | NOT NULL, DEFAULT 'ACTIVE'                                      | 계정 상태 (ACTIVE, INACTIVE, SUSPENDED 등) |
| role       | VARCHAR(20)  | NOT NULL, DEFAULT 'USER'                                        | 사용자 역할 (USER, ADMIN 등)               |

### memberships

사용자의 멤버십 정보를 저장하는 테이블입니다.

| 컬럼명            | 데이터 타입    | 제약 조건                        | 설명                          |
| ----------------- | -------------- | -------------------------------- | ----------------------------- |
| memberships_id    | BIGINT         | PRIMARY KEY, AUTO_INCREMENT      | 멤버십 고유 식별자            |
| users_id          | BIGINT         | NOT NULL                         | 사용자 ID (users 테이블 참조) |
| membership_tier   | VARCHAR(20)    | NOT NULL, DEFAULT 'CHILL_BREEZE' | 멤버십 등급                   |
| points            | INT            | NOT NULL, DEFAULT 0              | 적립 포인트                   |
| total_stays       | INT            | NOT NULL, DEFAULT 0              | 총 숙박 횟수                  |
| total_spending    | DECIMAL(12, 2) | NOT NULL, DEFAULT 0              | 총 지출 금액                  |
| joined_date       | DATE           | NOT NULL                         | 멤버십 가입일                 |
| last_tier_change  | DATE           | NULL                             | 마지막 등급 변경일            |
| membership_number | VARCHAR(20)    | NOT NULL, UNIQUE                 | 멤버십 번호                   |

### user_preferences

사용자 개인 설정 정보를 저장하는 테이블입니다.

| 컬럼명              | 데이터 타입  | 제약 조건                   | 설명                                 |
| ------------------- | ------------ | --------------------------- | ------------------------------------ |
| user_preferences_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 사용자 설정 고유 식별자              |
| users_id            | BIGINT       | NOT NULL                    | 사용자 ID (users 테이블 참조)        |
| preference_type     | VARCHAR(50)  | NOT NULL                    | 설정 유형 (예: 알림, 객실 선호도 등) |
| preference_key      | VARCHAR(50)  | NOT NULL                    | 설정 키                              |
| preference_value    | VARCHAR(255) | NOT NULL                    | 설정 값                              |

### payment_methods

사용자의 결제 수단 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입  | 제약 조건                   | 설명                            |
| ------------------ | ------------ | --------------------------- | ------------------------------- |
| payment_methods_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 결제 수단 고유 식별자           |
| users_id           | BIGINT       | NOT NULL                    | 사용자 ID (users 테이블 참조)   |
| card_type          | VARCHAR(50)  | NOT NULL                    | 카드 유형 (VISA, MasterCard 등) |
| last_four_digits   | VARCHAR(4)   | NOT NULL                    | 카드 번호 마지막 4자리          |
| card_holder_name   | VARCHAR(100) | NOT NULL                    | 카드 소유자 이름                |
| expiry_date        | VARCHAR(10)  | NOT NULL                    | 만료일 (MM/YY 형식)             |
| is_default         | BOOLEAN      | NOT NULL, DEFAULT false     | 기본 결제 수단 여부             |
| token              | VARCHAR(255) | NOT NULL                    | 결제 처리를 위한 토큰           |

## 객실 관련 테이블

### room_types

객실 유형 정보를 저장하는 테이블입니다.

| 컬럼명            | 데이터 타입    | 제약 조건                   | 설명                         |
| ----------------- | -------------- | --------------------------- | ---------------------------- |
| room_types_id     | BIGINT         | PRIMARY KEY, AUTO_INCREMENT | 객실 유형 고유 식별자        |
| name              | VARCHAR(100)   | NOT NULL                    | 객실 유형 이름               |
| grade             | INT            | NOT NULL                    | 객실 등급                    |
| size              | INT            | NOT NULL                    | 객실 크기(제곱미터)          |
| view_type         | VARCHAR(50)    | NOT NULL                    | 전망 유형(바다, 도시, 산 등) |
| max_adults        | INT            | NOT NULL                    | 최대 성인 수용 인원          |
| max_children      | INT            | NOT NULL                    | 최대 어린이 수용 인원        |
| description       | TEXT           | NOT NULL                    | 객실 상세 설명               |
| weekday_price     | DECIMAL(10, 2) | NOT NULL                    | 주중 가격                    |
| weekend_price     | DECIMAL(10, 2) | NOT NULL                    | 주말 가격                    |
| peak_season_price | DECIMAL(10, 2) | NOT NULL                    | 성수기 가격                  |
| total_rooms       | INT            | NOT NULL                    | 해당 유형의 총 객실 수       |

### rooms

개별 객실 정보를 저장하는 테이블입니다.

| 컬럼명        | 데이터 타입 | 제약 조건                     | 설명                                           |
| ------------- | ----------- | ----------------------------- | ---------------------------------------------- |
| rooms_id      | BIGINT      | PRIMARY KEY, AUTO_INCREMENT   | 객실 고유 식별자                               |
| room_types_id | BIGINT      | NOT NULL                      | 객실 유형 ID (room_types 테이블 참조)          |
| room_number   | VARCHAR(10) | NOT NULL, UNIQUE              | 객실 번호                                      |
| floor         | INT         | NOT NULL                      | 객실이 위치한 층                               |
| status        | VARCHAR(20) | NOT NULL, DEFAULT 'AVAILABLE' | 객실 상태(AVAILABLE, OCCUPIED, MAINTENANCE 등) |

### room_amenities

객실 내 편의 시설 정보를 저장하는 테이블입니다.

| 컬럼명            | 데이터 타입  | 제약 조건                   | 설명                              |
| ----------------- | ------------ | --------------------------- | --------------------------------- |
| room_amenities_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 편의 시설 고유 식별자             |
| name              | VARCHAR(100) | NOT NULL                    | 편의 시설 이름                    |
| icon              | VARCHAR(100) | NULL                        | 편의 시설 아이콘 경로             |
| description       | VARCHAR(255) | NULL                        | 편의 시설 설명                    |
| amenity_type      | VARCHAR(50)  | NOT NULL                    | 편의 시설 유형(기본, 프리미엄 등) |

### room_type_amenities

객실 유형과 편의 시설 간의 연결 정보를 저장하는 테이블입니다.

| 컬럼명                 | 데이터 타입 | 제약 조건                   | 설명                                      |
| ---------------------- | ----------- | --------------------------- | ----------------------------------------- |
| room_type_amenities_id | BIGINT      | PRIMARY KEY, AUTO_INCREMENT | 연결 고유 식별자                          |
| room_types_id          | BIGINT      | NOT NULL                    | 객실 유형 ID (room_types 테이블 참조)     |
| room_amenities_id      | BIGINT      | NOT NULL                    | 편의 시설 ID (room_amenities 테이블 참조) |

### room_images

객실 유형별 이미지 정보를 저장하는 테이블입니다.

| 컬럼명         | 데이터 타입  | 제약 조건                   | 설명                                  |
| -------------- | ------------ | --------------------------- | ------------------------------------- |
| room_images_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 식별자                    |
| room_types_id  | BIGINT       | NOT NULL                    | 객실 유형 ID (room_types 테이블 참조) |
| image_url      | VARCHAR(255) | NOT NULL                    | 이미지 URL                            |
| is_main_image  | BOOLEAN      | NOT NULL, DEFAULT false     | 대표 이미지 여부                      |
| sort_order     | INT          | NOT NULL, DEFAULT 0         | 이미지 정렬 순서                      |

## 예약 관련 테이블

### reservations

객실 예약 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입    | 제약 조건                           | 설명                                           |
| ------------------ | -------------- | ----------------------------------- | ---------------------------------------------- |
| reservations_id    | BIGINT         | PRIMARY KEY, AUTO_INCREMENT         | 예약 고유 식별자                               |
| users_id           | BIGINT         | NOT NULL                            | 예약한 사용자 ID (users 테이블 참조)           |
| rooms_id           | BIGINT         | NOT NULL                            | 예약된 객실 ID (rooms 테이블 참조)             |
| check_in_date      | DATE           | NOT NULL                            | 체크인 날짜                                    |
| check_out_date     | DATE           | NOT NULL                            | 체크아웃 날짜                                  |
| adults             | INT            | NOT NULL                            | 성인 투숙객 수                                 |
| children           | INT            | NOT NULL                            | 어린이 투숙객 수                               |
| infants            | INT            | NOT NULL, DEFAULT 0                 | 유아 투숙객 수                                 |
| status             | VARCHAR(20)    | NOT NULL                            | 예약 상태 (CONFIRMED, CANCELLED, COMPLETED 등) |
| total_amount       | DECIMAL(10, 2) | NOT NULL                            | 총 예약 금액                                   |
| payment_methods_id | BIGINT         | NULL                                | 결제 수단 ID (payment_methods 테이블 참조)     |
| created_at         | TIMESTAMP      | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 예약 생성 시간                                 |
| special_requests   | TEXT           | NULL                                | 특별 요청 사항                                 |
| reservation_number | VARCHAR(20)    | NOT NULL, UNIQUE                    | 예약 번호                                      |

### reservation_payments

예약 결제 정보를 저장하는 테이블입니다.

| 컬럼명                  | 데이터 타입    | 제약 조건                           | 설명                                       |
| ----------------------- | -------------- | ----------------------------------- | ------------------------------------------ |
| reservation_payments_id | BIGINT         | PRIMARY KEY, AUTO_INCREMENT         | 결제 고유 식별자                           |
| reservations_id         | BIGINT         | NOT NULL                            | 예약 ID (reservations 테이블 참조)         |
| amount                  | DECIMAL(10, 2) | NOT NULL                            | 결제 금액                                  |
| payment_methods_id      | BIGINT         | NOT NULL                            | 결제 수단 ID (payment_methods 테이블 참조) |
| payment_date            | TIMESTAMP      | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 결제 일시                                  |
| status                  | VARCHAR(20)    | NOT NULL                            | 결제 상태 (COMPLETED, FAILED, REFUNDED 등) |
| transaction_id          | VARCHAR(100)   | NULL, UNIQUE                        | 외부 결제 시스템의 트랜잭션 ID             |

## 다이닝 관련 테이블

### restaurants

호텔 내 레스토랑 정보를 저장하는 테이블입니다.

| 컬럼명                  | 데이터 타입  | 제약 조건                   | 설명                                       |
| ----------------------- | ------------ | --------------------------- | ------------------------------------------ |
| restaurants_id          | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 레스토랑 고유 식별자                       |
| name                    | VARCHAR(100) | NOT NULL                    | 레스토랑 이름                              |
| concept                 | VARCHAR(255) | NOT NULL                    | 레스토랑 컨셉                              |
| location                | VARCHAR(100) | NOT NULL                    | 레스토랑 위치                              |
| capacity                | INT          | NOT NULL                    | 수용 인원                                  |
| opening_time            | TIME         | NOT NULL                    | 영업 시작 시간                             |
| closing_time            | TIME         | NOT NULL                    | 영업 종료 시간                             |
| is_reservation_required | BOOLEAN      | NOT NULL, DEFAULT false     | 예약 필수 여부                             |
| access_level            | VARCHAR(50)  | NOT NULL, DEFAULT 'ALL'     | 이용 가능 고객 등급 (ALL, MEMBERS_ONLY 등) |

### restaurant_images

레스토랑 이미지 정보를 저장하는 테이블입니다.

| 컬럼명               | 데이터 타입  | 제약 조건                   | 설명                                  |
| -------------------- | ------------ | --------------------------- | ------------------------------------- |
| restaurant_images_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 식별자                    |
| restaurants_id       | BIGINT       | NOT NULL                    | 레스토랑 ID (restaurants 테이블 참조) |
| image_url            | VARCHAR(255) | NOT NULL                    | 이미지 URL                            |
| is_main_image        | BOOLEAN      | NOT NULL, DEFAULT false     | 대표 이미지 여부                      |
| sort_order           | INT          | NOT NULL, DEFAULT 0         | 이미지 정렬 순서                      |

### menu_categories

메뉴 카테고리 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입  | 제약 조건                   | 설명                                  |
| ------------------ | ------------ | --------------------------- | ------------------------------------- |
| menu_categories_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 메뉴 카테고리 고유 식별자             |
| restaurants_id     | BIGINT       | NOT NULL                    | 레스토랑 ID (restaurants 테이블 참조) |
| name               | VARCHAR(100) | NOT NULL                    | 카테고리 이름                         |
| description        | VARCHAR(255) | NULL                        | 카테고리 설명                         |
| sort_order         | INT          | NOT NULL, DEFAULT 0         | 카테고리 정렬 순서                    |
| availability_start | TIME         | NULL                        | 제공 시작 시간                        |
| availability_end   | TIME         | NULL                        | 제공 종료 시간                        |

### menu_items

메뉴 항목 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입    | 제약 조건                   | 설명                                           |
| ------------------ | -------------- | --------------------------- | ---------------------------------------------- |
| menu_items_id      | BIGINT         | PRIMARY KEY, AUTO_INCREMENT | 메뉴 항목 고유 식별자                          |
| menu_categories_id | BIGINT         | NOT NULL                    | 메뉴 카테고리 ID (menu_categories 테이블 참조) |
| name               | VARCHAR(100)   | NOT NULL                    | 메뉴 이름                                      |
| description        | TEXT           | NULL                        | 메뉴 설명                                      |
| price              | DECIMAL(10, 2) | NOT NULL                    | 메뉴 가격                                      |
| image_url          | VARCHAR(255)   | NULL                        | 메뉴 이미지 URL                                |
| is_vegetarian      | BOOLEAN        | NOT NULL, DEFAULT false     | 채식 메뉴 여부                                 |
| is_signature       | BOOLEAN        | NOT NULL, DEFAULT false     | 시그니처 메뉴 여부                             |
| is_available       | BOOLEAN        | NOT NULL, DEFAULT true      | 제공 가능 여부                                 |
| allergens          | VARCHAR(255)   | NULL                        | 알레르기 유발 성분 정보                        |

### dining_reservations

레스토랑 예약 정보를 저장하는 테이블입니다.

| 컬럼명                 | 데이터 타입 | 제약 조건                           | 설명                                           |
| ---------------------- | ----------- | ----------------------------------- | ---------------------------------------------- |
| dining_reservations_id | BIGINT      | PRIMARY KEY, AUTO_INCREMENT         | 다이닝 예약 고유 식별자                        |
| users_id               | BIGINT      | NOT NULL                            | 예약한 사용자 ID (users 테이블 참조)           |
| restaurants_id         | BIGINT      | NOT NULL                            | 예약된 레스토랑 ID (restaurants 테이블 참조)   |
| reservation_date       | DATE        | NOT NULL                            | 예약 날짜                                      |
| reservation_time       | TIME        | NOT NULL                            | 예약 시간                                      |
| guests                 | INT         | NOT NULL                            | 예약 인원 수                                   |
| status                 | VARCHAR(20) | NOT NULL                            | 예약 상태 (CONFIRMED, CANCELLED, COMPLETED 등) |
| special_requests       | TEXT        | NULL                                | 특별 요청 사항                                 |
| created_at             | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 예약 생성 시간                                 |
| reservation_number     | VARCHAR(20) | NOT NULL, UNIQUE                    | 예약 번호                                      |

## 기프트샵 관련 테이블

### product_categories

상품 카테고리 정보를 저장하는 테이블입니다.

| 컬럼명                | 데이터 타입  | 제약 조건                   | 설명                              |
| --------------------- | ------------ | --------------------------- | --------------------------------- |
| product_categories_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 상품 카테고리 고유 식별자         |
| name                  | VARCHAR(100) | NOT NULL                    | 카테고리 이름                     |
| description           | VARCHAR(255) | NULL                        | 카테고리 설명                     |
| parent_id             | BIGINT       | NULL                        | 상위 카테고리 ID (계층 구조 지원) |
| sort_order            | INT          | NOT NULL, DEFAULT 0         | 카테고리 정렬 순서                |
| image_url             | VARCHAR(255) | NULL                        | 카테고리 이미지 URL               |

### products

상품 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입    | 제약 조건                   | 설명                                         |
| ------------------ | -------------- | --------------------------- | -------------------------------------------- |
| products_id        | BIGINT         | PRIMARY KEY, AUTO_INCREMENT | 상품 고유 식별자                             |
| category_id        | BIGINT         | NOT NULL                    | 카테고리 ID (product_categories 테이블 참조) |
| name               | VARCHAR(100)   | NOT NULL                    | 상품 이름                                    |
| description        | TEXT           | NOT NULL                    | 상품 설명                                    |
| price              | DECIMAL(10, 2) | NOT NULL                    | 상품 가격                                    |
| discount_price     | DECIMAL(10, 2) | NULL                        | 할인 가격                                    |
| stock              | INT            | NOT NULL                    | 재고 수량                                    |
| sku                | VARCHAR(50)    | NOT NULL, UNIQUE            | 상품 고유 코드                               |
| is_featured        | BOOLEAN        | NOT NULL, DEFAULT false     | 추천 상품 여부                               |
| is_new_arrival     | BOOLEAN        | NOT NULL, DEFAULT false     | 신상품 여부                                  |
| is_limited_edition | BOOLEAN        | NOT NULL, DEFAULT false     | 한정판 여부                                  |
| related_room_type  | VARCHAR(50)    | NULL                        | 관련 객실 유형                               |

### product_images

상품 이미지 정보를 저장하는 테이블입니다.

| 컬럼명            | 데이터 타입  | 제약 조건                   | 설명                           |
| ----------------- | ------------ | --------------------------- | ------------------------------ |
| product_images_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 식별자             |
| products_id       | BIGINT       | NOT NULL                    | 상품 ID (products 테이블 참조) |
| image_url         | VARCHAR(255) | NOT NULL                    | 이미지 URL                     |
| is_main_image     | BOOLEAN      | NOT NULL, DEFAULT false     | 대표 이미지 여부               |
| sort_order        | INT          | NOT NULL, DEFAULT 0         | 이미지 정렬 순서               |

### shopping_carts

사용자 장바구니 정보를 저장하는 테이블입니다.

| 컬럼명            | 데이터 타입 | 제약 조건                                                       | 설명                          |
| ----------------- | ----------- | --------------------------------------------------------------- | ----------------------------- |
| shopping_carts_id | BIGINT      | PRIMARY KEY, AUTO_INCREMENT                                     | 장바구니 고유 식별자          |
| users_id          | BIGINT      | NOT NULL                                                        | 사용자 ID (users 테이블 참조) |
| created_at        | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | 장바구니 생성 시간            |
| updated_at        | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 장바구니 수정 시간            |

### cart_items

장바구니 항목 정보를 저장하는 테이블입니다.

| 컬럼명        | 데이터 타입 | 제약 조건                           | 설명                                     |
| ------------- | ----------- | ----------------------------------- | ---------------------------------------- |
| cart_items_id | BIGINT      | PRIMARY KEY, AUTO_INCREMENT         | 장바구니 항목 고유 식별자                |
| cart_id       | BIGINT      | NOT NULL                            | 장바구니 ID (shopping_carts 테이블 참조) |
| products_id   | BIGINT      | NOT NULL                            | 상품 ID (products 테이블 참조)           |
| quantity      | INT         | NOT NULL                            | 수량                                     |
| added_at      | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 항목 추가 시간                           |

### orders

주문 정보를 저장하는 테이블입니다.

| 컬럼명              | 데이터 타입    | 제약 조건                           | 설명                                                   |
| ------------------- | -------------- | ----------------------------------- | ------------------------------------------------------ |
| orders_id           | BIGINT         | PRIMARY KEY, AUTO_INCREMENT         | 주문 고유 식별자                                       |
| users_id            | BIGINT         | NOT NULL                            | 사용자 ID (users 테이블 참조)                          |
| order_date          | TIMESTAMP      | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 주문 일시                                              |
| total_amount        | DECIMAL(10, 2) | NOT NULL                            | 총 주문 금액                                           |
| status              | VARCHAR(20)    | NOT NULL                            | 주문 상태 (PENDING, PROCESSING, SHIPPED, DELIVERED 등) |
| payment_methods_id  | BIGINT         | NOT NULL                            | 결제 수단 ID (payment_methods 테이블 참조)             |
| shipping_address    | TEXT           | NOT NULL                            | 배송 주소                                              |
| shipping_method     | VARCHAR(50)    | NOT NULL                            | 배송 방법                                              |
| tracking_number     | VARCHAR(100)   | NULL                                | 배송 추적 번호                                         |
| order_number        | VARCHAR(20)    | NOT NULL, UNIQUE                    | 주문 번호                                              |
| is_in_room_delivery | BOOLEAN        | NOT NULL, DEFAULT false             | 객실 내 배송 여부                                      |
| room_number         | VARCHAR(10)    | NULL                                | 객실 번호 (객실 내 배송 시)                            |

### order_items

주문 항목 정보를 저장하는 테이블입니다.

| 컬럼명         | 데이터 타입    | 제약 조건                   | 설명                           |
| -------------- | -------------- | --------------------------- | ------------------------------ |
| order_items_id | BIGINT         | PRIMARY KEY, AUTO_INCREMENT | 주문 항목 고유 식별자          |
| orders_id      | BIGINT         | NOT NULL                    | 주문 ID (orders 테이블 참조)   |
| products_id    | BIGINT         | NOT NULL                    | 상품 ID (products 테이블 참조) |
| quantity       | INT            | NOT NULL                    | 수량                           |
| price          | DECIMAL(10, 2) | NOT NULL                    | 구매 당시 상품 가격            |
| total_price    | DECIMAL(10, 2) | NOT NULL                    | 항목 총 가격 (가격 × 수량)     |

## 부대시설 관련 테이블

### facilities

호텔 내 부대시설 정보를 저장하는 테이블입니다.

| 컬럼명                  | 데이터 타입    | 제약 조건                   | 설명                                      |
| ----------------------- | -------------- | --------------------------- | ----------------------------------------- |
| facilities_id           | BIGINT         | PRIMARY KEY, AUTO_INCREMENT | 부대시설 고유 식별자                      |
| name                    | VARCHAR(100)   | NOT NULL                    | 시설 이름                                 |
| category                | VARCHAR(50)    | NOT NULL                    | 시설 카테고리 (수영장, 스파, 피트니스 등) |
| location                | VARCHAR(100)   | NOT NULL                    | 시설 위치                                 |
| description             | TEXT           | NOT NULL                    | 시설 설명                                 |
| opening_time            | TIME           | NULL                        | 운영 시작 시간                            |
| closing_time            | TIME           | NULL                        | 운영 종료 시간                            |
| is_reservation_required | BOOLEAN        | NOT NULL, DEFAULT false     | 예약 필수 여부                            |
| is_chargeable           | BOOLEAN        | NOT NULL, DEFAULT false     | 유료 시설 여부                            |
| price                   | DECIMAL(10, 2) | NULL                        | 이용 가격 (유료 시설인 경우)              |

### facility_images

부대시설 이미지 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입  | 제약 조건                   | 설명                                 |
| ------------------ | ------------ | --------------------------- | ------------------------------------ |
| facility_images_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 식별자                   |
| facilities_id      | BIGINT       | NOT NULL                    | 부대시설 ID (facilities 테이블 참조) |
| image_url          | VARCHAR(255) | NOT NULL                    | 이미지 URL                           |
| is_main_image      | BOOLEAN      | NOT NULL, DEFAULT false     | 대표 이미지 여부                     |
| sort_order         | INT          | NOT NULL, DEFAULT 0         | 이미지 정렬 순서                     |

### facility_reservations

부대시설 예약 정보를 저장하는 테이블입니다.

| 컬럼명                   | 데이터 타입    | 제약 조건                           | 설명                                           |
| ------------------------ | -------------- | ----------------------------------- | ---------------------------------------------- |
| facility_reservations_id | BIGINT         | PRIMARY KEY, AUTO_INCREMENT         | 시설 예약 고유 식별자                          |
| users_id                 | BIGINT         | NOT NULL                            | 예약한 사용자 ID (users 테이블 참조)           |
| facilities_id            | BIGINT         | NOT NULL                            | 예약된 시설 ID (facilities 테이블 참조)        |
| reservation_date         | DATE           | NOT NULL                            | 예약 날짜                                      |
| start_time               | TIME           | NOT NULL                            | 이용 시작 시간                                 |
| end_time                 | TIME           | NOT NULL                            | 이용 종료 시간                                 |
| guests                   | INT            | NOT NULL                            | 이용 인원 수                                   |
| status                   | VARCHAR(20)    | NOT NULL                            | 예약 상태 (CONFIRMED, CANCELLED, COMPLETED 등) |
| special_requests         | TEXT           | NULL                                | 특별 요청 사항                                 |
| is_paid                  | BOOLEAN        | NOT NULL, DEFAULT false             | 결제 완료 여부                                 |
| amount                   | DECIMAL(10, 2) | NULL                                | 결제 금액                                      |
| created_at               | TIMESTAMP      | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 예약 생성 시간                                 |
| reservation_number       | VARCHAR(20)    | NOT NULL, UNIQUE                    | 예약 번호                                      |

## 포인트/혜택 관련 테이블

### point_transactions

사용자 포인트 거래 내역을 저장하는 테이블입니다.

| 컬럼명                | 데이터 타입  | 제약 조건                           | 설명                                   |
| --------------------- | ------------ | ----------------------------------- | -------------------------------------- |
| point_transactions_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT         | 포인트 거래 고유 식별자                |
| users_id              | BIGINT       | NOT NULL                            | 사용자 ID (users 테이블 참조)          |
| points                | INT          | NOT NULL                            | 포인트 금액 (적립은 양수, 사용은 음수) |
| transaction_type      | VARCHAR(50)  | NOT NULL                            | 거래 유형 (EARN, USE, EXPIRE 등)       |
| reference_id          | BIGINT       | NULL                                | 참조 ID (예약 ID, 주문 ID 등)          |
| description           | VARCHAR(255) | NOT NULL                            | 거래 설명                              |
| transaction_date      | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 거래 일시                              |
| expiry_date           | DATE         | NULL                                | 포인트 만료일                          |

### membership_benefits

멤버십 등급별 혜택 정보를 저장하는 테이블입니다.

| 컬럼명                 | 데이터 타입  | 제약 조건                   | 설명                                  |
| ---------------------- | ------------ | --------------------------- | ------------------------------------- |
| membership_benefits_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 혜택 고유 식별자                      |
| membership_tier        | VARCHAR(20)  | NOT NULL                    | 멤버십 등급                           |
| benefit_category       | VARCHAR(50)  | NOT NULL                    | 혜택 카테고리 (객실, 다이닝, 스파 등) |
| description            | VARCHAR(255) | NOT NULL                    | 혜택 설명                             |
| discount_percentage    | INT          | NULL                        | 할인 비율 (%)                         |
| is_active              | BOOLEAN      | NOT NULL, DEFAULT true      | 혜택 활성화 여부                      |

## 컨텐츠 관리 테이블

### contents

웹사이트 컨텐츠 정보를 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입  | 제약 조건                                                       | 설명                                 |
| ------------ | ------------ | --------------------------------------------------------------- | ------------------------------------ |
| contents_id  | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | 컨텐츠 고유 식별자                   |
| title        | VARCHAR(255) | NOT NULL                                                        | 컨텐츠 제목                          |
| content      | TEXT         | NOT NULL                                                        | 컨텐츠 내용                          |
| content_type | VARCHAR(50)  | NOT NULL                                                        | 컨텐츠 유형 (NEWS, EVENT, NOTICE 등) |
| start_date   | DATE         | NULL                                                            | 게시 시작일                          |
| end_date     | DATE         | NULL                                                            | 게시 종료일                          |
| is_published | BOOLEAN      | NOT NULL, DEFAULT false                                         | 게시 여부                            |
| created_at   | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | 생성 시간                            |
| updated_at   | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 수정 시간                            |
| author_id    | BIGINT       | NOT NULL                                                        | 작성자 ID (users 테이블 참조)        |

### content_images

컨텐츠 이미지 정보를 저장하는 테이블입니다.

| 컬럼명            | 데이터 타입  | 제약 조건                   | 설명                             |
| ----------------- | ------------ | --------------------------- | -------------------------------- |
| content_images_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 식별자               |
| contents_id       | BIGINT       | NOT NULL                    | 컨텐츠 ID (contents 테이블 참조) |
| image_url         | VARCHAR(255) | NOT NULL                    | 이미지 URL                       |
| sort_order        | INT          | NOT NULL, DEFAULT 0         | 이미지 정렬 순서                 |

### banners

웹사이트 배너 정보를 저장하는 테이블입니다.

| 컬럼명           | 데이터 타입  | 제약 조건                   | 설명                                 |
| ---------------- | ------------ | --------------------------- | ------------------------------------ |
| banners_id       | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | 배너 고유 식별자                     |
| title            | VARCHAR(100) | NOT NULL                    | 배너 제목                            |
| image_url        | VARCHAR(255) | NOT NULL                    | 데스크톱용 이미지 URL                |
| mobile_image_url | VARCHAR(255) | NULL                        | 모바일용 이미지 URL                  |
| link_url         | VARCHAR(255) | NULL                        | 배너 클릭 시 이동할 URL              |
| start_date       | DATE         | NOT NULL                    | 게시 시작일                          |
| end_date         | DATE         | NOT NULL                    | 게시 종료일                          |
| is_active        | BOOLEAN      | NOT NULL, DEFAULT true      | 활성화 여부                          |
| position         | VARCHAR(50)  | NOT NULL                    | 배너 위치 (MAIN_TOP, MAIN_MIDDLE 등) |
| sort_order       | INT          | NOT NULL, DEFAULT 0         | 배너 정렬 순서                       |

## 시스템 관리 테이블

### settings

시스템 설정 정보를 저장하는 테이블입니다.

| 컬럼명        | 데이터 타입  | 제약 조건                                                       | 설명                                  |
| ------------- | ------------ | --------------------------------------------------------------- | ------------------------------------- |
| settings_id   | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | 설정 고유 식별자                      |
| setting_key   | VARCHAR(100) | NOT NULL, UNIQUE                                                | 설정 키                               |
| setting_value | TEXT         | NOT NULL                                                        | 설정 값                               |
| setting_group | VARCHAR(50)  | NOT NULL                                                        | 설정 그룹 (SYSTEM, PAYMENT, EMAIL 등) |
| description   | VARCHAR(255) | NULL                                                            | 설정 설명                             |
| updated_at    | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 설정 수정 시간                        |

### audit_logs

시스템 감사 로그를 저장하는 테이블입니다.

| 컬럼명        | 데이터 타입  | 제약 조건                           | 설명                                           |
| ------------- | ------------ | ----------------------------------- | ---------------------------------------------- |
| audit_logs_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT         | 로그 고유 식별자                               |
| users_id      | BIGINT       | NULL                                | 사용자 ID (users 테이블 참조)                  |
| action        | VARCHAR(100) | NOT NULL                            | 수행된 작업 (CREATE, UPDATE, DELETE 등)        |
| entity_type   | VARCHAR(50)  | NOT NULL                            | 대상 엔티티 유형 (USER, RESERVATION, ORDER 등) |
| entity_id     | BIGINT       | NULL                                | 대상 엔티티 ID                                 |
| details       | TEXT         | NULL                                | 상세 정보 (변경 내용 등)                       |
| ip_address    | VARCHAR(50)  | NULL                                | 요청 IP 주소                                   |
| created_at    | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 로그 생성 시간                                 |

### email_templates

이메일 템플릿 정보를 저장하는 테이블입니다.

| 컬럼명             | 데이터 타입  | 제약 조건                                                       | 설명                    |
| ------------------ | ------------ | --------------------------------------------------------------- | ----------------------- |
| email_templates_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | 템플릿 고유 식별자      |
| template_code      | VARCHAR(100) | NOT NULL, UNIQUE                                                | 템플릿 코드             |
| subject            | VARCHAR(255) | NOT NULL                                                        | 이메일 제목             |
| content            | TEXT         | NOT NULL                                                        | 이메일 내용 (HTML 형식) |
| description        | VARCHAR(255) | NULL                                                            | 템플릿 설명             |
| is_active          | BOOLEAN      | NOT NULL, DEFAULT true                                          | 활성화 여부             |
| updated_at         | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 템플릿 수정 시간        |

### email_logs

이메일 발송 로그를 저장하는 테이블입니다.

| 컬럼명          | 데이터 타입  | 제약 조건                           | 설명                                    |
| --------------- | ------------ | ----------------------------------- | --------------------------------------- |
| email_logs_id   | BIGINT       | PRIMARY KEY, AUTO_INCREMENT         | 로그 고유 식별자                        |
| template_id     | BIGINT       | NOT NULL                            | 템플릿 ID (email_templates 테이블 참조) |
| recipient_email | VARCHAR(100) | NOT NULL                            | 수신자 이메일                           |
| recipient_name  | VARCHAR(100) | NULL                                | 수신자 이름                             |
| subject         | VARCHAR(255) | NOT NULL                            | 이메일 제목                             |
| content         | TEXT         | NOT NULL                            | 이메일 내용                             |
| status          | VARCHAR(20)  | NOT NULL                            | 발송 상태 (SENT, FAILED 등)             |
| error_message   | TEXT         | NULL                                | 오류 메시지 (실패 시)                   |
| sent_at         | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 발송 시간                               |

## 테이블 관계

### 사용자 관련 테이블 관계

- `users` ⟷ `memberships`: 1:1 관계. 한 사용자는 하나의 멤버십을 가질 수 있습니다.
- `users` ⟷ `user_preferences`: 1:N 관계. 한 사용자는 여러 개인 설정을 가질 수 있습니다.
- `users` ⟷ `payment_methods`: 1:N 관계. 한 사용자는 여러 결제 수단을 등록할 수 있습니다.

### 객실 관련 테이블 관계

- `room_types` ⟷ `rooms`: 1:N 관계. 하나의 객실 유형은 여러 개별 객실을 가질 수 있습니다.
- `room_types` ⟷ `room_type_amenities`: 1:N 관계. 하나의 객실 유형은 여러 편의 시설을 가질 수 있습니다.
- `room_amenities` ⟷ `room_type_amenities`: 1:N 관계. 하나의 편의 시설은 여러 객실 유형에 포함될 수 있습니다.
- `room_types` ⟷ `room_images`: 1:N 관계. 하나의 객실 유형은 여러 이미지를 가질 수 있습니다.

### 예약 관련 테이블 관계

- `users` ⟷ `reservations`: 1:N 관계. 한 사용자는 여러 예약을 할 수 있습니다.
- `rooms` ⟷ `reservations`: 1:N 관계. 하나의 객실은 여러 예약에 사용될 수 있습니다(시간이 다른 경우).
- `payment_methods` ⟷ `reservations`: 1:N 관계. 하나의 결제 수단은 여러 예약에 사용될 수 있습니다.
- `reservations` ⟷ `reservation_payments`: 1:N 관계. 하나의 예약은 여러 결제 기록을 가질 수 있습니다.

### 다이닝 관련 테이블 관계

- `restaurants` ⟷ `restaurant_images`: 1:N 관계. 하나의 레스토랑은 여러 이미지를 가질 수 있습니다.
- `restaurants` ⟷ `menu_categories`: 1:N 관계. 하나의 레스토랑은 여러 메뉴 카테고리를 가질 수 있습니다.
- `menu_categories` ⟷ `menu_items`: 1:N 관계. 하나의 메뉴 카테고리는 여러 메뉴 항목을 가질 수 있습니다.
- `users` ⟷ `dining_reservations`: 1:N 관계. 한 사용자는 여러 다이닝 예약을 할 수 있습니다.
- `restaurants` ⟷ `dining_reservations`: 1:N 관계. 하나의 레스토랑은 여러 예약을 받을 수 있습니다.

### 기프트샵 관련 테이블 관계

- `product_categories` ⟷ `product_categories`: 자기 참조 관계. 카테고리는 계층 구조를 가질 수 있습니다.
- `product_categories` ⟷ `products`: 1:N 관계. 하나의 카테고리는 여러 상품을 가질 수 있습니다.
- `products` ⟷ `product_images`: 1:N 관계. 하나의 상품은 여러 이미지를 가질 수 있습니다.
- `users` ⟷ `shopping_carts`: 1:1 관계. 한 사용자는 하나의 장바구니를 가질 수 있습니다.
- `shopping_carts` ⟷ `cart_items`: 1:N 관계. 하나의 장바구니는 여러 항목을 가질 수 있습니다.
- `products` ⟷ `cart_items`: 1:N 관계. 하나의 상품은 여러 장바구니 항목에 포함될 수 있습니다.
- `users` ⟷ `orders`: 1:N 관계. 한 사용자는 여러 주문을 할 수 있습니다.
- `payment_methods` ⟷ `orders`: 1:N 관계. 하나의 결제 수단은 여러 주문에 사용될 수 있습니다.
- `orders` ⟷ `order_items`: 1:N 관계. 하나의 주문은 여러 주문 항목을 가질 수 있습니다.
- `products` ⟷ `order_items`: 1:N 관계. 하나의 상품은 여러 주문 항목에 포함될 수 있습니다.

### 부대시설 관련 테이블 관계

- `facilities` ⟷ `facility_images`: 1:N 관계. 하나의 부대시설은 여러 이미지를 가질 수 있습니다.
- `facilities` ⟷ `facility_reservations`: 1:N 관계. 하나의 부대시설은 여러 예약을 받을 수 있습니다.
- `users` ⟷ `facility_reservations`: 1:N 관계. 한 사용자는 여러 부대시설 예약을 할 수 있습니다.

### 포인트/혜택 관련 테이블 관계

- `users` ⟷ `point_transactions`: 1:N 관계. 한 사용자는 여러 포인트 거래 내역을 가질 수 있습니다.
- `memberships` ⟷ `membership_benefits`: N:M 관계. 멤버십 등급에 따라 여러 혜택이 제공됩니다.

### 컨텐츠 관리 테이블 관계

- `users` ⟷ `contents`: 1:N 관계. 한 사용자(관리자)는 여러 컨텐츠를 작성할 수 있습니다.
- `contents` ⟷ `content_images`: 1:N 관계. 하나의 컨텐츠는 여러 이미지를 가질 수 있습니다.

## 인덱스

데이터베이스 성능 최적화를 위해 다음과 같은 인덱스가 생성되어 있습니다.

### 사용자 관련 인덱스

- `idx_users_email`: users 테이블의 email 컬럼에 대한 인덱스
- `idx_users_status_email`: users 테이블의 status, email 컬럼에 대한 복합 인덱스
- `idx_memberships_users_id`: memberships 테이블의 users_id 컬럼에 대한 인덱스
- `idx_memberships_tier_number`: memberships 테이블의 membership_tier, membership_number 컬럼에 대한 복합 인덱스

### 객실 관련 인덱스

- `idx_rooms_room_type_status`: rooms 테이블의 room_types_id, status 컬럼에 대한 복합 인덱스

### 예약 관련 인덱스

- `idx_reservations_number`: reservations 테이블의 reservation_number 컬럼에 대한 인덱스
- `idx_reservations_user_id`: reservations 테이블의 users_id 컬럼에 대한 인덱스
- `idx_reservations_room_id`: reservations 테이블의 rooms_id 컬럼에 대한 인덱스
- `idx_reservations_dates_status`: reservations 테이블의 check_in_date, check_out_date, status 컬럼에 대한 복합 인덱스
- `idx_reservations_created`: reservations 테이블의 created_at 컬럼에 대한 인덱스

### 다이닝 관련 인덱스

- `idx_dining_reservations_number`: dining_reservations 테이블의 reservation_number 컬럼에 대한 인덱스
- `idx_dining_reservations_user_id`: dining_reservations 테이블의 users_id 컬럼에 대한 인덱스
- `idx_dining_reservations_restaurant_id`: dining_reservations 테이블의 restaurants_id 컬럼에 대한 인덱스
- `idx_dining_reservations_date_time`: dining_reservations 테이블의 reservation_date, reservation_time 컬럼에 대한 복합 인덱스

### 기프트샵 관련 인덱스

- `idx_products_sku`: products 테이블의 sku 컬럼에 대한 인덱스
- `idx_products_category_id`: products 테이블의 category_id 컬럼에 대한 인덱스
- `idx_products_features`: products 테이블의 is_featured, is_new_arrival, is_limited_edition 컬럼에 대한 복합 인덱스
- `idx_orders_number`: orders 테이블의 order_number 컬럼에 대한 인덱스
- `idx_orders_user_id`: orders 테이블의 users_id 컬럼에 대한 인덱스
- `idx_orders_status_date`: orders 테이블의 status, order_date 컬럼에 대한 복합 인덱스

### 부대시설 관련 인덱스

- `idx_facility_reservations_number`: facility_reservations 테이블의 reservation_number 컬럼에 대한 인덱스
- `idx_facility_reservations_user_id`: facility_reservations 테이블의 users_id 컬럼에 대한 인덱스
- `idx_facility_reservations_facility_id`: facility_reservations 테이블의 facilities_id 컬럼에 대한 인덱스
- `idx_facility_reservations_date_time`: facility_reservations 테이블의 reservation_date, start_time 컬럼에 대한 복합 인덱스

### 포인트/혜택 관련 인덱스

- `idx_point_transactions_user_id`: point_transactions 테이블의 users_id 컬럼에 대한 인덱스
- `idx_point_transactions_date`: point_transactions 테이블의 transaction_date 컬럼에 대한 인덱스
- `idx_point_transactions_expiry`: point_transactions 테이블의 expiry_date 컬럼에 대한 인덱스

### 컨텐츠 관련 인덱스

- `idx_contents_type_published`: contents 테이블의 content_type, is_published 컬럼에 대한 복합 인덱스
- `idx_contents_dates`: contents 테이블의 start_date, end_date 컬럼에 대한 복합 인덱스

## 참고사항

- 현재 외래 키 제약 조건이 주석 처리되어 있습니다. 실제 구현 시 외래 키 제약 조건을 활성화하는 것이 좋습니다.
- 사용자 비밀번호는 반드시 암호화하여 저장해야 합니다.
- 멤버십 등급은 'CHILL_BREEZE'가 기본값으로 설정되어 있습니다.
