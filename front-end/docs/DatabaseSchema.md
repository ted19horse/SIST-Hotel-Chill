# Chill Haven Resort & Spa - 핵심 테이블 및 멤버십 혜택

## 1. 핵심 데이터베이스 테이블

### 사용자 및 멤버십 관련 테이블

#### users

| 필드명   | 데이터 타입  | 제약조건                   | 설명               |
| -------- | ------------ | -------------------------- | ------------------ |
| users_id | BIGINT       | PK, AUTO_INCREMENT         | 사용자 ID          |
| email    | VARCHAR(100) | UNIQUE, NOT NULL           | 이메일 (로그인 ID) |
| password | VARCHAR(60)  | NOT NULL                   | 암호화된 비밀번호  |
| name     | VARCHAR(50)  | NOT NULL                   | 사용자 이름        |
| phone    | VARCHAR(20)  | NOT NULL                   | 전화번호           |
| status   | VARCHAR(20)  | NOT NULL, DEFAULT 'ACTIVE' | 계정 상태          |

#### memberships

| 필드명            | 데이터 타입    | 제약조건                         | 설명         |
| ----------------- | -------------- | -------------------------------- | ------------ |
| memberships_id    | BIGINT         | PK, AUTO_INCREMENT               | 멤버십 ID    |
| users_id          | BIGINT         | FK (users.users_id), NOT NULL    | 사용자 ID    |
| membership_tier   | VARCHAR(20)    | NOT NULL, DEFAULT 'CHILL_BREEZE' | 멤버십 등급  |
| points            | INT            | NOT NULL, DEFAULT 0              | 보유 포인트  |
| total_stays       | INT            | NOT NULL, DEFAULT 0              | 총 숙박 수   |
| total_spending    | DECIMAL(12, 2) | NOT NULL, DEFAULT 0              | 총 소비 금액 |
| membership_number | VARCHAR(20)    | UNIQUE, NOT NULL                 | 멤버십 번호  |

#### membership_discount_benefits

| 필드명              | 데이터 타입 | 제약조건           | 설명                                    |
| ------------------- | ----------- | ------------------ | --------------------------------------- |
| benefit_id          | BIGINT      | PK, AUTO_INCREMENT | 할인 혜택 ID                            |
| membership_tier     | VARCHAR(20) | NOT NULL           | 멤버십 등급                             |
| benefit_type        | VARCHAR(50) | NOT NULL           | 할인 유형(ROOM, DINING, SPA, GIFT_SHOP) |
| discount_percentage | INT         | NOT NULL           | 할인 퍼센트                             |

#### payment_methods

| 필드명             | 데이터 타입 | 제약조건                      | 설명                  |
| ------------------ | ----------- | ----------------------------- | --------------------- |
| payment_methods_id | BIGINT      | PK, AUTO_INCREMENT            | 결제 수단 ID          |
| users_id           | BIGINT      | FK (users.users_id), NOT NULL | 사용자 ID             |
| card_type          | VARCHAR(50) | NOT NULL                      | 카드 종류             |
| last_four_digits   | VARCHAR(4)  | NOT NULL                      | 카드번호 마지막 4자리 |
| is_default         | BOOLEAN     | NOT NULL, DEFAULT false       | 기본 결제 수단 여부   |

### 객실 예약 관련 테이블

#### room_types

| 필드명        | 데이터 타입    | 제약조건           | 설명         |
| ------------- | -------------- | ------------------ | ------------ |
| room_types_id | BIGINT         | PK, AUTO_INCREMENT | 객실 유형 ID |
| name          | VARCHAR(100)   | NOT NULL           | 객실 이름    |
| max_adults    | INT            | NOT NULL           | 최대 성인 수 |
| max_children  | INT            | NOT NULL           | 최대 아동 수 |
| weekday_price | DECIMAL(10, 2) | NOT NULL           | 평일 요금    |
| weekend_price | DECIMAL(10, 2) | NOT NULL           | 주말 요금    |

#### rooms

| 필드명        | 데이터 타입 | 제약조건                                | 설명         |
| ------------- | ----------- | --------------------------------------- | ------------ |
| rooms_id      | BIGINT      | PK, AUTO_INCREMENT                      | 객실 ID      |
| room_types_id | BIGINT      | FK (room_types.room_types_id), NOT NULL | 객실 유형 ID |
| room_number   | VARCHAR(10) | UNIQUE, NOT NULL                        | 객실 번호    |
| status        | VARCHAR(20) | NOT NULL, DEFAULT 'AVAILABLE'           | 상태         |

#### reservations

