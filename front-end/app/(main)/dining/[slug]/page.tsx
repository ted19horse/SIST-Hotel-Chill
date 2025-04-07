'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { restaurants } from '@/lib/data/dining/restaurants';
import { Calendar, ChevronLeft, Clock, Mail, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

/**
 * 레스토랑 세부 정보 페이지
 */
export default function RestaurantDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 슬러그로 레스토랑 찾기
  const restaurant = restaurants.find((r) => r.slug === slug);

  // 레스토랑이 없는 경우 404
  if (!restaurant) {
    notFound();
  }

  // 이미지가 없는 경우 placeholder.co 이미지 사용
  const placeholderImage = `https://placehold.co/800x500/F1F5F9/667080?text=${encodeURIComponent(
    restaurant.name
  )}`;
  const restaurantImages =
    restaurant.images && restaurant.images.length > 0 ? restaurant.images : [placeholderImage];

  const [activeImage, setActiveImage] = useState<string>(restaurantImages[0]);

  // 현재 요일의 영업 시간 찾기
  const getCurrentDayHours = () => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const today = days[new Date().getDay()];

    // OpeningHours 배열인 경우
    if (Array.isArray(restaurant.openingHours)) {
      return (
        restaurant.openingHours.find((h) => h.dayOfWeek === today) || restaurant.openingHours[0]
      );
    }

    // 이전 형식인 경우 (days 배열을 가진 객체)
    if ('days' in restaurant.openingHours) {
      return {
        dayOfWeek: today,
        open: restaurant.openingHours.open,
        close: restaurant.openingHours.close,
        isClosed: !(restaurant.openingHours.days || []).includes(today),
      };
    }

    // 기본값 반환
    return {
      dayOfWeek: today,
      open: '09:00',
      close: '18:00',
      isClosed: false,
    };
  };

  const todayHours = getCurrentDayHours();
  const isCurrentlyOpen = restaurant.isOpen;

  return (
    <div className="container py-8">
      {/* 뒤로 가기 링크 */}
      <Link href="/dining" className="flex items-center text-gray-600 hover:text-primary mb-6">
        <ChevronLeft size={20} />
        <span className="ml-1">모든 레스토랑</span>
      </Link>

      {/* 레스토랑 제목 섹션 */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-600 mt-2">{restaurant.concept}</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={
                isCurrentlyOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }
            >
              {isCurrentlyOpen ? '영업 중' : '영업 종료'}
            </Badge>
            {restaurant.isNew && <Badge className="bg-blue-100 text-blue-800">NEW</Badge>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>
              {restaurant.location} {restaurant.floor && `(${restaurant.floor})`}
            </span>
          </div>

          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>
              {todayHours.isClosed ? '오늘 휴무' : `오늘 ${todayHours.open} - ${todayHours.close}`}
            </span>
          </div>

          <div className="flex items-center">
            <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" fill="currentColor" />
            <span>
              {restaurant.rating} ({restaurant.reviewCount} 리뷰)
            </span>
          </div>

          <div className="text-sm font-medium">{restaurant.priceRange}</div>
        </div>
      </div>

      {/* 이미지 갤러리 */}
      <div className="mb-8">
        <div className="relative w-full h-[60vh] rounded-lg overflow-hidden mb-2">
          <Image src={activeImage} alt={restaurant.name} fill className="object-cover" priority />
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2">
          {restaurantImages.map((image, index) => (
            <div
              key={index}
              className={`relative w-24 h-20 rounded-md overflow-hidden cursor-pointer flex-shrink-0 transition-all ${
                activeImage === image ? 'ring-2 ring-primary' : 'opacity-80'
              }`}
              onClick={() => setActiveImage(image)}
            >
              <Image
                src={image}
                alt={`${restaurant.name} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 태그 및 기능 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge className="border-primary text-primary border">{restaurant.cuisine}</Badge>
        {restaurant.features?.map((feature, index) => (
          <Badge key={index} className="border text-gray-700">
            {feature}
          </Badge>
        ))}
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="menu">메뉴</TabsTrigger>
              <TabsTrigger value="info">정보</TabsTrigger>
              {restaurant.specialEvents && restaurant.specialEvents.length > 0 && (
                <TabsTrigger value="events">특별 이벤트</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">소개</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {restaurant.description}
                </p>
              </div>

              {restaurant.chefName && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">셰프 소개</h2>
                  <h3 className="text-lg font-medium mb-2">{restaurant.chefName} 셰프</h3>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {restaurant.chefDescription}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="menu" className="space-y-8">
              {restaurant.menuCategories?.map((category) => (
                <div key={category.id}>
                  <div className="border-b pb-2 mb-4">
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    {category.description && (
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    )}
                    {category.timeAvailable && (
                      <div className="text-sm text-gray-500 mt-1">
                        제공 시간: {category.timeAvailable.start} - {category.timeAvailable.end}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        {(item.image || true) && (
                          <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                item.image ||
                                `https://placehold.co/300x300/F1F5F9/667080?text=${encodeURIComponent(
                                  item.name
                                )}`
                              }
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold flex items-center">
                              {item.name}
                              {item.isSignature && (
                                <Badge className="ml-2 text-xs bg-amber-100 text-amber-800">
                                  시그니처
                                </Badge>
                              )}
                            </h3>
                            <div className="font-medium">
                              {new Intl.NumberFormat('ko-KR').format(item.price)}
                              {item.currency || '원'}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-1 mb-2">{item.description}</p>
                          {(item.dietaryRestrictions?.length || item.allergens?.length) && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.dietaryRestrictions?.map((diet) => (
                                <Badge
                                  key={diet}
                                  className="text-xs bg-green-50 text-green-800 border-green-200 border"
                                >
                                  {diet}
                                </Badge>
                              ))}
                              {item.allergens?.map((allergen) => (
                                <Badge
                                  key={allergen}
                                  className="text-xs bg-amber-50 text-amber-800 border-amber-200 border"
                                >
                                  알레르기: {allergen}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {(!restaurant.menuCategories || restaurant.menuCategories.length === 0) && (
                <p className="text-gray-600">메뉴 정보가 아직 준비되지 않았습니다.</p>
              )}
            </TabsContent>

            <TabsContent value="info" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">영업 시간</h2>
                <div className="space-y-2">
                  {Array.isArray(restaurant.openingHours) ? (
                    // 새로운 배열 형식 처리
                    restaurant.openingHours.map((hour, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{hour.dayOfWeek}</span>
                        <span>
                          {hour.isClosed ? (
                            '휴무일'
                          ) : (
                            <>
                              {hour.open} - {hour.close}
                            </>
                          )}
                        </span>
                      </div>
                    ))
                  ) : (
                    // 이전 객체 형식 처리
                    <div className="flex justify-between">
                      <span className="font-medium">영업 시간</span>
                      <span>
                        {restaurant.openingHours.open} - {restaurant.openingHours.close}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 나머지 정보 섹션 */}
              {restaurant.location && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">위치</h2>
                  <div className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-gray-500" />
                    <div>
                      <p className="text-gray-700">{restaurant.location}</p>
                      {restaurant.floor && <p className="text-gray-600">{restaurant.floor}</p>}
                    </div>
                  </div>
                </div>
              )}

              {restaurant.phone && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">연락처</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone size={20} className="mr-2 text-gray-500" />
                      <a href={`tel:${restaurant.phone}`} className="text-gray-700 hover:underline">
                        {restaurant.phone}
                      </a>
                    </div>
                    {restaurant.email && (
                      <div className="flex items-center">
                        <Mail size={20} className="mr-2 text-gray-500" />
                        <a
                          href={`mailto:${restaurant.email}`}
                          className="text-gray-700 hover:underline"
                        >
                          {restaurant.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {restaurant.dresscode && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">드레스 코드</h2>
                  <p className="text-gray-700">{restaurant.dresscode}</p>
                </div>
              )}

              {restaurant.reservationPolicy && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">예약 정책</h2>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      인원: {restaurant.reservationPolicy.minPartySize} ~{' '}
                      {restaurant.reservationPolicy.maxPartySize}명
                    </p>
                    <p>
                      {restaurant.reservationPolicy.reservationRequired ? '예약 필수' : '예약 권장'}
                    </p>
                    {restaurant.reservationPolicy.cancellationPolicy && (
                      <p>취소 정책: {restaurant.reservationPolicy.cancellationPolicy}</p>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {restaurant.specialEvents && restaurant.specialEvents.length > 0 && (
              <TabsContent value="events" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">특별 이벤트</h2>
                <div className="space-y-6">
                  {restaurant.specialEvents.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        {event.startDate && event.endDate && (
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            <span>
                              {event.startDate} ~ {event.endDate}
                            </span>
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>
                              {typeof event.time === 'string'
                                ? event.time
                                : `${event.time.start} - ${event.time.end}`}
                            </span>
                          </div>
                        )}
                        {event.days && event.days.length > 0 && (
                          <div>요일: {event.days.join(', ')}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* 예약 및 추가 정보 사이드바 */}
        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-xl font-bold mb-4">예약하기</h2>
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                {restaurant.name}에서 특별한 식사를 경험해보세요.
              </p>
              <Button className="w-full" asChild>
                <Link href={restaurant.reservationUrl || '/dining/reserve'}>예약하기</Link>
              </Button>
              {restaurant.phone && (
                <Button
                  className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <a href={`tel:${restaurant.phone}`}>
                    <Phone size={16} className="mr-2" />
                    전화 예약
                  </a>
                </Button>
              )}
            </div>

            {restaurant.exclusiveFor && (
              <div className="pt-4 border-t">
                <div className="text-amber-800 bg-amber-50 p-3 rounded-md text-sm">
                  <p className="font-medium mb-1">이용 제한 안내</p>
                  <p>
                    이 레스토랑은 다음 객실 타입 고객만 이용 가능합니다:
                    <ul className="list-disc list-inside mt-1">
                      {restaurant.exclusiveFor.map((room, idx) => (
                        <li key={idx}>{room}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
