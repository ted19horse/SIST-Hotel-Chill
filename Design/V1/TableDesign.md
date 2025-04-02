# Chill Haven Resort & Spa - 데이터베이스 테이블 구조

## 사용자 관련 테이블

### users
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| users_id | BIGINT | PK, AUTO_INCREMENT | 사용자 ID |
| email | VARCHAR(100) | UNIQUE, NOT NULL | 이메일 (로그인 ID) |
| password | VARCHAR(60) | NOT NULL | BCryptPasswordEncoder로 암호화된 비밀번호 |
| name | VARCHAR(50) | NOT NULL | 사용자 이름 |
| phone | VARCHAR(20) | NOT NULL | 전화번호 |
| birth_date | DATE | NULL | 생년월일 |
| address | VARCHAR(255) | NULL | 주소 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 생성 시간 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 갱신 시간 |
| last_login | TIMESTAMP | NULL | 마지막 로그인 시간 |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'ACTIVE' | 계정 상태 (ACTIVE, INACTIVE, BLOCKED) |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'USER' | 권한 (USER, ADMIN, STAFF) |

### memberships
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| memberships_id | BIGINT | PK, AUTO_INCREMENT | 멤버십 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| membership_tier | VARCHAR(20) | NOT NULL, DEFAULT 'CHILL_BREEZE' | 멤버십 등급 (CHILL_BREEZE, CHILL_FLOW, DEEP_CHILL) |
| points | INT | NOT NULL, DEFAULT 0 | 보유 포인트 |
| total_stays | INT | NOT NULL, DEFAULT 0 | 총 숙박 수 |
| total_spending | DECIMAL(12, 2) | NOT NULL, DEFAULT 0 | 총 소비 금액 |
| joined_date | DATE | NOT NULL | 가입 일자 |
| last_tier_change | DATE | NULL | 마지막 등급 변경 일자 |
| membership_number | VARCHAR(20) | UNIQUE, NOT NULL | 멤버십 번호 |

### user_preferences
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| user_preferences_id | BIGINT | PK, AUTO_INCREMENT | 선호도 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| preference_type | VARCHAR(50) | NOT NULL | 선호도 유형 (ROOM, DINING, ACTIVITY) |
| preference_key | VARCHAR(50) | NOT NULL | 선호도 키 |
| preference_value | VARCHAR(255) | NOT NULL | 선호도 값 |

### payment_methods
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| payment_methods_id | BIGINT | PK, AUTO_INCREMENT | 결제 수단 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| card_type | VARCHAR(50) | NOT NULL | 카드 종류 |
| last_four_digits | VARCHAR(4) | NOT NULL | 카드번호 마지막 4자리 |
| card_holder_name | VARCHAR(100) | NOT NULL | 카드 소유자 이름 |
| expiry_date | VARCHAR(10) | NOT NULL | 만료일 (MM/YY) |
| is_default | BOOLEAN | NOT NULL, DEFAULT false | 기본 결제 수단 여부 |
| token | VARCHAR(255) | NOT NULL | 암호화된 결제 정보 토큰 |

## 객실 관련 테이블

### room_types
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| room_types_id | BIGINT | PK, AUTO_INCREMENT | 객실 유형 ID |
| name | VARCHAR(100) | NOT NULL | 객실 이름 (Chill Comfort Room 등) |
| grade | INT | NOT NULL | 등급 (1-6) |
| size | INT | NOT NULL | 크기 (㎡) |
| view_type | VARCHAR(50) | NOT NULL | 전망 유형 (가든 뷰, 호수 & 산 뷰 등) |
| max_adults | INT | NOT NULL | 최대 성인 수 |
| max_children | INT | NOT NULL | 최대 아동 수 |
| description | TEXT | NOT NULL | 설명 |
| weekday_price | DECIMAL(10, 2) | NOT NULL | 평일 요금 |
| weekend_price | DECIMAL(10, 2) | NOT NULL | 주말 요금 |
| peak_season_price | DECIMAL(10, 2) | NOT NULL | 성수기 요금 |
| total_rooms | INT | NOT NULL | 총 객실 수 |

### rooms
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| rooms_id | BIGINT | PK, AUTO_INCREMENT | 객실 ID |
| room_types_id | BIGINT | FK (room_types.room_types_id), NOT NULL | 객실 유형 ID |
| room_number | VARCHAR(10) | UNIQUE, NOT NULL | 객실 번호 |
| floor | INT | NOT NULL | 층 |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'AVAILABLE' | 상태 (AVAILABLE, OCCUPIED, MAINTENANCE) |

