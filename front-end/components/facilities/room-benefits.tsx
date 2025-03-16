import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"

export default function RoomBenefits() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Room Grade Benefits</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Each room type includes special access and complimentary services to enhance your stay.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] bg-neutral-100">Room Type</TableHead>
                  <TableHead className="text-center">Wellness Center Access</TableHead>
                  <TableHead className="text-center">Yoga/Meditation Class</TableHead>
                  <TableHead className="text-center">Family Activity</TableHead>
                  <TableHead className="text-center">Spa Treatment</TableHead>
                  <TableHead className="text-center">Cabana Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium bg-neutral-50">Chill Comfort & Harmony Room</TableCell>
                  <TableCell className="text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-neutral-50">Chill Serenity Room</TableCell>
                  <TableCell className="text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">1 complimentary class</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-neutral-50">Chill Family Suite</TableCell>
                  <TableCell className="text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">1 complimentary activity</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-neutral-50">Chill Lake Suite</TableCell>
                  <TableCell className="text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">1 complimentary class</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">30-min complimentary</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-5 w-5 text-neutral-300 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-neutral-50">Ultimate Chill Suite</TableCell>
                  <TableCell className="text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">Unlimited access</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">1 complimentary activity</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-center">60-min complimentary</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Additional Benefits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Early Check-in & Late Check-out</h4>
              <p className="text-neutral-600 text-sm">
                Suite guests receive priority for early check-in (from 12:00) and late check-out (until 14:00), subject
                to availability.
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Wellness Center Extended Hours</h4>
              <p className="text-neutral-600 text-sm">
                Suite guests can access the Wellness Center from 5:30 to 23:00, extending beyond regular hours.
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Dining Reservations</h4>
              <p className="text-neutral-600 text-sm">
                Suite guests receive priority reservations at all dining venues, including exclusive access to Chill
                Elegance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

