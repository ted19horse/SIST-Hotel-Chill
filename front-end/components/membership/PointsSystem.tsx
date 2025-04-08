'use client';

import { pointsEarningRates, pointsUsageInfo } from '@/lib/data/membership/points-system';
import { PointsUsageInfo } from '@/lib/types/membership';
import { getPlaceholderImage } from '@/lib/utils/image-utils';
import { CheckCircle, Circle, CircleDollarSign } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PointsSystem() {
  const [pointsInfo, setPointsInfo] = useState<PointsUsageInfo>(pointsUsageInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPointsInfo = async () => {
      setIsLoading(true);
      try {
        // 실제 API 연동 시 아래 주석을 해제
        // const data = await api.membership.getPointsInfo();
        // setPointsInfo(data);

        // 더미 데이터 사용
        setPointsInfo(pointsUsageInfo);
      } catch (error) {
        console.error('Error fetching points information:', error);
        // 오류 발생 시 더미 데이터 사용
        setPointsInfo(pointsUsageInfo);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPointsInfo();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Chill 포인트 시스템</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            매 숙박마다 Chill 포인트를 적립하고 사용하여 더 특별한 경험을 만들어보세요.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>포인트 정보를 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">포인트 사용 안내</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">포인트 적립</p>
                      <p className="text-neutral-600 text-sm">
                        멤버십 등급에 따라 매 숙박마다 포인트 적립:
                        <br />• Chill Breeze: 1박당 {pointsEarningRates[0].pointsPerStay} 포인트
                        <br />• Chill Flow: 1박당 {pointsEarningRates[1].pointsPerStay} 포인트
                        <br />• Deep Chill: 1박당 {pointsEarningRates[2].pointsPerStay} 포인트
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <CircleDollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">포인트 사용</p>
                      <p className="text-neutral-600 text-sm">
                        Chill Haven에서 다양한 서비스에 포인트 사용 가능:
                        {pointsInfo.redeemOptions.slice(0, 5).map((option, index) => (
                          <span key={index}>
                            <br />• {option.title}:{' '}
                            {option.conversionRate ||
                              `${option.pointsNeeded?.toLocaleString()}포인트 필요`}
                          </span>
                        ))}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Circle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">포인트 정책</p>
                      <p className="text-neutral-600 text-sm">
                        • 유효기간: 적립일로부터 {pointsInfo.validityMonths}개월
                        <br />• 최소 사용 가능 포인트: {pointsInfo.minRedemption?.toLocaleString()}{' '}
                        포인트
                        <br />• 전환율: {pointsInfo.redemptionRatio} 포인트 = 1,000원
                        <br />• 포인트 소멸 예정 시 3개월 전 알림 발송
                        <br />• 제휴 브랜드에서도 포인트 사용 가능
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h4 className="font-bold mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  꼭 참고하세요
                </h4>
                <p className="text-neutral-700 text-sm">
                  투숙 시 포인트를 확실히 적립하려면 당사 웹사이트나 앱을 통해 직접 예약하세요.
                  제3자 플랫폼을 통한 예약은 Chill 포인트 적립 대상이 아닐 수 있습니다.
                </p>
              </div>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={getPlaceholderImage(800, 1000, '004c6d', 'ffffff', 'CHILL POINTS')}
                alt="Chill 포인트 시스템"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">포인트 전환율</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-lg font-bold">1,000 포인트</p>
                    <p className="text-sm">= ₩10,000 상당</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-lg font-bold">5,000 포인트</p>
                    <p className="text-sm">= ₩50,000 상당</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-lg font-bold">10,000 포인트</p>
                    <p className="text-sm">= ₩100,000 상당</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-lg font-bold">50,000 포인트</p>
                    <p className="text-sm">= ₩500,000 상당</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-100">
              <h4 className="font-bold mb-3">추가 포인트 적립 기회</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                {pointsInfo.bonusOptions.map((option, index) => (
                  <li key={index}>
                    • {option.title}: {option.bonusAmount}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-100">
              <h4 className="font-bold mb-3">포인트로 등급 업그레이드</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li>
                  • Chill Breeze → Chill Flow:{' '}
                  {pointsInfo.redeemOptions[4]?.pointsNeeded?.toLocaleString()} 포인트
                </li>
                <li>
                  • Chill Flow → Deep Chill:{' '}
                  {pointsInfo.redeemOptions[5]?.pointsNeeded?.toLocaleString()} 포인트
                </li>
                <li>• 포인트 업그레이드는 1년간 유효</li>
                <li>• 숙박/지출 요건과 함께 적용 가능</li>
                <li>• 필요한 포인트 충족 시 언제든지 업그레이드 가능</li>
              </ul>
            </div>
            <div className="p-6">
              <h4 className="font-bold mb-3">포인트 관리</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li>• 모바일 앱에서 실시간 포인트 잔액 확인</li>
                <li>• 매월 이메일로 포인트 현황 발송</li>
                <li>• 온라인에서 포인트 사용 내역 확인 가능</li>
                <li>• 포인트 소멸 3개월 전 알림 발송</li>
                <li>• 고객 서비스를 통한 포인트 관련 문의 지원</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
