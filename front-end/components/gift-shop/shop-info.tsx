import { Button } from "@/components/ui/button"
import { Clock, MapPin, Truck, CreditCard, Gift, ShoppingBag, Phone, Mail, HelpCircle } from "lucide-react"

export default function ShopInfo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop Information</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Everything you need to know about shopping at Chill Vibes Boutique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Location</h3>
            </div>
            <p className="text-neutral-600 mb-2">Adjacent to hotel lobby</p>
            <p className="text-neutral-600 text-sm">Easily accessible from the main entrance and lobby area</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Opening Hours</h3>
            </div>
            <p className="text-neutral-600 mb-2">08:00-22:00 daily</p>
            <p className="text-neutral-600 text-sm">Extended hours available during special events and holidays</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Online Shopping</h3>
            </div>
            <p className="text-neutral-600 mb-2">Available on hotel website</p>
            <p className="text-neutral-600 text-sm">With post-checkout delivery service to your home</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Membership Benefits</h3>
            </div>
            <p className="text-neutral-600 mb-2">10% discount for members</p>
            <p className="text-neutral-600 text-sm">Exclusive access to limited edition items and early sales</p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">Additional Services</h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">In-room Delivery</h4>
                    <p className="text-neutral-600 text-sm">
                      Available for guests during their stay. Simply call the boutique or use the in-room tablet to
                      place your order.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Payment Options</h4>
                    <p className="text-neutral-600 text-sm">
                      We accept all major credit cards, mobile payments, and room charges for hotel guests.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Gift Wrapping</h4>
                    <p className="text-neutral-600 text-sm">
                      Complimentary gift wrapping service available for all purchases.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-neutral-600 text-sm">02-123-4567 (ext. 8910)</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-neutral-600 text-sm">shop@chillhaven.com</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Customer Support</h4>
                    <p className="text-neutral-600 text-sm">
                      Available during shop hours. For online orders, 24/7 support via email.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-primary hover:bg-primary/90">Contact Us</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

