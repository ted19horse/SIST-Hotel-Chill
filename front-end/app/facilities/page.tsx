import Header from "@/components/header"
import FacilitiesIntro from "@/components/facilities/facilities-intro"
import FacilityTabs from "@/components/facilities/facility-tabs"
import FacilitiesMap from "@/components/facilities/facilities-map"
import ReservationInfo from "@/components/facilities/reservation-info"
import RoomBenefits from "@/components/facilities/room-benefits"
import InfoRequestForm from "@/components/facilities/info-request-form"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function FacilitiesPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">부대시설</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>부대시설</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Introduction */}
      <FacilitiesIntro />

      {/* Facility Tabs */}
      <FacilityTabs />

      {/* Facilities Map */}
      <FacilitiesMap />

      {/* Reservation Information */}
      <ReservationInfo />

      {/* Room Grade Benefits */}
      <RoomBenefits />

      {/* Request Information Form */}
      <InfoRequestForm />

      {/* Footer */}
      <Footer />
    </main>
  )
}

