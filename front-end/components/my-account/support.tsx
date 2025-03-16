"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { LifeBuoy, MessageSquare, Phone, Mail, HelpCircle, Send, Clock, CheckCircle2 } from "lucide-react"

export default function Support() {
  // Mock support tickets
  const [supportTickets, setSupportTickets] = useState([
    {
      id: "ticket-123456",
      subject: "Room upgrade request",
      message: "I would like to request an upgrade for my upcoming stay on March 25-28.",
      status: "open",
      createdAt: "2025-03-15T10:30:00",
      responses: [
        {
          id: "response-1",
          from: "support",
          message: "Thank you for your request. We'll check availability and get back to you shortly.",
          timestamp: "2025-03-15T11:45:00",
        },
      ],
    },
    {
      id: "ticket-123455",
      subject: "Billing inquiry",
      message: "I noticed an unexpected charge on my last stay. Could you please provide details about this charge?",
      status: "closed",
      createdAt: "2025-02-20T14:20:00",
      responses: [
        {
          id: "response-1",
          from: "support",
          message:
            "Thank you for bringing this to our attention. We've reviewed your account and found that there was an error in our billing system. We've processed a refund for the incorrect charge, which should appear in your account within 3-5 business days.",
          timestamp: "2025-02-20T16:30:00",
        },
        {
          id: "response-2",
          from: "user",
          message: "Thank you for the quick resolution. I'll keep an eye out for the refund.",
          timestamp: "2025-02-21T09:15:00",
        },
        {
          id: "response-3",
          from: "support",
          message:
            "You're welcome! Please let us know if you have any other questions or if you don't see the refund by February 26.",
          timestamp: "2025-02-21T10:05:00",
        },
      ],
    },
  ])

  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      // Reset form
      setNewTicket({
        subject: "",
        category: "",
        message: "",
      })

      // Show success message or update tickets list
      alert("Your support ticket has been submitted. Our team will respond shortly.")
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "closed":
        return <Badge className="bg-neutral-100 text-neutral-800 hover:bg-neutral-100">Closed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Info & FAQ */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-neutral-600">+82 2-123-4567</p>
                  <p className="text-sm text-neutral-500">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-neutral-600">support@chillhaven.com</p>
                  <p className="text-sm text-neutral-500">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-neutral-600">Available in our mobile app</p>
                  <p className="text-sm text-neutral-500">9:00 AM - 10:00 PM KST</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I modify my reservation?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600">
                    You can modify your reservation through your account dashboard under "My Reservations." Select the
                    reservation you wish to change and click the "Modify" button. Alternatively, you can contact our
                    reservations team at +82 2-123-4567.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is the check-in/check-out time?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600">
                    Standard check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out
                    may be available based on room availability and may incur additional charges. Chill Rewards members
                    at higher tiers receive complimentary early check-in and late check-out privileges.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I earn and redeem Chill Points?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600">
                    You earn Chill Points with every stay based on your membership tier: Chill Breeze (100
                    points/night), Chill Flow (200 points/night), and Deep Chill (300 points/night). Points can be
                    redeemed for room charges, dining, spa treatments, and gift shop purchases at a rate of 1,000 points
                    = ₩10,000.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is there a cancellation fee?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600">
                    Cancellation policies vary by rate type and season. Generally, cancellations made 48 hours or more
                    before check-in are fully refundable. Cancellations made within 48 hours of check-in may be subject
                    to a one-night charge. Please refer to your specific booking terms for details.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How can I request special amenities?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600">
                    You can request special amenities by updating your preferences in your account settings or by adding
                    special requests when making a reservation. For specific one-time requests, please contact our
                    concierge team at concierge@chillhaven.com at least 24 hours before your arrival.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4 text-center">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                <HelpCircle className="h-4 w-4 mr-2" />
                View All FAQs
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Support Tickets */}
        <div className="lg:col-span-2">
          {/* New Support Ticket */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Submit a Support Request</h2>

            <form onSubmit={handleSubmitTicket}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reservation">Reservation Inquiry</SelectItem>
                      <SelectItem value="billing">Billing Issue</SelectItem>
                      <SelectItem value="facilities">Facilities Question</SelectItem>
                      <SelectItem value="membership">Membership & Rewards</SelectItem>
                      <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry or issue"
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Support Ticket History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Support Ticket History</h2>

            {supportTickets.length === 0 ? (
              <div className="text-center py-8">
                <LifeBuoy className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                <h3 className="text-lg font-medium text-neutral-600 mb-2">No Support Tickets</h3>
                <p className="text-neutral-500">You haven't submitted any support tickets yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-4 flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-bold">{ticket.subject}</h3>
                          <div className="ml-3">{getStatusBadge(ticket.status)}</div>
                        </div>
                        <p className="text-sm text-neutral-500">
                          Ticket #{ticket.id} • Created {formatDate(ticket.createdAt)}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        {ticket.status === "closed" ? (
                          <Badge className="bg-neutral-100 text-neutral-800 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <p className="text-neutral-600">{ticket.message}</p>
                      </div>

                      {ticket.responses.length > 0 && (
                        <div className="border-t border-neutral-200 pt-4 mt-4">
                          <h4 className="font-medium mb-3">Responses</h4>
                          <div className="space-y-4">
                            {ticket.responses.map((response) => (
                              <div
                                key={response.id}
                                className={`p-3 rounded-lg ${
                                  response.from === "support"
                                    ? "bg-neutral-100 ml-0 md:ml-4"
                                    : "bg-primary/10 mr-0 md:mr-4"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <p className="font-medium">
                                    {response.from === "support" ? "Chill Haven Support" : "You"}
                                  </p>
                                  <p className="text-xs text-neutral-500">{formatDate(response.timestamp)}</p>
                                </div>
                                <p className="text-neutral-600">{response.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {ticket.status !== "closed" && (
                        <div className="mt-4 flex">
                          <Input placeholder="Type your reply here..." className="mr-2" />
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