### room_amenities
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| room_amenities_id | BIGINT | PK, AUTO_INCREMENT | 어메니티 ID |
| name | VARCHAR(100) | NOT NULL | 어메니티 이름 |
| icon | VARCHAR(100) | NULL | 아이콘 경로 |
| description | VARCHAR(255) | NULL | 설명 |
| amenity_type | VARCHAR(50) | NOT NULL | 유형 (COMMON, DELUXE, PREMIUM, PRESIDENTIAL) |

### room_type_amenities
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| room_type_amenities_id | BIGINT | PK, AUTO_INCREMENT | ID |
| room_types_id | BIGINT | FK (room_types.room_types_id), NOT NULL | 객실 유형 ID |
| room_amenities_id | BIGINT | FK (room_amenities.room_amenities_id), NOT NULL | 어메니티 ID |

### room_images
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| room_images_id | BIGINT | PK, AUTO_INCREMENT | 이미지 ID |
| room_types_id | BIGINT | FK (room_types.room_types_id), NOT NULL | 객실 유형 ID |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| is_main_image | BOOLEAN | NOT NULL, DEFAULT false | 대표 이미지 여부 |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

## 예약 관련 테이블

### reservations
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| reservations_id | BIGINT | PK, AUTO_INCREMENT | 예약 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| rooms_id | BIGINT | FK (rooms.rooms_id), NOT NULL | 객실 ID |
| check_in_date | DATE | NOT NULL | 체크인 날짜 |
| check_out_date | DATE | NOT NULL | 체크아웃 날짜 |
| adults | INT | NOT NULL | 성인 수 |
| children | INT | NOT NULL | 아동 수 |
| infants | INT | NOT NULL, DEFAULT 0 | 유아 수 |
| status | VARCHAR(20) | NOT NULL | 예약 상태 (CONFIRMED, CANCELLED, COMPLETED) |
| total_amount | DECIMAL(10, 2) | NOT NULL | 총 요금 |
| payment_methods_id | BIGINT | FK (payment_methods.payment_methods_id), NULL | 결제 수단 ID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 예약 시간 |
| special_requests | TEXT | NULL | 특별 요청 사항 |
| reservation_number | VARCHAR(20) | UNIQUE, NOT NULL | 예약 번호 |

### reservation_payments
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| reservation_payments_id | BIGINT | PK, AUTO_INCREMENT | 결제 ID |
| reservations_id | BIGINT | FK (reservations.reservations_id), NOT NULL | 예약 ID |
| amount | DECIMAL(10, 2) | NOT NULL | 결제 금액 |
| payment_methods_id | BIGINT | FK (payment_methods.payment_methods_id), NOT NULL | 결제 수단 ID |
| payment_date | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 결제 시간 |
| status | VARCHAR(20) | NOT NULL | 결제 상태 (PENDING, COMPLETED, FAILED, REFUNDED) |
| transaction_id | VARCHAR(100) | UNIQUE, NULL | 외부 결제 시스템 트랜잭션 ID |

## 다이닝 관련 테이블

### restaurants
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| restaurants_id | BIGINT | PK, AUTO_INCREMENT | 레스토랑 ID |
| name | VARCHAR(100) | NOT NULL | 레스토랑 이름 |
| concept | VARCHAR(255) | NOT NULL | 컨셉 설명 |
| location | VARCHAR(100) | NOT NULL | 위치 |
| capacity | INT | NOT NULL | 수용 인원 |
| opening_time | TIME | NOT NULL | 오픈 시간 |
| closing_time | TIME | NOT NULL | 마감 시간 |
| is_reservation_required | BOOLEAN | NOT NULL, DEFAULT false | 예약 필수 여부 |
| access_level | VARCHAR(50) | NOT NULL, DEFAULT 'ALL' | 이용 가능 레벨 (ALL, SUITE_ONLY) |

### restaurant_images
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| restaurant_images_id | BIGINT | PK, AUTO_INCREMENT | 이미지 ID |
| restaurants_id | BIGINT | FK (restaurants.restaurants_id), NOT NULL | 레스토랑 ID |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| is_main_image | BOOLEAN | NOT NULL, DEFAULT false | 대표 이미지 여부 |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

### menu_categories
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| menu_categories_id | BIGINT | PK, AUTO_INCREMENT | 카테고리 ID |
| restaurants_id | BIGINT | FK (restaurants.restaurants_id), NOT NULL | 레스토랑 ID |
| name | VARCHAR(100) | NOT NULL | 카테고리 이름 |
| description | VARCHAR(255) | NULL | 설명 |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |
| availability_start | TIME | NULL | 제공 시작 시간 |
| availability_end | TIME | NULL | 제공 종료 시간 |

