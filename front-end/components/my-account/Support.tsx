'use client';

import type React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/Accordion';
import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Support() {
  // Mock support tickets
  const [supportTickets, setSupportTickets] = useState([
    {
      id: 'ticket-123456',
      subject: 'Room upgrade request',
      message: 'I would like to request an upgrade for my upcoming stay on March 25-28.',
      status: 'open',
      createdAt: '2025-03-15T10:30:00',
      responses: [
        {
          id: 'response-1',
          from: 'support',
          message:
            "Thank you for your request. We'll check availability and get back to you shortly.",
          timestamp: '2025-03-15T11:45:00',
        },
      ],
    },
    {
      id: 'ticket-123455',
      subject: 'Billing inquiry',
      message:
        'I noticed an unexpected charge on my last stay. Could you please provide details about this charge?',
      status: 'closed',
      createdAt: '2025-02-20T14:20:00',
      responses: [
        {
          id: 'response-1',
          from: 'support',
          message:
            "Thank you for bringing this to our attention. We've reviewed your account and found that there was an error in our billing system. We've processed a refund for the incorrect charge, which should appear in your account within 3-5 business days.",
          timestamp: '2025-02-20T16:30:00',
        },
        {
          id: 'response-2',
          from: 'user',
          message: "Thank you for the quick resolution. I'll keep an eye out for the refund.",
          timestamp: '2025-02-21T09:15:00',
        },
        {
          id: 'response-3',
          from: 'support',
          message:
            "You're welcome! Please let us know if you have any other questions or if you don't see the refund by February 26.",
          timestamp: '2025-02-21T10:05:00',
        },
      ],
    },
  ]);

  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Reset form
      setNewTicket({
        subject: '',
        category: '',
        message: '',
      });

      // Show success message or update tickets list
      alert('Your support ticket has been submitted. Our team will respond shortly.');
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'closed':
        return (
          <Badge className="bg-neutral-100 text-neutral-800 hover:bg-neutral-100">Closed</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">고객 지원</h1>

      <div className="space-y-6">
        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">문의하기</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button className="bg-primary hover:bg-primary/90 text-white h-auto py-6 flex flex-col items-center">
              <Phone className="h-6 w-6 mb-2" />
              <span className="font-medium">전화 상담</span>
              <span className="text-sm opacity-80">1588-1234</span>
            </Button>

            <Button className="bg-primary hover:bg-primary/90 text-white h-auto py-6 flex flex-col items-center">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="font-medium">실시간 채팅</span>
              <span className="text-sm opacity-80">평균 응답 시간 5분</span>
            </Button>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">자주 묻는 질문</h2>

          <div className="space-y-4">
            <div className="border rounded-lg">
              <Accordion type="single" collapsible>
                <AccordionItem value="1">
                  <AccordionTrigger className="px-4">
                    체크인/체크아웃 시간은 어떻게 되나요?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    체크인은 오후 3시부터, 체크아웃은 오전 11시까지입니다. 얼리 체크인이나 레이트
                    체크아웃이 필요하신 경우 프론트 데스크로 문의해 주세요.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="2">
                  <AccordionTrigger className="px-4">
                    예약을 변경하거나 취소하고 싶어요.
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    체크인 24시간 전까지는 무료로 예약 변경 및 취소가 가능합니다. 마이페이지에서
                    직접 변경하시거나 고객센터로 연락해 주세요.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="3">
                  <AccordionTrigger className="px-4">포인트는 어떻게 사용하나요?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    객실 예약, 레스토랑, 스파 등 호텔 내 모든 시설에서 포인트를 사용하실 수
                    있습니다. 1,000포인트는 10,000원의 가치를 가집니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <Button variant="link" className="mt-4 h-auto p-0">
            전체 FAQ 보기
          </Button>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">문의 내역</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">객실 업그레이드 문의</p>
                  <p className="text-sm text-neutral-500">2025년 3월 20일</p>
                  <p className="text-sm mt-2">
                    예약하신 객실의 업그레이드 가능 여부를 확인 중입니다. 빠른 시일 내에 답변
                    드리겠습니다.
                  </p>
                </div>
                <Badge>처리중</Badge>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            새 문의하기
          </Button>
        </div>

        <div className="bg-neutral-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">연락처 정보</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">주소</p>
                <p className="text-sm text-neutral-500">서울특별시 강남구 테헤란로 123</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">전화</p>
                <p className="text-sm text-neutral-500">1588-1234</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">이메일</p>
                <p className="text-sm text-neutral-500">support@chillhaven.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
