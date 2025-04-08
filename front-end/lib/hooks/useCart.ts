import { Cart, Product } from '@/types/gift-shop';
import { useEffect, useState } from 'react';

const CART_STORAGE_KEY = 'chill-haven-cart';

/**
 * 장바구니 관리를 위한 커스텀 훅
 */
export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], totalQuantity: 0, totalAmount: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬 스토리지에서 장바구니 불러오기
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart) as Cart;
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('장바구니 로드 오류:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    if (typeof window !== 'undefined') {
      loadCart();
    }
  }, []);

  // 장바구니 저장
  const saveCart = (newCart: Cart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch (error) {
      console.error('장바구니 저장 오류:', error);
    }
  };

  // 장바구니에 상품 추가
  const addItem = (product: Product, quantity: number = 1) => {
    const newCart = { ...cart };
    const existingItem = newCart.items.find((item) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity,
        image: product.images[0],
      });
    }

    // 총 수량 및 금액 계산
    updateCartTotals(newCart);
    setCart(newCart);
    saveCart(newCart);
    return newCart;
  };

  // 장바구니에서 상품 제거
  const removeItem = (productId: number) => {
    const newCart = { ...cart };
    newCart.items = newCart.items.filter((item) => item.productId !== productId);

    // 총 수량 및 금액 계산
    updateCartTotals(newCart);
    setCart(newCart);
    saveCart(newCart);
    return newCart;
  };

  // 상품 수량 변경
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(productId);
    }

    const newCart = { ...cart };
    const item = newCart.items.find((item) => item.productId === productId);

    if (item) {
      item.quantity = quantity;
      updateCartTotals(newCart);
      setCart(newCart);
      saveCart(newCart);
    }

    return newCart;
  };

  // 장바구니 비우기
  const clearCart = () => {
    const emptyCart: Cart = { items: [], totalQuantity: 0, totalAmount: 0 };
    setCart(emptyCart);
    saveCart(emptyCart);
    return emptyCart;
  };

  // 장바구니 총 수량 및 금액 업데이트
  const updateCartTotals = (cart: Cart) => {
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((total, item) => {
      const itemPrice = item.discountPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  return {
    cart,
    isLoaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
