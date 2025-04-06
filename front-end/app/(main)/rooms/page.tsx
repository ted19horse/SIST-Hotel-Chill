import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomList from '@/components/rooms/RoomList';
import { rooms as mockRooms } from '@/data/rooms/types/rooms';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">객실 예약</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Suspense
              fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-[600px]"></div>}
            >
              <RoomFilters />
            </Suspense>
          </aside>

          <main className="lg:w-3/4">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                      <div className="bg-gray-200 h-40 rounded-b-lg mt-1"></div>
                    </div>
                  ))}
                </div>
              }
            >
              <RoomList rooms={mockRooms} />
            </Suspense>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
