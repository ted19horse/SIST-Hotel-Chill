import ReservationPanel from '@/components/common/forms/ReservationPanel';
import MainCarousel from '@/components/common/home/MainCarousel';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import DiningSection from '@/components/dining/DiningSection';
import GiftShopSection from '@/components/gift-shop/GiftShopSection';
import RoomSection from '@/components/rooms/RoomSection';

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
  );
}
