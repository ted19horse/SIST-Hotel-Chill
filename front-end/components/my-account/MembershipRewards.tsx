'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Progress } from '@/components/common/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { useMembership, useMembershipOffers, usePointsHistory } from '@/lib/hooks/my-account';
import { membershipBenefits } from '@/lib/mock-data/my-account/membership';
import { Calendar, ChevronRight, Clock, Droplets, Gift } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface MembershipRewardsProps {
  userId?: number;
}

export default function MembershipRewards({ userId = 1 }: MembershipRewardsProps) {
  const [pointsPage, setPointsPage] = useState(1);
  const [offersFilter, setOffersFilter] = useState<string | undefined>(undefined);

  // API 데이터 로드
  const {
    data: membership,
    isLoading: membershipLoading,
    error: membershipError,
  } = useMembership(userId);

  const {
    data: pointsData,
    isLoading: pointsLoading,
    error: pointsError,
  } = usePointsHistory({
    userId,
    page: pointsPage,
    limit: 5,
  });

  const {
    data: offers,
    isLoading: offersLoading,
    error: offersError,
  } = useMembershipOffers(userId, offersFilter);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  // 로딩 중 UI
  if (membershipLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">멤버십 리워드</h1>
        <div className="bg-neutral-50 rounded-lg p-6 mb-8 h-96 flex items-center justify-center">
          <p className="text-neutral-500">멤버십 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 UI
  if (membershipError) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">멤버십 리워드</h1>
        <div className="bg-neutral-50 rounded-lg p-6 mb-8">
          <p className="text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!membership) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">멤버십 리워드</h1>
        <div className="bg-neutral-50 rounded-lg p-6 mb-8">
          <p className="text-neutral-500">멤버십 정보가 없습니다.</p>
        </div>
      </div>
    );
  }

  const getTierName = (tier: string) => {
    return tier
      .replace('_', ' ')
      .replace('CHILL', '칠')
      .replace('DEEP', '딥')
      .replace('BREEZE', '브리즈')
      .replace('FLOW', '플로우');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">칠 리워드</h1>

      {/* Membership Overview Card */}
      <div className="bg-neutral-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Membership Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-primary/80 to-purple-500/80 rounded-lg p-5 text-white mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs opacity-80">칠 리워드</p>
                  <p className="font-bold">{getTierName(membership.membershipTier)}</p>
                </div>
                <Droplets className="h-5 w-5" />
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium">{membership.userName || '게스트'}</p>
                <p className="text-xs opacity-80">회원번호 #{membership.membershipNumber}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-80">포인트 잔액</p>
                  <p className="text-2xl font-bold">{membership.points.toLocaleString()}</p>
                </div>

                {/* QR Code */}
                {membership.qrCode ? (
                  <Image
                    src={membership.qrCode}
                    alt="멤버십 QR 코드"
                    width={48}
                    height={48}
                    className="bg-white p-1 rounded-sm"
                  />
                ) : (
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-10 h-10 bg-neutral-800 rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">등급 진행 상황</p>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                  {getTierName(membership.membershipTier)}
                </Badge>
              </div>
              <Progress value={membership.tierProgress || 0} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-neutral-500 mb-4">
                <span>현재</span>
                <span>
                  다음 등급까지 {membership.pointsToNextTier?.toLocaleString() || 0} 포인트
                </span>
              </div>

              {membership.expiringPoints && membership.pointExpiryDate && (
                <div className="bg-amber-50 p-3 rounded-md border border-amber-200 flex items-start">
                  <Clock className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">만료 예정 포인트</p>
                    <p className="text-xs text-amber-700">
                      {membership.expiringPoints.toLocaleString()}포인트가{' '}
                      {formatDate(membership.pointExpiryDate)}에 만료됩니다
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Membership Benefits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-5 border border-neutral-200 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {getTierName(membership.membershipTier)} 등급 혜택
                </h3>
                <Button
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10"
                >
                  전체 혜택 보기
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {membershipBenefits[membership.membershipTier]
                  ?.slice(0, 6)
                  .map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm">{benefit}</p>
                    </div>
                  ))}
              </div>

              {membershipBenefits[membership.membershipTier]?.length > 6 && (
                <div className="flex items-center text-primary text-sm font-medium mb-4">
                  <span>
                    추가 {membershipBenefits[membership.membershipTier].length - 6}개 혜택
                  </span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Gift className="h-4 w-4 mr-2" />
                  포인트 사용하기
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  멤버 전용 이벤트
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Points Activity and Offers */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="activity">포인트 활동 내역</TabsTrigger>
          <TabsTrigger value="offers">특별 혜택</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 bg-neutral-50 border-b border-neutral-200">
              <h3 className="text-lg font-bold">포인트 활동 내역</h3>
            </div>

            {pointsLoading ? (
              <div className="p-6 text-center">
                <p className="text-neutral-500">데이터를 불러오는 중...</p>
              </div>
            ) : pointsError ? (
              <div className="p-6 text-center">
                <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
              </div>
            ) : pointsData?.points.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-neutral-500">포인트 내역이 없습니다.</p>
              </div>
            ) : (
              <>
                <div className="divide-y">
                  {pointsData?.points.map((transaction) => (
                    <div key={transaction.transactionId} className="p-4 hover:bg-neutral-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-neutral-500">
                            {formatDate(transaction.transactionDate)}
                          </p>
                        </div>
                        <p
                          className={`font-medium ${
                            transaction.transactionType === 'EARNED'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.transactionType === 'EARNED' ? '+' : '-'}
                          {transaction.points.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 페이지네이션 */}
                {pointsData && pointsData.totalPages > 1 && (
                  <div className="p-4 border-t border-neutral-200 flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => setPointsPage((p) => Math.max(1, p - 1))}
                      disabled={pointsPage <= 1}
                    >
                      이전
                    </Button>
                    <span className="text-sm text-neutral-500">
                      {pointsPage} / {pointsData.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPointsPage((p) => p + 1)}
                      disabled={pointsPage >= pointsData.totalPages}
                    >
                      다음
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="offers">
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 bg-neutral-50 border-b border-neutral-200">
              <h3 className="text-lg font-bold">특별 혜택</h3>
            </div>

            {offersLoading ? (
              <div className="p-6 text-center">
                <p className="text-neutral-500">데이터를 불러오는 중...</p>
              </div>
            ) : offersError ? (
              <div className="p-6 text-center">
                <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
              </div>
            ) : offers?.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-neutral-500">현재 사용 가능한 특별 혜택이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {offers?.map((offer) => (
                  <div
                    key={offer.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={offer.image || '/placeholder.svg'}
                        alt={offer.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{offer.title}</h4>
                      <p className="text-sm text-neutral-600 mb-4">{offer.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {offer.pointsRequired.toLocaleString()} 포인트
                        </span>
                        <Button size="sm">혜택 받기</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
