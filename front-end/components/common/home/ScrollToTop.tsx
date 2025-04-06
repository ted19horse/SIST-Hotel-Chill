"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 더 강력한 스크롤 초기화 방법 적용
    const handleRouteChange = () => {
      // 여러 방법으로 스크롤 초기화 시도
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      // 약간의 지연 후 다시 한번 스크롤 초기화 시도 (비동기 이슈 해결)
      setTimeout(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 50)
    }

    handleRouteChange()

    // 스크롤 복원 동작 비활성화
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual"
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원 동작 원복
      if (history.scrollRestoration) {
        history.scrollRestoration = "auto"
      }
    }
  }, [pathname, searchParams])

  return null
}

