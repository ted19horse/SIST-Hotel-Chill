"use client"

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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RoomListProps {
  rooms: any[]
  onViewDetails: (room: any) => void
  onBookNow: (room: any) => void
}

export default function RoomList({ rooms, onViewDetails, onBookNow }: RoomListProps) {
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

  // Get room type badge color
  const getRoomTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "standard":
        return "bg-blue-100 text-blue-800"
      case "deluxe":
        return "bg-green-100 text-green-800"
      case "premium":
        return "bg-purple-100 text-purple-800"
      case "suite":
        return "bg-amber-100 text-amber-800"
      case "executive suite":
        return "bg-rose-100 text-rose-800"
      case "presidential suite":
        return "bg-red-100 text-red-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  return (
    <div className="space-y-8">
      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-neutral-600">No rooms match your current filters</h3>
          <p className="mt-2 text-neutral-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {/* Room Image */}
              <div className="relative h-64 md:h-full">
                <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                <Badge className={cn("absolute top-4 left-4 font-medium", getRoomTypeBadgeColor(room.type))}>
                  {room.type}
                </Badge>
              </div>

              {/* Room Details */}
              <div className="p-6 md:col-span-2 lg:col-span-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-teal-800 mb-2">{room.name}</h3>

                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-neutral-600">
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
                    </div>

                    <p className="text-neutral-600 mb-4">{room.description}</p>

                    {/* Amenities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-neutral-700 mb-2">Key Amenities</h4>
                      <div className="flex flex-wrap gap-3">
                        {room.amenities.slice(0, 6).map((amenity: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center text-xs text-neutral-600 bg-neutral-50 px-2 py-1 rounded"
                            title={amenity}
                          >
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 truncate max-w-[100px]">{amenity}</span>
                          </div>
                        ))}
                        {room.amenities.length > 6 && (
                          <div className="flex items-center text-xs text-neutral-600 bg-neutral-50 px-2 py-1 rounded">
                            <span>+{room.amenities.length - 6} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Booking */}
                  <div className="border-t lg:border-t-0 lg:border-l border-neutral-100 lg:pl-6 pt-4 lg:pt-0 flex flex-col justify-between">
                    <div>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-teal-800">${room.price}</span>
                        <span className="text-neutral-500 text-sm"> / night</span>
                      </div>
                      <p className="text-xs text-neutral-500 mb-6">Excludes taxes and fees</p>
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full border-teal-700 text-teal-700 hover:bg-teal-50"
                        onClick={() => onViewDetails(room)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white"
                        onClick={() => onBookNow(room)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

