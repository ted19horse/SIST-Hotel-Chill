"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MembershipFaq() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about the Chill Rewards membership program.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I earn Chill Points?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 mb-2">
                  You earn Chill Points primarily through your stays at Chill Haven Resort & Spa. The number of points
                  you earn per night depends on your membership tier:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li>Chill Breeze: 100 points per night</li>
                  <li>Chill Flow: 200 points per night</li>
                  <li>Deep Chill: 300 points per night</li>
                </ul>
                <p className="text-neutral-600 mt-2">
                  You can also earn bonus points through special promotions, referrals, and by spending at our
                  restaurants, spa, and gift shop.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I redeem my Chill Points?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 mb-2">You can redeem your Chill Points in several ways:</p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li>Room charges (1,000 points = ₩10,000)</li>
                  <li>Dining payments at any of our restaurants</li>
                  <li>Spa treatment payments</li>
                  <li>Gift shop purchases</li>
                  <li>Membership tier upgrades</li>
                </ul>
                <p className="text-neutral-600 mt-2">
                  To redeem, simply inform our staff at the time of payment or use the redemption feature in the Chill
                  Haven mobile app.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How long are my Chill Points valid?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600">
                  Chill Points are valid for 2 years from the date they are earned. For example, points earned on May
                  15, 2023, will expire on May 15, 2025. We'll send you notifications when your points are approaching
                  expiration so you can use them before they expire.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I upgrade my membership tier?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 mb-2">There are three ways to upgrade your membership tier:</p>
                <ol className="list-decimal pl-5 space-y-1 text-neutral-600">
                  <li>
                    <strong>Stay-based qualification:</strong> Achieve the required number of nights per year (3+ nights
                    for Chill Flow, 5+ nights for Deep Chill)
                  </li>
                  <li>
                    <strong>Spending-based qualification:</strong> Meet the annual spending threshold (₩1,000,000+ for
                    Chill Flow, ₩3,000,000+ for Deep Chill)
                  </li>
                  <li>
                    <strong>Points-based upgrade:</strong> Redeem your Chill Points for a tier upgrade (20,000 points
                    for Chill Flow, 50,000 points for Deep Chill)
                  </li>
                </ol>
                <p className="text-neutral-600 mt-2">
                  For Deep Chill, you can also qualify by staying at least one night in the Ultimate Chill Suite.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How long is my membership valid?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600">
                  Your Chill Rewards membership is valid indefinitely at the Chill Breeze level. For Chill Flow and Deep
                  Chill tiers, your status is evaluated annually based on your stay history and spending from the
                  previous year. If you meet the requirements, your tier status will be renewed for another year. If
                  not, you'll be moved to the appropriate tier based on your activity.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Can I transfer my Chill Points to someone else?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600">
                  Yes, Chill Points can be transferred to immediate family members (spouse, parents, children, and
                  siblings) who are also Chill Rewards members. To transfer points, both members must be present at the
                  hotel with valid ID, or you can submit a transfer request through your online account with appropriate
                  documentation. There is a limit of 10,000 points per transfer, and a maximum of 30,000 points can be
                  transferred per year.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Do I earn points on discounted rates?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600">
                  Yes, you earn Chill Points on most rates, including discounted rates and special promotions. However,
                  points are not earned on complimentary stays, employee rates, wholesale/tour operator rates, or stays
                  booked through certain third-party channels. For the most accurate information, we recommend booking
                  directly through our website, app, or reservation line.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>How do I access member-exclusive events?</AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600">
                  Information about member-exclusive events is communicated through email, the Chill Haven mobile app,
                  and your online member portal. Deep Chill members receive priority invitations to all events. Some
                  events require registration and may have limited capacity, so we recommend signing up early. Most
                  events are complimentary for members, though some premium experiences may have an associated fee or
                  point redemption option.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-600">
            Have more questions? Contact our membership team at{" "}
            <a href="mailto:membership@chillhaven.com" className="text-primary hover:underline">
              membership@chillhaven.com
            </a>{" "}
            or call{" "}
            <a href="tel:02-123-4567" className="text-primary hover:underline">
              02-123-4567 (ext. 2)
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

