import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppDocShell, { DocSection, PolicySections } from '../../../../components/AppDocShell';
import {
  appParams,
  developer,
  formatDate,
  getApp,
  getAppPageContent,
  legalLastUpdated,
} from '../../../../lib/apps';
import { LINK, MUTED_MONO } from '../../../../lib/styles';

const canonicalUrl =
  process.env.NEXT_PUBLIC_CANONICAL_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000';

const ADMOB_POLICY = 'https://support.google.com/admob/answer/6128543?hl=en';

export function generateStaticParams() {
  return appParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  const description = `How the ${app.name} mobile app handles your information.`;

  return {
    title: `${app.name} Privacy Policy`,
    description,
    alternates: { canonical: `${canonicalUrl}/projects/${slug}/privacy` },
    openGraph: {
      type: 'website',
      title: `${app.name} Privacy Policy`,
      description,
      url: `${canonicalUrl}/projects/${slug}/privacy`,
    },
  };
}

/** Privacy policy for a single app — the privacy URL each store listing requires. */
export default async function AppPrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  const content = getAppPageContent(slug);
  if (!app || !content) notFound();

  return (
    <AppDocShell
      app={app}
      current="privacy"
      fileName="privacy-policy.md"
      title="Privacy Policy"
      subtitle={`How ${app.name} handles your information.`}
    >
      <p className={`${MUTED_MONO} mb-8`}>
        Last updated <time dateTime={legalLastUpdated}>{formatDate(legalLastUpdated)}</time>
      </p>

      {content.privacySections ? (
        <PolicySections sections={content.privacySections} />
      ) : (
        <>
          <DocSection title="Who is responsible">
            <p>
              {app.name} is provided by <strong>{developer.legalName}</strong>, a sole trader based
              in {developer.location}, who is responsible for the information described here. You
              can reach us at{' '}
              <a href={`mailto:${developer.email}`} className={LINK}>
                {developer.email}
              </a>
              .
            </p>
          </DocSection>

          <DocSection title="What stays on your device">
            <p>
              {app.name} has no account and no sign-in. What you enter — your answers, progress, and
              anything else you record — is stored on the device itself, not on a server we hold.
              Deleting the app removes it.
            </p>
          </DocSection>

          <DocSection title="What is collected automatically">
            <p>Using the app may make the following available to us and to the services below:</p>
            <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
              <li>your device&rsquo;s Internet Protocol (IP) address;</li>
              <li>which screens you open, and the date, time, and duration of a visit;</li>
              <li>the operating system and version your device runs.</li>
            </ul>
            <p>
              The app does not collect the precise location of your device, and does not ask you for
              your name, email address, or any other detail that identifies you personally.
            </p>
          </DocSection>

          <DocSection title="Advertising">
            <p>
              {app.name} is free and may display advertising supplied by Google AdMob, which may use
              a device advertising identifier to select ads. That handling is covered by{' '}
              <a href={ADMOB_POLICY} target="_blank" rel="noopener noreferrer" className={LINK}>
                Google&rsquo;s AdMob privacy policy <span aria-hidden="true">↗</span>
              </a>
              . You can reset or limit the identifier in your device settings.
            </p>
          </DocSection>

          <DocSection title="Analytics">
            <p>
              Aggregated, anonymised usage and crash information is sent to an analytics provider so
              that faults and confusing screens can be found and fixed. It describes how the app is
              used, not who you are.
            </p>
          </DocSection>

          <DocSection title="When information may be disclosed">
            <p>We may disclose the information described above:</p>
            <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
              <li>
                where the law requires it, such as to comply with a subpoena or similar process;
              </li>
              <li>
                where we believe in good faith that disclosure is necessary to protect our rights,
                protect your safety or the safety of others, investigate fraud, or respond to a
                government request;
              </li>
              <li>
                to the service providers above, who act on our behalf and have no independent use
                for it.
              </li>
            </ul>
            <p>We do not sell your information.</p>
          </DocSection>

          <DocSection title="Your choices">
            <p>
              Uninstalling the app stops all collection by it. Because nothing you enter leaves the
              device, removing the app also removes what it stored. Advertising and analytics
              identifiers can be reset or limited in your device&rsquo;s privacy settings.
            </p>
          </DocSection>

          <DocSection title="Children">
            <p>
              {app.name} is not directed at children under 13, and we do not knowingly collect
              personal information from them. If you believe a child has provided us with personal
              information, email us and we will delete it.
            </p>
          </DocSection>

          <DocSection title="Changes">
            <p>
              We may update this policy. The current version is always the one published here, with
              the date above. Continued use of the app after a change means you accept the updated
              policy.
            </p>
          </DocSection>

          <DocSection title="Contact">
            <p>
              Questions about privacy go to{' '}
              <a href={`mailto:${developer.email}`} className={LINK}>
                {developer.email}
              </a>
              . The{' '}
              <Link href={`/projects/${app.slug}/terms`} className={LINK}>
                terms and conditions
              </Link>{' '}
              cover the rest of your use of the app.
            </p>
          </DocSection>
        </>
      )}
    </AppDocShell>
  );
}
