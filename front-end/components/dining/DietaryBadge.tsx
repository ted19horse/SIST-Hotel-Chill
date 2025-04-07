'use client';

import { Badge } from '@/components/common/ui/Badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/ui/Tooltip';
import { Flame, Leaf } from 'lucide-react';

interface DietaryBadgeProps {
  type: 'vegetarian' | 'vegan' | 'signature' | 'spicy';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/**
 * 식이 옵션 및 특별 메뉴 표시를 위한 배지 컴포넌트
 */
export function DietaryBadge({ type, size = 'md', showLabel = true }: DietaryBadgeProps) {
  // 타입별 데이터 설정
  const data = {
    vegetarian: {
      icon: Leaf,
      label: '채식',
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
      tooltip: '채식 옵션 (계란, 유제품 포함 가능)',
    },
    vegan: {
      icon: Leaf,
      label: '비건',
      color: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
      tooltip: '완전 비건 옵션 (동물성 재료 제외)',
    },
    signature: {
      icon: null,
      label: '시그니처',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      tooltip: '셰프의 시그니처 메뉴',
    },
    spicy: {
      icon: Flame,
      label: '매운맛',
      color: 'bg-red-100 text-red-700 hover:bg-red-200',
      tooltip: '매운 음식',
    },
  };

  const { icon: Icon, label, color, tooltip } = data[type];

  // 사이즈별 스타일 설정
  const sizeStyles = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-sm py-1 px-2',
    lg: 'text-base py-1 px-3',
  };

  const badgeContent = (
    <Badge variant="outline" className={`${color} border-none font-normal ${sizeStyles[size]}`}>
      {Icon && <Icon className="mr-1" size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
      {showLabel && label}
    </Badge>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badgeContent}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * 여러 식이 옵션을 함께 표시하는 컴포넌트
 */
export function DietaryBadges({
  options,
}: {
  options: {
    isVegetarian?: boolean;
    isVegan?: boolean;
    isSignature?: boolean;
    isSpicy?: boolean;
  };
}) {
  const { isVegetarian, isVegan, isSignature, isSpicy } = options;

  return (
    <div className="flex flex-wrap gap-1">
      {isVegan && <DietaryBadge type="vegan" size="sm" />}
      {isVegetarian && !isVegan && <DietaryBadge type="vegetarian" size="sm" />}
      {isSpicy && <DietaryBadge type="spicy" size="sm" />}
      {isSignature && <DietaryBadge type="signature" size="sm" />}
    </div>
  );
}
