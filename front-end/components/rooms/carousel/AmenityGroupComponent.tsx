// AmenityGroupComponent: 각 객실의 어메니티 그룹(예: 공통 어메니티, 욕실 어메니티 등)과
// 그 안의 아이템 목록을 표시하는 컴포넌트입니다.
// iconName을 받아 실제 아이콘을 표시하도록 개선

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/ui/Popover';
import { cn } from '@/lib/utils';
import {
  Bed,
  CupSoda,
  TabletSmartphone,
  Crown,
  Tv,
  Wifi,
  ShieldCheck,
  Refrigerator,
  Droplet,
  Footprints,
  BatteryCharging,
  Fan,
  Coffee,
  CloudDrizzle,
  Weight,
  Bath,
  Music,
  Wind,
  Sofa,
  Moon,
  UtensilsCrossed,
  Apple,
  UserCheck,
  KeySquare,
  Waves,
  GlassWater,
  ChefHat,
  Flower,
  Plus
} from 'lucide-react';
import React, { useState, useCallback } from 'react';

export function AmenityGroupComponent({ group }: any) {
  const { name, name_kor, iconName, amenities } = group;

  // 상세 목록 열림 상태만 관리
  const [isOpen, setIsOpen] = useState(false);

  // 그룹 대표 아이콘 렌더링 (ICON_MAP을 통한 동적 매핑)
  const ICON_MAP: any = {
    Bed,
    CupSoda,
    TabletSmartphone,
    Crown,
    Tv,
    Wifi,
    ShieldCheck,
    Refrigerator,
    Droplet,
    Footprints,
    BatteryCharging,
    Fan,
    Coffee,
    CloudDrizzle,
    Weight,
    Bath,
    Music,
    Wind,
    Sofa,
    Moon,
    UtensilsCrossed,
    Apple,
    UserCheck,
    KeySquare,
    Waves,
    GlassWater,
    ChefHat,
    Flower,
  };
  const GroupIcon = ICON_MAP[iconName] || Plus;
  const groupIcon = React.createElement(GroupIcon, { className: "w-4 h-4 mr-1" });

  // Plus 버튼 클릭 시 상세 목록 토글
  const handlePlusClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Popover 영역에서 마우스가 벗어나면 닫힘
  const handlePopoverMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!amenities.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* 대표 아이콘 및 그룹명 */}
      <span className="flex items-center text-sm font-medium">
        {groupIcon}
        {name_kor}
      </span>
      {/* Plus 버튼 클릭 시 상세 목록 토글 */}
      <button
        type="button"
        aria-label="상세 어메니티 보기"
        onClick={handlePlusClick}
        className={cn(
          'ml-1 p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors',
          // 상세 목록이 열릴 때만 회전 애니메이션 적용
          isOpen ? 'rotate-45 transition-transform duration-300' : 'rotate-0 transition-transform duration-300'
        )}
        tabIndex={0}
      >
        {/* Plus 아이콘만 단순 회전, 포커스 효과 최소화 */}
        <Plus className="w-4 h-4" />
      </button>
      {/* Popover 상세 목록: 마우스 아웃 시 닫힘 */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {/* 숨김용 트리거(실제 버튼은 위에 있음) */}
          <span className="sr-only">상세 어메니티 트리거</span>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          onMouseLeave={handlePopoverMouseLeave}
          className="min-w-[200px] p-3"
        >
          <ul className="flex flex-col gap-1">
            {amenities && amenities.map((item: any) => (
              <li key={item.amenityItemsId || item.id} className="flex items-center gap-2 text-sm">
                {/* 아이콘 렌더링 */}
                {ICON_MAP[item.iconName] ? (
                  React.createElement(ICON_MAP[item.iconName], { className: 'w-4 h-4 text-neutral-400' })
                ) : null}
                {item.name_kor}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
