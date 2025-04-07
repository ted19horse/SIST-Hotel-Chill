'use client';

import { Card, CardContent } from '@/components/common/ui/Card';
import { MenuItem } from '@/lib/types/restaurant';
import { formatPrice } from '@/lib/utils/formatters';
import Image from 'next/image';
import { AllergenList } from './AllergenIcon';
import { DietaryBadges } from './DietaryBadge';

interface MenuCardProps {
  item: MenuItem;
  layout?: 'horizontal' | 'vertical';
  imageSize?: 'sm' | 'md' | 'lg';
}

/**
 * 메뉴 아이템을 표시하는 카드 컴포넌트
 */
export default function MenuCard({ item, layout = 'horizontal', imageSize = 'md' }: MenuCardProps) {
  const {
    name,
    description,
    price,
    image,
    allergens,
    isVegetarian,
    isVegan,
    isSignature,
    isSpicy,
  } = item;

  // 이미지 사이즈에 따른 스타일 설정
  const imageSizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
  };

  // 이미지 스타일
  const imageStyle =
    layout === 'horizontal'
      ? `${imageSizeStyles[imageSize]} rounded-md overflow-hidden`
      : 'w-full aspect-[4/3] rounded-t-md overflow-hidden';

  // 레이아웃에 따른 컨테이너 스타일
  const containerStyle = layout === 'horizontal' ? 'flex items-start gap-4' : 'flex flex-col';

  // 메뉴 이미지 컴포넌트
  const menuImage = image ? (
    <div className={imageStyle}>
      <Image
        src={image}
        alt={name}
        fill
        sizes={imageSize === 'sm' ? '64px' : imageSize === 'md' ? '96px' : '144px'}
        className="object-cover"
      />
    </div>
  ) : (
    <div className={`${imageStyle} bg-gray-100 flex items-center justify-center`}>
      <span className="text-gray-400 text-xs">이미지 없음</span>
    </div>
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {layout === 'vertical' && menuImage}

      <CardContent className={`p-4 ${containerStyle}`}>
        {layout === 'horizontal' && menuImage}

        <div className="flex-1">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-medium">{name}</h3>
            <span className="font-medium text-sm whitespace-nowrap">{formatPrice(price)}</span>
          </div>

          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>

          <div className="flex flex-wrap justify-between items-center gap-2 mt-auto">
            <AllergenList allergens={allergens || []} size={14} />

            <DietaryBadges
              options={{
                isVegetarian,
                isVegan,
                isSignature,
                isSpicy,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 메뉴 아이템 목록을 표시하는 그리드 컴포넌트
 */
export function MenuGrid({
  items,
  layout = 'horizontal',
}: {
  items: MenuItem[];
  layout?: 'horizontal' | 'vertical';
}) {
  const gridClass =
    layout === 'horizontal'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4';

  return (
    <div className={gridClass}>
      {items.map((item) => (
        <MenuCard key={item.id} item={item} layout={layout} />
      ))}
    </div>
  );
}
