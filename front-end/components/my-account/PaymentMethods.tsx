'use client';

import { Button } from '@/components/common/ui/Button';
import { Switch } from '@/components/common/ui/Switch';
import { CreditCardIcon } from 'lucide-react';
import { useState } from 'react';

export default function PaymentMethods() {
  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'card-1',
      type: 'visa',
      name: 'Min-Ji Park',
      number: '•••• •••• •••• 4567',
      expiry: '09/27',
      isDefault: true,
    },
    {
      id: 'card-2',
      type: 'mastercard',
      name: 'Min-Ji Park',
      number: '•••• •••• •••• 8901',
      expiry: '12/25',
      isDefault: false,
    },
  ]);

  const [showAddCard, setShowAddCard] = useState(false);

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(
      paymentMethods.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setPaymentMethods(paymentMethods.filter((card) => card.id !== cardId));
  };

  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return (
          <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center text-white">
            <span className="text-xs font-bold">VISA</span>
          </div>
        );
      case 'mastercard':
        return (
          <div className="flex">
            <div className="w-5 h-6 bg-red-500 rounded-l"></div>
            <div className="w-5 h-6 bg-yellow-400 rounded-r"></div>
          </div>
        );
      case 'amex':
        return (
          <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white">
            <span className="text-xs font-bold">AMEX</span>
          </div>
        );
      default:
        return <CreditCardIcon className="h-6 w-6 text-neutral-500" />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">결제 수단</h1>

      <div className="space-y-6">
        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">등록된 카드</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-neutral-200 rounded"></div>
                <div>
                  <p className="font-medium">신한카드 •••• 1234</p>
                  <p className="text-sm text-neutral-500">만료일: 12/25</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  수정
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  삭제
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-neutral-200 rounded"></div>
                <div>
                  <p className="font-medium">삼성카드 •••• 5678</p>
                  <p className="text-sm text-neutral-500">만료일: 09/26</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  수정
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  삭제
                </Button>
              </div>
            </div>
          </div>

          <Button className="w-full mt-4">새 카드 추가</Button>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">결제 내역</h2>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="font-medium">Chill Serenity Room</p>
                <p className="font-medium">₩550,000</p>
              </div>
              <div className="flex justify-between text-sm text-neutral-500">
                <p>2025년 3월 25일</p>
                <p>신한카드 •••• 1234</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="font-medium">La Mer Restaurant</p>
                <p className="font-medium">₩180,000</p>
              </div>
              <div className="flex justify-between text-sm text-neutral-500">
                <p>2025년 2월 14일</p>
                <p>삼성카드 •••• 5678</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            전체 내역 보기
          </Button>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">청구서 설정</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">전자 영수증</p>
                <p className="text-sm text-neutral-500">이메일로 영수증 받기</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">자동 결제</p>
                <p className="text-sm text-neutral-500">예약 시 기본 카드로 자동 결제</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
