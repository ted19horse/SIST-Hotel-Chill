'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { CalendarCheck, CalendarIcon, ChevronDown, ChevronUp, Clock, Utensils } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// 예약 데이터 타입 정의
interface Reservation {
  id: string;
  restaurant: string;
  image: string;
  date: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
  specialRequests: string;
  tableNumber: string | null;
  isExpanded: boolean;
  cancellationDate?: string;
  cancellationReason?: string;
}

// Mock reservation data
const upcomingReservations: Reservation[] = [];

const pastReservations: Reservation[] = [
  {
    id: 'dining-222333',
    restaurant: 'Chill Elegance',
    image: '/placeholder.svg?height=400&width=600',
    date: '2025-02-14T19:30:00',
    guests: 2,
    status: 'completed',
    totalAmount: 280000,
    specialRequests: 'Anniversary celebration - window table requested',
    tableNumber: '12',
    isExpanded: false,
  },
  {
    id: 'dining-111222',
    restaurant: 'Chill Garden',
    image: '/placeholder.svg?height=400&width=600',
    date: '2025-01-12T12:30:00',
    guests: 4,
    status: 'completed',
    totalAmount: 320000,
    specialRequests: 'Birthday celebration',
    tableNumber: '8',
    isExpanded: false,
  },
];

const cancelledReservations: Reservation[] = [
  {
    id: 'dining-000111',
    restaurant: 'Chill Moments',
    image: '/placeholder.svg?height=400&width=600',
    date: '2024-12-24T18:00:00',
    guests: 2,
    status: 'cancelled',
    totalAmount: 0,
    specialRequests: '',
    tableNumber: null,
    cancellationDate: '2024-12-20T14:30:00',
    cancellationReason: 'Change of plans',
    isExpanded: false,
  },
];

export default function DiningReservations() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const [upcoming, setUpcoming] = useState<Reservation[]>(upcomingReservations);
  const [past, setPast] = useState<Reservation[]>(pastReservations);
  const [cancelled, setCancelled] = useState<Reservation[]>(cancelledReservations);

  const toggleExpand = (reservationId: string, tab: string) => {
    if (tab === 'upcoming') {
      setUpcoming(
        upcoming.map((res) =>
          res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res
        )
      );
    } else if (tab === 'past') {
      setPast(
        past.map((res) =>
          res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res
        )
      );
    } else if (tab === 'cancelled') {
      setCancelled(
        cancelled.map((res) =>
          res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res
        )
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">다이닝 예약</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Utensils className="h-4 w-4 mr-2" />
          다이닝 예약하기
        </Button>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">예정된 예약</TabsTrigger>
          <TabsTrigger value="past">이용 완료</TabsTrigger>
          <TabsTrigger value="cancelled">취소된 예약</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcoming.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">
                예정된 다이닝 예약이 없습니다
              </h3>
              <p className="text-neutral-500 mb-6">Chill Haven에 예정된 다이닝 예약이 없습니다.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">예약하기</Button>
            </div>
          ) : (
            <div className="space-y-6">{/* Upcoming reservations would be mapped here */}</div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {past.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">
                이용 완료된 예약이 없습니다
              </h3>
              <p className="text-neutral-500">
                Chill Haven에서 이용 완료된 다이닝 예약이 없습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {past.map((reservation) => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Restaurant Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || '/placeholder.svg'}
                          alt={reservation.restaurant}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.restaurant}</h3>
                          <p className="text-neutral-600">예약 번호: {reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(reservation.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">날짜 및 시간</p>
                          <p className="font-medium">{formatDate(reservation.date)}</p>
                          <p className="text-sm">{formatTime(reservation.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">인원</p>
                          <p className="font-medium">{reservation.guests}명</p>
                          <p className="text-sm">테이블 #{reservation.tableNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">결제 금액</p>
                          <p className="font-medium">₩{reservation.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-green-600">
                            {Math.floor(reservation.totalAmount / 10000)}포인트 적립
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          영수증 다운로드
                        </Button>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          리뷰 작성
                        </Button>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          다시 예약하기
                        </Button>
                        <Button
                          variant="ghost"
                          className="ml-auto"
                          onClick={() => toggleExpand(reservation.id, 'past')}
                        >
                          {reservation.isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              접기
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              더보기
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {reservation.isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-neutral-200 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                          <h4 className="font-medium mb-2">특별 요청사항</h4>
                          <div className="bg-white rounded-md p-4 min-h-[100px]">
                            {reservation.specialRequests ? (
                              <p className="text-neutral-600">{reservation.specialRequests}</p>
                            ) : (
                              <p className="text-neutral-400 italic">특별 요청사항이 없습니다</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">레스토랑 정보</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Utensils className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.restaurant}</p>
                                <p className="text-sm text-neutral-600">
                                  테이블 #{reservation.tableNumber}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">식사 시간</p>
                                <p className="text-sm text-neutral-600">
                                  {formatTime(reservation.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled">
          {cancelled.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">
                취소된 다이닝 예약이 없습니다
              </h3>
              <p className="text-neutral-500">취소된 다이닝 예약이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cancelled.map((reservation) => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Restaurant Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || '/placeholder.svg'}
                          alt={reservation.restaurant}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.restaurant}</h3>
                          <p className="text-neutral-600">예약 번호: {reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(reservation.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">취소일</p>
                          <p className="font-medium">
                            {formatDate(reservation.cancellationDate || '')}
                          </p>
                          <p className="text-sm">원래 예약일: {formatDate(reservation.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">인원</p>
                          <p className="font-medium">{reservation.guests}명</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">취소 사유</p>
                          <p className="font-medium">
                            {reservation.cancellationReason || '미지정'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          다시 예약하기
                        </Button>
                        <Button
                          variant="ghost"
                          className="ml-auto"
                          onClick={() => toggleExpand(reservation.id, 'cancelled')}
                        >
                          {reservation.isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              접기
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              더보기
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {reservation.isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-neutral-200 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                          <h4 className="font-medium mb-2">특별 요청사항</h4>
                          <div className="bg-white rounded-md p-4 min-h-[100px]">
                            {reservation.specialRequests ? (
                              <p className="text-neutral-600">{reservation.specialRequests}</p>
                            ) : (
                              <p className="text-neutral-400 italic">특별 요청사항이 없습니다</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">레스토랑 정보</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Utensils className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.restaurant}</p>
                                <p className="text-sm text-neutral-600">메인 건물 내 위치</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">원래 예약</p>
                                <p className="text-sm text-neutral-600">
                                  {formatDate(reservation.date)} {formatTime(reservation.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
