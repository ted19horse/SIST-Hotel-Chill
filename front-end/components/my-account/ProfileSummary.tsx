import { Button } from '@/components/common/ui/Button';
import { Progress } from '@/components/common/ui/Progress';
import {
  Calendar,
  Camera,
  Check,
  ChevronRight,
  CreditCard,
  Droplets,
  Gift,
  LifeBuoy,
  Settings,
  Utensils,
} from 'lucide-react';
import Image from 'next/image';

export default function ProfileSummary() {
  // Mock data
  const user = {
    name: '박민지',
    email: 'minji.park@example.com',
    profileImage: '/placeholder.svg?height=200&width=200',
    membershipTier: 'Deep Chill',
    membershipNumber: 'CH-38291',
    points: 32450,
    lastPointsUpdate: '2025-03-10T10:30:00',
    tierProgress: 65,
    nextTierPoints: 50000,
    pointsToNextTier: 17550,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">계정 개요</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* 프로필 카드 */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-lg p-6 h-full">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={user.profileImage || '/placeholder.svg'}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-neutral-600 text-sm mb-3">{user.email}</p>

              <div className="flex items-center mb-4">
                <Droplets className="h-5 w-5 text-purple-500 mr-1.5" />
                <span className="font-medium text-purple-700">{user.membershipTier}</span>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-4 w-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs opacity-80">Chill Rewards</p>
                    <p className="font-bold">{user.membershipTier}</p>
                  </div>
                  <Droplets className="h-5 w-5" />
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs opacity-80">회원번호: {user.membershipNumber}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80">포인트 잔액</p>
                    <p className="text-lg font-bold">{user.points.toLocaleString()}</p>
                  </div>

                  {/* QR 코드 자리 */}
                  <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-8 h-8 bg-neutral-800 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">등급 진행 상황</span>
                  <span className="font-medium">
                    다음 등급까지 {user.pointsToNextTier.toLocaleString()} 포인트
                  </span>
                </div>
                <Progress value={user.tierProgress} className="h-2 mb-4" />
                <p className="text-xs text-neutral-500 text-center">
                  최종 업데이트: {new Date(user.lastPointsUpdate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">객실 예약</h3>
                <Calendar className="h-5 w-5 text-primary" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>예정된 예약 1건</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>올해 이용 내역 3건</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  새로운 예약하기
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  예약 내역 보기
                </Button>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">다이닝 예약</h3>
                <Utensils className="h-5 w-5 text-primary" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>예정된 다이닝 예약이 없습니다</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>이전 다이닝 이용 2건</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  다이닝 예약하기
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  레스토랑 보기
                </Button>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6 sm:col-span-2">
              <h3 className="text-lg font-bold mb-4">빠른 메뉴</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="border-neutral-200 hover:bg-neutral-100 justify-start"
                >
                  <Droplets className="h-4 w-4 text-primary mr-2" />
                  <span>포인트 사용</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-neutral-200 hover:bg-neutral-100 justify-start"
                >
                  <CreditCard className="h-4 w-4 text-primary mr-2" />
                  <span>결제 수단</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-neutral-200 hover:bg-neutral-100 justify-start"
                >
                  <Settings className="h-4 w-4 text-primary mr-2" />
                  <span>환경 설정</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-neutral-200 hover:bg-neutral-100 justify-start"
                >
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span>스파 예약</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-neutral-200 hover:bg-neutral-100 justify-start"
                >
                  <LifeBuoy className="h-4 w-4 text-primary mr-2" />
                  <span>고객 지원</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-neutral-200 hover:bg-neutral-100 justify-start"
                >
                  <Gift className="h-4 w-4 text-primary mr-2" />
                  <span>특별 혜택</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 예정된 예약 요약 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">예정된 투숙</h2>

        <div className="bg-neutral-50 rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-48 h-48 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="칠 세레니티 룸"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Chill Serenity Room</h3>
                  <p className="text-neutral-600">예약번호 #CH-123456</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    예약 확정
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-neutral-500">체크인</p>
                  <p className="font-medium">2025년 3월 25일</p>
                  <p className="text-sm">15:00부터</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">체크아웃</p>
                  <p className="font-medium">2025년 3월 28일</p>
                  <p className="text-sm">11:00까지</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">투숙객</p>
                  <p className="font-medium">성인 2명</p>
                  <p className="text-sm">객실 1개</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  예약 수정
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  캘린더에 추가
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center">
                  상세 보기
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
