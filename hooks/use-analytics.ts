"use client"

import { useCallback } from "react"

// Analytics events for tracking
export type AnalyticsEvent = "page_view" | "form_submit" | "form_error" | "cta_click" | "section_view" | "faq_expand"

interface EventData {
  [key: string]: string | number | boolean | undefined
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent, data?: EventData) => {
    // Log for observability
    console.log(`[Analytics] ${event}`, data)

    // GA4 integration (when configured)
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", event, data)
    }

    // Meta Pixel integration (when configured)
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", event, data)
    }

    // LinkedIn Insight Tag (when configured)
    if (typeof window !== "undefined" && (window as any).lintrk) {
      ;(window as any).lintrk("track", { conversion_id: event })
    }
  }, [])

  const trackPageView = useCallback(
    (pageName: string) => {
      trackEvent("page_view", { page: pageName })
    },
    [trackEvent],
  )

  const trackFormSubmit = useCallback(
    (formName: string, success: boolean) => {
      trackEvent(success ? "form_submit" : "form_error", { form: formName })
    },
    [trackEvent],
  )

  const trackCTAClick = useCallback(
    (ctaName: string, location: string) => {
      trackEvent("cta_click", { cta: ctaName, location })
    },
    [trackEvent],
  )

  return {
    trackEvent,
    trackPageView,
    trackFormSubmit,
    trackCTAClick,
  }
}
