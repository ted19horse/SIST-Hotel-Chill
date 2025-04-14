'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { reservationService } from '@/lib/services/reservationService';
import { RoomReservation } from '@/lib/types/room';
import {
  CalendarCheck,
  CalendarIcon,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface RoomReservationsProps {
  userId: number;
}

export default function RoomReservations({ userId }: RoomReservationsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  const [upcomingReservations, setUpcomingReservations] = useState<RoomReservation[]>([]);
  const [pastReservations, setPastReservations] = useState<RoomReservation[]>([]);
  const [cancelledReservations, setCancelledReservations] = useState<RoomReservation[]>([]);

  const [expandedReservations, setExpandedReservations] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 예정된 예약 조회
        const upcoming = await reservationService.getReservationsByStatus(userId, [
          'confirmed',
          'pending',
        ]);
        setUpcomingReservations(upcoming);

        // 완료된 예약 조회
        const past = await reservationService.getReservationsByStatus(userId, ['checked_out']);
        setPastReservations(past);

        // 취소된 예약 조회
        const cancelled = await reservationService.getReservationsByStatus(userId, ['cancelled']);
        setCancelledReservations(cancelled);
      } catch (err) {
        setError('예약 정보를 불러오는데 실패했습니다.');
        console.error('Failed to fetch reservations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const toggleReservationExpand = (reservationId: string) => {
    const newExpanded = new Set(expandedReservations);
    if (newExpanded.has(reservationId)) {
      newExpanded.delete(reservationId);
    } else {
      newExpanded.add(reservationId);
    }
    setExpandedReservations(newExpanded);
  };

  const handleCancelReservation = async (reservationId: string) => {
    if (!window.confirm('예약을 취소하시겠습니까?')) return;

    try {
      const reason = prompt('취소 사유를 입력해주세요:');
      if (!reason) return;

      const cancelledReservation = await reservationService.cancelReservation(
        reservationId,
        reason
      );
      if (cancelledReservation) {
        // 예약 목록 업데이트
        setUpcomingReservations((prev) => prev.filter((r) => r.id !== reservationId));
        setCancelledReservations((prev) => [...prev, cancelledReservation]);
      }
    } catch (err) {
      console.error('Failed to cancel reservation:', err);
      alert('예약 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysUntil = (dateString: string) => {
    const diff = new Date(dateString).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">예약 확정</Badge>;
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">예약 대기</Badge>
        );
      case 'checked_out':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">이용 완료</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">예약 취소</Badge>;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b">
          <TabsTrigger value="upcoming" className="flex-1">
            예정된 예약 ({upcomingReservations.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            이용 완료 ({pastReservations.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-1">
            취소된 예약 ({cancelledReservations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingReservations.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">예정된 예약이 없습니다.</div>
          ) : (
            <div className="divide-y">
              {upcomingReservations.map((reservation) => (
                <div key={reservation.id} className="group">
                  <div
                    className="p-4 cursor-pointer hover:bg-neutral-50"
                    onClick={() => toggleReservationExpand(reservation.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{reservation.roomType}</h3>
                        <p className="text-neutral-600">
                          예약 번호: {reservation.reservationNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(reservation.status)}
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {getDaysUntil(reservation.checkIn)}일 남음
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4 text-primary" />
                        <span>체크인: {formatDate(reservation.checkIn)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarPlus className="h-4 w-4 text-primary" />
                        <span>체크아웃: {formatDate(reservation.checkOut)}</span>
                      </div>
                    </div>

                    {expandedReservations.has(reservation.id) ? (
                      <ChevronUp className="h-5 w-5 mt-2 text-neutral-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 mt-2 text-neutral-400" />
                    )}
                  </div>

                  {expandedReservations.has(reservation.id) && (
                    <div className="p-4 bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">예약 상세</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4">
                                <Users className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">투숙객</p>
                                  <p className="text-sm text-neutral-600">
                                    성인 {reservation.guests.adults}명
                                    {reservation.guests.children > 0 &&
                                      `, 어린이 ${reservation.guests.children}명`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-4">
                                <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">객실 번호</p>
                                  <p className="text-sm text-neutral-600">
                                    {reservation.roomNumber || '체크인 시 배정'}
                                  </p>
                                </div>
                              </div>
                              {reservation.specialRequests && (
                                <div className="flex items-start space-x-4">
                                  <Edit className="h-5 w-5 text-primary mt-0.5" />
                                  <div>
                                    <p className="font-medium">특별 요청사항</p>
                                    <p className="text-sm text-neutral-600">
                                      {reservation.specialRequests}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">결제 정보</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>객실 요금</span>
                                <span>{reservation.totalAmount.toLocaleString()}원</span>
                              </div>
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                  <span>총 결제금액</span>
                                  <span>{reservation.totalAmount.toLocaleString()}원</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              예약 확인서
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelReservation(reservation.id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              예약 취소
                            </Button>
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

        <TabsContent value="past">
          {pastReservations.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">이용 완료된 예약이 없습니다.</div>
          ) : (
            <div className="divide-y">
              {pastReservations.map((reservation) => (
                <div key={reservation.id} className="group">
                  <div
                    className="p-4 cursor-pointer hover:bg-neutral-50"
                    onClick={() => toggleReservationExpand(reservation.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{reservation.roomType}</h3>
                        <p className="text-neutral-600">
                          예약 번호: {reservation.reservationNumber}
                        </p>
                      </div>
                      <div>{getStatusBadge(reservation.status)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4 text-primary" />
                        <span>체크인: {formatDate(reservation.checkIn)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarPlus className="h-4 w-4 text-primary" />
                        <span>체크아웃: {formatDate(reservation.checkOut)}</span>
                      </div>
                    </div>

                    {expandedReservations.has(reservation.id) ? (
                      <ChevronUp className="h-5 w-5 mt-2 text-neutral-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 mt-2 text-neutral-400" />
                    )}
                  </div>

                  {expandedReservations.has(reservation.id) && (
                    <div className="p-4 bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">예약 상세</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4">
                                <Users className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">투숙객</p>
                                  <p className="text-sm text-neutral-600">
                                    성인 {reservation.guests.adults}명
                                    {reservation.guests.children > 0 &&
                                      `, 어린이 ${reservation.guests.children}명`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-4">
                                <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">객실 번호</p>
                                  <p className="text-sm text-neutral-600">
                                    {reservation.roomNumber}
                                  </p>
                                </div>
                              </div>
                              {reservation.specialRequests && (
                                <div className="flex items-start space-x-4">
                                  <Edit className="h-5 w-5 text-primary mt-0.5" />
                                  <div>
                                    <p className="font-medium">특별 요청사항</p>
                                    <p className="text-sm text-neutral-600">
                                      {reservation.specialRequests}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">결제 정보</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>객실 요금</span>
                                <span>{reservation.totalAmount.toLocaleString()}원</span>
                              </div>
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                  <span>총 결제금액</span>
                                  <span>{reservation.totalAmount.toLocaleString()}원</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              예약 확인서
                            </Button>
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
          {cancelledReservations.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">취소된 예약이 없습니다.</div>
          ) : (
            <div className="divide-y">
              {cancelledReservations.map((reservation) => (
                <div key={reservation.id} className="group">
                  <div
                    className="p-4 cursor-pointer hover:bg-neutral-50"
                    onClick={() => toggleReservationExpand(reservation.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{reservation.roomType}</h3>
                        <p className="text-neutral-600">
                          예약 번호: {reservation.reservationNumber}
                        </p>
                      </div>
                      <div>{getStatusBadge(reservation.status)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4 text-primary" />
                        <span>취소일: {formatDate(reservation.cancellationDate!)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-primary" />
                        <span>취소 사유: {reservation.cancellationReason}</span>
                      </div>
                    </div>

                    {expandedReservations.has(reservation.id) ? (
                      <ChevronUp className="h-5 w-5 mt-2 text-neutral-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 mt-2 text-neutral-400" />
                    )}
                  </div>

                  {expandedReservations.has(reservation.id) && (
                    <div className="p-4 bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">예약 상세</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4">
                                <Users className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">투숙객</p>
                                  <p className="text-sm text-neutral-600">
                                    성인 {reservation.guests.adults}명
                                    {reservation.guests.children > 0 &&
                                      `, 어린이 ${reservation.guests.children}명`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-4">
                                <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">예약 기간</p>
                                  <p className="text-sm text-neutral-600">
                                    {formatDate(reservation.checkIn)} ~{' '}
                                    {formatDate(reservation.checkOut)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">환불 정보</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>취소 수수료</span>
                                <span>
                                  {(
                                    reservation.totalAmount - (reservation.refundAmount || 0)
                                  ).toLocaleString()}
                                  원
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>환불 금액</span>
                                <span>{reservation.refundAmount?.toLocaleString()}원</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              취소 확인서
                            </Button>
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
