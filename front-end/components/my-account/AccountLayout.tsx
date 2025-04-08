'use client';

import type React from 'react';

import { Button } from '@/components/common/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/common/ui/Sheet';
import SidebarNavigation from '@/components/my-account/SidebarNavigation';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AccountLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: Record<string, string>;
}

export default function AccountLayout({
  children,
  activeSection,
  setActiveSection,
  sections,
}: AccountLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // 데스크톱으로 전환 시 모바일 사이드바 닫기
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setMobileOpen(false);
  };

  return (
    <div className="bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 네비게이션 - 데스크톱 */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <SidebarNavigation
              activeSection={activeSection}
              setActiveSection={handleSectionChange}
              sections={sections}
            />
          </div>

          {/* 사이드바 네비게이션 - 모바일 */}
          <div className="lg:hidden mb-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between items-center">
                  <span>
                    {activeSection === sections.overview && '계정 개요'}
                    {activeSection === sections.profile && '프로필 및 설정'}
                    {activeSection === sections.roomReservations && '객실 예약'}
                    {activeSection === sections.diningReservations && '다이닝 예약'}
                    {activeSection === sections.rewards && '칠 리워드'}
                    {activeSection === sections.payments && '결제 수단'}
                    {activeSection === sections.preferences && '환경설정'}
                    {activeSection === sections.support && '고객지원'}
                  </span>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <SidebarNavigation
                    activeSection={activeSection}
                    setActiveSection={handleSectionChange}
                    sections={sections}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
