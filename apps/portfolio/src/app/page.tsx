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
    <div className="p-6 font-mono text-xl leading-relaxed">
      <div className="flex">
        <div className="text-gray-700 dark:text-gray-300 select-none text-right mr-2">
          {Array.from({ length: lineCount }, (_, i) => i + 1).map((i) => (
            <div key={i}>{i}</div>
          ))}
        </div>

        <div className="flex-1">
          <div className="text-blue-500 dark:text-yellow-400">{'{'}</div>
          <div ref={contentRef} className="ml-10 break-all">
            <JsonField fieldName="name">Emily Xiong 📇</JsonField>
            <JsonField fieldName="location">Toronto, Canada 📍</JsonField>
            <JsonField fieldName="title">Software Engineer 👩‍💻</JsonField>
            <JsonField fieldName="description">
              <>
                I&apos;m a frontend developer based in Toronto who loves
                building with React and React Native. I speak at the occasional
                meetup, and enjoy sharing things I’ve learned (usually the hard
                way). This blog is my little corner of the internet.
              </>
            </JsonField>
            <JsonField fieldName="email">
              <a href="mailto:xiongemi@gmail.com">xiongemi@gmail.com</a> 📧
            </JsonField>
            <JsonField fieldName="linkedin">
              <a
                href="https://www.linkedin.com/in/xiongemi/"
                target="_blank"
                rel="noopener noreferrer"
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
              >
                https://emilyxiong.medium.com/
              </a>{' '}
              ✍🏻
            </JsonField>
            <JsonField fieldName="github">
              <a
                href="https://github.com/xiongemi"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/xiongemi
              </a>{' '}
              🗃️
            </JsonField>
          </div>
          <div className="text-blue-500 dark:text-yellow-400">{'}'}</div>
        </div>
      </div>
    </div>
  );
}
