import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Minjun Kim",
    tier: "Deep Chill",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "Being a Deep Chill member has transformed my stays at Chill Haven. The early check-in and late check-out options give me the flexibility I need for business trips, and the spa discounts have made my wellness routine more affordable. The annual appreciation gift was a wonderful surprise too!",
    rating: 5,
  },
  {
    id: 2,
    name: "Soo-Jin Park",
    tier: "Chill Flow",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "I love the Chill Points system! I've already redeemed points for a spa treatment and a dinner at Chill Elegance. The member-exclusive events are also fantastic - the yoga retreat last spring was exactly what I needed to de-stress.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Chen",
    tier: "Chill Breeze",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "Even at the Chill Breeze level, I've experienced significant benefits. The room discount and welcome drink make me feel valued, and I'm excited to earn enough points to upgrade to Chill Flow soon. The mobile check-in feature saves so much time!",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Member Experiences</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from our Chill Rewards members about how the program has enhanced their stays at Chill Haven Resort &
            Spa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-primary">{testimonial.tier} Member</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}`}
                  />
                ))}
              </div>

              <blockquote className="text-neutral-600 italic mb-4">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-lg p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Featured Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Member Spotlight: Ji-Hoon Lee</h3>
              <p className="text-primary font-medium mb-2">Deep Chill Member since 2022</p>
              <blockquote className="text-neutral-700 italic mb-4">
                "As a frequent business traveler, the Deep Chill membership has been invaluable. The VIP concierge
                service has helped me arrange last-minute meetings in the business center, and the early check-in option
                means I can refresh before important presentations. I've redeemed over 50,000 Chill Points for stays and
                dining experiences in the past year alone!"
              </blockquote>
              <div className="flex justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

