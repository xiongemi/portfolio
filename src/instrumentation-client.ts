import posthog from 'posthog-js';
import { POSTHOG_HOST, POSTHOG_KEY } from './lib/posthog';

// Runs before the app becomes interactive. Wrapped because a failure here must
// not take the page down with it.
try {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // App Router navigations never reload the page, so the default load-time
    // pageview would only ever fire once per visit.
    capture_pageview: 'history_change',
    capture_exceptions: true,
  });
} catch (error) {
  console.warn('PostHog failed to initialise', error);
}
