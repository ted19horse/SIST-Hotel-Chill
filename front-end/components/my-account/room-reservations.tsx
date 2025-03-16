'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bed,
  CalendarCheck,
  CalendarIcon,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Users,
  X
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Mock reservation data
const upcomingReservations = [
  {
    id: 'res-123456',
    roomType: 'Chill Serenity Room',
    image: '/placeholder.svg?height=400&width=600',
    checkIn: '2025-03-25T15:00:00',
    checkOut: '2025-03-28T11:00:00',
    guests: {
      adults: 2,
      children: 0
    },
    status: 'confirmed',
    totalAmount: 1140000,
    specialRequests: 'High floor room with lake view if available',
    roomNumber: null,
    isExpanded: true
  }
];

const pastReservations = [
  {
    id: 'res-111222',
    roomType: 'Chill Lake Suite',
    image: '/placeholder.svg?height=400&width=600',
    checkIn: '2025-01-10T15:00:00',
    checkOut: '2025-01-15T11:00:00',
    guests: {
      adults: 2,
      children: 1
    },
    status: 'completed',
    totalAmount: 4100000,
    specialRequests: 'Early check-in requested',
    roomNumber: '734',
    isExpanded: false
  },
  {
    id: 'res-098765',
    roomType: 'Chill Harmony Room',
    image: '/placeholder.svg?height=400&width=600',
    checkIn: '2024-11-22T15:00:00',
    checkOut: '2024-11-24T11:00:00',
    guests: {
      adults: 2,
      children: 0
    },
    status: 'completed',
    totalAmount: 700000,
    specialRequests: 'Birthday celebration - cake ordered',
    roomNumber: '318',
    isExpanded: false
  },
  {
    id: 'res-087654',
    roomType: 'Chill Comfort Room',
    image: '/placeholder.svg?height=400&width=600',
    checkIn: '2024-09-05T15:00:00',
    checkOut: '2024-09-07T11:00:00',
    guests: {
      adults: 1,
      children: 0
    },
    status: 'completed',
    totalAmount: 440000,
    specialRequests: '',
    roomNumber: '215',
    isExpanded: false
  }
];

const cancelledReservations = [
  {
    id: 'res-076543',
    roomType: 'Chill Family Suite',
    image: '/placeholder.svg?height=400&width=600',
    checkIn: '2024-12-24T15:00:00',
    checkOut: '2024-12-28T11:00:00',
    guests: {
      adults: 2,
      children: 2
    },
    status: 'cancelled',
    totalAmount: 2600000,
    specialRequests: 'Connecting rooms if possible',
    roomNumber: null,
    cancellationDate: '2024-12-15T09:45:00',
    cancellationReason: 'Change of plans',
    refundAmount: 2340000,
    isExpanded: false
  }
];

