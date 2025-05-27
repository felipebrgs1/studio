import { GA_TRACKING_ID } from '@/lib/config';

// Ensure window.gtag is typed for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

/**
 * Sends a pageview event to Google Analytics.
 * @param url The URL of the page to track.
 */
export const pageview = (url: string): void => {
  if (GA_TRACKING_ID && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface EventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

/**
 * Sends a custom event to Google Analytics.
 * @param params The event parameters.
 */
export const event = ({ action, category, label, value }: EventParams): void => {
  if (GA_TRACKING_ID && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
