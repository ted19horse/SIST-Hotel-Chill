'use client';

import { cn } from '@/lib/utils';
import {
  Calendar,
  CreditCard,
  Gift,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Utensils,
} from 'lucide-react';
import Link from 'next/link';

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: Record<string, string>;
}

export default function SidebarNavigation({
  activeSection,
  setActiveSection,
  sections,
}: SidebarNavigationProps) {
  const navItems = [
    {
      title: '계정 개요',
      section: sections.overview,
      icon: LayoutDashboard,
    },
    {
      title: '프로필 및 설정',
      section: sections.profile,
      icon: User,
    },
    {
      title: '객실 예약',
      section: sections.roomReservations,
      icon: Calendar,
    },
    {
      title: '다이닝 예약',
      section: sections.diningReservations,
      icon: Utensils,
    },
    {
      title: '칠 리워드',
      section: sections.rewards,
      icon: Gift,
    },
    {
      title: '결제 수단',
      section: sections.payments,
      icon: CreditCard,
    },
    {
      title: '환경설정',
      section: sections.preferences,
      icon: Settings,
    },
    {
      title: '고객지원',
      section: sections.support,
      icon: LifeBuoy,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">마이 페이지</h2>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => setActiveSection(item.section)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    activeSection === item.section
                      ? 'bg-primary text-white'
                      : 'hover:bg-neutral-100 text-neutral-700'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}

            <li className="pt-4 mt-4 border-t border-neutral-200">
              <Link
                href="/sign-out"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-neutral-100 text-neutral-700"
              >
                <LogOut className="h-5 w-5" />
                <span>로그아웃</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
