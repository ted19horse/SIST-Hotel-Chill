"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Info, CalendarClock } from "lucide-react"

const facilities = [
  {
    id: "wellness-center",
    name: "Chill Wellness Center",
    location: "1st-2nd floor of main building",
    concept: "Comprehensive wellness space for mind and body rejuvenation",
    keyFacilities: [
      {
        name: "Infinity Chill Pool",
        description: "Indoor/outdoor infinity pool with lake view (heated year-round)",
      },
      {
        name: "Zen Zone",
        description: "Finnish sauna, aromatic steam room, Himalayan salt room",
      },
      {
        name: "24/7 Chill Fit",
        description: "State-of-the-art fitness center (24-hour operation)",
      },
      {
        name: "Mind Studio",
        description: "Space for yoga, meditation, and pilates classes",
      },
      {
        name: "Chill Recovery",
        description: "Sports massage and recovery treatment rooms",
      },
    ],
    operatingHours: "Pool 6:00-22:00, Sauna & Steam 7:00-22:00, Fitness Center 24hrs",
    image: "/placeholder.svg?height=800&width=1200",
    requiresReservation: false,
  },
  {
    id: "serenity-spa",
    name: "Chill Serenity Spa",
    location: "Dedicated wing of the hotel annex",
    concept: "Deep relaxation through customized healing treatments",
    keyFacilities: [
      {
        name: "Just Chill Massage",
        description: "Hotel signature full-body massage",
      },
      {
        name: "Forest Calm",
        description: "Aromatherapy treatment using forest scents",
      },
      {
        name: "Lake Reflection",
        description: "Hydrating and rejuvenating facial treatment",
      },
      {
        name: "Couple's Retreat",
        description: "Private spa package for couples",
      },
      {
        name: "Ultimate Chill Experience",
        description: "4-hour luxury full-body treatment",
      },
    ],
    operatingHours: "10:00-21:00 (reservation required)",
    image: "/placeholder.svg?height=800&width=1200",
    requiresReservation: true,
  },
  {
    id: "nature-zone",
    name: "Nature Chill Zone",
    location: "Hotel exterior gardens and surrounding natural environment",
    concept: "Leisurely healing activities in nature",
    keyFacilities: [
      {
        name: "Chill Path",
        description: "4km walking/jogging track connecting lake and forest",
      },
      {
        name: "Silent Garden",
        description: "Quiet garden space for meditation and yoga",
      },
      {
        name: "Lake Chill Deck",
        description: "Lakeside relaxation deck with private cabanas",
      },
      {
        name: "Herb Haven",
        description: "Herb garden with harvesting and cooking classes",
      },
      {
        name: "Seasonal Chill",
        description:
          "Seasonal outdoor activities (spring flower viewing, summer lake kayaking, autumn forest walks, winter hot springs)",
      },
    ],
    operatingHours: "Sunrise to sunset (varies seasonally)",
    image: "/placeholder.svg?height=800&width=1200",
    requiresReservation: false,
  },
  {
    id: "lounge-entertainment",
    name: "Chill Lounge & Entertainment",
    location: "3rd floor of main building",
    concept: "Multipurpose space for socializing and cultural relaxation",
    keyFacilities: [
      {
        name: "Book & Chill",
        description: "Quiet reading and relaxation lounge",
      },
      {
        name: "Art of Chill",
        description: "Small gallery featuring local artists and healing-themed artwork",
      },
      {
        name: "Chill Vibes",
        description: "Weekend live music performances and cultural events",
      },
      {
        name: "Digital Detox Den",
        description: "Space for board games, puzzles without digital devices",
      },
      {
        name: "Chill Cinema",
        description: "Small screening room for healing/meditation videos and regular movies",
      },
    ],
    operatingHours: "9:00-23:00",
    image: "/placeholder.svg?height=800&width=1200",
    requiresReservation: false,
  },
  {
    id: "business-chill",
    name: "Business Chill",
    location: "B1 floor of main building",
    concept: "Work and event spaces with a relaxation focus",
    keyFacilities: [
      {
        name: "Productivity Lounge",
        description: "24-hour business center (printers, meeting rooms)",
      },
      {
        name: "Balance Rooms",
        description: "Small/medium meeting rooms (10-30 people)",
      },
      {
        name: "Harmony Hall",
        description: "Large banquet hall (max 150 people)",
      },
      {
        name: "Private Dining Chill",
        description: "Private dining room (max 20 people)",
      },
      {
        name: "Work & Chill",
        description: "Coworking style workspace",
      },
    ],
    operatingHours: "24 hours (banquet hall/meeting rooms by reservation)",
    image: "/placeholder.svg?height=800&width=1200",
    requiresReservation: true,
  },
  {
    id: "kids-family",
    name: "Chill Kids & Family",
    location: "B2 floor of main building",
    concept: "Activities and relaxation for the whole family",
    keyFacilities: [
      {
        name: "Mini Chill Zone",
        description: "Kids playroom (professional childcare staff)",
      },
      {
        name: "Family Chill",
        description: "Family activity space (games, crafts)",
      },
      {
        name: "Splash Chill",
        description: "Children's pool and water play area",
      },
      {
        name: "Family Retreat Programs",
        description: "Healing programs for parents and children",
      },
      {
        name: "Teen Chill Lounge",
        description: "Teen-only space (games, music, reading)",
      },
    ],
    operatingHours: "9:00-21:00",
    image: "/placeholder.svg?height=800&width=1200",
    requiresReservation: true,
  },
]

export default function FacilityTabs() {
  const [activeTab, setActiveTab] = useState(facilities[0].id)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Facilities</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our range of premium facilities designed to enhance your healing journey at Chill Haven Resort &
            Spa.
          </p>
        </div>

        <Tabs defaultValue={facilities[0].id} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-flow-col auto-cols-max gap-2 justify-start md:justify-center p-1 mb-8">
              {facilities.map((facility) => (
                <TabsTrigger key={facility.id} value={facility.id} className="px-4 py-2 whitespace-nowrap">
                  {facility.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {facilities.map((facility) => (
            <TabsContent key={facility.id} value={facility.id} className="mt-0">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                    {facility.requiresReservation && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-white">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          Reservation Required
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="text-2xl font-bold mb-2">{facility.name}</h3>
                    <p className="text-neutral-600 mb-6">{facility.concept}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-neutral-600 text-sm">{facility.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Operating Hours</p>
                          <p className="text-neutral-600 text-sm">{facility.operatingHours}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold mb-3">Key Facilities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {facility.keyFacilities.map((item, index) => (
                          <div key={index} className="bg-neutral-50 p-3 rounded-md">
                            <p className="font-medium text-primary">{item.name}</p>
                            <p className="text-neutral-600 text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {facility.requiresReservation ? (
                        <Button className="bg-primary hover:bg-primary/90">Make Reservation</Button>
                      ) : (
                        <Button className="bg-primary hover:bg-primary/90">Learn More</Button>
                      )}
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        <Info className="h-4 w-4 mr-2" />
                        Request Information
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

