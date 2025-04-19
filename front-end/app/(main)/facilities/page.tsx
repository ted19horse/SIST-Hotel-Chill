// [파일 설명]
// 이 파일은 '부대시설' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/facilities 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 호텔 내 다양한 부대시설 소개, 지도, 예약 안내 등 부대시설 관련 주요 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조
// - 여러 개의 재사용 컴포넌트 조합 (예: FacilitiesIntro, FacilityTabs, FacilitiesMap 등)
// - Next.js의 동적 라우팅 및 Link 컴포넌트 활용
// - TypeScript의 타입 추론(필요시)
//
// 초보자 팁:
// 각 import, 렌더링 영역, 컴포넌트별로 상세 주석을 참고하세요.

import FacilitiesIntro from '@/components/facilities/FacilitiesIntro'; // 부대시설 소개
import FacilitiesMap from '@/components/facilities/FacilitiesMap'; // 시설 지도
import FacilityTabs from '@/components/facilities/FacilityTabs'; // 시설별 탭
import InfoRequestForm from '@/components/facilities/InfoRequestForm'; // 정보 요청 폼
import ReservationInfo from '@/components/facilities/ReservationInfo'; // 예약 안내
import RoomBenefits from '@/components/facilities/RoomBenefits'; // 객실 혜택 안내
import { PLACEHOLDER_IMAGES } from '@/lib/data/static/constants'; // 이미지 상수
import { ChevronRight } from 'lucide-react'; // 아이콘
import Link from 'next/link'; // Next.js 라우팅용 링크 컴포넌트

/**
 * FacilitiesPage 컴포넌트
 * - 부대시설 관련 주요 UI를 렌더링합니다.
 * - 여러 개의 하위 컴포넌트(소개, 탭, 지도, 예약 안내, 객실 혜택 등)로 구성됩니다.
 */
export default function FacilitiesPage() {
  return (
    <main className="min-h-screen">
      {/* [배너 영역] */}
      {/* 배경 이미지와 타이틀, 네비게이션(홈 > 부대시설) 표시 */}
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

      {/* [시설 소개] */}
      <FacilitiesIntro />

      {/* [시설 탭] */}
      <FacilityTabs />

      {/* [시설 지도] */}
      <FacilitiesMap />

      {/* [예약 정보] */}
      <ReservationInfo />

      {/* [객실 등급별 혜택] */}
      <RoomBenefits />

      {/* [정보 요청 양식] */}
      <InfoRequestForm />
    </main>
  );
}