| 필드명             | 데이터 타입    | 제약조건                                      | 설명          |
| ------------------ | -------------- | --------------------------------------------- | ------------- |
| reservations_id    | BIGINT         | PK, AUTO_INCREMENT                            | 예약 ID       |
| users_id           | BIGINT         | FK (users.users_id), NOT NULL                 | 사용자 ID     |
| rooms_id           | BIGINT         | FK (rooms.rooms_id), NOT NULL                 | 객실 ID       |
| check_in_date      | DATE           | NOT NULL                                      | 체크인 날짜   |
| check_out_date     | DATE           | NOT NULL                                      | 체크아웃 날짜 |
| adults             | INT            | NOT NULL                                      | 성인 수       |
| children           | INT            | NOT NULL                                      | 아동 수       |
| status             | VARCHAR(20)    | NOT NULL                                      | 예약 상태     |
| total_amount       | DECIMAL(10, 2) | NOT NULL                                      | 총 요금       |
| payment_methods_id | BIGINT         | FK (payment_methods.payment_methods_id), NULL | 결제 수단 ID  |
| reservation_number | VARCHAR(20)    | UNIQUE, NOT NULL                              | 예약 번호     |

### 다이닝 관련 테이블

#### restaurants

| 필드명         | 데이터 타입  | 제약조건           | 설명          |
| -------------- | ------------ | ------------------ | ------------- |
| restaurants_id | BIGINT       | PK, AUTO_INCREMENT | 레스토랑 ID   |
| name           | VARCHAR(100) | NOT NULL           | 레스토랑 이름 |
| capacity       | INT          | NOT NULL           | 수용 인원     |
| opening_time   | TIME         | NOT NULL           | 오픈 시간     |
| closing_time   | TIME         | NOT NULL           | 마감 시간     |

#### dining_reservations

| 필드명                 | 데이터 타입 | 제약조건                                  | 설명           |
| ---------------------- | ----------- | ----------------------------------------- | -------------- |
| dining_reservations_id | BIGINT      | PK, AUTO_INCREMENT                        | 다이닝 예약 ID |
| users_id               | BIGINT      | FK (users.users_id), NOT NULL             | 사용자 ID      |
| restaurants_id         | BIGINT      | FK (restaurants.restaurants_id), NOT NULL | 레스토랑 ID    |
| reservation_date       | DATE        | NOT NULL                                  | 예약 날짜      |
| reservation_time       | TIME        | NOT NULL                                  | 예약 시간      |
| guests                 | INT         | NOT NULL                                  | 인원 수        |
| status                 | VARCHAR(20) | NOT NULL                                  | 예약 상태      |
| reservation_number     | VARCHAR(20) | UNIQUE, NOT NULL                          | 예약 번호      |

### 기프트샵 관련 테이블

#### products

| 필드명      | 데이터 타입    | 제약조건           | 설명      |
| ----------- | -------------- | ------------------ | --------- |
| products_id | BIGINT         | PK, AUTO_INCREMENT | 상품 ID   |
| category    | VARCHAR(100)   | NOT NULL           | 카테고리  |
| name        | VARCHAR(100)   | NOT NULL           | 상품 이름 |
| price       | DECIMAL(10, 2) | NOT NULL           | 가격      |
| stock       | INT            | NOT NULL           | 재고 수량 |
| sku         | VARCHAR(50)    | UNIQUE, NOT NULL   | SKU 코드  |

#### orders

| 필드명              | 데이터 타입    | 제약조건                                          | 설명           |
| ------------------- | -------------- | ------------------------------------------------- | -------------- |
| orders_id           | BIGINT         | PK, AUTO_INCREMENT                                | 주문 ID        |
| users_id            | BIGINT         | FK (users.users_id), NOT NULL                     | 사용자 ID      |
| total_amount        | DECIMAL(10, 2) | NOT NULL                                          | 총 금액        |
| status              | VARCHAR(20)    | NOT NULL                                          | 주문 상태      |
| payment_methods_id  | BIGINT         | FK (payment_methods.payment_methods_id), NOT NULL | 결제 수단 ID   |
| order_number        | VARCHAR(20)    | UNIQUE, NOT NULL                                  | 주문 번호      |
| is_in_room_delivery | BOOLEAN        | NOT NULL, DEFAULT false                           | 객실 배송 여부 |

#### order_items

