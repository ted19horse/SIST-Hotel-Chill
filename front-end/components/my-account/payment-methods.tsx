"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CreditCard, PlusCircle, Trash2, Edit, Check, AlertCircle, CreditCardIcon } from "lucide-react"

export default function PaymentMethods() {
  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "card-1",
      type: "visa",
      name: "Min-Ji Park",
      number: "•••• •••• •••• 4567",
      expiry: "09/27",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "mastercard",
      name: "Min-Ji Park",
      number: "•••• •••• •••• 8901",
      expiry: "12/25",
      isDefault: false,
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(
      paymentMethods.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      })),
    )
  }

  const handleDeleteCard = (cardId: string) => {
    setPaymentMethods(paymentMethods.filter((card) => card.id !== cardId))
  }

  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return (
          <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center text-white">
            <span className="text-xs font-bold">VISA</span>
          </div>
        )
      case "mastercard":
        return (
          <div className="flex">
            <div className="w-5 h-6 bg-red-500 rounded-l"></div>
            <div className="w-5 h-6 bg-yellow-400 rounded-r"></div>
          </div>
        )
      case "amex":
        return (
          <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white">
            <span className="text-xs font-bold">AMEX</span>
          </div>
        )
      default:
        return <CreditCardIcon className="h-6 w-6 text-neutral-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Payment Methods</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setShowAddCard(!showAddCard)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Add New Card Form */}
      {showAddCard && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Payment Method</CardTitle>
            <CardDescription>Enter your card details to save for future bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="Enter name as it appears on card" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">Security Code (CVV)</Label>
                <Input id="cvv" placeholder="123" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input id="billingAddress" placeholder="Enter your billing address" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="City" />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="Postal Code" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kr">South Korea</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex items-center space-x-2 pt-2">
                <Switch id="setDefault" />
                <Label htmlFor="setDefault">Set as default payment method</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddCard(false)}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Check className="h-4 w-4 mr-2" />
              Save Card
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Saved Payment Methods */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Saved Payment Methods</h2>

        {paymentMethods.length === 0 ? (
          <div className="bg-neutral-50 rounded-lg p-8 text-center">
            <CreditCard className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-medium text-neutral-600 mb-2">No Payment Methods</h3>
            <p className="text-neutral-500 mb-6">You haven't added any payment methods yet.</p>
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setShowAddCard(true)}>
              Add Payment Method
            </Button>
          </div>
        ) : (
          paymentMethods.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-lg border ${card.isDefault ? "border-primary" : "border-neutral-200"} p-4`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="mr-4">{getCardIcon(card.type)}</div>
                  <div>
                    <p className="font-medium">{card.number}</p>
                    <p className="text-sm text-neutral-500">
                      {card.name} • Expires {card.expiry}
                    </p>
                  </div>
                  {card.isDefault && (
                    <Badge className="ml-4 bg-primary/10 text-primary hover:bg-primary/20">Default</Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  {!card.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary hover:bg-primary/10"
                      onClick={() => handleSetDefault(card.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment Security Notice */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Secure Payments</h3>
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and securely stored. We never store your full card details on our
              servers. All transactions are processed through our secure payment gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

