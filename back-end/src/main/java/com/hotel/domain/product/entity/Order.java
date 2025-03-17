package com.hotel.domain.product.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.hotel.domain.user.entity.PaymentMethod;
import com.hotel.domain.user.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 주문 엔티티
 */
@Entity
@Table(name = "orders")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    /**
     * 주문 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 주문 일시
     */
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    /**
     * 총 금액
     */
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    /**
     * 주문 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status;

    /**
     * 결제 수단
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_methods_id", nullable = false)
    private PaymentMethod paymentMethod;

    /**
     * 배송 주소
     */
    @Column(name = "shipping_address", nullable = false, columnDefinition = "TEXT")
    private String shippingAddress;

    /**
     * 배송 방법
     */
    @Column(name = "shipping_method", nullable = false, length = 50)
    private String shippingMethod;

    /**
     * 운송장 번호
     */
    @Column(name = "tracking_number", length = 100)
    private String trackingNumber;

    /**
     * 주문 번호
     */
    @Column(name = "order_number", nullable = false, unique = true, length = 20)
    private String orderNumber;

    /**
     * 객실 내 배송 여부
     */
    @Column(name = "is_in_room_delivery", nullable = false)
    private Boolean isInRoomDelivery;

    /**
     * 객실 번호
     */
    @Column(name = "room_number", length = 10)
    private String roomNumber;

    /**
     * 주문 아이템 목록
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    /**
     * 주문 상태 열거형
     */
    public enum OrderStatus {
        PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Order(User user, BigDecimal totalAmount, OrderStatus status, PaymentMethod paymentMethod,
            String shippingAddress, String shippingMethod, String trackingNumber,
            String orderNumber, Boolean isInRoomDelivery, String roomNumber) {
        this.user = user;
        this.orderDate = LocalDateTime.now();
        this.totalAmount = totalAmount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.shippingMethod = shippingMethod;
        this.trackingNumber = trackingNumber;
        this.orderNumber = orderNumber;
        this.isInRoomDelivery = isInRoomDelivery != null ? isInRoomDelivery : false;
        this.roomNumber = roomNumber;
    }

    /**
     * 주문 상태 변경
     */
    public void changeStatus(OrderStatus status) {
        this.status = status;
    }

    /**
     * 운송장 번호 설정
     */
    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    /**
     * 주문 아이템 추가
     */
    public void addOrderItem(OrderItem orderItem) {
        this.orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    /**
     * 장바구니에서 주문 생성
     */
    public static Order createFromCart(ShoppingCart cart, String orderNumber,
            PaymentMethod paymentMethod, String shippingAddress, String shippingMethod,
            Boolean isInRoomDelivery, String roomNumber) {
        Order order = Order.builder().user(cart.getUser()).totalAmount(BigDecimal.ZERO)
                .status(OrderStatus.PENDING).paymentMethod(paymentMethod)
                .shippingAddress(shippingAddress).shippingMethod(shippingMethod)
                .orderNumber(orderNumber).isInRoomDelivery(isInRoomDelivery).roomNumber(roomNumber)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();
            BigDecimal itemPrice = product.getCurrentPrice();
            BigDecimal itemTotalPrice = itemPrice.multiply(new BigDecimal(cartItem.getQuantity()));

            OrderItem orderItem = OrderItem.builder().order(order).product(product)
                    .quantity(cartItem.getQuantity()).price(itemPrice).totalPrice(itemTotalPrice)
                    .build();

            order.addOrderItem(orderItem);
            totalAmount = totalAmount.add(itemTotalPrice);
        }

        order.updateTotalAmount(totalAmount);
        return order;
    }

    /**
     * 총 금액 업데이트
     */
    public void updateTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
