import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Chill Haven Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="font-serif">
                <h2 className="text-xl font-bold leading-tight">Chill Haven</h2>
                <p className="text-xs tracking-wider">Resort & Spa</p>
              </div>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              Chill Haven Resort & Spa offers a sanctuary for healing and relaxation, where nature and modern comfort
              blend to create the perfect retreat from everyday stress.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-neutral-800 hover:bg-primary transition-colors p-2 rounded-full">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-neutral-800 hover:bg-primary transition-colors p-2 rounded-full">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-neutral-800 hover:bg-primary transition-colors p-2 rounded-full">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  호텔 소개
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  오시는 길
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  연락처
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">ROOMS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Comfort Room
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Harmony Room
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Serenity Room
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Family Suite
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Lake Suite
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Ultimate Chill Suite
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">FACILITIES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Wellness Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Serenity Spa
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Nature Chill Zone
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Chill Lounge & Entertainment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-4">CONTACT</h3>
              <address className="not-italic">
                <p>서울특별시 중구 힐링로 123</p>
                <p className="mt-2">TEL: 02-123-4567</p>
                <p>FAX: 02-123-4568</p>
                <p className="mt-2">Email: info@chillhaven.com</p>
              </address>
            </div>
            <div className="md:text-right">
              <p className="text-neutral-400 mb-2">© 2025 Chill Haven Resort & Spa. All Rights Reserved.</p>
              <div className="flex md:justify-end space-x-4">
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

