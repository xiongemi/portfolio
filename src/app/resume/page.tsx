'use client';

import React from 'react';

export default function ResumePage() {
  return (
    <div className="p-8 md:p-12 font-sans max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <header className="border-b border-white/10 pb-8 mb-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          Emily Xiong
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-6">
          Senior Software Developer | React & React Native Expert
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          <a href="mailto:xiongemi@gmail.com" className="hover:text-blue-500 transition-colors">
            xiongemi@gmail.com
          </a>
          <span>•</span>
          <span>Toronto, Canada</span>
          <span>•</span>
          <a
            href="https://github.com/xiongemi"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/xiongemi/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://medium.com/@emilyxiong"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            Medium
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">Summary</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-2 border-blue-500/30 pl-6">
          Senior Software Developer with 10 years of experience (6 in React). Expert in building
          accessible, high-performance web applications and cross-platform mobile apps with React
          Native. Core maintainer of Nx.dev and active open-source contributor.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-6">
          Professional Experience
        </h2>

        <div className="space-y-10">
          <ExperienceItem
            company="Nx.dev"
            role="Senior Software Developer & Core Maintainer"
            period="2021 — 2025"
            description="Contributing to the core of Nx, a leading build system for monorepos. Focused on Next.js, React, and Vite integrations. Improved developer experience through automated migrations and cloud-based caching mechanisms."
          />
          <ExperienceItem
            company="RewardOps"
            role="Senior Frontend Developer"
            period="2020 — 2021"
            description="Architected and built internal tools using React and TypeScript. Improved codebase quality through rigorous testing patterns and design system implementation."
          />
          <ExperienceItem
            company="IBM"
            role="Frontend Web Consultant"
            period="2020"
            description="Led a major Angular migration for a large-scale enterprise client. Optimized application performance and mentored junior developers on modern frontend practices."
          />
          <ExperienceItem
            company="Rangle.io"
            role="Frontend Developer"
            period="2016 — 2020"
            description="Built high-impact digital products for global clients. Specialized in React and Angular ecosystems. Advocated for accessibility and web performance."
          />
          <ExperienceItem
            company="RBC"
            role="Mobile Application Developer"
            period="2013 — 2016"
            description="Developed native and hybrid mobile applications for banking services. Focused on security, performance, and cross-device compatibility."
          />
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
            Core Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'React',
              'React Native',
              'TypeScript',
              'Next.js',
              'Nx',
              'Expo',
              'Angular',
              'Node.js',
              'GraphQL',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
            Testing & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Jest',
              'Cypress',
              'Playwright',
              'Vitest',
              'Testing Library',
              'Git',
              'Docker',
              'AWS',
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
          Education
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">
              University of Toronto
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Master's & Bachelor's Degree in Electrical and Computer Engineering
            </p>
            <p className="text-sm text-gray-500 mt-1">2008 — 2013</p>
          </div>
        </div>
      </section>

      {/* Public Speaking */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
          Public Speaking
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Active speaker at international conferences and local meetups:
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 italic">
          <span>TorontoJS</span>
          <span>ReactTO</span>
          <span>React Summit</span>
          <span>React Native EU</span>
        </div>
      </section>
    </div>
  );
}

function ExperienceItem({
  company,
  role,
  period,
  description,
}: { company: string; role: string; period: string; description: string }) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {company}
        </h3>
        <span className="text-sm font-mono text-blue-600 dark:text-blue-500/60 font-medium">
          {period}
        </span>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-3">{role}</p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{description}</p>
    </div>
  );
}
