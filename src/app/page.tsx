'use client';

import React, { useMemo, useRef } from 'react';
import { JsonField } from '../components/JsonField';
import { useWindowSize } from '../lib/useWindowSize';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize(contentRef);
  const lineCount = useMemo(() => {
    if (!height) return 0;
    return Math.floor((height || 800) / 32) + 2;
  }, [height]);

  return (
    <div className="p-8 font-mono text-lg md:text-xl leading-relaxed animate-in fade-in duration-700">
      <div className="flex">
        <div className="text-gray-400 dark:text-gray-600 select-none text-right mr-6 border-r border-white/5 pr-4 hidden sm:block">
          {Array.from({ length: lineCount }, (_, i) => i + 1).map((i) => (
            <div key={i} className="h-8">{i}</div>
          ))}
        </div>

        <div className="flex-1">
          <div className="text-blue-500 dark:text-yellow-500 font-bold mb-2">{'{'}</div>
          <div ref={contentRef} className="ml-4 md:ml-8 space-y-1">
            <JsonField fieldName="name">Emily Xiong 📇</JsonField>
            <JsonField fieldName="location">Toronto, Canada 📍</JsonField>
            <JsonField fieldName="title">Software Engineer 👩‍💻</JsonField>
            <JsonField fieldName="description">
              <>
                I&apos;m a frontend developer based in Toronto who loves
                building with React and React Native. I speak at the occasional
                meetup, and enjoy sharing things I’ve learned (usually the hard
                way). This portfolio is my little corner of the internet.
              </>
            </JsonField>
            <JsonField fieldName="email">
              <a href="mailto:xiongemi@gmail.com" className="underline decoration-blue-500/30 hover:decoration-blue-500 transition-all">xiongemi@gmail.com</a> 📧
            </JsonField>
            <JsonField fieldName="linkedin">
              <a
                href="https://www.linkedin.com/in/xiongemi/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-blue-500/30 hover:decoration-blue-500 transition-all"
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
                className="underline decoration-blue-500/30 hover:decoration-blue-500 transition-all"
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
                className="underline decoration-blue-500/30 hover:decoration-blue-500 transition-all"
              >
                https://github.com/xiongemi
              </a>{' '}
              🗃️
            </JsonField>
          </div>
          <div className="text-blue-500 dark:text-yellow-500 font-bold mt-2">{'}'}</div>
        </div>
      </div>
    </div>
  );
}

