/**
 * 결제 수단 더미 데이터
 */
import { PaymentMethod } from '@/lib/types/my-account';

export const mockPaymentMethods: PaymentMethod[] = [
  {
    paymentMethodId: 1,
    userId: 1,
    cardType: 'Visa',
    lastFourDigits: '4567',
    isDefault: true,
    expiryDate: '2026-05',
    cardholderName: 'Min-Ji Park',
  },
  {
    paymentMethodId: 2,
    userId: 1,
    cardType: 'MasterCard',
    lastFourDigits: '8901',
    isDefault: false,
    expiryDate: '2025-12',
    cardholderName: 'Min-Ji Park',
  },
  {
    paymentMethodId: 3,
    userId: 1,
    cardType: 'Samsung Pay',
    lastFourDigits: '2345',
    isDefault: false,
    expiryDate: '2027-03',
    cardholderName: 'Min-Ji Park',
  },
  {
    paymentMethodId: 4,
    userId: 2,
    cardType: 'Visa',
    lastFourDigits: '6789',
    isDefault: true,
    expiryDate: '2026-08',
    cardholderName: 'Ji-Won Kim',
  },
  {
    paymentMethodId: 5,
    userId: 3,
    cardType: 'Hyundai Card',
    lastFourDigits: '3456',
    isDefault: true,
    expiryDate: '2025-09',
    cardholderName: 'Sung-Hoon Lee',
  },
];

// 현재 로그인한 사용자의 결제 수단
export const currentUserPaymentMethods = mockPaymentMethods.filter(
  (payment) => payment.userId === 1
);

// 기본 결제 수단
export const defaultPaymentMethod = currentUserPaymentMethods.find((payment) => payment.isDefault);
