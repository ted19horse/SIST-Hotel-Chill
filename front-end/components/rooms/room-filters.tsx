"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Users, Search, Filter } from "lucide-react"
import { format, addDays } from "date-fns"
import { ko } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function RoomFilters() {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 1))
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [priceRange, setPriceRange] = useState([150, 800])
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date)
    // If check-out date is before new check-in date, adjust it
    if (checkOut && date && checkOut < date) {
      setCheckOut(addDays(date, 1))
    }
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date)
    setCalendarOpen(false)
  }

  return (
    <div className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Desktop Filters */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 divide-x divide-neutral-200">
            {/* Check-in / Check-out */}
            <div className="col-span-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center p-6 text-left hover:bg-neutral-50 transition-colors">
                    <CalendarIcon className="h-5 w-5 text-neutral-500 mr-3" />
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-neutral-500">체크인</p>
                          <p className="text-lg font-semibold">
                            {checkIn
                              ? format(checkIn, "yyyy.MM.dd (eee)", {
                                  locale: ko,
                                })
                              : "날짜 선택"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-500">체크아웃</p>
                          <p className="text-lg font-semibold">
                            {checkOut
                              ? format(checkOut, "yyyy.MM.dd (eee)", {
                                  locale: ko,
                                })
                              : "날짜 선택"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start" sideOffset={0}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="border-r border-neutral-200">
                      <div className="p-3 border-b border-neutral-200">
                        <h3 className="font-semibold">체크인</h3>
                      </div>
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={handleCheckInSelect}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </div>
                    <div>
                      <div className="p-3 border-b border-neutral-200">
                        <h3 className="font-semibold">체크아웃</h3>
                      </div>
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={handleCheckOutSelect}
                        disabled={(date) => date < (checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1))}
                        initialFocus
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="col-span-1">
              <div className="p-6 hover:bg-neutral-50 transition-colors h-full">
                <div className="flex items-center h-full">
                  <Users className="h-5 w-5 text-neutral-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-500">인원</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0" aria-label="성인 수">
                            <SelectValue placeholder="성인 2명" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={String(i + 1)}>
                                성인 {i + 1}명
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger
                            className="border-0 p-0 h-auto shadow-none focus:ring-0"
                            aria-label="어린이 수"
                          >
                            <SelectValue placeholder="어린이 0명" />
                          </SelectTrigger>
                          <SelectContent>
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

            {/* Room Type */}
            <div className="col-span-1">
              <div className="p-6 hover:bg-neutral-50 transition-colors h-full">
                <div className="flex flex-col h-full">
                  <p className="text-sm font-medium text-neutral-500 mb-2">객실 타입</p>
                  <Select>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="모든 객실" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 객실</SelectItem>
                      <SelectItem value="comfort">Chill Comfort Room</SelectItem>
                      <SelectItem value="harmony">Chill Harmony Room</SelectItem>
                      <SelectItem value="serenity">Chill Serenity Room</SelectItem>
                      <SelectItem value="family">Chill Family Suite</SelectItem>
                      <SelectItem value="lake">Chill Lake Suite</SelectItem>
                      <SelectItem value="ultimate">Ultimate Chill Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="col-span-1 bg-primary text-primary-foreground">
              <button className="w-full h-full flex items-center justify-center p-6 hover:bg-primary/90 transition-colors">
                <Search className="h-5 w-5 mr-2" />
                <span className="font-medium">객실 검색</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden">
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-semibold">객실 검색</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>

          {mobileFiltersOpen && (
            <div className="p-4 border-t border-neutral-200">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dates">
                  <AccordionTrigger>날짜</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">체크인</p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              {checkIn ? format(checkIn, "yyyy.MM.dd (eee)", { locale: ko }) : "날짜 선택"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkIn}
                              onSelect={handleCheckInSelect}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">체크아웃</p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              {checkOut ? format(checkOut, "yyyy.MM.dd (eee)", { locale: ko }) : "날짜 선택"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkOut}
                              onSelect={handleCheckOutSelect}
                              disabled={(date) => date < (checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="guests">
                  <AccordionTrigger>인원</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">성인</p>
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger>
                            <SelectValue placeholder="성인 2명" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={String(i + 1)}>
                                성인 {i + 1}명
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">어린이</p>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger>
                            <SelectValue placeholder="어린이 0명" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(6)].map((_, i) => (
                              <SelectItem key={i} value={String(i)}>
                                어린이 {i}명
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="roomType">
                  <AccordionTrigger>객실 타입</AccordionTrigger>
                  <AccordionContent>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="모든 객실" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 객실</SelectItem>
                        <SelectItem value="comfort">Chill Comfort Room</SelectItem>
                        <SelectItem value="harmony">Chill Harmony Room</SelectItem>
                        <SelectItem value="serenity">Chill Serenity Room</SelectItem>
                        <SelectItem value="family">Chill Family Suite</SelectItem>
                        <SelectItem value="lake">Chill Lake Suite</SelectItem>
                        <SelectItem value="ultimate">Ultimate Chill Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger>가격 범위</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={[150, 800]}
                        min={100}
                        max={1000}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="view">
                  <AccordionTrigger>전망</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="garden" />
                        <label
                          htmlFor="garden"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          정원 전망
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="forest" />
                        <label
                          htmlFor="forest"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          숲 & 트레일 전망
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="lake" />
                        <label
                          htmlFor="lake"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          호수 & 산 전망
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          <div className="p-4 border-t border-neutral-200">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4 mr-2" />
              객실 검색
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters (Desktop) */}
      <div className="hidden md:flex mt-6 justify-between items-center">
        <div className="flex space-x-6">
          <div>
            <p className="text-sm font-medium mb-2">가격 범위</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-500">${priceRange[0]}</span>
                <Slider
                  className="w-[200px]"
                  defaultValue={[150, 800]}
                  min={100}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <span className="text-sm text-neutral-500">${priceRange[1]}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">전망</p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="garden-view" />
                <label htmlFor="garden-view" className="text-sm">
                  정원 전망
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="forest-view" />
                <label htmlFor="forest-view" className="text-sm">
                  숲 & 트레일 전망
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lake-view" />
                <label htmlFor="lake-view" className="text-sm">
                  호수 & 산 전망
                </label>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          추가 필터
        </Button>
      </div>
    </div>
  )
}

