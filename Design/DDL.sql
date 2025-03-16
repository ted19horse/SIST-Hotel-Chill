-- 1. 사용자 관련 테이블
CREATE TABLE users (
    users_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    birth_date DATE NULL,
    address VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    role VARCHAR(20) NOT NULL DEFAULT 'USER'
);

CREATE TABLE memberships (
    memberships_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    membership_tier VARCHAR(20) NOT NULL DEFAULT 'CHILL_BREEZE',
    points INT NOT NULL DEFAULT 0,
    total_stays INT NOT NULL DEFAULT 0,
    total_spending DECIMAL(12, 2) NOT NULL DEFAULT 0,
    joined_date DATE NOT NULL,
    last_tier_change DATE NULL,
    membership_number VARCHAR(20) NOT NULL UNIQUE
    -- FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE user_preferences (
    user_preferences_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    preference_type VARCHAR(50) NOT NULL,
    preference_key VARCHAR(50) NOT NULL,
    preference_value VARCHAR(255) NOT NULL
    -- FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE payment_methods (
    payment_methods_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    card_type VARCHAR(50) NOT NULL,
    last_four_digits VARCHAR(4) NOT NULL,
    card_holder_name VARCHAR(100) NOT NULL,
    expiry_date VARCHAR(10) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    token VARCHAR(255) NOT NULL
    -- FOREIGN KEY (users_id) REFERENCES users(users_id)
);

-- 2. 객실 관련 테이블
CREATE TABLE room_types (
    room_types_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    grade INT NOT NULL,
    size INT NOT NULL,
    view_type VARCHAR(50) NOT NULL,
    max_adults INT NOT NULL,
    max_children INT NOT NULL,
    description TEXT NOT NULL,
    weekday_price DECIMAL(10, 2) NOT NULL,
    weekend_price DECIMAL(10, 2) NOT NULL,
    peak_season_price DECIMAL(10, 2) NOT NULL,
    total_rooms INT NOT NULL
);

CREATE TABLE rooms (
    rooms_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_types_id BIGINT NOT NULL,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    floor INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE'
    -- FOREIGN KEY (room_types_id) REFERENCES room_types(room_types_id)
);

CREATE TABLE room_amenities (
    room_amenities_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NULL,
    description VARCHAR(255) NULL,
    amenity_type VARCHAR(50) NOT NULL
);

CREATE TABLE room_type_amenities (
    room_type_amenities_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_types_id BIGINT NOT NULL,
    room_amenities_id BIGINT NOT NULL
    -- FOREIGN KEY (room_types_id) REFERENCES room_types(room_types_id),
    -- FOREIGN KEY (room_amenities_id) REFERENCES room_amenities(room_amenities_id)
);

CREATE TABLE room_images (
    room_images_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_types_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main_image BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0
    -- FOREIGN KEY (room_types_id) REFERENCES room_types(room_types_id)
);

-- 3. 예약 관련 테이블
CREATE TABLE reservations (
    reservations_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    rooms_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    adults INT NOT NULL,
    children INT NOT NULL,
    infants INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_methods_id BIGINT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    special_requests TEXT NULL,
    reservation_number VARCHAR(20) NOT NULL UNIQUE
    -- FOREIGN KEY (users_id) REFERENCES users(users_id),
    -- FOREIGN KEY (rooms_id) REFERENCES rooms(rooms_id),
    -- FOREIGN KEY (payment_methods_id) REFERENCES payment_methods(payment_methods_id)
);

CREATE TABLE reservation_payments (
    reservation_payments_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reservations_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_methods_id BIGINT NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    transaction_id VARCHAR(100) NULL UNIQUE
    -- FOREIGN KEY (reservations_id) REFERENCES reservations(reservations_id),
    -- FOREIGN KEY (payment_methods_id) REFERENCES payment_methods(payment_methods_id)
);

-- 4. 다이닝 관련 테이블
CREATE TABLE restaurants (
    restaurants_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    concept VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    is_reservation_required BOOLEAN NOT NULL DEFAULT false,
    access_level VARCHAR(50) NOT NULL DEFAULT 'ALL'
);

CREATE TABLE restaurant_images (
    restaurant_images_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurants_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main_image BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0
    -- FOREIGN KEY (restaurants_id) REFERENCES restaurants(restaurants_id)
);

CREATE TABLE menu_categories (
    menu_categories_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurants_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    availability_start TIME NULL,
    availability_end TIME NULL
    -- FOREIGN KEY (restaurants_id) REFERENCES restaurants(restaurants_id)
);

CREATE TABLE menu_items (
    menu_items_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    menu_categories_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NULL,
    is_vegetarian BOOLEAN NOT NULL DEFAULT false,
    is_signature BOOLEAN NOT NULL DEFAULT false,
    is_available BOOLEAN NOT NULL DEFAULT true,
    allergens VARCHAR(255) NULL
    -- FOREIGN KEY (menu_categories_id) REFERENCES menu_categories(menu_categories_id)
);

CREATE TABLE dining_reservations (
    dining_reservations_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    restaurants_id BIGINT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    special_requests TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reservation_number VARCHAR(20) NOT NULL UNIQUE
    -- FOREIGN KEY (users_id) REFERENCES users(users_id),
    -- FOREIGN KEY (restaurants_id) REFERENCES restaurants(restaurants_id)
);

-- 5. 기프트샵 관련 테이블
CREATE TABLE product_categories (
    product_categories_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    parent_id BIGINT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255) NULL
    -- FOREIGN KEY (parent_id) REFERENCES product_categories(product_categories_id)
);

CREATE TABLE products (
    products_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2) NULL,
    stock INT NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_new_arrival BOOLEAN NOT NULL DEFAULT false,
    is_limited_edition BOOLEAN NOT NULL DEFAULT false,
    related_room_type VARCHAR(50) NULL
    -- FOREIGN KEY (category_id) REFERENCES product_categories(product_categories_id)
);

