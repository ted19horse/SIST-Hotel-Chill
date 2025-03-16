'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronRight, Clock, Info, MapPin, Maximize2, Users, Utensils } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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

interface Restaurant {
  id: number;
  name: string;
  concept: string;
  location: string;
  hours: string;
  capacity: {
    total: number;
    details: string;
  };
  menuCategories: MenuCategory[];
  beveragePairings?: BeveragePairing[];
  featuredDishes: string[];
  policy: string[];
  restrictions?: string;
  images: string[];
  tags: string[];
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
      details: '20 four-person tables, 20 two-person tables'
    },
    menuCategories: [
      {
        name: 'Morning Chill Breakfast',
        hours: '06:30-10:30',
        items: [
          {
            name: 'Chillean Brunch Plate',
            description: 'Free-range eggs, avocado, whole grain toast, roasted vegetables, and fresh fruit',
            price: 28
          },
          {
            name: 'Zen Oatmeal Bowl',
            description: 'Steel-cut oats with almond milk, fresh berries, honey, and toasted nuts',
            price: 18
          },
          {
            name: 'Vitality Smoothie Bowl',
            description: 'Açaí, banana, and mixed berries topped with granola, coconut flakes, and chia seeds',
            price: 22
          }
        ]
      },
      {
        name: 'Afternoon Vibe Lunch',
        hours: '11:30-15:00',
        items: [
          {
            name: 'Slow Life Salad',
            description: 'Mixed greens, quinoa, roasted vegetables, avocado, and lemon-herb vinaigrette',
            price: 24
          },
          {
            name: 'Mindful Burger',
            description:
              'Grass-fed beef or plant-based patty with artisanal cheese, caramelized onions, and truffle aioli',
            price: 32
          },
          {
            name: 'Healing Vegan Plate',
            description: 'Seasonal vegetables, ancient grains, plant protein, and house-made sauces',
            price: 26
          }
        ]
      },
      {
        name: 'Evening Zen Dinner',
        hours: '17:30-22:30',
        items: [
          {
            name: 'Relax Prime Steak',
            description: 'Grass-fed beef with herb butter, roasted potatoes, and seasonal vegetables',
            price: 48
          },
          {
            name: 'Ocean Harmony',
            description: 'Sustainable catch of the day with citrus beurre blanc, wild rice, and asparagus',
            price: 42
          },
          {
            name: 'Forest Meditation Risotto',
            description: 'Arborio rice with wild mushrooms, truffle oil, and aged parmesan',
            price: 36
          }
        ]
      }
    ],
    featuredDishes: ['Chillean Brunch Plate', 'Slow Life Salad', 'Relax Prime Steak', 'Healing Vegan Plate'],
    policy: ['Open to all hotel guests', 'Reservations recommended for groups of 6+', 'Dress code: Smart casual'],
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800'
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'casual']
  },
  {
    id: 2,
    name: 'Chill Garden',
    concept: 'Casual dining with garden view and outdoor terrace',
    location: 'Garden level, indoor and outdoor terrace seating',
    hours: '11:30-22:00',
    capacity: {
      total: 80,
      details: '50 indoor, 30 terrace'
    },
    menuCategories: [
      {
        name: 'Garden Inspiration Salads',
        items: [
          {
            name: 'Drift Away Salad',
            description: 'Mixed greens, seasonal fruits, goat cheese, candied nuts, and honey-citrus dressing',
            price: 22
          },
          {
            name: 'Zen Garden Bowl',
            description: 'Kale, spinach, roasted vegetables, avocado, seeds, and miso-tahini dressing',
            price: 24
          }
        ]
      },
      {
        name: 'Pasta & Risotto',
        items: [
          {
            name: 'Lake View Seafood Linguine',
            description: 'Fresh pasta with shrimp, scallops, clams, and white wine sauce',
            price: 34
          },
          {
            name: 'Forest Mushroom Risotto',
            description: 'Creamy arborio rice with wild mushrooms, truffle oil, and parmesan',
            price: 30
          }
        ]
      },
      {
        name: 'Grill Specials',
        items: [
          {
            name: 'No Rush Steak',
            description: 'Slow-cooked ribeye with herb butter, roasted potatoes, and seasonal vegetables',
            price: 46
          },
          {
            name: 'Sunset Salmon',
            description: 'Grilled salmon with citrus glaze, quinoa, and asparagus',
            price: 38
          }
        ]
      },
      {
        name: 'Desserts',
        items: [
          {
            name: 'Cloud Nine Pancake',
            description: 'Fluffy soufflé pancake with seasonal berries, vanilla cream, and maple syrup',
            price: 18
          },
          {
            name: 'Zen Garden Tiramisu',
            description: 'Coffee-soaked ladyfingers, mascarpone cream, and matcha dust',
            price: 16
          }
        ]
      }
    ],
    featuredDishes: ['Drift Away Salad', 'Lake View Seafood Linguine', 'No Rush Steak', 'Cloud Nine Pancake'],
    policy: [
      'Open to all hotel guests',
      'Terrace seating subject to weather conditions',
      'Reservations recommended on weekends and holidays',
      'Dress code: Casual'
    ],
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800'
    ],
    tags: ['lunch', 'dinner', 'specialty']
  },
  {
    id: 3,
    name: 'Chill Elegance',
    concept: 'Upscale modern Korean and fusion cuisine',
    location: 'Top floor, panoramic view',
    hours: '18:00-22:00 (reservation required)',
    capacity: {
      total: 40,
      details: 'Exclusive to suite guests'
    },
    menuCategories: [
      {
        name: 'Serene Journey',
        description: '5-course menu',
        price: 120,
        items: [
          {
            name: 'Amuse-bouche',
            description: "Chef's seasonal creation"
          },
          {
            name: 'First Course',
            description: 'Jeju abalone with citrus and seaweed'
          },
          {
            name: 'Second Course',
            description: 'Seasonal mushroom soup with truffle foam'
          },
          {
            name: 'Main Course',
            description: 'Choice of Hanwoo beef tenderloin or fresh catch of the day'
          },
          {
            name: 'Dessert',
            description: 'Seasonal fruit composition with house-made sorbet'
          }
        ]
      },
      {
        name: 'Ultimate Chill',
        description: '7-course menu',
        price: 180,
        items: [
          {
            name: 'Amuse-bouche',
            description: "Chef's seasonal creation"
          },
          {
            name: 'First Course',
            description: 'Caviar with traditional garnishes'
          },
          {
            name: 'Second Course',
            description: 'Foie gras with seasonal fruit compote'
          },
          {
            name: 'Third Course',
            description: 'Seafood medley with Korean-inspired sauce'
          },
          {
            name: 'Palate Cleanser',
            description: 'Yuzu sorbet'
          },
          {
            name: 'Main Course',
            description: 'Dry-aged Hanwoo beef or premium seafood selection'
          },
          {
            name: 'Dessert',
            description: "Chef's signature dessert creation"
          }
        ]
      }
    ],
    beveragePairings: [
      {
        name: 'Premium Wine Pairing',
        description: 'Selection of international wines paired with each course',
        price: 80
      },
      {
        name: 'Korean Traditional Liquor Pairing',
        description: 'Curated selection of premium Korean traditional alcohols',
        price: 60
      },
      {
        name: 'Non-Alcoholic Pairing',
        description: 'Artisanal juices and infusions paired with each course',
        price: 40
      }
    ],
    featuredDishes: ['Serene Journey 5-course menu', 'Ultimate Chill 7-course menu'],
    policy: [
      'Suite guests only (Chill Family Suite, Chill Lake Suite, Ultimate Chill Suite)',
      'Reservations required at least 1 day in advance',
      'Smart casual dress code',
      'Children above 12 years welcome'
    ],
    restrictions: 'Chill Family Suite, Chill Lake Suite, Ultimate Chill Suite guests only',
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800'
    ],
    tags: ['dinner', 'premium']
  },
  {
    id: 4,
    name: 'Chill Moments',
    concept: 'Space for tea time, light meals, and cocktails',
    location: 'Adjacent to lobby, garden view',
    hours: '10:00-24:00',
    capacity: {
      total: 60,
      details: '10 bar seats, 50 lounge seats'
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
            perPerson: true
          },
          {
            name: 'Chill Moments',
            description: 'Luxury tea set with premium savory bites, artisanal pastries, and champagne',
            price: 65,
            perPerson: true
          }
        ]
      },
      {
        name: 'Finger Foods',
        items: [
          {
            name: 'Artisanal Cheese Plate',
            description: 'Selection of international and local cheeses with accompaniments',
            price: 32
          },
          {
            name: 'Chill Tapas Selection',
            description: 'Assortment of small bites perfect for sharing',
            price: 38
          }
        ]
      },
      {
        name: 'Signature Drinks',
        items: [
          {
            name: 'Wellness Elixirs',
            description: 'Non-alcoholic health-focused beverages with superfoods and herbs',
            price: 16
          },
          {
            name: 'Signature Cocktails',
            description: 'Handcrafted cocktails using premium spirits and fresh ingredients',
            price: 22
          },
          {
            name: 'Wine & Champagne',
            description: 'Curated selection by the glass or bottle',
            price: '18+'
          }
        ]
      }
    ],
    featuredDishes: ['Dreamy Afternoon tea set', 'Chill Moments tea set', 'Signature cocktails'],
    policy: [
      'Open to hotel guests and outside visitors',
      'Afternoon tea reservations recommended',
      'Live music performances Friday and Saturday evenings 7-10pm',
      'Dress code: Smart casual'
    ],
    images: [
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800',
      '/placeholder.svg?height=600&width=800'
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'specialty']
  }
];

