import { PLACEHOLDER_IMAGES } from '@/lib/data/static/constants';
import Image from 'next/image';

export default function FacilitiesIntro() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">부대시설 소개</h2>
          <p className="text-xl text-primary mb-6">최고급 시설과 함께 힐링의 여정을 완성하세요</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            칠 헤이븐 리조트 & 스파의 부대시설은 여러분의 힐링 여정을 돕기 위해 세심하게
            설계되었습니다. 각 공간은 여러분의 몸과 마음, 영혼을 위한 최적의 균형으로 럭셔리함과
            편안함, 평온함을 담고 있습니다. 최첨단 웰니스 센터부터 평온한 자연 속 공간까지, 모든
            시설은 여러분의 투숙을 더욱 특별하게 만들어 줄 것입니다.
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="relative h-[60vh] rounded-xl overflow-hidden mt-12">
          <Image
            src={PLACEHOLDER_IMAGES.MAIN_BANNER}
            alt="칠 헤이븐 리조트 부대시설"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">힐링 철학</h3>
              <p className="text-lg">
                "진정한 힐링은 신체적 웰니스, 정신적 평화, 영적 연결의 조화로운 균형에서 비롯된다고
                믿습니다. 저희 시설은 이러한 총체적 접근 방식을 지원하여 여러분이 자신과 자연과 다시
                연결될 수 있는 공간을 제공합니다."
              </p>
              <p className="mt-2 text-white/80">- 웰니스 디렉터, 칠 헤이븐 리조트 & 스파</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">통합적 웰니스</h3>
            <p className="text-neutral-600">
              다양한 힐링 경험을 통해 신체적, 정신적, 감정적 웰빙을 증진할 수 있도록 설계된 시설을
              경험해보세요.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                <path d="M12 2v1"></path>
                <path d="M12 21v-1"></path>
                <path d="M4.93 4.93l.7.7"></path>
                <path d="M18.36 18.36l.7.7"></path>
                <path d="M2 12h1"></path>
                <path d="M21 12h-1"></path>
                <path d="M4.93 19.07l.7-.7"></path>
                <path d="M18.36 5.64l.7-.7"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">자연과의 연결</h3>
            <p className="text-neutral-600">
              자연의 치유력과 다시 연결될 수 있도록 모든 시설에 자연 요소를 통합하였습니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">맞춤형 경험</h3>
            <p className="text-neutral-600">
              개인 맞춤형 스파 트리트먼트부터 유연한 활동 공간까지, 여러분의 고유한 힐링 여정에 맞춰
              시설이 제공됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
