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
  Coffee,
  Bath,
  ShowerHead,
  AirVent,
  Fan,
  Refrigerator,
  ShieldCheck,
  Phone,
  Lamp,
  Thermometer,
  Footprints,
  Shirt,
  FlaskConical,
  Droplet,
  GlassWater,
  ParkingCircle,
  Car,
  Utensils,
  Wine,
  Dumbbell,
  PawPrint,
  Accessibility,
  CircleSlash,
  Wind,
  KeyRound,
  AlarmClock,
  Plug,
  Ruler,
  Users,
  Mountain,
  AlertCircle,
  Plus,
} from 'lucide-react';
import React, { useState, useRef, useCallback, useMemo } from 'react';

const ICON_MAP = {
  Bed,
  CupSoda,
  TabletSmartphone,
  Crown,
  Tv,
  Wifi,
  Coffee,
  Bath,
  ShowerHead,
  AirVent,
  Fan,
  Refrigerator,
  ShieldCheck,
  Phone,
  Lamp,
  Thermometer,
  Footprints,
  Shirt,
  FlaskConical,
  Droplet,
  GlassWater,
  ParkingCircle,
  Car,
  Utensils,
  Wine,
  Dumbbell,
  PawPrint,
  Accessibility,
  CircleSlash,
  Wind,
  KeyRound,
  AlarmClock,
  Plug,
  Ruler,
  Users,
  Mountain,
  Plus,
};

export function AmenityGroupComponent({ group }) {
  const { groupName, iconName, amenities } = group;

  // isOpen: 상세 목록이 열려있는지 여부를 관리하는 상태
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeoutRef = useRef();
  const animationFrameRef = useRef();

  // 그룹 대표 아이콘 렌더링 (ICON_MAP을 통한 동적 매핑)
  const GroupIcon = ICON_MAP[iconName] || AlertCircle;
  const groupIcon = useMemo(() => (
    <GroupIcon className="w-4 h-4 mr-1" />
  ), [iconName]);

  // 키보드(ESC)로 상세 목록 닫기
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false); // ESC키를 누르면 닫힘
      }
    },
    [isOpen]
  );

  // 마우스가 그룹 영역에 들어왔을 때: 애니메이션과 함께 상세 목록 열기
  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current); // 기존 타이머 제거
    cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsAnimating(true); // 애니메이션 시작
      setIsOpen(true);      // 목록 열기
    });
  }, []);

  // 마우스가 그룹 영역에서 나갔을 때: 일정 시간 후 상세 목록 닫기
  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = requestAnimationFrame(() => {
        setIsOpen(false); // 목록 닫기
        setTimeout(() => setIsAnimating(false), 200); // 애니메이션 종료
      });
    }, 100); // 0.1초 후 닫힘
  }, []);

  // 아이템 목록 렌더링 (ICON_MAP을 통한 동적 매핑)
  const renderedItems = useMemo(() => {
    return amenities.map((item, index) => {
      const ItemIcon = ICON_MAP[item.iconName] || AlertCircle;
      return (
        <div key={item.itemId || index} className="flex items-center gap-2 p-2 rounded-lg">
          <ItemIcon className="w-4 h-4 mr-1" />
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
            {item.itemName}
          </span>
        </div>
      );
    });
  }, [amenities]);

  if (!amenities.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      <Badge
        variant="outline"
        className={cn(
          'flex items-center gap-2 px-3 py-1.5',
          'bg-gradient-to-r from-background to-primary/5',
          'border-primary/20 group',
          'transition-all duration-200 ease-in-out',
          'hover:from-primary/5 hover:to-primary/10',
          'hover:border-primary/30',
          'hover:ring-2 hover:ring-primary',
          'focus:outline-none focus:ring-0',
          'focus-visible:outline-none focus-visible:ring-0',
          'will-change-transform will-change-opacity'
        )}
      >
        {groupIcon}
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200">
          {groupName}
        </span>
      </Badge>
      {amenities.length > 1 && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-7 w-7 p-0',
                'bg-primary/5 hover:bg-primary/10',
                'transition-all duration-200 ease-in-out',
                'hover:ring-2 hover:ring-primary',
                'focus:outline-none focus:ring-0',
                'focus-visible:outline-none focus-visible:ring-0',
                'will-change-transform'
              )}
              aria-label={`${groupName} 어메니티 상세 정보 ${isOpen ? '닫기' : '열기'}`}
              aria-expanded={isOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Plus
                className={cn(
                  'h-4 w-4 text-primary/70',
                  'transition-all duration-200',
                  isOpen && 'rotate-45',
                  'will-change-transform'
                )}
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              'w-[400px] p-3',
              'sm:w-[400px] max-w-[calc(100vw-2rem)]',
              'border-primary/20',
              'bg-gradient-to-b from-background to-primary/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'transition-all duration-200 ease-in-out',
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              'motion-reduce:transition-none motion-reduce:transform-none',
              'will-change-transform will-change-opacity'
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="dialog"
            aria-label={`${groupName} 어메니티 목록`}
            sideOffset={8}
            align="start"
          >
            <div className="grid gap-4">
              <div className="space-y-1.5 border-b border-primary/10 pb-3">
                <h4
                  className="text-sm font-medium leading-none text-foreground/90"
                  id={`amenity-group-${groupName}`}
                >
                  {groupName}
                </h4>
                <p className="text-xs text-muted-foreground">제공되는 모든 어메니티를 확인하세요</p>
              </div>
              <div
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 gap-2',
                  'transition-all duration-300 ease-in-out',
                  isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                  'will-change-transform will-change-opacity'
                )}
                role="list"
                aria-labelledby={`amenity-group-${groupName}`}
              >
                {renderedItems}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
