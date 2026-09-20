'use client';

import Link from 'next/link';
import { useRef } from 'react';
import appsData from '../assets/apps.json';
import { JsonField } from '../components/JsonField';
import { useElementHeight } from '../lib/useElementHeight';

const appCount = appsData.apps.length;

/** Matches the `h-8` rows the gutter renders. */
const LINE_HEIGHT_PX = 32;

// Underlined in the text's own colour: these links sit inside a run of green
// "string" text, so a blue underline was invisible and colour alone was carrying
// the whole signal that they are links (WCAG 1.4.1).
const LINK_CLASSES =
  'underline decoration-current/50 hover:decoration-current underline-offset-4 transition-[text-decoration-color]';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const height = useElementHeight(contentRef);
  const lineCount = Math.floor(height / LINE_HEIGHT_PX);

  return (
    <div className="p-4 md:p-8 font-mono text-base sm:text-lg md:text-xl leading-relaxed fade-up">
      <h1 className="sr-only">Emily Xiong — Software Engineer in Toronto</h1>
      {/* `items-start` matters: with the default `stretch`, the gutter's own height
          feeds back into the row height, which stretches the content column, which
          yields a taller measurement and another line number — a loop that kept
          adding rows on every observation. Sizing each column to its own content
          breaks it; the gutter still spans the full height via `self-stretch`. */}
      <div className="flex items-start">
        {/* Decorative: without aria-hidden a screen reader reads out every line
            number before reaching the content. */}
        <div
          aria-hidden="true"
          className="self-stretch text-gray-500 dark:text-gray-600 select-none text-right mr-6 border-r border-black/10 dark:border-white/10 pr-4 hidden sm:block"
        >
          {Array.from({ length: lineCount }, (_, i) => i + 1).map((i) => (
            <div key={i} className="h-8">
              {i}
            </div>
          ))}
        </div>

        <div ref={contentRef} className="flex-1 min-w-0">
          <div aria-hidden="true" className="text-blue-600 dark:text-yellow-500 font-bold mb-2">
            {'{'}
          </div>
          <div className="ml-4 md:ml-8 space-y-1 break-words">
            <JsonField fieldName="name">Emily Xiong 📇</JsonField>
            <JsonField fieldName="location">Toronto, Canada 📍</JsonField>
            <JsonField fieldName="title">Software Engineer 👩‍💻</JsonField>
            <JsonField fieldName="stack">React · React Native · TypeScript ⚛️</JsonField>
            <JsonField fieldName="shipped">
              <Link href="/projects" className={LINK_CLASSES}>
                {appCount} iOS apps on the App Store
              </Link>{' '}
              📱
            </JsonField>
            <JsonField fieldName="maintained">Nx core maintainer, 2021–2025 🛠️</JsonField>
            <JsonField fieldName="description">
              I&apos;m a frontend developer based in Toronto who loves building with React and React
              Native. I speak at the occasional meetup, and enjoy sharing things I&rsquo;ve learned
              (usually the hard way). This portfolio is my little corner of the internet.
            </JsonField>
            <JsonField fieldName="email">
              <a href="mailto:xiongemi@gmail.com" className={LINK_CLASSES}>
                xiongemi@gmail.com
              </a>{' '}
              📧
            </JsonField>
            <JsonField fieldName="linkedin">
              <a
                href="https://www.linkedin.com/in/xiongemi/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASSES}
              >
                https://www.linkedin.com/in/xiongemi/
              </a>{' '}
              👩🏻‍💼
            </JsonField>
            <JsonField fieldName="blog">
              <a
                href="https://emilyxiong.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASSES}
              >
                https://emilyxiong.medium.com/
              </a>{' '}
              ✍🏻
            </JsonField>
            <JsonField fieldName="github" isLast>
              <a
                href="https://github.com/xiongemi"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASSES}
              >
                https://github.com/xiongemi
              </a>{' '}
              🗃️
            </JsonField>
          </div>
          <div aria-hidden="true" className="text-blue-600 dark:text-yellow-500 font-bold mt-2">
            {'}'}
          </div>
        </div>
      </div>
    </div>
  );
}
