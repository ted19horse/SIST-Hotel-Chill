package com.hotel.domain.product.entity;

import java.util.ArrayList;
import java.util.List;
import com.hotel.domain.user.entity.User;
import com.hotel.global.entity.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 장바구니 엔티티
 */
@Entity
@Table(name = "shopping_carts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShoppingCart extends BaseTimeEntity {

    /**
     * 장바구니 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shopping_carts_id")
    private Long id;

    /**
     * 사용자
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 장바구니 아이템 목록
     */
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public ShoppingCart(User user) {
        this.user = user;
    }

    /**
     * 장바구니 아이템 추가
     */
    public void addItem(CartItem cartItem) {
        this.cartItems.add(cartItem);
        cartItem.setCart(this);
    }

    /**
     * 장바구니 아이템 제거
     */
    public void removeItem(CartItem cartItem) {
        this.cartItems.remove(cartItem);
    }

    /**
     * 장바구니 비우기
     */
    public void clear() {
        this.cartItems.clear();
    }

    /**
     * 장바구니 아이템 수량 업데이트
     */
    public void updateItemQuantity(Product product, int quantity) {
        CartItem existingItem = findCartItemByProduct(product);
        if (existingItem != null) {
            existingItem.updateQuantity(quantity);
        } else {
            CartItem newItem =
                    CartItem.builder().cart(this).product(product).quantity(quantity).build();
            addItem(newItem);
        }
    }

    /**
     * 상품으로 장바구니 아이템 찾기
     */
    private CartItem findCartItemByProduct(Product product) {
        return this.cartItems.stream()
                .filter(item -> item.getProduct().getId().equals(product.getId())).findFirst()
                .orElse(null);
    }

    /**
     * 장바구니 아이템 총 개수
     */
    public int getTotalItemCount() {
        return this.cartItems.stream().mapToInt(CartItem::getQuantity).sum();
    }
}
