"use client"

import type React from "react"

import { useEffect, useState } from "react"
import SidebarNavigation from "./sidebar-navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface AccountLayoutProps {
  children: React.ReactNode
  activeSection: string
  setActiveSection: (section: string) => void
  sections: Record<string, string>
}

export default function AccountLayout({ children, activeSection, setActiveSection, sections }: AccountLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Close mobile sidebar when switching to desktop
  useEffect(() => {
    if (isDesktop) setMobileOpen(false)
  }, [isDesktop])

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setMobileOpen(false)
  }

  return (
    <div className="bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <SidebarNavigation
              activeSection={activeSection}
              setActiveSection={handleSectionChange}
              sections={sections}
            />
          </div>

          {/* Sidebar Navigation - Mobile */}
          <div className="lg:hidden mb-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between items-center">
                  <span>
                    {activeSection === sections.overview && "Account Overview"}
                    {activeSection === sections.profile && "Profile & Settings"}
                    {activeSection === sections.roomReservations && "My Reservations"}
                    {activeSection === sections.diningReservations && "Dining Reservations"}
                    {activeSection === sections.rewards && "Chill Rewards"}
                    {activeSection === sections.payments && "Payment Methods"}
                    {activeSection === sections.preferences && "Preferences"}
                    {activeSection === sections.support && "Support"}
                  </span>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <SidebarNavigation
                    activeSection={activeSection}
                    setActiveSection={handleSectionChange}
                    sections={sections}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

