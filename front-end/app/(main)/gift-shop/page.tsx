import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import CategoryGrid from '@/components/gift-shop/CategoryGrid';
import FeaturedProducts from '@/components/gift-shop/FeaturedProducts';
import ShopInfo from '@/components/gift-shop/ShopInfo';
import ShopIntro from '@/components/gift-shop/ShopIntro';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function GiftShopPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">기프트샵</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>기프트샵</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Introduction */}
      <ShopIntro />

      {/* Product Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Shop Information */}
      <ShopInfo />

      {/* Footer */}
      <Footer />
    </main>
  );
}
