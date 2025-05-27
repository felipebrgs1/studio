'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';
import { GA_TRACKING_ID } from '@/lib/config';
import { initGA, pageview } from '@/lib/ga';

/**
 * Analytics tracking component that needs to be wrapped in Suspense
 * due to useSearchParams usage
 */
const AnalyticsTracker = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initializedGA = useRef(false);
    useEffect(() => {
        if (!GA_TRACKING_ID) {
            return;
        }

        // Initialize GA only once
        if (!initializedGA.current) {
            console.log(
                '🚀 [GA Debug] Starting Google Analytics initialization...',
            );
            initGA();
            initializedGA.current = true;
            // Track initial pageview
            const url = pathname + searchParams.toString();
            console.log('📍 [GA Debug] Initial page load - tracking URL:', url);
            pageview(url);
        }
    }, []);
    useEffect(() => {
        if (!GA_TRACKING_ID || !initializedGA.current) {
            return;
        }

        const url = pathname + searchParams.toString();
        console.log('🔄 [GA Debug] Route change detected - tracking URL:', url);
        // Track subsequent pageviews
        pageview(url);
    }, [pathname, searchParams]);

    return null;
};

export default function GoogleAnalytics() {
    if (!GA_TRACKING_ID) {
        // If no tracking ID is present, don't render GA scripts.
        // A console warning might be helpful during development.
        if (process.env.NODE_ENV === 'development') {
            console.warn(
                'Google Analytics Tracking ID (NEXT_PUBLIC_GA_ID) is missing. GA will not be initialized.',
            );
        }
        return null;
    }

    return (
        <Suspense fallback={null}>
            <AnalyticsTracker />
        </Suspense>
    );
}
