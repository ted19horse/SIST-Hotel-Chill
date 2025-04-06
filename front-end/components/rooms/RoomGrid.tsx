'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/common/ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { rooms } from '@/data/rooms/types/rooms';
import { Room } from '@/types/room';
import { BedDouble, Check, ChevronRight, Eye, Maximize2, Mountain, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface RoomGridProps {
  initialRooms?: Room[];
}

export default function RoomGrid({ initialRooms = rooms }: RoomGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">객실 목록</h2>
          <p className="text-neutral-500">총 {initialRooms.length}개의 객실 타입</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-grid-2x2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 12h18" />
              <path d="M12 3v18" />
            </svg>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list"
            >
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialRooms.map((room) => (
            <div
              key={room.id}
              id={`room-${room.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={room.images[0] || '/placeholder.svg'}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">${room.price.weekday}/night</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <Tabs defaultValue="image-0">
                        <div className="relative h-[50vh] mb-4">
                          {room.images.map((image, index) => (
                            <TabsContent key={index} value={`image-${index}`} className="p-0 m-0">
                              <div className="relative h-[50vh]">
                                <Image
                                  src={image || '/placeholder.svg'}
                                  alt={`${room.name} - Image ${index + 1}`}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </TabsContent>
                          ))}
                        </div>
                        <TabsList className="grid grid-cols-3 gap-2">
                          {room.images.map((image, index) => (
                            <TabsTrigger
                              key={index}
                              value={`image-${index}`}
                              className="p-0 overflow-hidden h-20"
                            >
                              <div className="relative w-full h-full">
                                <Image
                                  src={image || '/placeholder.svg'}
                                  alt={`Thumbnail ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                <p className="text-neutral-600 mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-y-2 text-sm text-neutral-500 mb-4">
                  <div className="w-1/2 flex items-center">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    <span>{room.size}㎡</span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      성인 {room.maxOccupancy.adults}인 + 어린이 {room.maxOccupancy.children}인
                    </span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>{room.view}</span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <BedDouble className="h-4 w-4 mr-2" />
                    <span>킹 사이즈 침대</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenityGroups.map((group, index) => (
                    <Badge key={index} variant="outline" className="bg-neutral-50">
                      {group}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-neutral-500">
                      Available: {room.availability.available} of {room.availability.total}
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">예약하기</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {initialRooms.map((room) => (
            <div
              key={room.id}
              id={`room-${room.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-64">
                  <Image
                    src={room.images[0] || '/placeholder.svg'}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">${room.price.weekday}/night</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/80 hover:bg-white"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <Tabs defaultValue="image-0">
                          <div className="relative h-[50vh] mb-4">
                            {room.images.map((image, index) => (
                              <TabsContent key={index} value={`image-${index}`} className="p-0 m-0">
                                <div className="relative h-[50vh]">
                                  <Image
                                    src={image || '/placeholder.svg'}
                                    alt={`${room.name} - Image ${index + 1}`}
                                    fill
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              </TabsContent>
                            ))}
                          </div>
                          <TabsList className="grid grid-cols-3 gap-2">
                            {room.images.map((image, index) => (
                              <TabsTrigger
                                key={index}
                                value={`image-${index}`}
                                className="p-0 overflow-hidden h-20"
                              >
                                <div className="relative w-full h-full">
                                  <Image
                                    src={image || '/placeholder.svg'}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="p-6 w-full md:w-2/3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                      <p className="text-neutral-600 mb-4">{room.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-bold text-primary">${room.price.weekday}</p>
                      <p className="text-sm text-neutral-500">per night</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Maximize2 className="h-4 w-4 mr-2" />
                      <span>{room.size}㎡</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        성인 {room.maxOccupancy.adults}인 + 어린이 {room.maxOccupancy.children}인
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mountain className="h-4 w-4 mr-2" />
                      <span>{room.view}</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-2" />
                      <span>킹 사이즈 침대</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenityGroups.map((group, index) => (
                      <Badge key={index} variant="outline" className="bg-neutral-50">
                        {group}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Available: {room.availability.available} of {room.availability.total}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
                      >
                        상세 정보
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button className="bg-primary hover:bg-primary/90">예약하기</Button>
                    </div>
                  </div>

                  {selectedRoom === room.id && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <h4 className="font-semibold mb-2">Room Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 mb-4">
                        {room.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-semibold mb-2">Amenities</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-1">
                        {room.amenityGroups.map((group, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            {group}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
