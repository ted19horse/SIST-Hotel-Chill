import { Button } from '@/components/common/ui/Button';
import { PLACEHOLDER_IMAGES } from '@/data/static/constants';
import { facilities } from '@/data/static/facilities/facilities-data';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function FacilitiesMap() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">시설 지도</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            투숙 중 편리한 이동을 위해 리조트 시설 배치도를 확인하세요.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-[70vh] w-full">
            <Image
              src={PLACEHOLDER_IMAGES.MAP}
              alt="칠 헤이븐 리조트 & 스파 시설 지도"
              fill
              className="object-contain"
            />

            {/* 시설 위치 표시 */}
            <div className="absolute left-[25%] top-[30%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">{facilities[0].displayName}</p>
                  <p className="text-xs text-neutral-600">{facilities[0].location}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  웰니스 센터
                </span>
              </div>
            </div>

            <div className="absolute left-[60%] top-[50%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">{facilities[1].displayName}</p>
                  <p className="text-xs text-neutral-600">{facilities[1].location}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  세레니티 스파
                </span>
              </div>
            </div>

            <div className="absolute left-[40%] top-[15%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">{facilities[2].displayName}</p>
                  <p className="text-xs text-neutral-600">{facilities[2].location}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  네이처 존
                </span>
              </div>
            </div>

            <div className="absolute left-[75%] top-[30%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">{facilities[3].displayName}</p>
                  <p className="text-xs text-neutral-600">{facilities[3].location}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  라운지 & 엔터테인먼트
                </span>
              </div>
            </div>

            <div className="absolute left-[30%] top-[70%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">{facilities[4].displayName}</p>
                  <p className="text-xs text-neutral-600">{facilities[4].location}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  비즈니스 칠
                </span>
              </div>
            </div>

            <div className="absolute left-[65%] top-[70%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">{facilities[5].displayName}</p>
                  <p className="text-xs text-neutral-600">{facilities[5].location}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  키즈 & 패밀리
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-neutral-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-neutral-500">
                  * 위치 마커에 마우스를 올리면 시설 세부 정보를 확인할 수 있습니다
                </p>
              </div>
              <Button variant="outline" className="flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                전체 리조트 지도 다운로드
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">메인 빌딩</h3>
            </div>
            <p className="text-sm text-neutral-600">
              웰니스 센터(1-2층), 라운지 & 엔터테인먼트(3층), 비즈니스 칠(B1층), 키즈 &
              패밀리(B2층)를 포함하고 있습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">이스트 윙</h3>
            </div>
            <p className="text-sm text-neutral-600">
              칠 세레니티 스파를 위한 전용 공간으로, 트리트먼트 룸, 릴렉세이션 공간, 프라이빗 스파
              스위트를 갖추고 있습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">야외 공간</h3>
            </div>
            <p className="text-sm text-neutral-600">
              네이처 칠 존을 포함하며 산책로, 정원, 호수 데크, 계절별 활동 공간이 마련되어 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
