'use client';

import { Button } from '@/components/common/ui/Button';
import { DiningEvent } from '@/lib/data/dining/types/event';
import { Restaurant } from '@/lib/data/dining/types/restaurant';
import { useDiningStore } from '@/lib/stores/diningStore';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import RestaurantCard from './RestaurantCard';

// Restaurant data types
interface MenuItem {
  name: string;
  description: string;
  price?: number | string;
  perPerson?: boolean;
}

interface MenuCategory {
  name: string;
  hours?: string;
  description?: string;
  price?: number;
  items: MenuItem[];
}

interface BeveragePairing {
  name: string;
  description: string;
  price: number;
}

// Restaurant data
const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Chill Bites',
    concept: 'All-day dining featuring healthy, local ingredients',
    location: '1st floor central, garden view',
    hours: '06:30-22:30',
    capacity: {
      total: 120,
      details: '20 four-person tables, 20 two-person tables',
    },
    menuCategories: [
      {
        name: 'Morning Chill Breakfast',
        hours: '06:30-10:30',
        items: [
          {
            name: 'Chillean Brunch Plate',
            description:
              'Free-range eggs, avocado, whole grain toast, roasted vegetables, and fresh fruit',
            price: 28,
          },
          {
            name: 'Zen Oatmeal Bowl',
            description: 'Steel-cut oats with almond milk, fresh berries, honey, and toasted nuts',
            price: 18,
          },
          {
            name: 'Vitality Smoothie Bowl',
            description:
              'Açaí, banana, and mixed berries topped with granola, coconut flakes, and chia seeds',
            price: 22,
          },
        ],
      },
      {
        name: 'Afternoon Vibe Lunch',
        hours: '11:30-15:00',
        items: [
          {
            name: 'Slow Life Salad',
            description:
              'Mixed greens, quinoa, roasted vegetables, avocado, and lemon-herb vinaigrette',
            price: 24,
          },
          {
            name: 'Mindful Burger',
            description:
              'Grass-fed beef or plant-based patty with artisanal cheese, caramelized onions, and truffle aioli',
            price: 32,
          },
          {
            name: 'Healing Vegan Plate',
            description:
              'Seasonal vegetables, ancient grains, plant protein, and house-made sauces',
            price: 26,
          },
        ],
      },
      {
        name: 'Evening Zen Dinner',
        hours: '17:30-22:30',
        items: [
          {
            name: 'Relax Prime Steak',
            description:
              'Grass-fed beef with herb butter, roasted potatoes, and seasonal vegetables',
            price: 48,
          },
          {
            name: 'Ocean Harmony',
            description:
              'Sustainable catch of the day with citrus beurre blanc, wild rice, and asparagus',
            price: 42,
          },
          {
            name: 'Forest Meditation Risotto',
            description: 'Arborio rice with wild mushrooms, truffle oil, and aged parmesan',
            price: 36,
          },
        ],
      },
    ],
    featuredDishes: [
      'Chillean Brunch Plate',
      'Slow Life Salad',
      'Relax Prime Steak',
      'Healing Vegan Plate',
    ],
    policy: [
      'Open to all hotel guests',
      'Reservations recommended for groups of 6+',
      'Dress code: Smart casual',
    ],
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'casual'],
  },
  {
    id: 2,
    name: 'Chill Garden',
    concept: 'Casual dining with garden view and outdoor terrace',
    location: 'Garden level, indoor and outdoor terrace seating',
    hours: '11:30-22:00',
    capacity: {
      total: 80,
      details: '50 indoor, 30 terrace',
    },
    menuCategories: [
      {
        name: 'Garden Inspiration Salads',
        items: [
          {
            name: 'Drift Away Salad',
            description:
              'Mixed greens, seasonal fruits, goat cheese, candied nuts, and honey-citrus dressing',
            price: 22,
          },
          {
            name: 'Zen Garden Bowl',
            description:
              'Kale, spinach, roasted vegetables, avocado, seeds, and miso-tahini dressing',
            price: 24,
          },
        ],
      },
      {
        name: 'Pasta & Risotto',
        items: [
          {
            name: 'Lake View Seafood Linguine',
            description: 'Fresh pasta with shrimp, scallops, clams, and white wine sauce',
            price: 34,
          },
          {
            name: 'Forest Mushroom Risotto',
            description: 'Creamy arborio rice with wild mushrooms, truffle oil, and parmesan',
            price: 30,
          },
        ],
      },
      {
        name: 'Grill Specials',
        items: [
          {
            name: 'No Rush Steak',
            description:
              'Slow-cooked ribeye with herb butter, roasted potatoes, and seasonal vegetables',
            price: 46,
          },
          {
            name: 'Sunset Salmon',
            description: 'Grilled salmon with citrus glaze, quinoa, and asparagus',
            price: 38,
          },
        ],
      },
      {
        name: 'Desserts',
        items: [
          {
            name: 'Cloud Nine Pancake',
            description:
              'Fluffy soufflé pancake with seasonal berries, vanilla cream, and maple syrup',
            price: 18,
          },
          {
            name: 'Zen Garden Tiramisu',
            description: 'Coffee-soaked ladyfingers, mascarpone cream, and matcha dust',
            price: 16,
          },
        ],
      },
    ],
    featuredDishes: [
      'Drift Away Salad',
      'Lake View Seafood Linguine',
      'No Rush Steak',
      'Cloud Nine Pancake',
    ],
    policy: [
      'Open to all hotel guests',
      'Terrace seating subject to weather conditions',
      'Reservations recommended on weekends and holidays',
      'Dress code: Casual',
    ],
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
    ],
    tags: ['lunch', 'dinner', 'specialty'],
  },
  {
    id: 3,
    name: 'Chill Elegance',
    concept: 'Upscale modern Korean and fusion cuisine',
    location: 'Top floor, panoramic view',
    hours: '18:00-22:00 (reservation required)',
    capacity: {
      total: 40,
      details: 'Exclusive to suite guests',
    },
    menuCategories: [
      {
        name: 'Serene Journey',
        description: '5-course menu',
        price: 120,
        items: [
          {
            name: 'Amuse-bouche',
            description: "Chef's seasonal creation",
          },
          {
            name: 'First Course',
            description: 'Jeju abalone with citrus and seaweed',
          },
          {
            name: 'Second Course',
            description: 'Seasonal mushroom soup with truffle foam',
          },
          {
            name: 'Main Course',
            description: 'Choice of Hanwoo beef tenderloin or fresh catch of the day',
          },
          {
            name: 'Dessert',
            description: 'Seasonal fruit composition with house-made sorbet',
          },
        ],
      },
      {
        name: 'Ultimate Chill',
        description: '7-course menu',
        price: 180,
        items: [
          {
            name: 'Amuse-bouche',
            description: "Chef's seasonal creation",
          },
          {
            name: 'First Course',
            description: 'Caviar with traditional garnishes',
          },
          {
            name: 'Second Course',
            description: 'Foie gras with seasonal fruit compote',
          },
          {
            name: 'Third Course',
            description: 'Seafood medley with Korean-inspired sauce',
          },
          {
            name: 'Palate Cleanser',
            description: 'Yuzu sorbet',
          },
          {
            name: 'Main Course',
            description: 'Dry-aged Hanwoo beef or premium seafood selection',
          },
          {
            name: 'Dessert',
            description: "Chef's signature dessert creation",
          },
        ],
      },
    ],
    beveragePairings: [
      {
        name: 'Premium Wine Pairing',
        description: 'Selection of international wines paired with each course',
        price: 80,
      },
      {
        name: 'Korean Traditional Liquor Pairing',
        description: 'Curated selection of premium Korean traditional alcohols',
        price: 60,
      },
      {
        name: 'Non-Alcoholic Pairing',
        description: 'Artisanal juices and infusions paired with each course',
        price: 40,
      },
    ],
    featuredDishes: ['Serene Journey 5-course menu', 'Ultimate Chill 7-course menu'],
    policy: [
      'Suite guests only (Chill Family Suite, Chill Lake Suite, Ultimate Chill Suite)',
      'Reservations required at least 1 day in advance',
      'Smart casual dress code',
      'Children above 12 years welcome',
    ],
    restrictions: 'Chill Family Suite, Chill Lake Suite, Ultimate Chill Suite guests only',
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
    ],
    tags: ['dinner', 'premium'],
  },
  {
    id: 4,
    name: 'Chill Moments',
    concept: 'Space for tea time, light meals, and cocktails',
    location: 'Adjacent to lobby, garden view',
    hours: '10:00-24:00',
    capacity: {
      total: 60,
      details: '10 bar seats, 50 lounge seats',
    },
    menuCategories: [
      {
        name: 'Afternoon Tea Sets',
        hours: '14:00-17:00',
        items: [
          {
            name: 'Dreamy Afternoon',
            description:
              'Selection of finger sandwiches, scones with clotted cream and jam, and petit fours with premium tea selection',
            price: 45,
            perPerson: true,
          },
          {
            name: 'Chill Moments',
            description:
              'Luxury tea set with premium savory bites, artisanal pastries, and champagne',
            price: 65,
            perPerson: true,
          },
        ],
      },
      {
        name: 'Finger Foods',
        items: [
          {
            name: 'Artisanal Cheese Plate',
            description: 'Selection of international and local cheeses with accompaniments',
            price: 32,
          },
          {
            name: 'Chill Tapas Selection',
            description: 'Assortment of small bites perfect for sharing',
            price: 38,
          },
        ],
      },
      {
        name: 'Signature Drinks',
        items: [
          {
            name: 'Wellness Elixirs',
            description: 'Non-alcoholic health-focused beverages with superfoods and herbs',
            price: 16,
          },
          {
            name: 'Signature Cocktails',
            description: 'Handcrafted cocktails using premium spirits and fresh ingredients',
            price: 22,
          },
          {
            name: 'Wine & Champagne',
            description: 'Curated selection by the glass or bottle',
            price: '18+',
          },
        ],
      },
    ],
    featuredDishes: ['Dreamy Afternoon tea set', 'Chill Moments tea set', 'Signature cocktails'],
    policy: [
      'Open to hotel guests and outside visitors',
      'Afternoon tea reservations recommended',
      'Live music performances Friday and Saturday evenings 7-10pm',
      'Dress code: Smart casual',
    ],
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'specialty'],
  },
];

