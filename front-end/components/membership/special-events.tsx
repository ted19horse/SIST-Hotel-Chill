import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Gift, Award } from "lucide-react"

export default function SpecialEvents() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Special Events</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Enjoy exclusive events and promotions designed specifically for our valued Chill Rewards members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Seasonal Member Events"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold">Seasonal Member-Exclusive Events</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Throughout the year, we host special events exclusively for our members, designed to enhance your
                wellness journey and create memorable experiences.
              </p>
              <div className="space-y-3 mb-6">
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Spring Renewal Retreat</p>
                  <p className="text-sm text-neutral-600">
                    Yoga and meditation workshops focused on renewal and growth
                  </p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Summer Wellness Weekend</p>
                  <p className="text-sm text-neutral-600">
                    Outdoor activities, nutrition classes, and lake experiences
                  </p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Autumn Mindfulness Gathering</p>
                  <p className="text-sm text-neutral-600">
                    Forest walks, tea ceremonies, and stress-reduction workshops
                  </p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Winter Restoration Series</p>
                  <p className="text-sm text-neutral-600">
                    Healing spa treatments, cooking classes, and relaxation techniques
                  </p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">View Upcoming Events</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Member Appreciation"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Gift className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold">Quarterly Member Appreciation</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Every quarter, we celebrate our members with special promotions, bonus points, and exclusive offers to
                show our appreciation for your loyalty.
              </p>
              <div className="space-y-3 mb-6">
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Q1: New Year Renewal</p>
                  <p className="text-sm text-neutral-600">Double points on January stays, wellness package discounts</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Q2: Spring Awakening</p>
                  <p className="text-sm text-neutral-600">Complimentary room upgrades, spa treatment bonuses</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Q3: Summer Celebration</p>
                  <p className="text-sm text-neutral-600">Family package deals, kids stay free promotions</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="font-medium">Q4: Holiday Gratitude</p>
                  <p className="text-sm text-neutral-600">Gift shop vouchers, festive dining experiences</p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Current Promotions</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-xl font-bold">Partner Brand Benefits</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Enjoy special privileges with our carefully selected partner brands that share our commitment to wellness
              and quality.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Partner Logo" width={24} height={24} />
                </div>
                <div>
                  <p className="font-medium">Serene Spa Products</p>
                  <p className="text-sm text-neutral-600">15% discount on all products, exclusive member gift sets</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Partner Logo" width={24} height={24} />
                </div>
                <div>
                  <p className="font-medium">Mindful Apparel</p>
                  <p className="text-sm text-neutral-600">
                    10% discount on sustainable clothing, member-only collections
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Partner Logo" width={24} height={24} />
                </div>
                <div>
                  <p className="font-medium">Wellness Retreats International</p>
                  <p className="text-sm text-neutral-600">Special rates on international wellness retreats</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Partner Logo" width={24} height={24} />
                </div>
                <div>
                  <p className="font-medium">Organic Dining Co.</p>
                  <p className="text-sm text-neutral-600">Priority reservations, complimentary chef's special</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-xl font-bold">Member Referral Program</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Share the Chill Haven experience with friends and family and be rewarded for your referrals.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mb-6">
              <h4 className="font-bold mb-2">How It Works</h4>
              <ol className="space-y-2 text-sm text-neutral-600 list-decimal pl-4">
                <li>Share your unique referral code with friends and family</li>
                <li>They receive 1,000 bonus points when joining Chill Rewards</li>
                <li>After their first stay, you receive 2,000 bonus points</li>
                <li>Refer 5 friends who complete stays to earn a complimentary night</li>
              </ol>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-primary">Referral Bonus Tiers</p>
                  <p className="text-sm text-neutral-600">The more you refer, the more you earn</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Start Referring</Button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-white p-2 rounded">
                  <p className="font-bold">5 Referrals</p>
                  <p className="text-neutral-600">Free Night</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-bold">10 Referrals</p>
                  <p className="text-neutral-600">Tier Upgrade</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-bold">20 Referrals</p>
                  <p className="text-neutral-600">Spa Package</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

