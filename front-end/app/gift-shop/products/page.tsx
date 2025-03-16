import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/gift-shop/product-grid"
import ProductFilters from "@/components/gift-shop/product-filters"
import ProductSearch from "@/components/gift-shop/product-search"
import ShoppingCart from "@/components/gift-shop/shopping-cart"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"

export default function GiftShopProductsPage() {
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      {/* Header is imported as a component */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">기프트샵</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/gift-shop" className="hover:underline">
                기프트샵
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>상품</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <ProductSearch />
              <ProductFilters />
              <ShoppingCart />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <ProductGrid />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

