import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from '@/lib/config';

/**
 * Initialize Google Analytics with the tracking ID
 */
export const initGA = (): void => {
  if (GA_TRACKING_ID) {
    console.log('🔧 [GA Debug] Initializing Google Analytics with ID:', GA_TRACKING_ID);
    ReactGA.initialize(GA_TRACKING_ID, {
      debug: process.env.NODE_ENV === 'development',
    });
    console.log('✅ [GA Debug] Google Analytics initialized successfully');
  } else {
    console.warn('⚠️ [GA Debug] No GA_TRACKING_ID found. Make sure NEXT_PUBLIC_GA_ID is set in your .env.local');
  }
};

/**
 * Sends a pageview event to Google Analytics.
 * @param url The URL of the page to track.
 */
export const pageview = (url: string): void => {
  if (GA_TRACKING_ID) {
    console.log('📄 [GA Debug] Sending pageview for URL:', url);
    ReactGA.pageview(url);
    console.log('✅ [GA Debug] Pageview sent successfully');
  } else {
    console.warn('⚠️ [GA Debug] Cannot send pageview - GA not initialized');
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
  if (GA_TRACKING_ID) {
    const eventData = {
      category: category || 'General',
      action,
      label,
      value,
    };
    console.log('🎯 [GA Debug] Sending event:', eventData);
    ReactGA.event(eventData);
    console.log('✅ [GA Debug] Event sent successfully');
  } else {
    console.warn('⚠️ [GA Debug] Cannot send event - GA not initialized');
  }
};