// 컴포넌트 인터페이스 정의
interface RestaurantGridProps {
  restaurants: Restaurant[];
  events: DiningEvent[];
}

export default function RestaurantGrid({ restaurants, events }: RestaurantGridProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'restaurants' | 'events'>('restaurants');

  // Zustand 스토어 사용
  const { filters, filteredRestaurants, filteredEvents, applyFilters } = useDiningStore();

  // 필터 변경 시 필터링 적용
  useEffect(() => {
    applyFilters(restaurants, events);
  }, [
    filters.mealTime,
    filters.diningStyle,
    filters.searchQuery,
    restaurants,
    events,
    applyFilters,
  ]);

  // 표시할 레스토랑과 이벤트 목록
  const displayRestaurants = filters.isFiltering ? filteredRestaurants : restaurants;
  const displayEvents = filters.isFiltering ? filteredEvents : events.filter((e) => e.isActive);

  // 선택된 레스토랑 정보 찾기
  const selectedRestaurantData = selectedRestaurant
    ? displayRestaurants.find((r) => r.id === selectedRestaurant)
    : null;

  // 선택된 레스토랑의 이벤트 찾기
  const restaurantEvents = selectedRestaurant
    ? displayEvents.filter((event) => event.restaurantId === selectedRestaurant)
    : [];

  // 검색 결과가 없는 경우 메시지 표시
  if (filters.isFiltering && displayRestaurants.length === 0) {
    return (
      <div className="mt-12 text-center py-16 bg-neutral-50 rounded-xl">
        <Search className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="text-xl font-bold mb-2">검색 결과가 없습니다</h3>
        <p className="text-neutral-600 mb-6">다른 검색어나 필터를 사용해 보세요.</p>
        <Button onClick={() => useDiningStore.getState().resetFilters()}>필터 초기화</Button>
      </div>
    );
  }

  const hasSearchQuery = filters.searchQuery.trim().length > 0;
  const hasNoResults =
    (activeTab === 'restaurants' && filteredRestaurants.length === 0) ||
    (activeTab === 'events' && filteredEvents.length === 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="mt-12">
      {/* 탭 버튼 */}
      <div className="flex border-b border-neutral-200 mb-8 pb-1">
        <button
          className={`px-4 py-2 font-medium text-lg transition-colors relative ${
            activeTab === 'restaurants' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-800'
          }`}
          onClick={() => setActiveTab('restaurants')}
        >
          레스토랑
          {activeTab === 'restaurants' && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
              layoutId="tabIndicator"
            />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium text-lg transition-colors relative ${
            activeTab === 'events' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-800'
          }`}
          onClick={() => setActiveTab('events')}
        >
          이벤트 & 프로모션
          {activeTab === 'events' && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
              layoutId="tabIndicator"
            />
          )}
        </button>
      </div>

      {/* 결과 요약 */}
      {hasSearchQuery && (
        <div className="mb-6">
          <p className="text-neutral-600">
            <span className="font-medium text-primary">&quot;{filters.searchQuery}&quot;</span>에
            대한
            {activeTab === 'restaurants'
              ? ` 레스토랑 ${filteredRestaurants.length}개`
              : ` 이벤트 ${filteredEvents.length}개`}
            를 찾았습니다.
          </p>
        </div>
      )}

      {/* 결과 없음 */}
      {hasNoResults && (
        <div className="py-16 text-center">
          <h3 className="text-xl font-medium mb-2">검색 결과가 없습니다</h3>
          <p className="text-neutral-500 mb-6">다른 키워드로 검색하거나 필터를 재설정해 보세요.</p>
          <button
            onClick={() => useDiningStore.getState().resetFilters()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            필터 초기화
          </button>
        </div>
      )}

      {/* 레스토랑 그리드 */}
      {activeTab === 'restaurants' && filteredRestaurants.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRestaurants.map((restaurant) => (
            <Link href={`/dining/${restaurant.id}`} key={restaurant.id} className="block">
              <RestaurantCard restaurant={restaurant} searchTerm={filters.searchQuery} />
            </Link>
          ))}
        </motion.div>
      )}

      {/* 이벤트 그리드 */}
      {activeTab === 'events' && filteredEvents.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} searchTerm={filters.searchQuery} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