### menu_items
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| menu_items_id | BIGINT | PK, AUTO_INCREMENT | 메뉴 항목 ID |
| menu_categories_id | BIGINT | FK (menu_categories.menu_categories_id), NOT NULL | 카테고리 ID |
| name | VARCHAR(100) | NOT NULL | 메뉴 이름 |
| description | TEXT | NULL | 설명 |
| price | DECIMAL(10, 2) | NOT NULL | 가격 |
| image_url | VARCHAR(255) | NULL | 이미지 URL |
| is_vegetarian | BOOLEAN | NOT NULL, DEFAULT false | 채식 여부 |
| is_signature | BOOLEAN | NOT NULL, DEFAULT false | 시그니처 메뉴 여부 |
| is_available | BOOLEAN | NOT NULL, DEFAULT true | 제공 가능 여부 |
| allergens | VARCHAR(255) | NULL | 알레르기 정보 |

### dining_reservations
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| dining_reservations_id | BIGINT | PK, AUTO_INCREMENT | 다이닝 예약 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| restaurants_id | BIGINT | FK (restaurants.restaurants_id), NOT NULL | 레스토랑 ID |
| reservation_date | DATE | NOT NULL | 예약 날짜 |
| reservation_time | TIME | NOT NULL | 예약 시간 |
| guests | INT | NOT NULL | 인원 수 |
| status | VARCHAR(20) | NOT NULL | 예약 상태 (CONFIRMED, CANCELLED, COMPLETED) |
| special_requests | TEXT | NULL | 특별 요청 사항 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 예약 생성 시간 |
| reservation_number | VARCHAR(20) | UNIQUE, NOT NULL | 예약 번호 |

## 기프트샵 관련 테이블

### product_categories
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| product_categories_id | BIGINT | PK, AUTO_INCREMENT | 카테고리 ID |
| name | VARCHAR(100) | NOT NULL | 카테고리 이름 |
| description | VARCHAR(255) | NULL | 설명 |
| parent_id | BIGINT | FK (product_categories.product_categories_id), NULL | 상위 카테고리 ID |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |
| image_url | VARCHAR(255) | NULL | 카테고리 이미지 URL |

### products
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| products_id | BIGINT | PK, AUTO_INCREMENT | 상품 ID |
| category_id | BIGINT | FK (product_categories.product_categories_id), NOT NULL | 카테고리 ID |
| name | VARCHAR(100) | NOT NULL | 상품 이름 |
| description | TEXT | NOT NULL | 설명 |
| price | DECIMAL(10, 2) | NOT NULL | 가격 |
| discount_price | DECIMAL(10, 2) | NULL | 할인 가격 |
| stock | INT | NOT NULL | 재고 수량 |
| sku | VARCHAR(50) | UNIQUE, NOT NULL | SKU 코드 |
| is_featured | BOOLEAN | NOT NULL, DEFAULT false | 추천 상품 여부 |
| is_new_arrival | BOOLEAN | NOT NULL, DEFAULT false | 신상품 여부 |
| is_limited_edition | BOOLEAN | NOT NULL, DEFAULT false | 한정판 여부 |
| related_room_type | VARCHAR(50) | NULL | 관련 객실 유형 |

### product_images
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| product_images_id | BIGINT | PK, AUTO_INCREMENT | 이미지 ID |
| products_id | BIGINT | FK (products.products_id), NOT NULL | 상품 ID |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| is_main_image | BOOLEAN | NOT NULL, DEFAULT false | 대표 이미지 여부 |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

### shopping_carts
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| shopping_carts_id | BIGINT | PK, AUTO_INCREMENT | 장바구니 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 생성 시간 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 갱신 시간 |

### cart_items
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| cart_items_id | BIGINT | PK, AUTO_INCREMENT | 항목 ID |
| cart_id | BIGINT | FK (shopping_carts.shopping_carts_id), NOT NULL | 장바구니 ID |
| products_id | BIGINT | FK (products.products_id), NOT NULL | 상품 ID |
| quantity | INT | NOT NULL | 수량 |
| added_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 추가 시간 |