export default function RestaurantGrid() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="space-y-12">
      {restaurants.map(restaurant => (
        <div
          key={restaurant.id}
          id={`restaurant-${restaurant.id}`}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/3 h-64 lg:h-auto">
              <Image
                src={restaurant.images[0] || '/placeholder.svg'}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
              {restaurant.restrictions && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">
                    <Info className="h-3 w-3 mr-1" />
                    Suite Guests Only
                  </Badge>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <Tabs defaultValue="image-0">
                      <div className="relative h-[50vh] mb-4">
                        {restaurant.images.map((image, index) => (
                          <TabsContent key={index} value={`image-${index}`} className="p-0 m-0">
                            <div className="relative h-[50vh]">
                              <Image
                                src={image || '/placeholder.svg'}
                                alt={`${restaurant.name} - Image ${index + 1}`}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          </TabsContent>
                        ))}
                      </div>
                      <TabsList className="grid grid-cols-3 gap-2">
                        {restaurant.images.map((image, index) => (
                          <TabsTrigger key={index} value={`image-${index}`} className="p-0 overflow-hidden h-20">
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
            <div className="p-6 lg:p-8 w-full lg:w-2/3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-neutral-600 mb-4">{restaurant.concept}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-start md:items-end">
                  <Badge variant="outline" className="mb-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {restaurant.hours}
                  </Badge>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>최대 {restaurant.capacity.total}명</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">위치</p>
                    <p className="text-neutral-600">{restaurant.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Utensils className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">대표 메뉴</p>
                    <p className="text-neutral-600">{restaurant.featuredDishes.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="overview">개요</TabsTrigger>
                    <TabsTrigger value="menu">메뉴</TabsTrigger>
                    <TabsTrigger value="policy">이용 안내</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="pt-2">
                    <p className="text-neutral-600 mb-4">
                      {restaurant.concept} {restaurant.location}에 위치한 {restaurant.name}은(는)
                      {restaurant.capacity.details}의 좌석을 갖추고 있으며, {restaurant.hours} 동안 운영됩니다.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {restaurant.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-neutral-100">
                          {tag === 'breakfast' && '아침'}
                          {tag === 'lunch' && '점심'}
                          {tag === 'dinner' && '저녁'}
                          {tag === 'casual' && '캐주얼'}
                          {tag === 'specialty' && '스페셜티'}
                          {tag === 'premium' && '프리미엄'}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="menu" className="pt-2">
                    <Accordion type="single" collapsible className="w-full">
                      {restaurant.menuCategories.map((category, index) => (
                        <AccordionItem key={index} value={`category-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div>
                              {category.name}
                              {category.hours && (
                                <span className="ml-2 text-sm font-normal text-neutral-500">{category.hours}</span>
                              )}
                              {(category.price !== undefined || category.description) && (
                                <span className="ml-2 text-sm font-normal text-neutral-500">
                                  {category.price !== undefined && `$${category.price}`}
                                  {category.description && ` - ${category.description}`}
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {category.items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">{item.name}</h4>
                                    {item.price !== undefined && (
                                      <span className="font-medium">
                                        ${typeof item.price === 'string' ? item.price : item.price.toFixed(0)}
                                        {item.perPerson && ' per person'}
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}

                      {restaurant.beveragePairings && (
                        <AccordionItem value="beverage-pairings">
                          <AccordionTrigger>음료 페어링</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {restaurant.beveragePairings.map((pairing, index) => (
                                <div key={index} className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">{pairing.name}</h4>
                                    <span className="font-medium">${pairing.price}</span>
                                  </div>
                                  <p className="text-sm text-neutral-600 mt-1">{pairing.description}</p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="policy" className="pt-2">
                    <ul className="space-y-2">
                      {restaurant.policy.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 text-primary mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {restaurant.restrictions && (
                      <div className="mt-4 p-4 bg-neutral-50 rounded-md">
                        <p className="text-sm font-medium flex items-center text-neutral-700">
                          <Info className="h-4 w-4 mr-2 text-primary" />
                          이용 제한 안내
                        </p>
                        <p className="text-sm text-neutral-600 mt-1">{restaurant.restrictions}</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-neutral-200">
                <div className="mb-4 sm:mb-0">
                  {activeTab === 'menu' && (
                    <Button variant="outline" size="sm" className="text-primary border-primary">
                      <Calendar className="h-4 w-4 mr-2" />
                      전체 메뉴 보기
                    </Button>
                  )}
                </div>
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  테이블 예약
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
