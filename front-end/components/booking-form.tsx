"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"

interface BookingFormProps {
  selectedRoom: any | null
  bookingDates: {
    checkIn: Date | null
    checkOut: Date | null
  }
  guests: {
    adults: number
    children: number
    infants: number
  }
}

export default function BookingForm({ selectedRoom, bookingDates, guests }: BookingFormProps) {
  const [dateRange, setDateRange] = useState({
    from: bookingDates.checkIn || new Date(),
    to: bookingDates.checkOut || addDays(new Date(), 1),
  })
  const [adults, setAdults] = useState(guests.adults || 2)
  const [children, setChildren] = useState(guests.children || 0)
  const [infants, setInfants] = useState(guests.infants || 0)
  const [specialRequests, setSpecialRequests] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleDateSelect = (range: any) => {
    setDateRange(range)
    if (range.from && range.to) {
      setIsCalendarOpen(false)
      setFormErrors((prev) => ({ ...prev, dates: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!dateRange.from || !dateRange.to) {
      errors.dates = "Please select check-in and check-out dates"
    }

    if (adults < 1) {
      errors.adults = "At least 1 adult is required"
    }

    if (!agreedToTerms) {
      errors.terms = "You must agree to the terms and conditions"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real application, this would submit the booking request
      console.log("Booking submitted", {
        room: selectedRoom?.id || "any available",
        dates: dateRange,
        guests: { adults, children, infants },
        specialRequests,
      })

      alert("Your booking request has been submitted! We'll check availability and get back to you soon.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected Room */}
        <div className="md:col-span-2">
          <Label htmlFor="room-type" className="block text-sm font-medium text-neutral-700 mb-1">
            Room Type
          </Label>
          <div className="p-4 bg-teal-50 rounded-md">
            {selectedRoom ? (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-teal-800">{selectedRoom.name}</h3>
                  <p className="text-sm text-neutral-600">
                    {selectedRoom.size}, {selectedRoom.view}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-teal-800">
                    ${selectedRoom.price} <span className="text-sm font-normal text-neutral-500">/ night</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-neutral-600">
                No specific room selected. We'll check availability for all room types.
              </p>
            )}
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="md:col-span-2">
          <Label htmlFor="date-range" className="block text-sm font-medium text-neutral-700 mb-1">
            Stay Dates*
          </Label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-range"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-neutral-300 hover:bg-neutral-50",
                  formErrors.dates && "border-red-500",
                )}
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
          {formErrors.dates && <p className="mt-1 text-sm text-red-500">{formErrors.dates}</p>}
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="adults" className="block text-sm font-medium text-neutral-700 mb-1">
            Adults (13+ years)*
          </Label>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-none border-neutral-300"
              onClick={() => setAdults(Math.max(1, adults - 1))}
              disabled={adults <= 1}
            >
              -
            </Button>
            <Input
              id="adults"
              type="number"
              value={adults}
              onChange={(e) => setAdults(Number.parseInt(e.target.value) || 1)}
              min={1}
              max={8}
              className="h-10 rounded-none text-center border-x-0 border-neutral-300"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-none border-neutral-300"
              onClick={() => setAdults(Math.min(8, adults + 1))}
              disabled={adults >= 8}
            >
              +
            </Button>
          </div>
          {formErrors.adults && <p className="mt-1 text-sm text-red-500">{formErrors.adults}</p>}
        </div>

        <div>
          <Label htmlFor="children" className="block text-sm font-medium text-neutral-700 mb-1">
            Children (3-12 years)
          </Label>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-none border-neutral-300"
              onClick={() => setChildren(Math.max(0, children - 1))}
              disabled={children <= 0}
            >
              -
            </Button>
            <Input
              id="children"
              type="number"
              value={children}
              onChange={(e) => setChildren(Number.parseInt(e.target.value) || 0)}
              min={0}
              max={6}
              className="h-10 rounded-none text-center border-x-0 border-neutral-300"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-none border-neutral-300"
              onClick={() => setChildren(Math.min(6, children + 1))}
              disabled={children >= 6}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="infants" className="block text-sm font-medium text-neutral-700 mb-1">
            Infants (0-2 years)
          </Label>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-none border-neutral-300"
              onClick={() => setInfants(Math.max(0, infants - 1))}
              disabled={infants <= 0}
            >
              -
            </Button>
            <Input
              id="infants"
              type="number"
              value={infants}
              onChange={(e) => setInfants(Number.parseInt(e.target.value) || 0)}
              min={0}
              max={4}
              className="h-10 rounded-none text-center border-x-0 border-neutral-300"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-none border-neutral-300"
              onClick={() => setInfants(Math.min(4, infants + 1))}
              disabled={infants >= 4}
            >
              +
            </Button>
          </div>
          <p className="mt-1 text-xs text-neutral-500">Infants don't count toward room capacity</p>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="special-requests" className="block text-sm font-medium text-neutral-700 mb-1">
            Special Requests
          </Label>
          <Textarea
            id="special-requests"
            placeholder="Let us know if you have any special requests or preferences"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="border-neutral-300 resize-none h-24"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => {
                setAgreedToTerms(checked as boolean)
                if (checked) {
                  setFormErrors((prev) => ({ ...prev, terms: "" }))
                }
              }}
              className={cn(formErrors.terms && "border-red-500")}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  formErrors.terms && "text-red-500",
                )}
              >
                I agree to the terms and conditions*
              </Label>
              <p className="text-xs text-neutral-500">
                By checking this box, you agree to our{" "}
                <a href="#" className="text-teal-700 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-teal-700 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
          {formErrors.terms && <p className="mt-1 text-sm text-red-500">{formErrors.terms}</p>}
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white">
          Check Availability
        </Button>
      </div>
    </form>
  )
}

