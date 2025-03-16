"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white text-neutral-900 shadow-md py-4" : "bg-transparent text-white py-6",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Chill Haven Logo"
                  fill
                  className={cn(
                    "object-contain transition-all",
                    scrolled ? "opacity-100" : "brightness-0 invert opacity-100",
                  )}
                  priority
                />
              </div>
              <div className={cn("font-serif transition-all", scrolled ? "text-primary" : "text-white")}>
                <h1 className="text-xl font-bold leading-tight">Chill Haven</h1>
                <p className="text-xs tracking-wider">Resort & Spa</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              <li>
                <Link href="/rooms" className="font-medium hover:text-primary transition-colors">
                  객실
                </Link>
              </li>
              <li>
                <Link href="/dining" className="font-medium hover:text-primary transition-colors">
                  다이닝
                </Link>
              </li>
              <li>
                <Link href="/membership" className="font-medium hover:text-primary transition-colors">
                  멤버십
                </Link>
              </li>
              <li>
                <Link href="/gift-shop" className="font-medium hover:text-primary transition-colors">
                  기프트샵
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="font-medium hover:text-primary transition-colors">
                  부대시설
                </Link>
              </li>
              <li>
                <Link href="/my-account" className="font-medium hover:text-primary transition-colors">
                  마이페이지
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button className="bg-primary hover:bg-primary/90 text-white mr-4">Book</Button>
            <button
              className="relative z-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={scrolled ? "text-neutral-900" : "text-white"} />
              ) : (
                <Menu className={scrolled ? "text-neutral-900" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24">
          <nav className="container mx-auto px-4">
            <ul className="space-y-6 text-neutral-900">
              <li>
                <Link href="/rooms" className="block text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  객실
                </Link>
              </li>
              <li>
                <Link href="/dining" className="block text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  다이닝
                </Link>
              </li>
              <li>
                <Link href="/membership" className="block text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  멤버십
                </Link>
              </li>
              <li>
                <Link href="/gift-shop" className="block text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  기프트샵
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="block text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  부대시설
                </Link>
              </li>
              <li>
                <Link href="/my-account" className="block text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                  마이페이지
                </Link>
              </li>
              <li className="pt-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">Book Now</Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

