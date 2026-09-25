/**
 * The PostHog project this site reports into — the same one the apps use, so
 * web and app traffic land in one place.
 *
 * The project token is a *public* client key by design: it ships in the browser
 * bundle and can be read out of any build, so keeping it in source is not a
 * leaked secret — unlike a personal API key, which must never land here. Set
 * `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` to point a build at a
 * different project.
 */
export const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? 'phc_kjkW3Ha64eLQMOOznXoEKldCZBRmLS1ra9SZK7ZnvHd';

export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
