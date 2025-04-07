'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CATEGORY_LABELS } from '@/data/dining/constants/categories';
import { MenuItem } from '@/data/dining/types/menu';
import { Restaurant } from '@/data/dining/types/restaurant';
import { Clock, MapPin, Music, Users, Utensils, Wine } from 'lucide-react';
import { useState } from 'react';
import { MenuCard } from '../common/MenuCard';
import { RestaurantCard } from '../common/RestaurantCard';

interface ChillMomentsProps {
  restaurant: Restaurant;
  menu: MenuItem[];
}

export function ChillMoments({ restaurant, menu }: ChillMomentsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('AFTERNOON_TEA');

  // 카테고리별 메뉴 필터링
  const filteredMenu = menu.filter((item) => item.category === selectedCategory);

  // 운영 시간 섹션별로 그룹화
  const operatingHours = restaurant.operatingHours.sections || {
    AFTERNOON_TEA: { name: '애프터눈 티', start: '14:00', end: '17:00' },
    BAR: { name: '바', start: '10:00', end: '24:00' },
  };

  return (
    <div className="space-y-8">
      <RestaurantCard restaurant={restaurant} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            운영 시간
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-1">
            {Object.entries(operatingHours).map(([key, section]) => (
              <div key={key} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{section.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {section.start} - {section.end}
                  </p>
                </div>
                <Badge variant="outline">
                  {CATEGORY_LABELS[key as keyof typeof CATEGORY_LABELS]}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            위치 및 시설
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="font-medium">위치</p>
              <p className="text-sm text-muted-foreground">{restaurant.location}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-medium">수용 인원</p>
              <p className="text-sm text-muted-foreground">
                <Users className="inline-block h-4 w-4" /> 최대 {restaurant.capacity}명
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-medium">엔터테인먼트</p>
              <p className="text-sm text-muted-foreground">
                <Music className="inline-block h-4 w-4" /> 라이브 음악
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-medium">특징</p>
              <p className="text-sm text-muted-foreground">
                <Wine className="inline-block h-4 w-4" /> 프리미엄 바 & 라운지
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            메뉴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="AFTERNOON_TEA" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="AFTERNOON_TEA">애프터눈 티</TabsTrigger>
              <TabsTrigger value="BAR">바 메뉴</TabsTrigger>
              <TabsTrigger value="DRINKS">음료</TabsTrigger>
            </TabsList>
            <TabsContent value="AFTERNOON_TEA" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="BAR" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="DRINKS" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