### orders
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| orders_id | BIGINT | PK, AUTO_INCREMENT | 주문 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| order_date | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 주문 시간 |
| total_amount | DECIMAL(10, 2) | NOT NULL | 총 금액 |
| status | VARCHAR(20) | NOT NULL | 주문 상태 (PENDING, PAID, SHIPPED, DELIVERED, CANCELLED) |
| payment_methods_id | BIGINT | FK (payment_methods.payment_methods_id), NOT NULL | 결제 수단 ID |
| shipping_address | TEXT | NOT NULL | 배송 주소 |
| shipping_method | VARCHAR(50) | NOT NULL | 배송 방법 |
| tracking_number | VARCHAR(100) | NULL | 운송장 번호 |
| order_number | VARCHAR(20) | UNIQUE, NOT NULL | 주문 번호 |
| is_in_room_delivery | BOOLEAN | NOT NULL, DEFAULT false | 객실 배송 여부 |
| room_number | VARCHAR(10) | NULL | 객실 번호 (객실 배송 시) |

### order_items
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| order_items_id | BIGINT | PK, AUTO_INCREMENT | 항목 ID |
| orders_id | BIGINT | FK (orders.orders_id), NOT NULL | 주문 ID |
| products_id | BIGINT | FK (products.products_id), NOT NULL | 상품 ID |
| quantity | INT | NOT NULL | 수량 |
| price | DECIMAL(10, 2) | NOT NULL | 단가 |
| total_price | DECIMAL(10, 2) | NOT NULL | 항목 총액 |

## 부대시설 관련 테이블

### facilities
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| facilities_id | BIGINT | PK, AUTO_INCREMENT | 시설 ID |
| name | VARCHAR(100) | NOT NULL | 시설 이름 |
| category | VARCHAR(50) | NOT NULL | 카테고리 (WELLNESS, SPA, NATURE, ENTERTAINMENT, BUSINESS, FAMILY) |
| location | VARCHAR(100) | NOT NULL | 위치 |
| description | TEXT | NOT NULL | 설명 |
| opening_time | TIME | NULL | 오픈 시간 |
| closing_time | TIME | NULL | 마감 시간 |
| is_reservation_required | BOOLEAN | NOT NULL, DEFAULT false | 예약 필수 여부 |
| is_chargeable | BOOLEAN | NOT NULL, DEFAULT false | 유료 여부 |
| price | DECIMAL(10, 2) | NULL | 가격 (유료인 경우) |

### facility_images
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| facility_images_id | BIGINT | PK, AUTO_INCREMENT | 이미지 ID |
| facilities_id | BIGINT | FK (facilities.facilities_id), NOT NULL | 시설 ID |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| is_main_image | BOOLEAN | NOT NULL, DEFAULT false | 대표 이미지 여부 |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

### facility_reservations
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| facility_reservations_id | BIGINT | PK, AUTO_INCREMENT | 예약 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| facilities_id | BIGINT | FK (facilities.facilities_id), NOT NULL | 시설 ID |
| reservation_date | DATE | NOT NULL | 예약 날짜 |
| start_time | TIME | NOT NULL | 시작 시간 |
| end_time | TIME | NOT NULL | 종료 시간 |
| guests | INT | NOT NULL | 인원 수 |
| status | VARCHAR(20) | NOT NULL | 예약 상태 (CONFIRMED, CANCELLED, COMPLETED) |
| special_requests | TEXT | NULL | 특별 요청 사항 |
| is_paid | BOOLEAN | NOT NULL, DEFAULT false | 결제 완료 여부 |
| amount | DECIMAL(10, 2) | NULL | 금액 (유료인 경우) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 예약 생성 시간 |
| reservation_number | VARCHAR(20) | UNIQUE, NOT NULL | 예약 번호 |

## 포인트/혜택 관련 테이블

### point_transactions
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| point_transactions_id | BIGINT | PK, AUTO_INCREMENT | 트랜잭션 ID |
| users_id | BIGINT | FK (users.users_id), NOT NULL | 사용자 ID |
| points | INT | NOT NULL | 포인트 (양수: 적립, 음수: 사용) |
| transaction_type | VARCHAR(50) | NOT NULL | 트랜잭션 유형 (EARN_STAY, EARN_DINING, EARN_SHOPPING, REDEMPTION_ROOM, 등) |
| reference_id | BIGINT | NULL | 참조 ID (예약 ID, 주문 ID 등) |
| description | VARCHAR(255) | NOT NULL | 설명 |
| transaction_date | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 트랜잭션 시간 |
| expiry_date | DATE | NULL | 만료 날짜 |

