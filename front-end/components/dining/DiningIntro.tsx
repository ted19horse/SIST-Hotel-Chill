import Image from 'next/image';

export default function DiningIntro() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Culinary Journey for Mind & Body</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Chill Haven Resort & Spa의 다이닝은 단순한 식사 그 이상의 경험을 제공합니다. 신선한 지역
            식재료와 정성 어린 조리법으로 건강한 맛을 선사하며, 편안한 분위기 속에서 몸과 마음의
            휴식을 느낄 수 있는 공간입니다.
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                className="text-primary"
              >
                <path d="M12 2v1" />
                <path d="M12 21v-1" />
                <path d="M4.9 4.9l.7.7" />
                <path d="M18.4 18.4l.7.7" />
                <path d="M2 12h1" />
                <path d="M21 12h1" />
                <path d="M4.9 19.1l.7-.7" />
                <path d="M18.4 5.6l.7-.7" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Healing Food</h3>
            <p className="text-neutral-600">
              신선한 로컬 식재료와 슈퍼푸드를 활용한 건강한 요리로 몸과 마음의 균형을 찾아드립니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                className="text-primary"
              >
                <path d="M3 7V5c0-1.1.9-2 2-2h2" />
                <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
                <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
                <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
                <rect width="7" height="5" x="7" y="7" rx="1" />
                <rect width="7" height="5" x="10" y="12" rx="1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Relaxing Atmosphere</h3>
            <p className="text-neutral-600">
              편안한 분위기와 아름다운 전망 속에서 여유로운 식사 시간을 즐기실 수 있습니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                className="text-primary"
              >
                <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <circle cx="17.5" cy="17.5" r="3.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Diverse Experiences</h3>
            <p className="text-neutral-600">
              올데이 다이닝부터 프리미엄 코스 요리까지, 다양한 다이닝 경험을 제공합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                className="text-primary"
              >
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" x2="18" y1="17" y2="17" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Special Events</h3>
            <p className="text-neutral-600">
              테이스팅 이벤트, 시즌 특선 요리, 라이브 음악 등 다양한 이벤트로 특별한 경험을
              선사합니다.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Chill Haven Dining Experience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Culinary Philosophy</h3>
                <p className="text-lg">
                  "음식은 단순한 영양 공급을 넘어 휴식과 치유의 매개체가 되어야 합니다. Chill
                  Haven의 모든 요리는 이 철학을 바탕으로 정성껏 준비됩니다."
                </p>
                <p className="mt-2 text-white/80">- Executive Chef Kim, Chill Haven Resort & Spa</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-primary/5 p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold mb-4">Restaurants</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-medium">Chill Bites</span>
                  <span className="text-neutral-500 ml-2">- 올데이 다이닝</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-medium">Chill Garden</span>
                  <span className="text-neutral-500 ml-2">- 캐주얼 다이닝</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-medium">Chill Elegance</span>
                  <span className="text-neutral-500 ml-2">- 프리미엄 다이닝</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-medium">Chill Moments</span>
                  <span className="text-neutral-500 ml-2">- 라운지 & 바</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Dining Events</h3>
              <p className="text-neutral-600 mb-6">
                Chill Haven에서는 계절별 특선 메뉴, 셰프의 테이스팅 메뉴, 라이브 공연 등 다양한
                다이닝 이벤트를 진행하고 있습니다.
              </p>
              <div className="flex justify-center">
                <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
                  이벤트 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
