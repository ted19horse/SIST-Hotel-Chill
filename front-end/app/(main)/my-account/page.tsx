'use client';

import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import AccountLayout from '@/components/my-account/AccountLayout';
import DiningReservations from '@/components/my-account/DiningReservations';
import MembershipRewards from '@/components/my-account/MembershipRewards';
import PaymentMethods from '@/components/my-account/PaymentMethods';
import Preferences from '@/components/my-account/Preferences';
import ProfileSettings from '@/components/my-account/ProfileSettings';
import ProfileSummary from '@/components/my-account/ProfileSummary';
import RoomReservations from '@/components/my-account/RoomReservations';
import Support from '@/components/my-account/Support';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Navigation sections
const sections = {
  overview: '개요',
  profile: '프로필',
  roomReservations: '객실-예약',
  diningReservations: '다이닝-예약',
  rewards: '리워드',
  payments: '결제수단',
  preferences: '환경설정',
  support: '고객지원',
};

export default function MyAccountPage() {
  const [activeSection, setActiveSection] = useState(sections.overview);

  const renderSection = () => {
    switch (activeSection) {
      case sections.overview:
        return <ProfileSummary />;
      case sections.profile:
        return <ProfileSettings />;
      case sections.roomReservations:
        return <RoomReservations />;
      case sections.diningReservations:
        return <DiningReservations />;
      case sections.rewards:
        return <MembershipRewards />;
      case sections.payments:
        return <PaymentMethods />;
      case sections.preferences:
        return <Preferences />;
      case sections.support:
        return <Support />;
      default:
        return <ProfileSummary />;
    }
  };

  return (
    <main className="min-h-screen">
      <ScrollToTop />
      {/* 헤더 */}
      <Header />

      {/* 페이지 배너 */}
      <div className="relative h-[30vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">마이 페이지</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>마이 페이지</span>
            </div>
          </div>
        </div>
      </div>

      <AccountLayout
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={sections}
      >
        {renderSection()}
      </AccountLayout>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
