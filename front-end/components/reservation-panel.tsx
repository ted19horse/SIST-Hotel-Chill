"use client"

import { useState } from "react"
import { Calendar, Users, ChevronRight } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays } from "date-fns"
import { ko } from "date-fns/locale"

export default function ReservationPanel() {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 1))
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [calendarOpen, setCalendarOpen] = useState(false)

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
    <div className="bg-white shadow-lg rounded-t-lg md:rounded-lg mx-4 md:mx-auto md:max-w-5xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Check-in / Check-out */}
        <div className="col-span-2 border-b md:border-b-0 md:border-r border-neutral-200">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center p-6 text-left hover:bg-neutral-50 transition-colors">
                <Calendar className="h-5 w-5 text-primary mr-3" />
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
                  <CalendarComponent
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
                  <CalendarComponent
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
        <div className="border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="p-6 hover:bg-neutral-50 transition-colors">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-3" />
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
                      <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0" aria-label="어린이 수">
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

        {/* Search Button */}
        <div className="bg-primary text-primary-foreground">
          <button className="w-full h-full flex items-center justify-center p-6 hover:bg-primary/90 transition-colors">
            <span className="font-medium mr-2">객실 검색</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

