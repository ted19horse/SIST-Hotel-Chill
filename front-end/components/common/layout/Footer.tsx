import Link from "next/link" // Next.js의 클라이언트 사이드 라우팅을 위한 링크 컴포넌트
import Image from "next/image" // Next.js의 최적화된 이미지 컴포넌트
import { Facebook, Instagram, Twitter } from "lucide-react" // 소셜 미디어 아이콘 컴포넌트

/**
 * Footer 컴포넌트
 * 
 * 웹사이트의 하단부 푸터 영역을 구현합니다.
 * 로고, 간략한 소개, 소셜 미디어 링크, 사이트맵, 연락처 정보 등을 포함합니다.
 * 반응형으로 설계되어 모바일과 데스크톱 환경에서 모두 최적화된 레이아웃을 제공합니다.
 */
export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* 푸터 상단 영역: 로고, 소개, 소셜 미디어 링크, 사이트맵 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* 로고 및 소개 영역 (모바일에서는 전체 너비, 데스크톱에서는 2/5 너비) */}
          <div className="lg:col-span-2">
            {/* 로고 영역 */}
            <div className="flex items-center mb-6">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Chill Haven Logo"
                  fill
                  className="object-contain brightness-0 invert" // 어두운 배경에서 로고를 흰색으로 표시
                />
              </div>
              <div className="font-serif">
                <h2 className="text-xl font-bold leading-tight">Chill Haven</h2>
                <p className="text-xs tracking-wider">Resort & Spa</p>
              </div>
            </div>
            {/* 간략한 소개 텍스트 */}
            <p className="text-neutral-400 mb-6 max-w-md">
              Chill Haven Resort & Spa offers a sanctuary for healing and relaxation, where nature and modern comfort
              blend to create the perfect retreat from everyday stress.
            </p>
            {/* 소셜 미디어 링크 */}
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

          {/* ABOUT US 메뉴 영역 */}
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

          {/* ROOMS 메뉴 영역 */}
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

          {/* FACILITIES 메뉴 영역 */}
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

        {/* 푸터 하단 영역: 연락처 정보 및 저작권 */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 연락처 정보 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">CONTACT</h3>
              <address className="not-italic"> {/* HTML5 address 요소: 연락처 정보를 의미적으로 마크업 */}
                <p>서울특별시 중구 힐링로 123</p>
                <p className="mt-2">TEL: 02-123-4567</p>
                <p>FAX: 02-123-4568</p>
                <p className="mt-2">Email: info@chillhaven.com</p>
              </address>
            </div>
            {/* 저작권 및 정책 링크 */}
            <div className="md:text-right">
              <p className="text-neutral-400 mb-2"> 2025 Chill Haven Resort & Spa. All Rights Reserved.</p>
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