### membership_benefits
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| membership_benefits_id | BIGINT | PK, AUTO_INCREMENT | 혜택 ID |
| membership_tier | VARCHAR(20) | NOT NULL | 멤버십 등급 (CHILL_BREEZE, CHILL_FLOW, DEEP_CHILL) |
| benefit_category | VARCHAR(50) | NOT NULL | 혜택 카테고리 (ROOM, DINING, SPA, GIFT_SHOP) |
| description | VARCHAR(255) | NOT NULL | 혜택 설명 |
| discount_percentage | INT | NULL | 할인 퍼센트 |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | 활성화 여부 |

## 컨텐츠 관리 테이블

### contents
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| contents_id | BIGINT | PK, AUTO_INCREMENT | 컨텐츠 ID |
| title | VARCHAR(255) | NOT NULL | 제목 |
| content | TEXT | NOT NULL | 내용 |
| content_type | VARCHAR(50) | NOT NULL | 컨텐츠 유형 (NOTICE, FAQ, PROMOTION, EVENT) |
| start_date | DATE | NULL | 시작 날짜 |
| end_date | DATE | NULL | 종료 날짜 |
| is_published | BOOLEAN | NOT NULL, DEFAULT false | 발행 여부 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 생성 시간 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 갱신 시간 |
| author_id | BIGINT | FK (users.users_id), NOT NULL | 작성자 ID |

### content_images
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| content_images_id | BIGINT | PK, AUTO_INCREMENT | 이미지 ID |
| contents_id | BIGINT | FK (contents.contents_id), NOT NULL | 컨텐츠 ID |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

### banners
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| banners_id | BIGINT | PK, AUTO_INCREMENT | 배너 ID |
| title | VARCHAR(100) | NOT NULL | 제목 |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| mobile_image_url | VARCHAR(255) | NULL | 모바일용 이미지 URL |
| link_url | VARCHAR(255) | NULL | 링크 URL |
| start_date | DATE | NOT NULL | 시작 날짜 |
| end_date | DATE | NOT NULL | 종료 날짜 |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | 활성화 여부 |
| position | VARCHAR(50) | NOT NULL | 위치 (MAIN_TOP, MAIN_MIDDLE, 등) |
| sort_order | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

## 시스템 관리 테이블

### settings
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| settings_id | BIGINT | PK, AUTO_INCREMENT | 설정 ID |
| setting_key | VARCHAR(100) | UNIQUE, NOT NULL | 설정 키 |
| setting_value | TEXT | NOT NULL | 설정 값 |
| setting_group | VARCHAR(50) | NOT NULL | 설정 그룹 |
| description | VARCHAR(255) | NULL | 설명 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 갱신 시간 |

### audit_logs
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| audit_logs_id | BIGINT | PK, AUTO_INCREMENT | 로그 ID |
| users_id | BIGINT | FK (users.users_id), NULL | 사용자 ID (NULL인 경우 시스템) |
| action | VARCHAR(100) | NOT NULL | 수행된 작업 |
| entity_type | VARCHAR(50) | NOT NULL | 엔티티 유형 (USER, RESERVATION, ORDER, 등) |
| entity_id | BIGINT | NULL | 엔티티 ID |
| details | TEXT | NULL | 상세 내용 |
| ip_address | VARCHAR(50) | NULL | IP 주소 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 생성 시간 |

### email_templates
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| email_templates_id | BIGINT | PK, AUTO_INCREMENT | 템플릿 ID |
| template_code | VARCHAR(100) | UNIQUE, NOT NULL | 템플릿 코드 |
| subject | VARCHAR(255) | NOT NULL | 제목 |
| content | TEXT | NOT NULL | 내용 (HTML) |
| description | VARCHAR(255) | NULL | 설명 |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | 활성화 여부 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 갱신 시간 |

### email_logs
| 필드명 | 데이터 타입 | 제약조건 | 설명 |
|-------|-----------|---------|-----|
| email_logs_id | BIGINT | PK, AUTO_INCREMENT | 로그 ID |
| template_id | BIGINT | FK (email_templates.email_templates_id), NOT NULL | 템플릿 ID |
| recipient_email | VARCHAR(100) | NOT NULL | 수신자 이메일 |
| recipient_name | VARCHAR(100) | NULL | 수신자 이름 |
| subject | VARCHAR(255) | NOT NULL | 제목 |
| content | TEXT | NOT NULL | 내용 |
| status | VARCHAR(20) | NOT NULL | 상태 (SENT, FAILED) |
| error_message | TEXT | NULL | 오류 메시지 (실패 시) |
| sent_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 발송 시간 |