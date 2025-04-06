-- MySQL DDL 스크립트 - Chill Haven Resort & Spa 핵심 테이블

-- 데이터베이스 생성
-- CREATE DATABASE IF NOT EXISTS chill
-- CHARACTER SET utf8mb4
-- COLLATE utf8mb4_unicode_ci;

USE chill;

-- 1. 사용자 및 멤버십 관련 테이블

-- 사용자 테이블 (필수 필드만 포함)
CREATE TABLE users (
    users_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 멤버십 테이블
CREATE TABLE memberships (
    memberships_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    users_id BIGINT NOT NULL,
    membership_tier VARCHAR(20) NOT NULL DEFAULT 'CHILL_BREEZE',
    points INT NOT NULL DEFAULT 0,
    total_stays INT NOT NULL DEFAULT 0,
    total_spending DECIMAL(12, 2) NOT NULL DEFAULT 0,
    membership_number VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (users_id) REFERENCES users (users_id) ON DELETE CASCADE,
    INDEX idx_membership_tier (membership_tier),
    INDEX idx_membership_number (membership_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 결제 수단 테이블 (필수 필드만 포함)
CREATE TABLE payment_methods (
    payment_methods_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    users_id BIGINT NOT NULL,
    card_type VARCHAR(50) NOT NULL,
    last_four_digits VARCHAR(4) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (users_id) REFERENCES users (users_id) ON DELETE CASCADE,
    INDEX idx_users_id (users_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 객실 예약 관련 테이블

-- 객실 유형 테이블
CREATE TABLE room_types (
    room_types_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    size INT NOT NULL,
    max_adults INT NOT NULL,
    max_children INT NOT NULL,
    weekday_price DECIMAL(10, 2) NOT NULL,
    weekend_price DECIMAL(10, 2) NOT NULL,
    peak_season_price DECIMAL(10, 2) NOT NULL,
    building CHAR(1) NOT NULL,
    floor_count INT NOT NULL,
    rooms_per_floor INT NOT NULL,
    view_type VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) DEFAULT '/images/rooms/placeholder.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_building (building),
    INDEX idx_view_type (view_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 어메니티 그룹 테이블
CREATE TABLE amenity_groups (
    amenity_groups_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_name (name),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 어메니티 아이템 테이블
CREATE TABLE amenity_items (
    amenity_items_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amenity_groups_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (amenity_groups_id) REFERENCES amenity_groups (amenity_groups_id),
    UNIQUE KEY uk_name_group (name, amenity_groups_id),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 객실 유형별 어메니티 그룹 연결 테이블
CREATE TABLE room_type_amenity_groups (
    room_types_id BIGINT NOT NULL,
    amenity_groups_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (room_types_id, amenity_groups_id),
    FOREIGN KEY (room_types_id) REFERENCES room_types (room_types_id),
    FOREIGN KEY (amenity_groups_id) REFERENCES amenity_groups (amenity_groups_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 객실 테이블
CREATE TABLE rooms (
    rooms_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_types_id BIGINT NOT NULL,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    floor INT GENERATED ALWAYS AS (CAST(SUBSTRING(room_number, 2, 1) AS SIGNED)) STORED,
    room_order INT GENERATED ALWAYS AS (CAST(SUBSTRING(room_number, 3, 2) AS SIGNED)) STORED,
    FOREIGN KEY (room_types_id) REFERENCES room_types (room_types_id),
    CONSTRAINT check_room_number_format CHECK (room_number REGEXP '^[A-F][1-4][0-9]{2}$'),
    INDEX idx_room_number (room_number),
    INDEX idx_status (status),
    INDEX idx_floor (floor),
    INDEX idx_room_order (room_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 예약 테이블 (필수 필드만 포함)
CREATE TABLE reservations (
    reservations_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    users_id BIGINT NOT NULL,
    rooms_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    adults INT NOT NULL,
    children INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_methods_id BIGINT NULL,
    reservation_number VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    FOREIGN KEY (rooms_id) REFERENCES rooms (rooms_id),
    FOREIGN KEY (payment_methods_id) REFERENCES payment_methods (payment_methods_id),
    INDEX idx_check_in_date (check_in_date),
    INDEX idx_check_out_date (check_out_date),
    INDEX idx_status (status),
    INDEX idx_reservation_number (reservation_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 다이닝 관련 테이블

-- 레스토랑 테이블 (필수 필드만 포함)
CREATE TABLE restaurants (
    restaurants_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 메뉴 카테고리 테이블 추가
CREATE TABLE menu_categories (
    menu_categories_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    restaurants_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    availability_start TIME NULL,
    availability_end TIME NULL,
    FOREIGN KEY (restaurants_id) REFERENCES restaurants (restaurants_id) ON DELETE CASCADE,
    INDEX idx_restaurants_id (restaurants_id),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 메뉴 아이템 테이블 추가
CREATE TABLE menu_items (
    menu_items_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    menu_categories_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NULL,
    is_vegetarian BOOLEAN NOT NULL DEFAULT false,
    is_signature BOOLEAN NOT NULL DEFAULT false,
    is_available BOOLEAN NOT NULL DEFAULT true,
    allergens VARCHAR(255) NULL,
    FOREIGN KEY (menu_categories_id) REFERENCES menu_categories (menu_categories_id) ON DELETE CASCADE,
    INDEX idx_menu_categories_id (menu_categories_id),
    INDEX idx_is_available (is_available),
    INDEX idx_is_signature (is_signature)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 다이닝 예약 테이블 (필수 필드만 포함)
CREATE TABLE dining_reservations (
    dining_reservations_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    users_id BIGINT NOT NULL,
    restaurants_id BIGINT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    reservation_number VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    FOREIGN KEY (restaurants_id) REFERENCES restaurants (restaurants_id),
    INDEX idx_reservation_date (reservation_date),
    INDEX idx_status (status),
    INDEX idx_reservation_number (reservation_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 기프트샵 관련 테이블

-- 상품 테이블 (필수 필드만 포함)
CREATE TABLE products (
    products_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    INDEX idx_category (category),
    INDEX idx_sku (sku)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 주문 테이블 (필수 필드만 포함)
CREATE TABLE orders (
    orders_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    users_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_methods_id BIGINT NOT NULL,
    order_number VARCHAR(20) NOT NULL UNIQUE,
    is_in_room_delivery BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    FOREIGN KEY (payment_methods_id) REFERENCES payment_methods (payment_methods_id),
    INDEX idx_status (status),
    INDEX idx_order_number (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 주문 아이템 테이블
CREATE TABLE order_items (
    order_items_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    orders_id BIGINT NOT NULL,
    products_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders (orders_id) ON DELETE CASCADE,
    FOREIGN KEY (products_id) REFERENCES products (products_id),
    INDEX idx_orders_id (orders_id),
    INDEX idx_products_id (products_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 포인트 관련 테이블

-- 포인트 트랜잭션 테이블 (필수 필드만 포함)
CREATE TABLE point_transactions (
    point_transactions_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    users_id BIGINT NOT NULL,
    points INT NOT NULL,
    reference_id BIGINT NULL,             -- NULL로 변경: 가입 보너스 등은 참조 ID가 없을 수 있음
    reference_type VARCHAR(50) NULL,      -- NULL로 변경: 가입 보너스 등은 참조 유형이 없을 수 있음
    transaction_type VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    INDEX idx_users_id (users_id),
    INDEX idx_transaction_date (transaction_date),
    INDEX idx_transaction_type (transaction_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. 멤버십 혜택 테이블

-- 멤버십 등급별 할인 혜택 테이블
CREATE TABLE membership_discount_benefits (
    benefit_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    membership_tier VARCHAR(20) NOT NULL,
    benefit_type VARCHAR(50) NOT NULL, -- ROOM, DINING, SPA, GIFT_SHOP
    discount_percentage INT NOT NULL,
    UNIQUE KEY uk_tier_type (membership_tier, benefit_type),
    INDEX idx_membership_tier (membership_tier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 멤버십 등급별 포인트 적립 정책 테이블
CREATE TABLE membership_point_policy (
    policy_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    membership_tier VARCHAR(20) NOT NULL UNIQUE,
    points_per_stay INT NOT NULL,
    points_per_spend_amount DECIMAL(8, 4) NOT NULL, -- 지출 금액당 포인트 적립 비율
    INDEX idx_membership_tier (membership_tier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;