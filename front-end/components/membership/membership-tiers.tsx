"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Wind, Waves, Droplets } from "lucide-react"

const membershipTiers = [
  {
    id: "chill-breeze",
    name: "Chill Breeze",
    level: "Basic",
    requirements: ["Free registration"],
    benefits: [
      "5% discount on room rates",
      "Welcome drink upon arrival",
      "5% discount at gift shop",
      "Birthday special treat (welcome dessert)",
      "Digital newsletter subscription",
      "Mobile check-in/check-out",
      "Access to member-exclusive promotions",
      "Earn 100 Chill Points per night stay",
    ],
    pointsPerNight: 100,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500",
    icon: Wind,
  },
  {
    id: "chill-flow",
    name: "Chill Flow",
    level: "Intermediate",
    requirements: ["3+ nights annual stay", "₩1,000,000+ annual spending at the hotel"],
    benefits: [
      "10% discount on room rates",
      "Late check-out until 2PM (subject to availability)",
      "5% discount on dining",
      "10% discount on spa treatments",
      "10% discount at gift shop",
      "One room upgrade per year (subject to availability)",
      "Enhanced welcome amenities",
      "One complimentary yoga/meditation class annually",
      "Earn 200 Chill Points per night stay",
    ],
    pointsPerNight: 200,
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-500",
    icon: Waves,
  },
  {
    id: "deep-chill",
    name: "Deep Chill",
    level: "Premium",
    requirements: [
      "5+ nights annual stay",
      "₩3,000,000+ annual spending at the hotel",
      "1+ night stay at Ultimate Chill Suite",
    ],
    benefits: [
      "15% discount on room rates",
      "Early check-in from 11AM/late check-out until 4PM (subject to availability)",
      "10% discount on dining",
      "20% discount on spa treatments",
      "15% discount at gift shop",
      "Annual appreciation gift",
      "VIP concierge service",
      "Exclusive member event invitations",
      "Complimentary 2-hour private cabana use (once annually)",
      "Priority reservations at Chill Elegance restaurant",
      "Special occasion cake and champagne service (upon request with reservation)",
      "Earn 300 Chill Points per night stay",
    ],
    pointsPerNight: 300,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500",
    icon: Droplets,
  },
]

export default function MembershipTiers() {
  const [activeTab, setActiveTab] = useState(membershipTiers[0].id)

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Tiers</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Choose the membership tier that best suits your lifestyle and enjoy a range of exclusive benefits designed
            to enhance your Chill Haven experience.
          </p>
        </div>

        {/* Mobile View - Tabs */}
        <div className="md:hidden">
          <Tabs defaultValue={membershipTiers[0].id} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              {membershipTiers.map((tier) => (
                <TabsTrigger key={tier.id} value={tier.id}>
                  {tier.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {membershipTiers.map((tier) => (
              <TabsContent key={tier.id} value={tier.id}>
                <div className={`rounded-lg border p-6 ${tier.color}`}>
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-10 h-10 rounded-full ${tier.iconColor} bg-white/80 flex items-center justify-center mr-3`}
                    >
                      <tier.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      <p className="text-sm text-neutral-600">{tier.level} Tier</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">Requirements (any one)</h4>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">Benefits</h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold">{tier.pointsPerNight}</span>
                        <span className="text-neutral-600 ml-1">points per night</span>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">Join Now</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Desktop View - Side by Side Comparison */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {membershipTiers.map((tier) => (
              <div key={tier.id} className={`rounded-lg border p-6 ${tier.color} h-full flex flex-col`}>
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-full ${tier.iconColor} bg-white/80 flex items-center justify-center mr-3`}
                  >
                    <tier.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-sm text-neutral-600">{tier.level} Tier</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">Requirements (any one)</h4>
                  <ul className="space-y-2">
                    {tier.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-grow">
                  <h4 className="font-semibold mb-2 text-sm uppercase text-neutral-500">Benefits</h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">{tier.pointsPerNight}</span>
                      <span className="text-neutral-600 ml-1">points per night</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Join Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-500 italic">
            Membership tiers are evaluated annually based on your stay history and spending.
            <br />
            Upgrades can happen at any time when requirements are met.
          </p>
        </div>
      </div>
    </section>
  )
}

