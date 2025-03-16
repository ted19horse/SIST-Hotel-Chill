import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import {
  Camera,
  Droplets,
  Calendar,
  Utensils,
  Check,
  ChevronRight,
  CreditCard,
  Settings,
  LifeBuoy,
  Gift,
} from "lucide-react"

export default function ProfileSummary() {
  // Mock data
  const user = {
    name: "Min-Ji Park",
    email: "minji.park@example.com",
    profileImage: "/placeholder.svg?height=200&width=200",
    membershipTier: "Deep Chill",
    membershipNumber: "CH-38291",
    points: 32450,
    lastPointsUpdate: "2025-03-10T10:30:00",
    tierProgress: 65,
    nextTierPoints: 50000,
    pointsToNextTier: 17550,
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-lg p-6 h-full">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-neutral-600 text-sm mb-3">{user.email}</p>

              <div className="flex items-center mb-4">
                <Droplets className="h-5 w-5 text-purple-500 mr-1.5" />
                <span className="font-medium text-purple-700">{user.membershipTier}</span>
              </div>

              <div className="bg-gradient-to-r from-primary/80 to-purple-500/80 rounded-md p-4 w-full text-white mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs opacity-80">CHILL REWARDS</p>
                    <p className="font-bold">{user.membershipTier.toUpperCase()}</p>
                  </div>
                  <Droplets className="h-5 w-5" />
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs opacity-80">Member #: {user.membershipNumber}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80">Points Balance</p>
                    <p className="text-lg font-bold">{user.points.toLocaleString()}</p>
                  </div>

                  {/* QR Code placeholder */}
                  <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-8 h-8 bg-neutral-800 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">Tier Progress</span>
                  <span className="font-medium">{user.pointsToNextTier.toLocaleString()} points to next tier</span>
                </div>
                <Progress value={user.tierProgress} className="h-2 mb-4" />
                <p className="text-xs text-neutral-500 text-center">
                  Last updated: {new Date(user.lastPointsUpdate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">Room Reservations</h3>
                <Calendar className="h-5 w-5 text-primary" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>1 upcoming reservation</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>3 past stays this year</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Button className="bg-primary hover:bg-primary/90 text-white">Book a New Stay</Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  View My Reservations
                </Button>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">Dining Reservations</h3>
                <Utensils className="h-5 w-5 text-primary" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>No upcoming dining reservations</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>2 past dining experiences</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Button className="bg-primary hover:bg-primary/90 text-white">Make Dining Reservation</Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Browse Restaurants
                </Button>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6 sm:col-span-2">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100 justify-start">
                  <Droplets className="h-4 w-4 text-primary mr-2" />
                  <span>Redeem Points</span>
                </Button>

                <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100 justify-start">
                  <CreditCard className="h-4 w-4 text-primary mr-2" />
                  <span>Payment Methods</span>
                </Button>

                <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100 justify-start">
                  <Settings className="h-4 w-4 text-primary mr-2" />
                  <span>Room Preferences</span>
                </Button>

                <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100 justify-start">
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span>Book Spa Services</span>
                </Button>

                <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100 justify-start">
                  <LifeBuoy className="h-4 w-4 text-primary mr-2" />
                  <span>Contact Support</span>
                </Button>

                <Button variant="outline" className="border-neutral-200 hover:bg-neutral-100 justify-start">
                  <Gift className="h-4 w-4 text-primary mr-2" />
                  <span>Special Offers</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Reservation Summary */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">My Upcoming Stay</h2>

        <div className="bg-neutral-50 rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-48 h-48 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Chill Serenity Room"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Chill Serenity Room</h3>
                  <p className="text-neutral-600">Reservation #CH-123456</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-neutral-500">Check-in</p>
                  <p className="font-medium">Mar 25, 2025</p>
                  <p className="text-sm">From 3:00 PM</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Check-out</p>
                  <p className="font-medium">Mar 28, 2025</p>
                  <p className="text-sm">Until 11:00 AM</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Guests</p>
                  <p className="font-medium">2 Adults</p>
                  <p className="text-sm">1 Room</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Modify Reservation
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Add to Calendar
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

