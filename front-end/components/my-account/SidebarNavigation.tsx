"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { User, Calendar, Utensils, Gift, CreditCard, Settings, LifeBuoy, LogOut, LayoutDashboard } from "lucide-react"

interface SidebarNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  sections: Record<string, string>
}

export default function SidebarNavigation({ activeSection, setActiveSection, sections }: SidebarNavigationProps) {
  const navItems = [
    {
      title: "Account Overview",
      section: sections.overview,
      icon: LayoutDashboard,
    },
    {
      title: "Profile & Settings",
      section: sections.profile,
      icon: User,
    },
    {
      title: "My Reservations",
      section: sections.roomReservations,
      icon: Calendar,
    },
    {
      title: "Dining Reservations",
      section: sections.diningReservations,
      icon: Utensils,
    },
    {
      title: "Chill Rewards",
      section: sections.rewards,
      icon: Gift,
    },
    {
      title: "Payment Methods",
      section: sections.payments,
      icon: CreditCard,
    },
    {
      title: "Preferences",
      section: sections.preferences,
      icon: Settings,
    },
    {
      title: "Support",
      section: sections.support,
      icon: LifeBuoy,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => setActiveSection(item.section)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === item.section ? "bg-primary text-white" : "hover:bg-neutral-100 text-neutral-700",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}

            <li className="pt-4 mt-4 border-t border-neutral-200">
              <Link
                href="/sign-out"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-neutral-100 text-neutral-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

