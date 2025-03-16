import Header from "@/components/header"
import RoomFilters from "@/components/rooms/room-filters"
import RoomGrid from "@/components/rooms/room-grid"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function RoomsPage() {
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      {/* Header is imported as a component */}
      <Header />

      {/* Page Banner */}
      <div className="relative h-[40vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">객실 안내</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>객실</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Filters and Listings */}
      <div className="container mx-auto px-4 py-12">
        <RoomFilters />
        <RoomGrid />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

