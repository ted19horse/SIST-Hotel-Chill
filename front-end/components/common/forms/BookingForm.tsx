'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Calendar } from '@/components/common/ui/Calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { Checkbox } from '@/components/common/ui/Checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/ui/Form';
import { Input } from '@/components/common/ui/Input';
import { Separator } from '@/components/common/ui/Separator';
import { Textarea } from '@/components/common/ui/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface AmenityGroup {
  name: string;
  items: string[];
}

interface RoomType {
  name: string;
  grade: number;
  size: number;
  view: string;
  maxAdults: number;
  maxChildren: number;
  weekdayPrice: number;
  weekendPrice: number;
  peakSeasonPrice: number;
  amenityGroups: AmenityGroup[];
}

interface BookingFormProps {
  selectedRoom?: RoomType;
}

// 예약 폼 스키마 정의
const bookingFormSchema = z.object({
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z
    .number()
    .min(1, '최소 1명의 성인이 필요합니다')
    .max(4, '최대 4명의 성인까지 가능합니다'),
  children: z.number().min(0).max(4, '최대 4명의 아동까지 가능합니다'),
  specialRequests: z.string().optional(),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: '이용약관에 동의해주세요',
  }),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: '개인정보 처리방침에 동의해주세요',
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingForm({ selectedRoom }: BookingFormProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [priceDetails, setPriceDetails] = useState<{
    weekday: number;
    weekend: number;
    peak: number;
    total: number;
  }>({ weekday: 0, weekend: 0, peak: 0, total: 0 });

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      adults: selectedRoom?.maxAdults ? Math.min(2, selectedRoom.maxAdults) : 2,
      children: 0,
      specialRequests: '',
      termsAgreed: false,
      privacyAgreed: false,
    },
  });

  // 성수기 체크 함수
  const isPeakSeason = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 7-8월 여름 휴가 시즌
    if (month === 7 || month === 8) return true;

    // 12월 20일-1월 5일 연말연시
    if ((month === 12 && day >= 20) || (month === 1 && day <= 5)) return true;

    // TODO: 주요 연휴 기간 체크 로직 추가 필요

    return false;
  };

  // 주말 체크 함수
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 5 || day === 6; // 금,토
  };

  // 예약 가격 계산 함수
  const calculateDetailedPrice = (checkIn: Date, checkOut: Date) => {
    if (!selectedRoom) return { weekday: 0, weekend: 0, peak: 0, total: 0 };

    let weekdayCount = 0;
    let weekendCount = 0;
    let peakCount = 0;
    const currentDate = new Date(checkIn);

    while (currentDate < checkOut) {
      if (isPeakSeason(currentDate)) {
        peakCount++;
      } else if (isWeekend(currentDate)) {
        weekendCount++;
      } else {
        weekdayCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const weekdayAmount = weekdayCount * selectedRoom.weekdayPrice;
    const weekendAmount = weekendCount * selectedRoom.weekendPrice;
    const peakAmount = peakCount * selectedRoom.peakSeasonPrice;
    const total = weekdayAmount + weekendAmount + peakAmount;

    return {
      weekday: weekdayAmount,
      weekend: weekendAmount,
      peak: peakAmount,
      total: total,
    };
  };

  const onDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      const prices = calculateDetailedPrice(newDate.from, newDate.to);
      setPriceDetails(prices);
    }
  };

  const onSubmit = (data: BookingFormValues) => {
    if (!date?.from || !date?.to || !selectedRoom) return;

    console.log({
      reservationData: {
        room: {
          name: selectedRoom.name,
          grade: selectedRoom.grade,
          size: selectedRoom.size,
          view: selectedRoom.view,
        },
        checkIn: date.from.toISOString().split('T')[0],
        checkOut: date.to.toISOString().split('T')[0],
        guests: {
          adults: data.adults,
          children: data.children,
        },
        priceDetails: {
          weekdayNights: priceDetails.weekday,
          weekendNights: priceDetails.weekend,
          peakSeasonNights: priceDetails.peak,
          totalAmount: priceDetails.total,
        },
        specialRequests: data.specialRequests || '없음',
        status: 'PENDING',
      },
    });
  };

  if (!selectedRoom) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>객실 선택 필요</CardTitle>
        </CardHeader>
        <CardContent>
          <p>예약할 객실을 먼저 선택해주세요.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 객실 정보 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>객실 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{selectedRoom.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRoom.size}㎡ · {selectedRoom.view}
                </p>
                <p className="text-sm text-muted-foreground">
                  최대 성인 {selectedRoom.maxAdults}인, 아동 {selectedRoom.maxChildren}인
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">기본 요금</p>
                <p className="text-sm">
                  평일 ₩{selectedRoom.weekdayPrice?.toLocaleString() ?? '0'}
                </p>
                <p className="text-sm">
                  주말 ₩{selectedRoom.weekendPrice?.toLocaleString() ?? '0'}
                </p>
                <p className="text-sm">
                  성수기 ₩{selectedRoom.peakSeasonPrice?.toLocaleString() ?? '0'}
                </p>
              </div>
            </div>

            {/* 어메니티 정보 */}
            <div>
              <h4 className="font-semibold mb-2">제공 어메니티</h4>
              <div className="space-y-2">
                {selectedRoom.amenityGroups?.length ? (
                  selectedRoom.amenityGroups.map((group) => (
                    <div key={group.name}>
                      <h5 className="text-sm font-medium">{group.name}</h5>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {group.items?.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">어메니티 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 날짜 선택 */}
        <Card>
          <CardHeader>
            <CardTitle>숙박 일정</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="dates"
              render={() => (
                <FormItem className="flex flex-col">
                  <Calendar
                    mode="range"
                    selected={date}
                    onSelect={onDateSelect}
                    locale={ko}
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                    className="rounded-md border"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* 투숙객 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>투숙객</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>성인 (만 13세 이상)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={selectedRoom.maxAdults}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아동 (만 12세 이하)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={selectedRoom.maxChildren}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* 요금 정보 */}
        {date?.from && date?.to && (
          <Card>
            <CardHeader>
              <CardTitle>요금 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {priceDetails.weekday > 0 && (
                <div className="flex justify-between">
                  <span>평일 숙박</span>
                  <span>₩{priceDetails.weekday.toLocaleString()}</span>
                </div>
              )}
              {priceDetails.weekend > 0 && (
                <div className="flex justify-between">
                  <span>주말 숙박</span>
                  <span>₩{priceDetails.weekend.toLocaleString()}</span>
                </div>
              )}
              {priceDetails.peak > 0 && (
                <div className="flex justify-between">
                  <span>성수기 숙박</span>
                  <span>₩{priceDetails.peak.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>총 요금</span>
                <span>₩{priceDetails.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 특별 요청사항 */}
        <Card>
          <CardHeader>
            <CardTitle>추가 요청사항</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="특별한 요청사항이 있으시다면 알려주세요"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* 이용약관 동의 */}
        <Card>
          <CardHeader>
            <CardTitle>이용약관 동의</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="termsAgreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>이용약관 동의 (필수)</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      <a href="#" className="text-primary hover:underline">
                        이용약관
                      </a>
                      을 읽고 동의합니다.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyAgreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>개인정보 처리방침 동의 (필수)</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      <a href="#" className="text-primary hover:underline">
                        개인정보 처리방침
                      </a>
                      을 읽고 동의합니다.
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          예약하기
        </Button>
      </form>
    </Form>
  );
}
