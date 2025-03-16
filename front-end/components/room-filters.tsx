"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Users } from "lucide-react"
import { addDays, format } from "date-fns"

interface RoomFiltersProps {
  onFilterChange: (filters: any) => void
}

export default function RoomFilters({ onFilterChange }: RoomFiltersProps) {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [roomType, setRoomType] = useState("all")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleDateSelect = (range: any) => {
    setDateRange(range)
    if (range.from && range.to) {
      setIsCalendarOpen(false)
    }
  }

  const handleApplyFilters = () => {
    onFilterChange({
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      adults,
      children,
      infants,
      roomType,
    })
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Find Your Perfect Room</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range Picker */}
        <div className="lg:col-span-2">
          <Label htmlFor="date-range" className="block text-sm font-medium text-neutral-700 mb-1">
            Stay Dates
          </Label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-range"
                variant="outline"
                className="w-full justify-start text-left font-normal border-neutral-300 hover:bg-neutral-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-neutral-500" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM d, yyyy")
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Room Type */}
        <div>
          <Label htmlFor="room-type" className="block text-sm font-medium text-neutral-700 mb-1">
            Room Type
          </Label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger id="room-type" className="border-neutral-300">
              <SelectValue placeholder="All Room Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Room Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="executive suite">Executive Suite</SelectItem>
              <SelectItem value="presidential suite">Presidential Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="guests" className="block text-sm font-medium text-neutral-700 mb-1">
            Guests
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="guests"
                variant="outline"
                className="w-full justify-start text-left font-normal border-neutral-300 hover:bg-neutral-50"
              >
                <Users className="mr-2 h-4 w-4 text-neutral-500" />
                <span>
                  {adults} {adults === 1 ? "adult" : "adults"}
                  {children > 0 && `, ${children} ${children === 1 ? "child" : "children"}`}
                  {infants > 0 && `, ${infants} ${infants === 1 ? "infant" : "infants"}`}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Adults</p>
                    <p className="text-sm text-neutral-500">Ages 13+</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setAdults(adults + 1)}
                      disabled={adults >= 8}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Children</p>
                    <p className="text-sm text-neutral-500">Ages 3-12</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setChildren(children + 1)}
                      disabled={children >= 6}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Infants</p>
                    <p className="text-sm text-neutral-500">Ages 0-2</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      disabled={infants <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{infants}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setInfants(infants + 1)}
                      disabled={infants >= 4}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-neutral-500">Note: Infants don't count toward room capacity</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Apply Filters Button */}
        <div className="flex items-end">
          <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white" onClick={handleApplyFilters}>
            Search Rooms
          </Button>
        </div>
      </div>
    </section>
  )
}

