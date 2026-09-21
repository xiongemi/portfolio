import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppDocShell, { DocSection } from '../../../../components/AppDocShell';
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

  const description = `The terms and conditions that apply to the ${app.name} mobile app.`;

  return {
    title: `${app.name} Terms & Conditions`,
    description,
    alternates: { canonical: `${canonicalUrl}/projects/${slug}/terms` },
    openGraph: {
      type: 'website',
      title: `${app.name} Terms & Conditions`,
      description,
      url: `${canonicalUrl}/projects/${slug}/terms`,
    },
  };
}

/** Terms & conditions for a single app, linked from its App Store listing. */
export default async function AppTermsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  const content = getAppPageContent(slug);
  if (!app || !content) notFound();

  const onAndroid = 'android' in app.stores;

  return (
    <AppDocShell
      app={app}
      current="terms"
      fileName="terms.md"
      title="Terms & Conditions"
      subtitle={`These terms govern your use of ${app.name} (“the app”). By installing or using the app you agree to them. If you do not agree, please do not use the app.`}
    >
      <p className={`${MUTED_MONO} mb-8`}>
        Last updated <time dateTime={legalLastUpdated}>{formatDate(legalLastUpdated)}</time>
      </p>

      {content.termsSections ? (
        content.termsSections.map((section) => (
          <DocSection key={section.title} title={section.title}>
            {section.paragraphs?.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </DocSection>
        ))
      ) : (
        <>
          <DocSection title="Who we are">
            <p>
              {app.name} is published by <strong>{developer.legalName}</strong>, a sole trader based
              in {developer.location} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). You can reach us at{' '}
              <a href={`mailto:${developer.email}`} className={LINK}>
                {developer.email}
              </a>
              .
            </p>
          </DocSection>

          <DocSection title="Eligibility">
            <p>
              You must be at least 13 years old to use the app, or older where your country sets a
              higher minimum age for consenting to online services. The app is not directed at
              children under 13.
            </p>
          </DocSection>

          <DocSection title="The app">
            <p>{content.summary}</p>
            <p>
              The app is provided free of charge and &ldquo;as is&rdquo;, without warranties of any
              kind. We do not promise that it will be available without interruption, that it is
              free of errors, or that it will meet any particular requirement.
            </p>
            <p className="border-l-2 border-blue-500/40 pl-4 text-gray-700 dark:text-gray-400">
              {content.disclaimer}
            </p>
          </DocSection>

          <DocSection title="Your data">
            <p>
              The app does not require an account. What you enter is stored on your device, and
              deleting the app removes it. We cannot recover data from a device we never held a copy
              of, so back up anything you would not want to lose.
            </p>
            <p>
              The app collects limited technical and usage information, and may show advertising.
              What is collected, and who processes it, is set out in the{' '}
              <Link href={`/projects/${app.slug}/privacy`} className={LINK}>
                privacy policy
              </Link>
              .
            </p>
          </DocSection>

          <DocSection title="Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
              <li>use the app for any unlawful purpose;</li>
              <li>
                copy, redistribute, resell, or republish the app&rsquo;s questions, explanations, or
                other content as your own;
              </li>
              <li>
                reverse engineer, decompile, or otherwise attempt to derive the source code of the
                app, except to the extent the law expressly permits it;
              </li>
              <li>
                interfere with the app&rsquo;s operation or with anyone else&rsquo;s use of it.
              </li>
            </ul>
          </DocSection>

          <DocSection title="Intellectual property">
            <p>
              The app, its design, and its content remain ours or our licensors&rsquo;. You get a
              personal, non-exclusive, non-transferable, revocable licence to use the app on devices
              you own or control, for your own non-commercial use.
            </p>
          </DocSection>

          <DocSection title="Limitation of liability">
            <p>
              To the maximum extent permitted by law, we are not liable for any indirect,
              incidental, or consequential damages arising from your use of the app, or for any
              decision you make in reliance on it. Nothing in these terms limits liability that
              cannot be limited under the law that applies to you, including your statutory rights
              as a consumer.
            </p>
          </DocSection>

          <DocSection title="Apple">
            <p>
              If you obtained the app from the Apple App Store: these terms are between you and us,
              not Apple. Apple is not responsible for the app or its content and has no obligation
              to provide support or maintenance for it. Apple and its subsidiaries are third-party
              beneficiaries of these terms and may enforce them against you.
            </p>
          </DocSection>

          {onAndroid && (
            <DocSection title="Google Play">
              <p>
                If you obtained the app from Google Play: these terms are between you and us, not
                Google. Google is not responsible for the app or its content, and your use of the
                app is also subject to the Google Play Terms of Service.
              </p>
            </DocSection>
          )}

          <DocSection title="Termination">
            <p>
              You may stop using the app at any time by deleting it from your device. We may stop
              distributing or supporting the app, or withdraw access where these terms are breached.
            </p>
          </DocSection>

          <DocSection title="Governing law">
            <p>
              These terms are governed by the laws of {developer.governingLaw}, without regard to
              conflict-of-laws rules. If you are a consumer resident elsewhere, you keep the
              protection of any mandatory consumer law of your own country, and may bring
              proceedings in your own courts where that law allows.
            </p>
          </DocSection>

          <DocSection title="Changes">
            <p>
              We may update these terms. The current version is always the one published here, with
              the date above. Continued use of the app after a change means you accept the updated
              terms.
            </p>
          </DocSection>

          <DocSection title="Contact">
            <p>
              Questions about these terms go to{' '}
              <a href={`mailto:${developer.email}`} className={LINK}>
                {developer.email}
              </a>
              . For help with the app itself, see the{' '}
              <Link href={`/projects/${app.slug}/support`} className={LINK}>
                support page
              </Link>
              .
            </p>
          </DocSection>
        </>
      )}
    </AppDocShell>
  );
}