export default function RoomReservations() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const [upcoming, setUpcoming] = useState(upcomingReservations);
  const [past, setPast] = useState(pastReservations);
  const [cancelled, setCancelled] = useState(cancelledReservations);

  const toggleExpand = (reservationId: string, tab: string) => {
    if (tab === 'upcoming') {
      setUpcoming(upcoming.map(res => (res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res)));
    } else if (tab === 'past') {
      setPast(past.map(res => (res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res)));
    } else if (tab === 'cancelled') {
      setCancelled(cancelled.map(res => (res.id === reservationId ? { ...res, isExpanded: !res.isExpanded } : res)));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">My Reservations</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <CalendarPlus className="h-4 w-4 mr-2" />
          Book New Stay
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
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No Upcoming Reservations</h3>
              <p className="text-neutral-500 mb-6">You don't have any upcoming stays at Chill Haven.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">Book a Stay</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {upcoming.map(reservation => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Room Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || '/placeholder.svg'}
                          alt={reservation.roomType}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.roomType}</h3>
                          <p className="text-neutral-600">Reservation #{reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                          {getStatusBadge(reservation.status)}
                          {reservation.status === 'confirmed' && (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              {getDaysUntil(reservation.checkIn)} days to go
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">Check-in</p>
                          <p className="font-medium">{formatDate(reservation.checkIn)}</p>
                          <p className="text-sm">After {formatTime(reservation.checkIn)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Check-out</p>
                          <p className="font-medium">{formatDate(reservation.checkOut)}</p>
                          <p className="text-sm">Before {formatTime(reservation.checkOut)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Guests</p>
                          <p className="font-medium">{reservation.guests.adults} Adults</p>
                          {reservation.guests.children > 0 && (
                            <p className="text-sm">{reservation.guests.children} Children</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Total Amount</p>
                          <p className="font-medium">₩{reservation.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-green-600">
                            Earn {Math.floor(reservation.totalAmount / 10000)} points
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          <Edit className="h-4 w-4 mr-2" />
                          Modify
                        </Button>
                        <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100">
                          <Download className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          variant="ghost"
                          className="ml-auto"
                          onClick={() => toggleExpand(reservation.id, 'upcoming')}>
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
                          <h4 className="font-medium mb-2">Room Details</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Bed className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.roomType}</p>
                                <p className="text-sm text-neutral-600">King bed with premium linens</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <Users className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Max Occupancy</p>
                                <p className="text-sm text-neutral-600">2 adults, 2 children</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Room Assignment</p>
                                <p className="text-sm text-neutral-600">
                                  {reservation.roomNumber
                                    ? `Room #${reservation.roomNumber}`
                                    : 'Room will be assigned at check-in'}
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

        <TabsContent value="past">
          {past.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No Past Reservations</h3>
              <p className="text-neutral-500 mb-6">You don't have any past stays at Chill Haven.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">Book Your First Stay</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {past.map(reservation => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Room Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || '/placeholder.svg'}
                          alt={reservation.roomType}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.roomType}</h3>
                          <p className="text-neutral-600">Reservation #{reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(reservation.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">Stay Period</p>
                          <p className="font-medium">
                            {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                          </p>
                          <p className="text-sm">Room #{reservation.roomNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Guests</p>
                          <p className="font-medium">{reservation.guests.adults} Adults</p>
                          {reservation.guests.children > 0 && (
                            <p className="text-sm">{reservation.guests.children} Children</p>
                          )}
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
                          onClick={() => toggleExpand(reservation.id, 'past')}>
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
                          <h4 className="font-medium mb-2">Room Details</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Bed className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.roomType}</p>
                                <p className="text-sm text-neutral-600">Room #{reservation.roomNumber}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <Users className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Guests</p>
                                <p className="text-sm text-neutral-600">
                                  {reservation.guests.adults} Adults, {reservation.guests.children} Children
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

        <TabsContent value="cancelled">
          {cancelled.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <CalendarCheck className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No Cancelled Reservations</h3>
              <p className="text-neutral-500 mb-6">You don't have any cancelled stays at Chill Haven.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">Book Your First Stay</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cancelled.map(reservation => (
                <div key={reservation.id} className="bg-neutral-50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {/* Room Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={reservation.image || '/placeholder.svg'}
                          alt={reservation.roomType}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="md:col-span-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{reservation.roomType}</h3>
                          <p className="text-neutral-600">Reservation #{reservation.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(reservation.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-500">Stay Period</p>
                          <p className="font-medium">
                            {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                          </p>
                          <p className="text-sm">Room #{reservation.roomNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Guests</p>
                          <p className="font-medium">{reservation.guests.adults} Adults</p>
                          {reservation.guests.children > 0 && (
                            <p className="text-sm">{reservation.guests.children} Children</p>
                          )}
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
                          onClick={() => toggleExpand(reservation.id, 'cancelled')}>
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
                          <h4 className="font-medium mb-2">Room Details</h4>
                          <div className="bg-white rounded-md p-4">
                            <div className="flex items-start space-x-4">
                              <Bed className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{reservation.roomType}</p>
                                <p className="text-sm text-neutral-600">Room #{reservation.roomNumber}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 mt-4">
                              <Users className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">Guests</p>
                                <p className="text-sm text-neutral-600">
                                  {reservation.guests.adults} Adults, {reservation.guests.children} Children
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
  );
}
