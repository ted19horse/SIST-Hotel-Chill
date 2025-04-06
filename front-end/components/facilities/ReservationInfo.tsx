import { CalendarClock, Clock, Users, Sparkles } from "lucide-react"

export default function ReservationInfo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reservation Information</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Plan ahead to ensure availability of our popular facilities and services during your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <CalendarClock className="h-5 w-5 mr-2 text-primary" />
              Advance Reservation Requirements
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Spa Treatments</h4>
                  <p className="text-neutral-600 text-sm">
                    Recommended at least 2 hours in advance. For premium treatments and weekend appointments, we suggest
                    booking 1-2 days ahead.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Yoga & Meditation Classes</h4>
                  <p className="text-neutral-600 text-sm">
                    Required 1 day in advance (maximum 12 people per class). Classes are held daily at 7:00, 10:00, and
                    17:00.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Private Cabanas</h4>
                  <p className="text-neutral-600 text-sm">
                    Recommended 3 days in advance, especially during peak season. Cabanas include premium service,
                    refreshments, and lake views.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <CalendarClock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Meeting Rooms & Banquet Hall</h4>
                  <p className="text-neutral-600 text-sm">
                    Required 1 week in advance. For large events and conferences, we recommend booking at least 1 month
                    ahead.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Kids Care Services</h4>
                  <p className="text-neutral-600 text-sm">
                    Required 4 hours in advance. Professional childcare is available for children aged 3-12 years.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold mb-6">How to Make Reservations</h3>

            <div className="space-y-6">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">In-Person</h4>
                <p className="text-neutral-600 text-sm">
                  Visit our Concierge Desk in the main lobby, open 24 hours daily.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">By Phone</h4>
                <p className="text-neutral-600 text-sm">
                  Call our Reservations Team at 02-123-4567 (ext. 1234), available from 8:00 to 20:00 daily.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">In-Room</h4>
                <p className="text-neutral-600 text-sm">
                  Use the in-room tablet or dial "0" from your room phone to reach our Guest Services team.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Online</h4>
                <p className="text-neutral-600 text-sm">
                  Log in to your reservation on our website or use the Chill Haven mobile app to book facilities.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Pre-Arrival</h4>
                <p className="text-neutral-600 text-sm">
                  Our pre-arrival concierge will contact you 3 days before check-in to assist with facility
                  reservations.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm text-neutral-700">
                <strong>Note:</strong> Cancellation policy requires 4 hours notice for most services and 24 hours for
                spa treatments and private events to avoid cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

