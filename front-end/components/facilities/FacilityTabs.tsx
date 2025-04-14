'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/Tabs';
import { PLACEHOLDER_IMAGES } from '@/lib/data/static/constants';
import { facilities } from '@/lib/data/static/facilities/facilities-data';
import { CalendarClock, Clock, Info, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function FacilityTabs() {
  const [activeTab, setActiveTab] = useState(facilities[0].id);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">부대시설</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            칠 헤이븐 리조트 & 스파의 다양한 부대시설에서 힐링 여정을 경험해보세요.
          </p>
        </div>

        <Tabs defaultValue={facilities[0].id} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-flow-col auto-cols-max gap-2 justify-start md:justify-center p-1 mb-8">
              {facilities.map((facility) => (
                <TabsTrigger
                  key={facility.id}
                  value={facility.id}
                  className="px-4 py-2 whitespace-nowrap"
                >
                  {facility.displayName}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {facilities.map((facility) => (
            <TabsContent key={facility.id} value={facility.id} className="mt-0">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={facility.image || PLACEHOLDER_IMAGES.FACILITY}
                      alt={facility.displayName}
                      fill
                      className="object-cover"
                    />
                    {facility.requiresReservation && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-white">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          예약 필수
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="text-2xl font-bold mb-2">{facility.displayName}</h3>
                    <p className="text-neutral-600 mb-6">{facility.concept}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">위치</p>
                          <p className="text-neutral-600 text-sm">{facility.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">운영 시간</p>
                          <p className="text-neutral-600 text-sm">{facility.operatingHours}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold mb-3">주요 시설</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {facility.keyFacilities.map((item, index) => (
                          <div key={index} className="bg-neutral-50 p-3 rounded-md">
                            <p className="font-medium text-primary">{item.name}</p>
                            <p className="text-neutral-600 text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {facility.requiresReservation ? (
                        <Button className="bg-primary hover:bg-primary/90">예약하기</Button>
                      ) : (
                        <Button className="bg-primary hover:bg-primary/90">자세히 보기</Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <Info className="h-4 w-4 mr-2" />
                        정보 요청하기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
