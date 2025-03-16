"use client"

import { useState } from "react"
import Header from "@/components/header"
import AccountLayout from "@/components/my-account/account-layout"
import ProfileSummary from "@/components/my-account/profile-summary"
import ProfileSettings from "@/components/my-account/profile-settings"
import RoomReservations from "@/components/my-account/room-reservations"
import DiningReservations from "@/components/my-account/dining-reservations"
import MembershipRewards from "@/components/my-account/membership-rewards"
import PaymentMethods from "@/components/my-account/payment-methods"
import Preferences from "@/components/my-account/preferences"
import Support from "@/components/my-account/support"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

// Navigation sections
const sections = {
  overview: "overview",
  profile: "profile",
  roomReservations: "room-reservations",
  diningReservations: "dining-reservations",
  rewards: "rewards",
  payments: "payments",
  preferences: "preferences",
  support: "support",
}

export default function MyAccountPage() {
  const [activeSection, setActiveSection] = useState(sections.overview)

  const renderSection = () => {
    switch (activeSection) {
      case sections.overview:
        return <ProfileSummary />
      case sections.profile:
        return <ProfileSettings />
      case sections.roomReservations:
        return <RoomReservations />
      case sections.diningReservations:
        return <DiningReservations />
      case sections.rewards:
        return <MembershipRewards />
      case sections.payments:
        return <PaymentMethods />
      case sections.preferences:
        return <Preferences />
      case sections.support:
        return <Support />
      default:
        return <ProfileSummary />
    }
  }

  return (
    <main className="min-h-screen">
      <ScrollToTop />
      {/* Header */}
      <Header />

      {/* Page Banner */}
      <div className="relative h-[30vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">마이 페이지</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>마이 페이지</span>
            </div>
          </div>
        </div>
      </div>

      <AccountLayout activeSection={activeSection} setActiveSection={setActiveSection} sections={sections}>
        {renderSection()}
      </AccountLayout>

      {/* Footer */}
      <Footer />
    </main>
  )
}

