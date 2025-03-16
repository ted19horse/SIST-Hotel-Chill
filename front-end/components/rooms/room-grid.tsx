"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Maximize2, Eye, ChevronRight, BedDouble, Mountain, Check } from "lucide-react"

// Room data
const rooms = [
  {
    id: 1,
    type: "comfort",
    name: "Chill Comfort Room",
    size: "30㎡",
    view: "Garden view",
    capacity: {
      max: 3,
      adults: 2,
      children: 1,
    },
    description: "Entry-level room with garden view and comfortable design with natural elements.",
    features: ["Simple, comfortable design", "Natural elements", "Garden view"],
    amenities: [
      "Premium bedding",
      '43" Smart TV',
      "High-speed Wi-Fi",
      "In-room safe",
      "Minibar",
      "Eco-friendly bath products",
      "Slippers and bathrobe",
      "USB charging ports",
      "Hairdryer",
      "Coffee/tea maker",
    ],
    price: 150,
    availability: {
      available: 35,
      total: 120,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 2,
    type: "harmony",
    name: "Chill Harmony Room",
    size: "45㎡",
    view: "Garden view",
    capacity: {
      max: 3,
      adults: 2,
      children: 1,
    },
    description: "Spacious deluxe room with luxurious interior and sofa area for relaxation.",
    features: ["Spacious design", "Luxurious interior", "Sofa area for relaxation"],
    amenities: [
      "Premium bedding",
      '43" Smart TV',
      "High-speed Wi-Fi",
      "In-room safe",
      "Minibar",
      "Eco-friendly bath products",
      "Slippers and bathrobe",
      "USB charging ports",
      "Hairdryer",
      "Espresso machine",
      "Pillow mist",
      "Bathroom scale",
      "Additional bath products",
      "Bluetooth speaker",
      "Reusable tumbler",
    ],
    price: 200,
    availability: {
      available: 28,
      total: 100,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 3,
    type: "serenity",
    name: "Chill Serenity Room",
    size: "70㎡",
    view: "Garden view",
    capacity: {
      max: 4,
      adults: 2,
      children: 2,
    },
    description: "Premium room with luxury bedding, spacious bathroom, some rooms with terrace.",
    features: ["Luxury bedding", "Spacious bathroom", "Some rooms with terrace"],
    amenities: [
      "Premium bedding",
      '43" Smart TV',
      "High-speed Wi-Fi",
      "In-room safe",
      "Minibar",
      "Eco-friendly bath products",
      "Slippers and bathrobe",
      "USB charging ports",
      "Hairdryer",
      "Espresso machine",
      "Pillow mist",
      "Bathroom scale",
      "Additional bath products",
      "Bluetooth speaker",
      "Reusable tumbler",
      "Tablet room control system",
      "Air purifier",
      "Executive lounge access",
      "Turndown service",
      "Complimentary breakfast",
      "Welcome fruits/snacks",
    ],
    price: 300,
    availability: {
      available: 18,
      total: 60,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 4,
    type: "family",
    name: "Chill Family Suite",
    size: "90㎡",
    view: "Forest & trail view",
    capacity: {
      max: 6,
      adults: 4,
      children: 2,
    },
    description: "Family suite with separate living room and bedroom, family-friendly amenities.",
    features: ["Separate living room and bedroom", "Family-friendly amenities", "Premium view"],
    amenities: [
      "Premium bedding",
      '55" Smart TV',
      "High-speed Wi-Fi",
      "In-room safe",
      "Minibar",
      "Eco-friendly bath products",
      "Slippers and bathrobe",
      "USB charging ports",
      "Hairdryer",
      "Espresso machine",
      "Pillow mist",
      "Bathroom scale",
      "Additional bath products",
      "Bluetooth speaker",
      "Reusable tumbler",
      "Tablet room control system",
      "Air purifier",
      "Executive lounge access",
      "Turndown service",
      "Complimentary breakfast",
      "Welcome fruits/snacks",
    ],
    price: 450,
    availability: {
      available: 12,
      total: 40,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 5,
    type: "lake",
    name: "Chill Lake Suite",
    size: "100㎡",
    view: "Lake & mountain view",
    capacity: {
      max: 4,
      adults: 2,
      children: 2,
    },
    description: "Executive suite with work and relaxation spaces, beautiful panoramic views.",
    features: ["Work and relaxation spaces", "Beautiful panoramic views", "Premium view"],
    amenities: [
      "Premium bedding",
      '65" Smart TV',
      "High-speed Wi-Fi",
      "In-room safe",
      "Minibar",
      "Eco-friendly bath products",
      "Slippers and bathrobe",
      "USB charging ports",
      "Hairdryer",
      "Espresso machine",
      "Pillow mist",
      "Bathroom scale",
      "Additional bath products",
      "Bluetooth speaker",
      "Reusable tumbler",
      "Tablet room control system",
      "Air purifier",
      "Executive lounge access",
      "Turndown service",
      "Complimentary breakfast",
      "Welcome fruits/snacks",
    ],
    price: 550,
    availability: {
      available: 7,
      total: 20,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 6,
    type: "ultimate",
    name: "Ultimate Chill Suite",
    size: "120㎡",
    view: "Selectable premium view",
    capacity: {
      max: 8,
      adults: 4,
      children: 4,
    },
    description: "Presidential suite with top-tier facilities, personalized service, spacious areas.",
    features: ["Top-tier facilities", "Personalized service", "Spacious areas"],
    amenities: [
      "Premium bedding",
      '75" Smart TV',
      "High-speed Wi-Fi",
      "In-room safe",
      "Minibar",
      "Eco-friendly bath products",
      "Slippers and bathrobe",
      "USB charging ports",
      "Hairdryer",
      "Espresso machine",
      "Pillow mist",
      "Bathroom scale",
      "Additional bath products",
      "Bluetooth speaker",
      "Reusable tumbler",
      "Tablet room control system",
      "Air purifier",
      "Executive lounge access",
      "Turndown service",
      "Complimentary breakfast",
      "Welcome fruits/snacks",
      "Personal butler service",
      "Private check-in/out",
      "In-room jacuzzi",
      "Premium wine/liquor selection",
      "Private dining options",
      "Special spa treatment package",
    ],
    price: 800,
    availability: {
      available: 3,
      total: 10,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

export default function RoomGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">객실 목록</h2>
          <p className="text-neutral-500">총 {rooms.length}개의 객실 타입</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-grid-2x2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 12h18" />
              <path d="M12 3v18" />
            </svg>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list"
            >
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              id={`room-${room.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">${room.price}/night</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <Tabs defaultValue="image-0">
                        <div className="relative h-[50vh] mb-4">
                          {room.images.map((image, index) => (
                            <TabsContent key={index} value={`image-${index}`} className="p-0 m-0">
                              <div className="relative h-[50vh]">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`${room.name} - Image ${index + 1}`}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </TabsContent>
                          ))}
                        </div>
                        <TabsList className="grid grid-cols-3 gap-2">
                          {room.images.map((image, index) => (
                            <TabsTrigger key={index} value={`image-${index}`} className="p-0 overflow-hidden h-20">
                              <div className="relative w-full h-full">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Thumbnail ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                <p className="text-neutral-600 mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-y-2 text-sm text-neutral-500 mb-4">
                  <div className="w-1/2 flex items-center">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    <span>{room.size}</span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      성인 {room.capacity.adults}인 + 어린이 {room.capacity.children}인
                    </span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>{room.view}</span>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <BedDouble className="h-4 w-4 mr-2" />
                    <span>킹 사이즈 침대</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-neutral-50">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 4 && (
                    <Badge variant="outline" className="bg-neutral-50">
                      +{room.amenities.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-neutral-500">
                      Available: {room.availability.available} of {room.availability.total}
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">예약하기</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              id={`room-${room.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-64">
                  <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">${room.price}/night</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <Tabs defaultValue="image-0">
                          <div className="relative h-[50vh] mb-4">
                            {room.images.map((image, index) => (
                              <TabsContent key={index} value={`image-${index}`} className="p-0 m-0">
                                <div className="relative h-[50vh]">
                                  <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${room.name} - Image ${index + 1}`}
                                    fill
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              </TabsContent>
                            ))}
                          </div>
                          <TabsList className="grid grid-cols-3 gap-2">
                            {room.images.map((image, index) => (
                              <TabsTrigger key={index} value={`image-${index}`} className="p-0 overflow-hidden h-20">
                                <div className="relative w-full h-full">
                                  <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="p-6 w-full md:w-2/3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                      <p className="text-neutral-600 mb-4">{room.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-bold text-primary">${room.price}</p>
                      <p className="text-sm text-neutral-500">per night</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Maximize2 className="h-4 w-4 mr-2" />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        성인 {room.capacity.adults}인 + 어린이 {room.capacity.children}인
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mountain className="h-4 w-4 mr-2" />
                      <span>{room.view}</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-2" />
                      <span>킹 사이즈 침대</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 6).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-neutral-50">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 6 && (
                      <Badge variant="outline" className="bg-neutral-50">
                        +{room.amenities.length - 6} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Available: {room.availability.available} of {room.availability.total}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
                      >
                        상세 정보
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button className="bg-primary hover:bg-primary/90">예약하기</Button>
                    </div>
                  </div>

                  {selectedRoom === room.id && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <h4 className="font-semibold mb-2">Room Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 mb-4">
                        {room.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-semibold mb-2">Amenities</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-1">
                        {room.amenities.map((amenity, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

