"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Droplets, Gift, Calendar, ArrowRight, ChevronRight, Clock } from "lucide-react"

export default function MembershipRewards() {
  // Mock data
  const membershipData = {
    tier: "Deep Chill",
    points: 32450,
    tierProgress: 65,
    nextTier: "Deep Chill+",
    pointsToNextTier: 17550,
    nextTierThreshold: 50000,
    memberSince: "2023-05-15",
    expiringPoints: 5000,
    expirationDate: "2025-06-30",
    lastActivity: "2025-03-10",
    tierBenefits: [
      "15% discount on room rates",
      "Early check-in from 11AM/late check-out until 4PM",
      "10% discount on dining",
      "20% discount on spa treatments",
      "15% discount at gift shop",
      "Annual appreciation gift",
      "VIP concierge service",
      "Exclusive member event invitations",
      "Complimentary 2-hour private cabana use (once annually)",
      "Priority reservations at Chill Elegance restaurant",
      "Special occasion cake and champagne service",
    ],
    pointsHistory: [
      {
        id: "trx-123456",
        date: "2025-03-10",
        description: "Room Stay - Chill Serenity Room",
        points: 3000,
        type: "earned",
      },
      {
        id: "trx-123455",
        date: "2025-02-14",
        description: "Dining - Chill Elegance",
        points: 850,
        type: "earned",
      },
      {
        id: "trx-123454",
        date: "2025-01-15",
        description: "Room Stay - Chill Lake Suite",
        points: 12000,
        type: "earned",
      },
      {
        id: "trx-123453",
        date: "2025-01-12",
        description: "Spa Treatment",
        points: 1200,
        type: "earned",
      },
      {
        id: "trx-123452",
        date: "2024-12-10",
        description: "Gift Shop Purchase",
        points: 450,
        type: "earned",
      },
      {
        id: "trx-123451",
        date: "2024-11-25",
        description: "Room Charge Redemption",
        points: -10000,
        type: "redeemed",
      },
    ],
    availableOffers: [
      {
        id: "offer-1",
        title: "Weekend Escape Package",
        description: "50% off second night when you book a weekend stay",
        pointsRequired: 0,
        validUntil: "2025-05-31",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "offer-2",
        title: "Spa Credit",
        description: "₩100,000 spa credit with any treatment booking",
        pointsRequired: 15000,
        validUntil: "2025-04-30",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "offer-3",
        title: "Complimentary Room Upgrade",
        description: "Guaranteed room upgrade on your next stay",
        pointsRequired: 20000,
        validUntil: "2025-06-30",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chill Rewards</h1>

      {/* Membership Overview Card */}
      <div className="bg-neutral-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Membership Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-primary/80 to-purple-500/80 rounded-lg p-5 text-white mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs opacity-80">CHILL REWARDS</p>
                  <p className="font-bold">{membershipData.tier.toUpperCase()}</p>
                </div>
                <Droplets className="h-5 w-5" />
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium">Min-Ji Park</p>
                <p className="text-xs opacity-80">Member since {formatDate(membershipData.memberSince)}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-80">Points Balance</p>
                  <p className="text-2xl font-bold">{membershipData.points.toLocaleString()}</p>
                </div>

                {/* QR Code placeholder */}
                <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-10 h-10 bg-neutral-800 rounded-sm"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Tier Progress</p>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{membershipData.tier}</Badge>
              </div>
              <Progress value={membershipData.tierProgress} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-neutral-500 mb-4">
                <span>Current</span>
                <span>
                  {membershipData.pointsToNextTier.toLocaleString()} points to {membershipData.nextTier}
                </span>
              </div>

              <div className="bg-amber-50 p-3 rounded-md border border-amber-200 flex items-start">
                <Clock className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Points Expiring Soon</p>
                  <p className="text-xs text-amber-700">
                    {membershipData.expiringPoints.toLocaleString()} points will expire on{" "}
                    {formatDate(membershipData.expirationDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Benefits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-5 border border-neutral-200 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Your {membershipData.tier} Benefits</h3>
                <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                  View All Benefits
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {membershipData.tierBenefits.slice(0, 6).map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>

              {membershipData.tierBenefits.length > 6 && (
                <div className="flex items-center text-primary text-sm font-medium mb-4">
                  <span>+{membershipData.tierBenefits.length - 6} more benefits</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Gift className="h-4 w-4 mr-2" />
                  Redeem Points
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Points Activity and Offers */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="activity">Points Activity</TabsTrigger>
          <TabsTrigger value="offers">Special Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h3 className="font-bold">Recent Activity</h3>
              <p className="text-sm text-neutral-500">Last updated: {formatDate(membershipData.lastActivity)}</p>
            </div>

            <div className="divide-y divide-neutral-200">
              {membershipData.pointsHistory.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-neutral-500">{formatDate(transaction.date)}</p>
                    </div>
                    <div className={`font-bold ${transaction.type === "earned" ? "text-green-600" : "text-amber-600"}`}>
                      {transaction.type === "earned" ? "+" : ""}
                      {transaction.points.toLocaleString()} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-center">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                View Full History
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="offers">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipData.availableOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <div className="relative h-40">
                  <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{offer.title}</h3>
                    {offer.pointsRequired > 0 && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {offer.pointsRequired.toLocaleString()} pts
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-neutral-500">Valid until {formatDate(offer.validUntil)}</p>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      Redeem
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
              View All Offers
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

