import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import DiningFilters from '@/components/dining/DiningFilters';
import DiningIntro from '@/components/dining/DiningIntro';
import DiningMap from '@/components/dining/DiningMap';
import RestaurantGrid from '@/components/dining/RestaurantGrid';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DiningPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">다이닝</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>다이닝</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dining Introduction */}
      <DiningIntro />

      {/* Dining Filters and Restaurants */}
      <div className="container mx-auto px-4 py-12">
        <DiningFilters />
        <RestaurantGrid />
      </div>

      {/* Dining Map */}
      <DiningMap />

      {/* Footer */}
      <Footer />
    </main>
  );
}
