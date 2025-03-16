import ReservationPanel from "@/components/reservation-panel"
import MainCarousel from "@/components/main-carousel"
import RoomSection from "@/components/room-section"
import DiningSection from "@/components/dining-section"
import GiftShopSection from "@/components/gift-shop-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      {/* Header is imported as a component */}
      <Header />

      {/* Main Carousel Section */}
      <section className="relative w-full h-screen">
        <MainCarousel />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <ReservationPanel />
        </div>
      </section>

      {/* Room Section */}
      <RoomSection />

      {/* Dining Section */}
      <DiningSection />

      {/* Gift Shop Section */}
      <GiftShopSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}

