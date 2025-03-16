import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowUpRight } from "lucide-react"

export default function FacilitiesMap() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Facilities Map</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore the layout of our resort facilities to help you navigate during your stay.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-[70vh] w-full">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Chill Haven Resort & Spa Facilities Map"
              fill
              className="object-contain"
            />

            {/* Facility Location Pins */}
            <div className="absolute left-[25%] top-[30%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Wellness Center</p>
                  <p className="text-xs text-neutral-600">1st-2nd floor of main building</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Wellness Center
                </span>
              </div>
            </div>

            <div className="absolute left-[60%] top-[50%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Serenity Spa</p>
                  <p className="text-xs text-neutral-600">Dedicated wing of the hotel annex</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Serenity Spa
                </span>
              </div>
            </div>

            <div className="absolute left-[40%] top-[15%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Nature Chill Zone</p>
                  <p className="text-xs text-neutral-600">Hotel exterior gardens and surrounding natural environment</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Nature Zone
                </span>
              </div>
            </div>

            <div className="absolute left-[75%] top-[30%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Lounge & Entertainment</p>
                  <p className="text-xs text-neutral-600">3rd floor of main building</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Lounge & Entertainment
                </span>
              </div>
            </div>

            <div className="absolute left-[30%] top-[70%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Business Chill</p>
                  <p className="text-xs text-neutral-600">B1 floor of main building</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Business Chill
                </span>
              </div>
            </div>

            <div className="absolute left-[65%] top-[70%] group">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-bold text-sm">Chill Kids & Family</p>
                  <p className="text-xs text-neutral-600">B2 floor of main building</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 border-none"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                  Kids & Family
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-neutral-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-neutral-500">* Hover over the pins to see facility details</p>
              </div>
              <Button variant="outline" className="flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Download Full Resort Map
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Main Building</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Houses the Wellness Center (1st-2nd floor), Lounge & Entertainment (3rd floor), Business Chill (B1), and
              Kids & Family (B2)
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">East Wing</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Dedicated to the Chill Serenity Spa with treatment rooms, relaxation areas, and private spa suites
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Outdoor Areas</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Includes the Nature Chill Zone with walking paths, gardens, lake deck, and seasonal activity areas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

