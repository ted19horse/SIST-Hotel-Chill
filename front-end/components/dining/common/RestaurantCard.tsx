'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Restaurant, RestaurantFeature } from '@/data/dining/types/restaurant';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const featureIcons: Record<RestaurantFeature, string> = {
  ALL_DAY_DINING: '🌞',
  LOCAL_INGREDIENTS: '🥗',
  GARDEN_VIEW: '🌺',
  TERRACE: '🌳',
  PANORAMA_VIEW: '🏞️',
  PREMIUM_DINING: '✨',
  LOUNGE: '🍸',
  BAR: '🍷',
  LIVE_MUSIC: '🎵',
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const {
    id,
    name,
    type,
    description,
    operatingHours,
    capacity,
    features,
    images,
    location,
    reservationRequired,
    dressCode,
  } = restaurant;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-2 top-2">
          <Badge variant={dressCode === 'SMART_CASUAL' ? 'default' : 'secondary'}>
            {dressCode === 'SMART_CASUAL' ? '스마트 캐주얼' : '캐주얼'}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{name}</h3>
          <Badge variant="outline">{type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {operatingHours.open} - {operatingHours.close}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>최대 {capacity}명</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {featureIcons[feature]} {feature.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/dining/${id}`}>자세히 보기</Link>
        </Button>
        <Button asChild>
          <Link href={`/dining/${id}/reservation`}>
            <Calendar className="mr-2 h-4 w-4" />
            예약하기
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
