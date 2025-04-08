import { Button } from '@/components/common/ui/Button';
import { BarChart, Bell, CreditCard, Smartphone } from 'lucide-react';
import Image from 'next/image';

export default function DigitalCard() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">디지털 멤버십 카드</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Chill Haven 모바일 앱의 디지털 카드로 언제 어디서나 Chill Rewards 멤버십에 접속하세요.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">모바일 접속</h3>
                  <p className="text-neutral-600">
                    디지털 멤버십 카드는 물리적 카드 없이도 Chill Haven 앱에서 항상 사용할 수
                    있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">실시간 포인트 추적</h3>
                  <p className="text-neutral-600">
                    Chill 포인트 잔액 확인, 적립 내역 조회, 포인트 만료일을 실시간으로 확인할 수
                    있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">간편한 포인트 사용</h3>
                  <p className="text-neutral-600">
                    앱을 통해 몇 번의 터치만으로 객실 요금, 다이닝, 스파 트리트먼트 등에 포인트를
                    직접 사용할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">맞춤형 알림</h3>
                  <p className="text-neutral-600">
                    회원님의 선호도와 멤버십 등급에 따라 맞춤형 혜택, 이벤트 초대장, 프로모션 정보를
                    받아보세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90">앱 다운로드</Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                더 알아보기
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=1200&width=600"
                alt="디지털 멤버십 카드 미리보기"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 w-64 h-32 bg-white rounded-lg shadow-lg p-4 transform rotate-6">
              <div className="h-full w-full bg-gradient-to-r from-primary/80 to-purple-500/80 rounded-md p-3 text-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs opacity-80">CHILL REWARDS</p>
                    <p className="font-bold">DEEP CHILL</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium">박민지</p>
                  <p className="text-xs opacity-80">가입일: 2023년</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs opacity-80">ID: CH-38291</p>
                  <p className="text-sm font-bold">32,450 pts</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-64 bg-white rounded-lg shadow-lg p-4 transform -rotate-6">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold">현재 포인트</p>
                <p className="text-primary font-bold">32,450</p>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                등급 업그레이드까지 16,550 포인트 남음
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
