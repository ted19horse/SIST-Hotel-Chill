import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowUpRight } from "lucide-react"

export default function DiningMap() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">다이닝 위치 안내</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven Resort & Spa의 다양한 다이닝 공간을 한눈에 확인하세요. 각 레스토랑과 라운지의 위치를 쉽게 찾을
            수 있습니다.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-[70vh] w-full">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Chill Haven Resort & Spa Floor Plan"
              fill
              className="object-contain"
            />

            {/* Restaurant Location Pins */}
            <div className="absolute left-[25%] top-[30%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Bites</p>
                  <p className="text-xs text-neutral-600">1st floor central, garden view</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Chill Bites
                </span>
              </div>
            </div>

            <div className="absolute left-[60%] top-[50%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Garden</p>
                  <p className="text-xs text-neutral-600">Garden level, indoor and outdoor terrace seating</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Chill Garden
                </span>
              </div>
            </div>

            <div className="absolute left-[40%] top-[15%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Elegance</p>
                  <p className="text-xs text-neutral-600">Top floor, panoramic view</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Chill Elegance
                </span>
              </div>
            </div>

            <div className="absolute left-[75%] top-[30%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Moments</p>
                  <p className="text-xs text-neutral-600">Adjacent to lobby, garden view</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Chill Moments
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-neutral-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-neutral-500">* 호버하여 각 다이닝 공간의 상세 위치를 확인하세요.</p>
              </div>
              <Button variant="outline" className="flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                호텔 전체 지도 보기
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Chill Bites</h3>
            </div>
            <p className="text-sm text-neutral-600">1층 중앙, 정원 전망</p>
            <p className="text-sm text-neutral-600 mt-1">06:30-22:30</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Chill Garden</h3>
            </div>
            <p className="text-sm text-neutral-600">가든 레벨, 실내 및 테라스 좌석</p>
            <p className="text-sm text-neutral-600 mt-1">11:30-22:00</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Chill Elegance</h3>
            </div>
            <p className="text-sm text-neutral-600">최상층, 파노라마 전망</p>
            <p className="text-sm text-neutral-600 mt-1">18:00-22:00 (예약 필수)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Chill Moments</h3>
            </div>
            <p className="text-sm text-neutral-600">로비 인접, 정원 전망</p>
            <p className="text-sm text-neutral-600 mt-1">10:00-24:00</p>
          </div>
        </div>
      </div>
    </section>
  )
}

