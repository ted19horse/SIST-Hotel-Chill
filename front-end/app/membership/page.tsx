import Header from "@/components/header"
import MembershipHero from "@/components/membership/membership-hero"
import MembershipTiers from "@/components/membership/membership-tiers"
import PointsSystem from "@/components/membership/points-system"
import RoomRates from "@/components/membership/room-rates"
import SpecialEvents from "@/components/membership/special-events"
import RegistrationForm from "@/components/membership/registration-form"
import Testimonials from "@/components/membership/testimonials"
import DigitalCard from "@/components/membership/digital-card"
import MembershipFaq from "@/components/membership/membership-faq"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function MembershipPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">멤버쉽</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>멤버쉽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Hero */}
      <MembershipHero />

      {/* Membership Tiers */}
      <MembershipTiers />

      {/* Points System */}
      <PointsSystem />

      {/* Room Rates */}
      <RoomRates />

      {/* Special Events */}
      <SpecialEvents />

      {/* Testimonials */}
      <Testimonials />

      {/* Digital Card */}
      <DigitalCard />

      {/* Registration Form */}
      <RegistrationForm />

      {/* FAQ */}
      <MembershipFaq />

      {/* Footer */}
      <Footer />
    </main>
  )
}

