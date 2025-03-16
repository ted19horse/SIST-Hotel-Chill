import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function MembershipHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Guests enjoying premium amenities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chill Rewards Membership</h1>
          <p className="text-xl text-white/90 mb-6">Deepen your relaxation with every stay</p>
          <p className="text-lg mb-8 leading-relaxed">
            Join our exclusive membership program designed to enhance your healing journey at Chill Haven Resort & Spa.
            As a Chill Rewards member, you'll enjoy special privileges, personalized services, and valuable benefits
            that make each stay more rewarding than the last.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">Join Now</Button>
        </div>
      </div>
    </section>
  )
}

