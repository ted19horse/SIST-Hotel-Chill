'use client'; // 이 지시문은 Next.js에서 이 컴포넌트가 클라이언트 측에서 실행됨을 나타냅니다

import { Calendar } from '@/components/common/ui/Calendar'; // 날짜 선택을 위한 캘린더 컴포넌트
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/ui/Popover'; // 팝오버 UI 컴포넌트
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/Select'; // 드롭다운 선택 UI 컴포넌트
import { addDays, format } from 'date-fns'; // 날짜 조작 및 포맷팅 유틸리티
import { ko } from 'date-fns/locale'; // 한국어 로케일 설정
import { Calendar as CalendarIcon, ChevronRight, Users } from 'lucide-react'; // 아이콘 컴포넌트
import { useState } from 'react'; // React 훅

/**
 * ReservationPanel 컴포넌트
 * 
 * 메인 페이지 하단에 표시되는 객실 예약 패널을 구현합니다.
 * 체크인/체크아웃 날짜 선택, 인원 수 선택, 객실 검색 기능을 제공합니다.
 * 반응형으로 설계되어 모바일과 데스크톱 환경에서 모두 최적화된 UI를 제공합니다.
 */
export default function ReservationPanel() {
  // 체크인 날짜 상태 (기본값: 오늘)
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  // 체크아웃 날짜 상태 (기본값: 내일)
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 1));
  // 성인 인원 수 상태 (기본값: 2명)
  const [adults, setAdults] = useState('2');
  // 어린이 인원 수 상태 (기본값: 0명)
  const [children, setChildren] = useState('0');
  // 캘린더 팝오버 열림/닫힘 상태
  const [calendarOpen, setCalendarOpen] = useState(false);

  /**
   * 체크인 날짜 선택 처리 함수
   * 체크인 날짜가 체크아웃 날짜보다 늦으면 체크아웃 날짜를 자동으로 조정합니다.
   * 
   * @param date 선택된 체크인 날짜
   */
  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    // 체크아웃 날짜가 새 체크인 날짜보다 이전이면 체크아웃 날짜를 조정
    if (checkOut && date && checkOut < date) {
      setCheckOut(addDays(date, 1)); // 체크인 날짜 다음 날로 설정
    }
  };

  /**
   * 체크아웃 날짜 선택 처리 함수
   * 체크아웃 날짜를 설정하고 캘린더 팝오버를 닫습니다.
   * 
   * @param date 선택된 체크아웃 날짜
   */
  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date);
    setCalendarOpen(false); // 날짜 선택 완료 후 캘린더 닫기
  };

  return (
    <div className="bg-white shadow-lg rounded-t-lg md:rounded-lg mx-4 md:mx-auto md:max-w-5xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* 체크인/체크아웃 날짜 선택 영역 (모바일에서는 전체 너비, 데스크톱에서는 2/4 너비) */}
        <div className="col-span-2 border-b md:border-b-0 md:border-r border-neutral-200">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              {/* 날짜 선택 버튼 */}
              <button className="w-full flex items-center p-6 text-left hover:bg-neutral-50 transition-colors">
                <CalendarIcon className="h-5 w-5 text-primary mr-3" />
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    {/* 체크인 날짜 표시 */}
                    <div>
                      <p className="text-sm font-medium text-neutral-500">체크인</p>
                      <p className="text-lg font-semibold">
                        {checkIn
                          ? format(checkIn, 'yyyy.MM.dd (eee)', {
                              locale: ko, // 한국어 날짜 형식 (예: 2025.04.10 (목))
                            })
                          : '날짜 선택'}
                      </p>
                    </div>
                    {/* 체크아웃 날짜 표시 */}
                    <div>
                      <p className="text-sm font-medium text-neutral-500">체크아웃</p>
                      <p className="text-lg font-semibold">
                        {checkOut
                          ? format(checkOut, 'yyyy.MM.dd (eee)', {
                              locale: ko,
                            })
                          : '날짜 선택'}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </PopoverTrigger>
            {/* 날짜 선택 캘린더 팝오버 */}
            <PopoverContent className="w-auto p-0 bg-white" align="start" sideOffset={0}>
              <div className="flex flex-col sm:flex-row">
                {/* 체크인 캘린더 */}
                <div className="border-r border-neutral-200">
                  <div className="p-3 border-b border-neutral-200">
                    <h3 className="font-semibold">체크인</h3>
                  </div>
                  <Calendar
                    mode="single" // 단일 날짜 선택 모드
                    selected={checkIn}
                    onSelect={handleCheckInSelect}
                    disabled={(date) => date < new Date()} // 오늘 이전 날짜는 선택 불가
                    initialFocus
                  />
                </div>
                {/* 체크아웃 캘린더 */}
                <div>
                  <div className="p-3 border-b border-neutral-200">
                    <h3 className="font-semibold">체크아웃</h3>
                  </div>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={handleCheckOutSelect}
                    disabled={(date) =>
                      // 체크인 날짜 다음 날부터 선택 가능 (최소 1박)
                      date < (checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1))
                    }
                    initialFocus
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 인원 수 선택 영역 (모바일에서는 전체 너비, 데스크톱에서는 1/4 너비) */}
        <div className="border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="p-6 hover:bg-neutral-50 transition-colors">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-500">인원</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {/* 성인 인원 수 선택 드롭다운 */}
                  <div>
                    <Select value={adults} onValueChange={setAdults}>
                      <SelectTrigger
                        className="border-0 p-0 h-auto shadow-none focus:ring-0"
                        aria-label="성인 수"
                      >
                        <SelectValue placeholder="성인 2명" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* 1명부터 10명까지 선택 가능 */}
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i} value={String(i + 1)}>
                            성인 {i + 1}명
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* 어린이 인원 수 선택 드롭다운 */}
                  <div>
                    <Select value={children} onValueChange={setChildren}>
                      <SelectTrigger
                        className="border-0 p-0 h-auto shadow-none focus:ring-0"
                        aria-label="어린이 수"
                      >
                        <SelectValue placeholder="어린이 0명" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* 0명부터 5명까지 선택 가능 */}
                        {[...Array(6)].map((_, i) => (
                          <SelectItem key={i} value={String(i)}>
                            어린이 {i}명
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 객실 검색 버튼 영역 (모바일에서는 전체 너비, 데스크톱에서는 1/4 너비) */}
        <div className="bg-primary text-primary-foreground">
          <button className="w-full h-full flex items-center justify-center p-6 hover:bg-primary/90 transition-colors">
            <span className="font-medium mr-2">객실 검색</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
