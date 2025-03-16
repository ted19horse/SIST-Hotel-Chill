import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Info } from "lucide-react"

export default function RoomRates() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Room Rates Reference</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our transparent pricing helps you plan your stay and understand the value of your membership discounts.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] bg-neutral-100">Room Type</TableHead>
                  <TableHead className="text-right">
                    Weekday Rate
                    <br />
                    (Sun-Thu)
                  </TableHead>
                  <TableHead className="text-right">
                    Weekend Rate
                    <br />
                    (Fri-Sat)
                  </TableHead>
                  <TableHead className="text-right">Peak Season Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Chill Comfort Room</TableCell>
                  <TableCell className="text-right">₩220,000</TableCell>
                  <TableCell className="text-right">₩270,000</TableCell>
                  <TableCell className="text-right">₩320,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Harmony Room</TableCell>
                  <TableCell className="text-right">₩280,000</TableCell>
                  <TableCell className="text-right">₩350,000</TableCell>
                  <TableCell className="text-right">₩400,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Serenity Room</TableCell>
                  <TableCell className="text-right">₩380,000</TableCell>
                  <TableCell className="text-right">₩450,000</TableCell>
                  <TableCell className="text-right">₩520,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Family Suite</TableCell>
                  <TableCell className="text-right">₩520,000</TableCell>
                  <TableCell className="text-right">₩650,000</TableCell>
                  <TableCell className="text-right">₩750,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chill Lake Suite</TableCell>
                  <TableCell className="text-right">₩680,000</TableCell>
                  <TableCell className="text-right">₩820,000</TableCell>
                  <TableCell className="text-right">₩950,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ultimate Chill Suite</TableCell>
                  <TableCell className="text-right">₩950,000</TableCell>
                  <TableCell className="text-right">₩1,200,000</TableCell>
                  <TableCell className="text-right">₩1,500,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="p-4 bg-neutral-50 flex items-start">
            <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              Peak season includes July-August summer season, December 20-January 5 year-end holidays, and major holiday
              periods. All rates are subject to 10% VAT. Membership discounts apply to these base rates.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3">Membership Savings Example</h3>
            <p className="text-neutral-600 text-sm mb-4">
              See how much you can save with your Chill Rewards membership:
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-sm">2-night weekend stay (Chill Harmony Room)</span>
                <span className="font-medium">₩700,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-sm">Deep Chill discount (15%)</span>
                <span className="font-medium text-green-600">-₩105,000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-sm">Points earned (600 points)</span>
                <span className="font-medium text-primary">+₩6,000 value</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total savings</span>
                <span className="text-green-600">₩111,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3">Seasonal Rate Calendar</h3>
            <p className="text-neutral-600 text-sm mb-4">Plan your stay to maximize value:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Value Season (Best Rates)</span>
                <span className="font-medium">Feb, May, Jun, Sep, Nov</span>
              </li>
              <li className="flex justify-between">
                <span>Regular Season</span>
                <span className="font-medium">Mar, Apr, Oct</span>
              </li>
              <li className="flex justify-between">
                <span>Peak Season</span>
                <span className="font-medium">Jul, Aug, Dec, Jan</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">
              * Specific dates may vary. Check our booking calendar for the most accurate rates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3">Special Rate Offers</h3>
            <p className="text-neutral-600 text-sm mb-4">Exclusive for Chill Rewards members:</p>
            <ul className="space-y-2 text-sm">
              <li>• Member-only flash sales (up to 30% off)</li>
              <li>• Extended stay discounts (5+ nights)</li>
              <li>• Early bird booking benefits</li>
              <li>• Last-minute availability offers</li>
              <li>• Birthday month special rates</li>
              <li>• Anniversary celebration packages</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">
              * Special offers are announced via email and in the mobile app.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

