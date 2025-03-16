"use client"

import { useState } from "react"
import Header from "./header"
import RoomFilters from "./room-filters"
import RoomList from "./room-list"
import BookingForm from "./booking-form"
import RoomDetailModal from "./room-detail-modal"

interface RoomBookingPageProps {
  rooms: any[]
  availability: any
}

export default function RoomBookingPage({ rooms, availability }: RoomBookingPageProps) {
  const [filteredRooms, setFilteredRooms] = useState(rooms)
  const [bookingDates, setBookingDates] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
  })
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  })
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const handleFilterChange = (filters: any) => {
    // In a real application, this would filter rooms based on availability, capacity, etc.
    let filtered = [...rooms]

    // Filter by dates (this would check availability in a real app)
    if (filters.checkIn && filters.checkOut) {
      setBookingDates({
        checkIn: filters.checkIn,
        checkOut: filters.checkOut,
      })
    }

    // Filter by guests
    if (filters.adults || filters.children) {
      setGuests({
        adults: filters.adults || 2,
        children: filters.children || 0,
        infants: filters.infants || 0,
      })

      filtered = filtered.filter((room) => filters.adults + filters.children <= room.capacity.total)
    }

    // Filter by room type
    if (filters.roomType && filters.roomType !== "all") {
      setSelectedRoomType(filters.roomType)
      filtered = filtered.filter((room) => room.type.toLowerCase() === filters.roomType.toLowerCase())
    } else {
      setSelectedRoomType(null)
    }

    setFilteredRooms(filtered)
  }

  const handleViewDetails = (room: any) => {
    setSelectedRoom(room)
    setIsDetailModalOpen(true)
  }

  const handleBookNow = (room: any) => {
    setSelectedRoom(room)
    // Scroll to booking form
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Experience Tranquility in Our Rooms</h1>
          <p className="text-neutral-600">
            Each room at Chill Haven Resort & Spa is thoughtfully designed to provide a healing sanctuary. From natural
            materials to soothing color palettes, every element contributes to your relaxation and rejuvenation.
          </p>
        </section>

        <RoomFilters onFilterChange={handleFilterChange} />

        <section className="my-12">
          <RoomList rooms={filteredRooms} onViewDetails={handleViewDetails} onBookNow={handleBookNow} />
        </section>

        <section id="booking-form" className="my-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">Book Your Stay</h2>
          <BookingForm selectedRoom={selectedRoom} bookingDates={bookingDates} guests={guests} />
        </section>
      </main>

      {isDetailModalOpen && selectedRoom && (
        <RoomDetailModal room={selectedRoom} onClose={closeDetailModal} onBookNow={handleBookNow} />
      )}
    </div>
  )
}

