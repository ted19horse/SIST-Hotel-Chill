import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import DigitalCard from '@/components/membership/DigitalCard';
import MembershipFaq from '@/components/membership/MembershipFaq';
import MembershipHero from '@/components/membership/MembershipHero';
import MembershipTiers from '@/components/membership/MembershipTiers';
import PointsSystem from '@/components/membership/PointsSystem';
import RegistrationForm from '@/components/membership/RegistrationForm';
import RoomRates from '@/components/membership/RoomRates';
import SpecialEvents from '@/components/membership/SpecialEvents';
import Testimonials from '@/components/membership/Testimonials';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">멤버십</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>멤버십</span>
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
  );
}
