'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/Accordion';
import { Button } from '@/components/common/ui/Button';
import { Checkbox } from '@/components/common/ui/Checkbox';
import { Label } from '@/components/common/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/RadioGroup';
import {
  cuisineOptions,
  dietaryRestrictionOptions,
  featureOptions,
  mealTimeOptions,
  priceRangeOptions,
} from '@/lib/data/restaurants';
import { RestaurantFilterOptions } from '@/lib/types/restaurant';
import { useEffect, useState } from 'react';

interface RestaurantFilterProps {
  onChange: (filters: RestaurantFilterOptions) => void;
  initialFilters?: RestaurantFilterOptions;
}

/**
 * 레스토랑 필터 컴포넌트
 * 다양한 필터 옵션을 제공하여 레스토랑 목록을 필터링합니다.
 */
const RestaurantFilter = ({ onChange, initialFilters = {} }: RestaurantFilterProps) => {
  const [filters, setFilters] = useState<RestaurantFilterOptions>(initialFilters);

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const handleCuisineChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const cuisines = prev.cuisine || [];
      if (checked) {
        return { ...prev, cuisine: [...cuisines, value] };
      } else {
        return { ...prev, cuisine: cuisines.filter((c) => c !== value) };
      }
    });
  };

  const handlePriceRangeChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const priceRanges = prev.priceRange || [];
      if (checked) {
        return { ...prev, priceRange: [...priceRanges, value as any] };
      } else {
        return { ...prev, priceRange: priceRanges.filter((p) => p !== value) };
      }
    });
  };

  const handleFeatureChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const features = prev.features || [];
      if (checked) {
        return { ...prev, features: [...features, value] };
      } else {
        return { ...prev, features: features.filter((f) => f !== value) };
      }
    });
  };

  const handleMealTimeChange = (value: string) => {
    setFilters((prev) => {
      if (prev.mealTime === value) {
        return { ...prev, mealTime: undefined };
      }
      return { ...prev, mealTime: value };
    });
  };

  const handleDietaryChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const restrictions = prev.dietaryRestrictions || [];
      if (checked) {
        return { ...prev, dietaryRestrictions: [...restrictions, value as any] };
      } else {
        return { ...prev, dietaryRestrictions: restrictions.filter((r) => r !== value) };
      }
    });
  };

  const resetFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some((filter) =>
    Array.isArray(filter) ? filter.length > 0 : filter !== undefined
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">필터</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
            초기화
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={['cuisine', 'price', 'features', 'meal-time']}
        className="space-y-2"
      >
        <AccordionItem value="cuisine">
          <AccordionTrigger className="text-sm font-medium py-2">요리 종류</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {cuisineOptions.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine}`}
                    checked={filters.cuisine?.includes(cuisine) || false}
                    onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                  />
                  <Label
                    htmlFor={`cuisine-${cuisine}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium py-2">가격대</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {priceRangeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${option.value}`}
                    checked={filters.priceRange?.includes(option.value as any) || false}
                    onCheckedChange={(checked) =>
                      handlePriceRangeChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`price-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="text-sm font-medium py-2">특징</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {featureOptions.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={filters.features?.includes(feature) || false}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  />
                  <Label
                    htmlFor={`feature-${feature}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="meal-time">
          <AccordionTrigger className="text-sm font-medium py-2">식사 시간</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={filters.mealTime} className="space-y-2 pt-1">
              {mealTimeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`meal-${option.value}`}
                    onClick={() => handleMealTimeChange(option.value)}
                  />
                  <Label
                    htmlFor={`meal-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dietary">
          <AccordionTrigger className="text-sm font-medium py-2">식이 제한</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {dietaryRestrictionOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`diet-${option.value}`}
                    checked={filters.dietaryRestrictions?.includes(option.value as any) || false}
                    onCheckedChange={(checked) =>
                      handleDietaryChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`diet-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RestaurantFilter;
