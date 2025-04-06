'use client';

import { Button } from '@/components/common/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { Room } from '@/types/room';
import {
  Bath,
  Check,
  ChefHat,
  Coffee,
  Gift,
  Leaf,
  Music,
  ShowerHead,
  Tablet,
  Tv,
  UtensilsCrossed,
  Wifi,
  Wind,
  Wine,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface RoomDetailModalProps {
  room: Room;
  onClose: () => void;
  onBookNow: (room: Room) => void;
}

export default function RoomDetailModal({ room, onClose, onBookNow }: RoomDetailModalProps) {
  const [activeTab, setActiveTab] = useState('description');

  // Helper function to get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wi-fi')) return <Wifi className="h-4 w-4" />;
    if (amenityLower.includes('tv')) return <Tv className="h-4 w-4" />;
    if (amenityLower.includes('coffee') || amenityLower.includes('espresso'))
      return <Coffee className="h-4 w-4" />;
    if (amenityLower.includes('bath')) return <ShowerHead className="h-4 w-4" />;
    if (amenityLower.includes('bluetooth') || amenityLower.includes('speaker'))
      return <Music className="h-4 w-4" />;
    if (amenityLower.includes('tablet')) return <Tablet className="h-4 w-4" />;
    if (amenityLower.includes('air') || amenityLower.includes('purifier'))
      return <Wind className="h-4 w-4" />;
    if (amenityLower.includes('breakfast') || amenityLower.includes('dining'))
      return <UtensilsCrossed className="h-4 w-4" />;
    if (amenityLower.includes('welcome') || amenityLower.includes('fruit'))
      return <Gift className="h-4 w-4" />;
    if (amenityLower.includes('jacuzzi')) return <Bath className="h-4 w-4" />;
    if (amenityLower.includes('wine') || amenityLower.includes('liquor'))
      return <Wine className="h-4 w-4" />;
    if (amenityLower.includes('butler') || amenityLower.includes('service'))
      return <ChefHat className="h-4 w-4" />;
    return <Leaf className="h-4 w-4" />; // Default eco-friendly icon
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-teal-800">{room.name}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
            aria-label="닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Room Image */}
          <div className="relative h-64 w-full">
            <Image
              src={room.images[0] || '/placeholder.svg'}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Tabs */}
          <div className="p-6">
            <Tabs defaultValue="description" className="space-y-4">
              <TabsList>
                <TabsTrigger value="description">객실 소개</TabsTrigger>
                <TabsTrigger value="amenities">편의시설</TabsTrigger>
                <TabsTrigger value="policies">이용 안내</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">객실 정보</h3>
                  <p>{room.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">객실 특징</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {room.features.map((feature: string) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">객실 내 시설</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {room.amenities.map((amenity: string) => (
                      <li key={amenity} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-teal-600" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="policies" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">체크인/체크아웃</h3>
                  <ul className="space-y-2">
                    <li>체크인: 오후 3시부터</li>
                    <li>체크아웃: 오전 11시까지</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">취소 정책</h3>
                  <p>체크인 3일 전까지 무료 취소 가능</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">1박 요금</p>
              <p className="text-2xl font-bold text-teal-800">₩{room.price.toLocaleString()}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                닫기
              </Button>
              <Button onClick={() => onBookNow(room)}>예약하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