| 필드명         | 데이터 타입    | 제약조건                            | 설명      |
| -------------- | -------------- | ----------------------------------- | --------- |
| order_items_id | BIGINT         | PK, AUTO_INCREMENT                  | 항목 ID   |
| orders_id      | BIGINT         | FK (orders.orders_id), NOT NULL     | 주문 ID   |
| products_id    | BIGINT         | FK (products.products_id), NOT NULL | 상품 ID   |
| quantity       | INT            | NOT NULL                            | 수량      |
| price          | DECIMAL(10, 2) | NOT NULL                            | 단가      |
| total_price    | DECIMAL(10, 2) | NOT NULL                            | 항목 총액 |

### 포인트 관련 테이블

#### point_transactions

| 필드명                | 데이터 타입 | 제약조건                            | 설명                                 |
| --------------------- | ----------- | ----------------------------------- | ------------------------------------ |
| point_transactions_id | BIGINT      | PK, AUTO_INCREMENT                  | 트랜잭션 ID                          |
| users_id              | BIGINT      | FK (users.users_id), NOT NULL       | 사용자 ID                            |
| points                | INT         | NOT NULL                            | 포인트 (양수: 적립, 음수: 사용)      |
| reference_id          | BIGINT      | NOT NULL                            | 참조 ID ( 예약 ID, 주문 ID 등 )      |
| reference_type        | VARCHAR(50) | NOT NULL                            | 참조 타입 ( ROOM, DINING, GIFTSHOP ) |
| transaction_type      | VARCHAR(50) | NOT NULL                            | 트랜잭션 유형                        |
| transaction_date      | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 트랜잭션 시간                        |

#### membership_point_policy

| 필드명                  | 데이터 타입   | 제약조건           | 설명                      |
| ----------------------- | ------------- | ------------------ | ------------------------- |
| policy_id               | BIGINT        | PK, AUTO_INCREMENT | 정책 ID                   |
| membership_tier         | VARCHAR(20)   | NOT NULL, UNIQUE   | 멤버십 등급               |
| points_per_stay         | INT           | NOT NULL           | 숙박당 적립 포인트        |
| points_per_spend_amount | DECIMAL(8, 4) | NOT NULL           | 소비액당 적립 포인트 비율 |

## 2. 멤버십 등급별 혜택 정리

### 멤버십 등급별 할인 혜택

| 혜택 유형            | Chill Breeze (기본) | Chill Flow (중간) | Deep Chill (최고) |
| -------------------- | ------------------- | ----------------- | ----------------- |
| 객실 요금 할인       | 5%                  | 10%               | 15%               |
| 다이닝 이용 할인     | -                   | 5%                | 10%               |
| 스파 트리트먼트 할인 | -                   | 10%               | 20%               |
| 기프트샵 할인        | 5%                  | 10%               | 15%               |

### 멤버십 등급별 포인트 적립률

| 멤버십 등급  | 숙박당 포인트 | 소비금액당 적립률  |
| ------------ | ------------- | ------------------ |
| Chill Breeze | 100점         | 1,000원당 10포인트 |
| Chill Flow   | 200점         | 1,000원당 20포인트 |
| Deep Chill   | 300점         | 1,000원당 30포인트 |

### 멤버십 등급 승급 조건

| 등급         | 승급 조건                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| Chill Breeze | 무료 회원가입                                                                                                    |
| Chill Flow   | - 연간 누적 숙박 3박 이상 또는<br>- 연간 누적 소비금액 100만원 이상                                              |
| Deep Chill   | - 연간 누적 숙박 5박 이상 또는<br>- 연간 누적 소비금액 300만원 이상 또는<br>- Ultimate Chill Suite 1박 이상 숙박 |

### 등급별 특별 혜택

| 혜택 유형       | Chill Breeze       | Chill Flow                | Deep Chill                                          |
| --------------- | ------------------ | ------------------------- | --------------------------------------------------- |
| 체크인/체크아웃 | 일반               | 레이트 체크아웃(오후 2시) | 얼리 체크인(오전 11시)<br>레이트 체크아웃(오후 4시) |
| 룸 업그레이드   | -                  | 연 1회                    | 우선 업그레이드                                     |
| 웰컴 서비스     | 웰컴 드링크        | 웰컴 어메니티 업그레이드  | 특별 감사 선물                                      |
| 특별 행사       | 회원 전용 프로모션 | 요가/명상 클래스 1회 무료 | 멤버 전용 이벤트 초대<br>프라이빗 카바나 2시간 무료 |
| 레스토랑 혜택   | -                  | -                         | 우선 예약권<br>기념일 케이크 및 샴페인              |

### 포인트 사용 방법

- 객실 요금 결제: 1,000포인트 = 10,000원
- 다이닝 결제
- 스파 트리트먼트 결제
- 기프트샵 상품 구매
- 멤버십 등급 업그레이드
