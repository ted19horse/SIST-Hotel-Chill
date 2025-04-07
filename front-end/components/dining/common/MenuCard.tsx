'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MenuItem } from '@/data/dining/types/menu';
import { Clock, Leaf, Star } from 'lucide-react';
import Image from 'next/image';

interface MenuCardProps {
  menuItem: MenuItem;
}

const allergenIcons: Record<string, string> = {
  EGGS: '🥚',
  MILK: '🥛',
  FISH: '🐟',
  SHELLFISH: '🦐',
  NUTS: '🌰',
  GLUTEN: '🌾',
  SOY: '🫘',
};

const spicyLevelIcons = ['🌶️', '🌶️🌶️', '🌶️🌶️🌶️'];

export function MenuCard({ menuItem }: MenuCardProps) {
  const {
    name,
    description,
    price,
    category,
    isVegetarian,
    isSignature,
    allergens,
    imageUrl,
    availableTime,
    servingSize,
    spicyLevel,
    preparationTime,
  } = menuItem;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            {isSignature && (
              <Badge variant="default" className="bg-yellow-500">
                <Star className="mr-1 h-3 w-3" />
                시그니처
              </Badge>
            )}
            {isVegetarian && (
              <Badge variant="secondary" className="bg-green-500 text-white">
                <Leaf className="mr-1 h-3 w-3" />
                채식
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-lg font-bold">{price.toLocaleString()}원</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {servingSize && (
            <div className="text-sm">
              <span className="font-medium">1인분 기준:</span> {servingSize}
            </div>
          )}
          {preparationTime && (
            <div className="text-sm">
              <span className="font-medium">준비 시간:</span> {preparationTime}분
            </div>
          )}
          {spicyLevel && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">매운맛:</span>
              <span className="text-sm">{spicyLevelIcons[spicyLevel - 1]}</span>
            </div>
          )}
          {availableTime && (
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              <span>
                {availableTime.start} - {availableTime.end}
              </span>
            </div>
          )}
          {allergens && allergens.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {allergens.map((allergen) => (
                <Badge key={allergen} variant="outline" className="text-xs">
                  {allergenIcons[allergen]} {allergen}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Badge variant="secondary">{category.replace(/_/g, ' ')}</Badge>
      </CardFooter>
    </Card>
  );
}
