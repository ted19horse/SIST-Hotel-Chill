export type MenuCategory =
  | 'BREAKFAST'
  | 'LUNCH'
  | 'DINNER'
  | 'DESSERT'
  | 'SALAD'
  | 'PASTA'
  | 'GRILL'
  | 'COURSE'
  | 'BEVERAGE'
  | 'AFTERNOON_TEA'
  | 'BAR'
  | 'FINGER_FOOD'
  | 'SIGNATURE_DRINK';

export type AllergenType =
  | 'EGGS'
  | 'MILK'
  | 'FISH'
  | 'SHELLFISH'
  | 'NUTS'
  | 'GLUTEN'
  | 'SOY'
  | 'WHEAT'
  | 'CRUSTACEAN'
  | 'MOLLUSCS'
  | 'MUSTARD'
  | 'SESAME'
  | 'CELERY'
  | 'PEANUTS'
  | 'SULPHITES'
  | 'ALCOHOL';

export type DietaryOptionType =
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'GLUTEN_FREE'
  | 'DAIRY_FREE'
  | 'HALAL'
  | 'KOSHER'
  | 'NUT_FREE'
  | 'LOW_CALORIE'
  | 'KETO'
  | 'ORGANIC';

export type MenuBadgeType =
  | 'SIGNATURE'
  | 'CHEF_RECOMMENDATION'
  | 'SEASONAL'
  | 'NEW'
  | 'SPICY'
  | 'BESTSELLER'
  | 'LOCAL_INGREDIENT'
  | 'ORGANIC'
  | 'PREMIUM';

export interface TimeRange {
  start: string;
  end: string;
  days?: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
}

export interface MenuPricing {
  regular: number;
  discounted?: number;
  memberPrice?: number;
  perPerson?: boolean;
  currency?: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  sodium?: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number | MenuPricing;
  category: MenuCategory;
  dietaryOptions?: DietaryOptionType[];
  badges?: MenuBadgeType[];
  allergens?: AllergenType[];
  imageUrl?: string;
  imageAlt?: string;
  thumbUrl?: string;
  availableTime?: TimeRange;
  servingSize?: string;
  servingTemperature?: 'HOT' | 'COLD' | 'ROOM_TEMPERATURE';
  spicyLevel?: 1 | 2 | 3;
  preparationTime?: number; // in minutes
  nutritionalInfo?: NutritionalInfo;
  relatedItems?: string[]; // IDs of related menu items
  pairingRecommendations?: string[]; // IDs of recommended pairings
  orderLimit?: number; // Maximum number of this item that can be ordered
  isAvailable?: boolean;
  isSeasonal?: boolean;
  seasonPeriod?: string; // e.g., "Summer", "Winter"
}

export interface PairingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'WINE' | 'TRADITIONAL' | 'NON_ALCOHOLIC' | 'COCKTAIL' | 'TEA' | 'COFFEE';
  glassSize?: string;
  origin?: string;
  alcoholPercentage?: number;
  imageUrl?: string;
}

export interface CourseMenu {
  id: string;
  restaurantId: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  servingTime?: number; // in minutes for the full course
  minimumParty?: number;
  maximumParty?: number;
  requiresReservation?: boolean;
  availableTime?: TimeRange;
  badges?: MenuBadgeType[];
  imageUrl?: string;
  courses: {
    name: string;
    description?: string;
    items: MenuItem[];
  }[];
  pairings?: PairingOption[];
  isAvailable?: boolean;
  isSeasonal?: boolean;
  seasonPeriod?: string;
}
