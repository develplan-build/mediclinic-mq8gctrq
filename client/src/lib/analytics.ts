import posthog from 'posthog-js';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: 'https://app.posthog.com',
    autocapture: false,
  });
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (posthogKey) {
    posthog.capture(eventName, properties);
  } else {
    console.log(`[Analytics Demo] Event: ${eventName}`, properties);
  }
};