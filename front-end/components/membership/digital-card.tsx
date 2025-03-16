import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Smartphone, CreditCard, Bell, BarChart } from "lucide-react"

export default function DigitalCard() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital Membership Card</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Access your Chill Rewards membership anytime, anywhere with our digital card in the Chill Haven mobile
              app.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Mobile Access</h3>
                  <p className="text-neutral-600">
                    Your digital membership card is always with you in the Chill Haven app, eliminating the need for a
                    physical card.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Real-Time Points Tracking</h3>
                  <p className="text-neutral-600">
                    Check your Chill Points balance, view your earning history, and track points expiration dates in
                    real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Easy Redemption</h3>
                  <p className="text-neutral-600">
                    Redeem your points directly through the app for room charges, dining, spa treatments, and more with
                    just a few taps.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Personalized Notifications</h3>
                  <p className="text-neutral-600">
                    Receive tailored offers, event invitations, and promotions based on your preferences and membership
                    tier.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90">Download App</Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=1200&width=600"
                alt="Digital Membership Card Preview"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 w-64 h-32 bg-white rounded-lg shadow-lg p-4 transform rotate-6">
              <div className="h-full w-full bg-gradient-to-r from-primary/80 to-purple-500/80 rounded-md p-3 text-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs opacity-80">CHILL REWARDS</p>
                    <p className="font-bold">DEEP CHILL</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium">Min-Ji Park</p>
                  <p className="text-xs opacity-80">Member since 2023</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs opacity-80">ID: CH-38291</p>
                  <p className="text-sm font-bold">32,450 pts</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-64 bg-white rounded-lg shadow-lg p-4 transform -rotate-6">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold">Current Points</p>
                <p className="text-primary font-bold">32,450</p>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
              <p className="text-xs text-neutral-500 mt-1">16,550 more points until tier upgrade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

