'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/ui/Tooltip';
import { Allergen } from '@/lib/types/restaurant';
import { Egg, Fish, Info, Milk, Peanut, ShellFish, Soy, TreeNuts, Wheat } from 'lucide-react';

interface AllergenIconProps {
  allergen: Allergen;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

/**
 * 알레르겐 정보와 매핑된 이름과 아이콘 데이터
 */
const allergenData: Record<Allergen, { label: string; icon: React.ElementType }> = {
  eggs: { label: '계란', icon: Egg },
  dairy: { label: '유제품', icon: Milk },
  seafood: { label: '생선', icon: Fish },
  gluten: { label: '글루텐', icon: Wheat },
  peanuts: { label: '땅콩', icon: Peanut },
  nuts: { label: '견과류', icon: TreeNuts },
  soy: { label: '대두', icon: Soy },
  shellfish: { label: '갑각류', icon: ShellFish },
  wheat: { label: '밀', icon: Wheat },
};

/**
 * 알레르기 정보를 표시하는 아이콘 컴포넌트
 */
export default function AllergenIcon({
  allergen,
  size = 16,
  className = '',
  showLabel = false,
}: AllergenIconProps) {
  // 알레르겐 정보가 없는 경우 기본 아이콘 표시
  const { label, icon: IconComponent } = allergenData[allergen] || {
    label: '기타 알레르기',
    icon: Info,
  };

  // 툴크과 함께 아이콘 표시
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center">
            <IconComponent size={size} className={`text-orange-500 ${className}`} />
            {showLabel && <span className="ml-1 text-xs text-gray-600">{label}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label} 알레르기 정보</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * 여러 알레르겐 정보를 표시하는 컴포넌트
 */
export function AllergenList({
  allergens,
  size = 16,
  className = '',
  showLabels = false,
}: {
  allergens: Allergen[];
  size?: number;
  className?: string;
  showLabels?: boolean;
}) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {allergens.map((allergen) => (
        <AllergenIcon key={allergen} allergen={allergen} size={size} showLabel={showLabels} />
      ))}
    </div>
  );
}
