import { PaymentMethod } from '@/types/my-account';

/**
 * 결제 수단 더미데이터
 */
export const paymentMethods: PaymentMethod[] = [
  {
    paymentMethodId: 1,
    userId: 1,
    cardType: 'Visa',
    lastFourDigits: '4567',
    isDefault: true,
    cardholderName: 'Min-Ji Park',
    expiryDate: '09/27',
  },
  {
    paymentMethodId: 2,
    userId: 1,
    cardType: 'Mastercard',
    lastFourDigits: '8901',
    isDefault: false,
    cardholderName: 'Min-Ji Park',
    expiryDate: '12/26',
  },
  {
    paymentMethodId: 3,
    userId: 1,
    cardType: 'Samsung Pay',
    lastFourDigits: '2345',
    isDefault: false,
    cardholderName: 'Min-Ji Park',
    expiryDate: '03/28',
  },
];
