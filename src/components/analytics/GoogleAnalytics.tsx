"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { GA_TRACKING_ID } from '@/lib/config';
import { pageview } from '@/lib/ga';

/**
 * Custom hook to track page views on route changes.
 * The initial pageview is handled by the gtag configuration script.
 * This hook handles subsequent pageviews for SPA navigation.
 */
const useAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialLoadHandled = useRef(false);

  useEffect(() => {
    if (!GA_TRACKING_ID) {
      // console.warn("Google Analytics Tracking ID is missing."); // Warning can be useful but not strictly necessary here
      return;
    }

    const url = pathname + searchParams.toString();

    // The main gtag script handles the initial pageview via its 'config' command.
    // This effect handles pageviews for subsequent client-side navigations.
    if (initialLoadHandled.current) {
      pageview(url);
    } else {
      // Mark that the initial load (handled by the script) has passed.
      initialLoadHandled.current = true;
    }
  }, [pathname, searchParams]);
};

export default function GoogleAnalytics() {
  useAnalytics(); // Initialize the hook to track page views

  if (!GA_TRACKING_ID) {
    // If no tracking ID is present, don't render GA scripts.
    // A console warning might be helpful during development.
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Google Analytics Tracking ID (NEXT_PUBLIC_GA_ID) is missing. GA will not be initialized.'
      );
    }
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname + window.location.search,
            });
          `,
        }}
      />
    </>
  );
}
