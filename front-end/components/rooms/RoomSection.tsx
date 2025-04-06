'use client';

import { Button } from '@/components/common/ui/Button';
import { rooms } from '@/data/rooms/types/rooms';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RoomCarousel } from './carousel/RoomCarousel';

export default function RoomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver({ ref: sectionRef });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation effect
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'py-20 bg-neutral-50 transition-opacity duration-1000 ease-in-out',
        isVisible || hasAnimated ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">객실 안내</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven Resort & Spa의 다양한 객실에서 편안한 휴식을 경험해보세요. 고객님의 취향과
            필요에 맞는 최적의 공간을 제공합니다.
          </p>
        </div>

        <RoomCarousel rooms={rooms} />

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/rooms">
              모든 객실 보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
