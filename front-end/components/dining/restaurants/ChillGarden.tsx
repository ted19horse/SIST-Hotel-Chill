'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CATEGORY_LABELS } from '@/data/dining/constants/categories';
import { MenuItem } from '@/data/dining/types/menu';
import { Restaurant } from '@/data/dining/types/restaurant';
import { Clock, Leaf, MapPin, TreePine, Users, Utensils } from 'lucide-react';
import { useState } from 'react';
import { MenuCard } from '../common/MenuCard';
import { RestaurantCard } from '../common/RestaurantCard';

interface ChillGardenProps {
  restaurant: Restaurant;
  menu: MenuItem[];
}

export function ChillGarden({ restaurant, menu }: ChillGardenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('SALAD');

  // 카테고리별 메뉴 필터링
  const filteredMenu = menu.filter((item) => item.category === selectedCategory);

  // 운영 시간 섹션별로 그룹화
  const operatingHours = restaurant.operatingHours.sections || {
    LUNCH: { name: '중식', start: '11:30', end: '15:00' },
    DINNER: { name: '석식', start: '17:30', end: '22:00' },
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
          <div className="grid gap-4 md:grid-cols-2">
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
              <p className="font-medium">테라스</p>
              <p className="text-sm text-muted-foreground">
                <TreePine className="inline-block h-4 w-4" /> 정원 뷰 테라스
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-medium">특징</p>
              <p className="text-sm text-muted-foreground">
                <Leaf className="inline-block h-4 w-4" /> 아시아 퓨전 요리
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
          <Tabs defaultValue="SALAD" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="SALAD">샐러드</TabsTrigger>
              <TabsTrigger value="PASTA">파스타</TabsTrigger>
              <TabsTrigger value="GRILL">그릴</TabsTrigger>
              <TabsTrigger value="DESSERT">디저트</TabsTrigger>
            </TabsList>
            <TabsContent value="SALAD" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="PASTA" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="GRILL" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="DESSERT" className="space-y-4">
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
