"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Utensils, ChevronDown, ChevronUp, Clock, CalendarIcon, CalendarCheck } from "lucide-react"

// Mock reservation data
const upcomingReservations = []

const pastReservations = [
  {
    id: "dining-222333",
    restaurant: "Chill Elegance",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-02-14T19:30:00",
    guests: 2,
    status: "completed",
    totalAmount: 280000,
    specialRequests: "Anniversary celebration - window table requested",
    tableNumber: "12",
    isExpanded: false,
  },
  {
    id: "dining-111222",
    restaurant: "Chill Garden",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-01-12T12:30:00",
    guests: 4,
    status: "completed",
    totalAmount: 320000,
    specialRequests: "Birthday celebration",
    tableNumber: "8",
    isExpanded: false,
  },
]

const cancelledReservations = [
  {
    id: "dining-000111",
    restaurant: "Chill Moments",
    image: "/placeholder.svg?height=400&width=600",
    date: "2024-12-24T18:00:00",
    guests: 2,
    status: "cancelled",
    totalAmount: 0,
    specialRequests: "",
    tableNumber: null,
    cancellationDate: "2024-12-20T14:30:00",
    cancellationReason: "Change of plans",
    isExpanded: false,
  },
]

export default function DiningReservations() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const [upcoming, setUpcoming] = useState(upcomingReservations)
  const [past, setPast] = useState(pastReservations)
  const [cancelled, setCancelled] = useState(cancelledReservations)

  const toggleExpand = (reservationId: string, tab: string) => {
    if (tab === "upcoming") {
      setUpcoming(upcoming.map((res) => (res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res)))
    } else if (tab === "past") {
      setPast(past.map((res) => (res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res)))
    } else if (tab === "cancelled") {
      setCancelled(cancelled.map((res) => (res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res)))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Dining Reservations</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Utensils className="h-4 w-4 mr-2" />
          Make Dining Reservation
        </Button>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcoming.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No Upcoming Dining Reservations</h3>
              <p className="text-neutral-500 mb-6">You don't have any upcoming dining reservations at Chill Haven.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">Make a Reservation</Button>
            </div>
          ) : (
            <div className="space-y-6">{/* Upcoming reservations would be mapped here */}</div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {past.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No Past Dining Reservations</h3>
              <p className="text-neutral-500">You don't have any past dining reservations at Chill Haven.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {past.map((reservation) => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Restaurant Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || "/placeholder.svg"}
                          alt={reservation.restaurant}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.restaurant}</h3>
                          <p className="text-neutral-600">Reservation #{reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(reservation.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">Date & Time</p>
                          <p className="font-medium">{formatDate(reservation.date)}</p>
                          <p className="text-sm">{formatTime(reservation.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Party Size</p>
                          <p className="font-medium">
                            {reservation.guests} {reservation.guests === 1 ? "Guest" : "Guests"}
                          </p>
                          <p className="text-sm">Table #{reservation.tableNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Total Amount</p>
                          <p className="font-medium">₩{reservation.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-green-600">
                            Earned {Math.floor(reservation.totalAmount / 10000)} points
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Download Receipt
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Write Review
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Book Again
                        </Button>
                        <Button
                          variant="ghost"
                          className="ml-auto"
                          onClick={() => toggleExpand(reservation.id, "past")}
                        >
                          {reservation.isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              Less Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              More Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {reservation.isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-neutral-200 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                          <h4 className="font-medium mb-2">Special Requests</h4>
                          <div className="bg-white rounded-md p-4 min-h-[100px]">
                            {reservation.specialRequests ? (
                              <p className="text-neutral-600">{reservation.specialRequests}</p>
                            ) : (
                              <p className="text-neutral-400 italic">No special requests</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Restaurant Details</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Utensils className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.restaurant}</p>
                                <p className="text-sm text-neutral-600">Table #{reservation.tableNumber}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Dining Time</p>
                                <p className="text-sm text-neutral-600">{formatTime(reservation.date)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled">
          {cancelled.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No Cancelled Dining Reservations</h3>
              <p className="text-neutral-500">You don't have any cancelled dining reservations.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cancelled.map((reservation) => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Restaurant Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || "/placeholder.svg"}
                          alt={reservation.restaurant}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.restaurant}</h3>
                          <p className="text-neutral-600">Reservation #{reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(reservation.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">Cancelled Date</p>
                          <p className="font-medium">{formatDate(reservation.cancellationDate || "")}</p>
                          <p className="text-sm">Original date: {formatDate(reservation.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Party Size</p>
                          <p className="font-medium">
                            {reservation.guests} {reservation.guests === 1 ? "Guest" : "Guests"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Cancellation Reason</p>
                          <p className="font-medium">{reservation.cancellationReason || "Not specified"}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Book Again
                        </Button>
                        <Button
                          variant="ghost"
                          className="ml-auto"
                          onClick={() => toggleExpand(reservation.id, "cancelled")}
                        >
                          {reservation.isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              Less Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              More Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {reservation.isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-neutral-200 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div>
                          <h4 className="font-medium mb-2">Special Requests</h4>
                          <div className="bg-white rounded-md p-4 min-h-[100px]">
                            {reservation.specialRequests ? (
                              <p className="text-neutral-600">{reservation.specialRequests}</p>
                            ) : (
                              <p className="text-neutral-400 italic">No special requests</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Restaurant Details</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Utensils className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.restaurant}</p>
                                <p className="text-sm text-neutral-600">Located in the main building</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Original Reservation</p>
                                <p className="text-sm text-neutral-600">
                                  {formatDate(reservation.date)} at {formatTime(reservation.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

