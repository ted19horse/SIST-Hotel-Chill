import { CheckCircle, Circle, CircleDollarSign } from 'lucide-react';
import Image from 'next/image';

export default function PointsSystem() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Chill Points System</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Earn and redeem Chill Points with every stay to enhance your Chill Haven experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">How Points Work</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Earning Points</p>
                    <p className="text-neutral-600 text-sm">
                      Earn points with every night's stay based on your membership tier:
                      <br />• Chill Breeze: 100 points per night
                      <br />• Chill Flow: 200 points per night
                      <br />• Deep Chill: 300 points per night
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <CircleDollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Redeeming Points</p>
                    <p className="text-neutral-600 text-sm">
                      Points can be redeemed for various services at Chill Haven:
                      <br />• Room charges (1,000 points = ₩10,000)
                      <br />• Dining payments
                      <br />• Spa treatment payments
                      <br />• Gift shop purchases
                      <br />• Membership tier upgrades
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Circle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Points Validity</p>
                    <p className="text-neutral-600 text-sm">
                      Points are valid for 2 years from the date earned. Redeem them before they expire to maximize your
                      benefits.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h4 className="font-bold mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Pro Tip
              </h4>
              <p className="text-neutral-700 text-sm">
                Book directly through our website or app to ensure you earn points for your stay. Bookings through
                third-party platforms may not be eligible for Chill Points.
              </p>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=1000&width=800"
              alt="Chill Points System Visualization"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Points Conversion</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-lg font-bold">1,000 Points</p>
                  <p className="text-sm">= ₩10,000 value</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-lg font-bold">5,000 Points</p>
                  <p className="text-sm">= ₩50,000 value</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-lg font-bold">10,000 Points</p>
                  <p className="text-sm">= ₩100,000 value</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-lg font-bold">50,000 Points</p>
                  <p className="text-sm">= ₩500,000 value</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-100">
              <h4 className="font-bold mb-3">Bonus Points Opportunities</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li>• Book directly: +10% bonus points</li>
                <li>• Extended stays (5+ nights): +15% bonus points</li>
                <li>• Refer a friend: 1,000 bonus points</li>
                <li>• Anniversary of joining: Double points for that stay</li>
                <li>• Special promotions: Seasonal bonus point events</li>
              </ul>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-100">
              <h4 className="font-bold mb-3">Tier Upgrade with Points</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li>• Chill Breeze to Chill Flow: 20,000 points</li>
                <li>• Chill Flow to Deep Chill: 50,000 points</li>
                <li>• Points-based upgrades are valid for one year</li>
                <li>• Can be combined with stay/spending requirements</li>
                <li>• Upgrade at any time when points threshold is reached</li>
              </ul>
            </div>
            <div className="p-6">
              <h4 className="font-bold mb-3">Tracking Your Points</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li>• Real-time points balance in mobile app</li>
                <li>• Monthly email statements</li>
                <li>• Points activity history available online</li>
                <li>• Expiration notifications sent 3 months in advance</li>
                <li>• Customer service assistance for points inquiries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
