import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import FacilitiesIntro from '@/components/facilities/FacilitiesIntro';
import FacilitiesMap from '@/components/facilities/FacilitiesMap';
import FacilityTabs from '@/components/facilities/FacilityTabs';
import InfoRequestForm from '@/components/facilities/InfoRequestForm';
import ReservationInfo from '@/components/facilities/ReservationInfo';
import RoomBenefits from '@/components/facilities/RoomBenefits';
import { PLACEHOLDER_IMAGES } from '@/lib/data/static/constants';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      {/* 헤더 컴포넌트 */}
      <Header />

      {/* 페이지 배너 */}
      <div className="relative h-[40vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${PLACEHOLDER_IMAGES.MAIN_BANNER}')`,
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">부대시설</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>부대시설</span>
            </div>
          </div>
        </div>
      </div>

      {/* 시설 소개 */}
      <FacilitiesIntro />

      {/* 시설 탭 */}
      <FacilityTabs />

      {/* 시설 지도 */}
      <FacilitiesMap />

      {/* 예약 정보 */}
      <ReservationInfo />

      {/* 객실 등급별 혜택 */}
      <RoomBenefits />

      {/* 정보 요청 양식 */}
      <InfoRequestForm />

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