CREATE TABLE product_images (
    product_images_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    products_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main_image BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0
    -- FOREIGN KEY (products_id) REFERENCES products(products_id)
);

CREATE TABLE shopping_carts (
    shopping_carts_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -- FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE cart_items (
    cart_items_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    products_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (cart_id) REFERENCES shopping_carts(shopping_carts_id),
    -- FOREIGN KEY (products_id) REFERENCES products(products_id)
);

CREATE TABLE orders (
    orders_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_methods_id BIGINT NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_method VARCHAR(50) NOT NULL,
    tracking_number VARCHAR(100) NULL,
    order_number VARCHAR(20) NOT NULL UNIQUE,
    is_in_room_delivery BOOLEAN NOT NULL DEFAULT false,
    room_number VARCHAR(10) NULL
    -- FOREIGN KEY (users_id) REFERENCES users(users_id),
    -- FOREIGN KEY (payment_methods_id) REFERENCES payment_methods(payment_methods_id)
);

CREATE TABLE order_items (
    order_items_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    orders_id BIGINT NOT NULL,
    products_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
    -- FOREIGN KEY (orders_id) REFERENCES orders(orders_id),
    -- FOREIGN KEY (products_id) REFERENCES products(products_id)
);

-- 6. 부대시설 관련 테이블
CREATE TABLE facilities (
    facilities_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    opening_time TIME NULL,
    closing_time TIME NULL,
    is_reservation_required BOOLEAN NOT NULL DEFAULT false,
    is_chargeable BOOLEAN NOT NULL DEFAULT false,
    price DECIMAL(10, 2) NULL
);

CREATE TABLE facility_images (
    facility_images_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    facilities_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main_image BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0
    -- FOREIGN KEY (facilities_id) REFERENCES facilities(facilities_id)
);

CREATE TABLE facility_reservations (
    facility_reservations_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    facilities_id BIGINT NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    guests INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    special_requests TEXT NULL,
    is_paid BOOLEAN NOT NULL DEFAULT false,
    amount DECIMAL(10, 2) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reservation_number VARCHAR(20) NOT NULL UNIQUE
    -- FOREIGN KEY (users_id) REFERENCES users(users_id),
    -- FOREIGN KEY (facilities_id) REFERENCES facilities(facilities_id)
);

-- 7. 포인트/혜택 관련 테이블
CREATE TABLE point_transactions (
    point_transactions_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NOT NULL,
    points INT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    reference_id BIGINT NULL,
    description VARCHAR(255) NOT NULL,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiry_date DATE NULL
    -- FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE membership_benefits (
    membership_benefits_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    membership_tier VARCHAR(20) NOT NULL,
    benefit_category VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    discount_percentage INT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- 8. 컨텐츠 관리 테이블
CREATE TABLE contents (
    contents_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    author_id BIGINT NOT NULL
    -- FOREIGN KEY (author_id) REFERENCES users(users_id)
);

CREATE TABLE content_images (
    content_images_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contents_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
    -- FOREIGN KEY (contents_id) REFERENCES contents(contents_id)
);

CREATE TABLE banners (
    banners_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    mobile_image_url VARCHAR(255) NULL,
    link_url VARCHAR(255) NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    position VARCHAR(50) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- 9. 시스템 관리 테이블
CREATE TABLE settings (
    settings_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    setting_group VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    audit_logs_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    users_id BIGINT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NULL,
    details TEXT NULL,
    ip_address VARCHAR(50) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE email_templates (
    email_templates_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    template_code VARCHAR(100) NOT NULL UNIQUE,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    description VARCHAR(255) NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE email_logs (
    email_logs_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    template_id BIGINT NOT NULL,
    recipient_email VARCHAR(100) NOT NULL,
    recipient_name VARCHAR(100) NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    error_message TEXT NULL,
    sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (template_id) REFERENCES email_templates(email_templates_id)
);

-- 인덱스 생성
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status_email ON users(status, email);
CREATE INDEX idx_memberships_users_id ON memberships(users_id);
CREATE INDEX idx_memberships_tier_number ON memberships(membership_tier, membership_number);
CREATE INDEX idx_rooms_room_type_status ON rooms(room_types_id, status);
CREATE INDEX idx_reservations_number ON reservations(reservation_number);
CREATE INDEX idx_reservations_user_id ON reservations(users_id);
CREATE INDEX idx_reservations_room_id ON reservations(rooms_id);
CREATE INDEX idx_reservations_dates_status ON reservations(check_in_date, check_out_date, status);
CREATE INDEX idx_reservations_created ON reservations(created_at);
CREATE INDEX idx_dining_reservations_number ON dining_reservations(reservation_number);
CREATE INDEX idx_dining_reservations_user_id ON dining_reservations(users_id);
CREATE INDEX idx_dining_reservations_restaurant_id ON dining_reservations(restaurants_id);
CREATE INDEX idx_dining_reservations_date_time ON dining_reservations(reservation_date, reservation_time);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_features ON products(is_featured, is_new_arrival, is_limited_edition);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(users_id);
CREATE INDEX idx_orders_status_date ON orders(status, order_date);
CREATE INDEX idx_facility_reservations_number ON facility_reservations(reservation_number);
CREATE INDEX idx_facility_reservations_user_id ON facility_reservations(users_id);
CREATE INDEX idx_facility_reservations_facility_id ON facility_reservations(facilities_id);
CREATE INDEX idx_facility_reservations_date_time ON facility_reservations(reservation_date, start_time);
CREATE INDEX idx_point_transactions_user_id ON point_transactions(users_id);
CREATE INDEX idx_point_transactions_date ON point_transactions(transaction_date);
CREATE INDEX idx_point_transactions_expiry ON point_transactions(expiry_date);
CREATE INDEX idx_contents_type_published ON contents(content_type, is_published);
CREATE INDEX idx_contents_dates ON contents(start_date, end_date);