'use client';

import { Button } from '@/components/common/ui/Button';
import { specialEvents } from '@/lib/data/membership/special-events';
import { SpecialEvent } from '@/lib/types/membership';
import { getPlaceholderImage } from '@/lib/utils/image-utils';
import { Award, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SpecialEvents() {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<SpecialEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // 실제 API 연동 시 아래 주석을 해제
        // const data = await api.membership.getSpecialEvents('UPCOMING');
        // setEvents(data);

        // 더미 데이터 사용
        setEvents(specialEvents);

        // 이벤트 중 UPCOMING 상태인 것만 필터링
        const upcoming = specialEvents.filter((event) => event.status === 'UPCOMING');
        setUpcomingEvents(upcoming.slice(0, 4)); // 최대 4개만 표시
      } catch (error) {
        console.error('Error fetching special events:', error);
        // 오류 발생 시 더미 데이터 사용
        setEvents(specialEvents);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">멤버십 특별 이벤트</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Rewards 회원만을 위한 특별한 이벤트와 프로모션을 즐겨보세요.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>이벤트 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 주요 이벤트 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-64">
                      <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <h3 className="text-xl font-bold">{event.title}</h3>
                      </div>
                      <p className="text-neutral-600 mb-4">{event.description}</p>
                      <div className="bg-neutral-50 p-3 rounded-md mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">일시</p>
                            <p className="text-sm text-neutral-600">
                              {new Date(event.startDate).toLocaleDateString('ko-KR')}
                              {event.startDate !== event.endDate &&
                                ` ~ ${new Date(event.endDate).toLocaleDateString('ko-KR')}`}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">장소</p>
                            <p className="text-sm text-neutral-600">{event.location}</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        이벤트 상세 보기
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p>현재 예정된 이벤트가 없습니다.</p>
                </div>
              )}
            </div>

            {/* 추가 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-bold">제휴 브랜드 혜택</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  힐링과 높은 품질에 대한 우리의 약속을 공유하는 신중하게 선택된 파트너 브랜드와
                  함께 특별한 혜택을 누려보세요.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                      <Image
                        src={getPlaceholderImage(48, 48, 'f5f5f5', '333333', 'S')}
                        alt="파트너 로고"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="font-medium">세렌 스파 제품</p>
                      <p className="text-sm text-neutral-600">
                        모든 제품 15% 할인, 회원 전용 선물 세트
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                      <Image
                        src={getPlaceholderImage(48, 48, 'f5f5f5', '333333', 'M')}
                        alt="파트너 로고"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="font-medium">마인드풀 어패럴</p>
                      <p className="text-sm text-neutral-600">
                        지속 가능한 의류 10% 할인, 회원 전용 컬렉션
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                      <Image
                        src={getPlaceholderImage(48, 48, 'f5f5f5', '333333', 'W')}
                        alt="파트너 로고"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="font-medium">웰니스 리트릿 인터내셔널</p>
                      <p className="text-sm text-neutral-600">국제 웰니스 리트릿 특별 요금</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                      <Image
                        src={getPlaceholderImage(48, 48, 'f5f5f5', '333333', 'O')}
                        alt="파트너 로고"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="font-medium">오가닉 다이닝</p>
                      <p className="text-sm text-neutral-600">
                        우선 예약, 셰프 특선 요리 무료 제공
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-bold">회원 추천 프로그램</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  친구나 가족에게 Chill Haven을 추천하고 특별한 보상을 받아보세요. 추천을 받은
                  사람도 가입 특전을 받을 수 있습니다.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-4">
                  <h4 className="font-bold mb-2">추천인 혜택</h4>
                  <ul className="space-y-2 text-neutral-600 text-sm">
                    <li>• 추천이 멤버십에 가입할 때마다 1,000 Chill 포인트 적립</li>
                    <li>• 연간 5명 이상 추천 시 추가 5,000 Chill 포인트 보너스</li>
                    <li>• 추천으로 Deep Chill 회원이 가입하면 Chill Flow로 자동 업그레이드</li>
                  </ul>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">신규 회원 혜택</h4>
                  <ul className="space-y-2 text-neutral-600 text-sm">
                    <li>• 가입 시 500 Chill 포인트 즉시 적립</li>
                    <li>• 첫 투숙 시 무료 방 업그레이드 (이용 가능 시)</li>
                    <li>• 웰컴 기프트 패키지</li>
                  </ul>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">친구 추천하기</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
