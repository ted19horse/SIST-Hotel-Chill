"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Wifi,
  Tv,
  Coffee,
  ShowerHead,
  Maximize,
  Users,
  Eye,
  Leaf,
  Music,
  Tablet,
  Wind,
  UtensilsCrossed,
  Gift,
  Bath,
  Wine,
  ChefHat,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RoomDetailModalProps {
  room: any
  onClose: () => void
  onBookNow: (room: any) => void
}

export default function RoomDetailModal({ room, onClose, onBookNow }: RoomDetailModalProps) {
  const [activeTab, setActiveTab] = useState("description")

  // Helper function to get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes("wi-fi")) return <Wifi className="h-4 w-4" />
    if (amenityLower.includes("tv")) return <Tv className="h-4 w-4" />
    if (amenityLower.includes("coffee") || amenityLower.includes("espresso")) return <Coffee className="h-4 w-4" />
    if (amenityLower.includes("bath")) return <ShowerHead className="h-4 w-4" />
    if (amenityLower.includes("bluetooth") || amenityLower.includes("speaker")) return <Music className="h-4 w-4" />
    if (amenityLower.includes("tablet")) return <Tablet className="h-4 w-4" />
    if (amenityLower.includes("air") || amenityLower.includes("purifier")) return <Wind className="h-4 w-4" />
    if (amenityLower.includes("breakfast") || amenityLower.includes("dining"))
      return <UtensilsCrossed className="h-4 w-4" />
    if (amenityLower.includes("welcome") || amenityLower.includes("fruit")) return <Gift className="h-4 w-4" />
    if (amenityLower.includes("jacuzzi")) return <Bath className="h-4 w-4" />
    if (amenityLower.includes("wine") || amenityLower.includes("liquor")) return <Wine className="h-4 w-4" />
    if (amenityLower.includes("butler") || amenityLower.includes("service")) return <ChefHat className="h-4 w-4" />
    return <Leaf className="h-4 w-4" /> // Default eco-friendly icon
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-teal-800">{room.name}</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Room Image */}
          <div className="relative h-64 w-full">
            <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
          </div>

          {/* Room Info */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <Maximize className="h-4 w-4 mr-1" />
                <span>{room.size}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{room.view}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  Up to {room.capacity.adults} adults, {room.capacity.children} children
                </span>
              </div>
              <div className="ml-auto">
                <span className="text-xl font-bold text-teal-800">${room.price}</span>
                <span className="text-neutral-500 text-sm"> / night</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex space-x-6">
                <button
                  className={cn(
                    "py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === "description"
                      ? "border-teal-700 text-teal-800"
                      : "border-transparent text-neutral-500 hover:text-neutral-700",
                  )}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={cn(
                    "py-2 text-sm font-medium border-b-2 transition-colors",
                    activeTab === "amenities"
                      ? "border-teal-700 text-teal-800"
                      : "border-transparent text-neutral-500 hover:text-neutral-700",
                  )}
                  onClick={() => setActiveTab("amenities")}
                >
                  Amenities
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "description" ? (
              <div>
                <p className="text-neutral-600 mb-6">{room.description}</p>
                <h3 className="text-lg font-medium text-teal-800 mb-2">Room Details</h3>
                <ul className="list-disc pl-5 text-neutral-600 space-y-1 mb-6">
                  <li>Room Type: {room.type}</li>
                  <li>Size: {room.size}</li>
                  <li>View: {room.view}</li>
                  <li>
                    Maximum Occupancy: {room.capacity.total} people ({room.capacity.adults} adults,{" "}
                    {room.capacity.children} children)
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-teal-800 mb-2">Healing Experience</h3>
                <p className="text-neutral-600 mb-6">
                  Our {room.name} is designed to provide the ultimate healing experience. The room features natural
                  materials, soothing color palettes, and thoughtful amenities to ensure your stay is both comfortable
                  and rejuvenating.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-teal-800 mb-4">Room Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {room.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center py-1">
                      <div className="mr-2 text-teal-700">{getAmenityIcon(amenity)}</div>
                      <span className="text-neutral-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-neutral-50">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" className="border-neutral-300" onClick={onClose}>
              Close
            </Button>
            <Button
              className="bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => {
                onBookNow(room)
                onClose()
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

