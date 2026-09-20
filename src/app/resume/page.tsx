import { Fragment } from 'react';

const CORE_SKILLS = [
  'React',
  'React Native',
  'TypeScript',
  'Next.js',
  'Nx',
  'Expo',
  'Angular',
  'Node.js',
  'GraphQL',
];

const TOOLS = [
  'Jest',
  'Cypress',
  'Playwright',
  'Vitest',
  'Testing Library',
  'Git',
  'Docker',
  'AWS',
];

const SPEAKING = ['TorontoJS', 'ReactTO', 'React Summit', 'React Native EU'];

const EXPERIENCE = [
  {
    company: 'Nx.dev',
    position: 'Senior Software Developer & Core Maintainer',
    period: '2021 — 2025',
    description:
      'Contributing to the core of Nx, a leading build system for monorepos. Focused on Next.js, React, and Vite integrations. Improved developer experience through automated migrations and cloud-based caching mechanisms.',
  },
  {
    company: 'RewardOps',
    position: 'Senior Frontend Developer',
    period: '2020 — 2021',
    description:
      'Architected and built internal tools using React and TypeScript. Improved codebase quality through rigorous testing patterns and design system implementation.',
  },
  {
    company: 'IBM',
    position: 'Frontend Web Consultant',
    period: '2020',
    description:
      'Led a major Angular migration for a large-scale enterprise client. Optimized application performance and mentored junior developers on modern frontend practices.',
  },
  {
    company: 'Rangle.io',
    position: 'Frontend Developer',
    period: '2016 — 2020',
    description:
      'Built high-impact digital products for global clients. Specialized in React and Angular ecosystems. Advocated for accessibility and web performance.',
  },
  {
    company: 'RBC',
    position: 'Mobile Application Developer',
    period: '2013 — 2016',
    description:
      'Developed native and hybrid mobile applications for banking services. Focused on security, performance, and cross-device compatibility.',
  },
];

const CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/xiongemi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xiongemi/' },
  { label: 'Medium', href: 'https://medium.com/@emilyxiong' },
];

const CONTACT_LINK =
  'underline decoration-current/40 underline-offset-2 hover:decoration-current transition-colors';

const HEADING_CLASSES =
  'text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold';

const CHIP_CLASSES =
  'px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300';

export default function ResumePage() {
  return (
    <div className="p-2 md:p-12 font-sans max-w-4xl mx-auto fade-up">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 pb-8 mb-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
          Emily Xiong
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-6">
          Senior Software Developer · React &amp; React Native
        </p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <a href="mailto:xiongemi@gmail.com" className={CONTACT_LINK}>
              xiongemi@gmail.com
            </a>
          </li>
          <li aria-hidden="true">•</li>
          <li>Toronto, Canada</li>
          {CONTACT_LINKS.map(({ label, href }) => (
            <Fragment key={label}>
              <li aria-hidden="true">•</li>
              <li>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className={CONTACT_LINK}
                >
                  {label}
                </a>
              </li>
            </Fragment>
          ))}
        </ul>
      </header>

      {/* Summary */}
      <section className="mb-12" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className={`${HEADING_CLASSES} mb-4`}>
          Summary
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-2 border-blue-500/40 pl-6">
          Senior Software Developer with 10 years of experience (6 in React). Expert in building
          accessible, high-performance web applications and cross-platform mobile apps with React
          Native. Core maintainer of Nx.dev and active open-source contributor.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-12" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className={`${HEADING_CLASSES} mb-6`}>
          Professional Experience
        </h2>
        <ol className="space-y-10">
          {EXPERIENCE.map((role) => (
            <li key={role.company}>
              <ExperienceItem {...role} />
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section aria-labelledby="core-skills-heading">
          <h2 id="core-skills-heading" className={`${HEADING_CLASSES} mb-4`}>
            Core Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {CORE_SKILLS.map((skill) => (
              <li key={skill} className={CHIP_CLASSES}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className={`${HEADING_CLASSES} mb-4`}>
            Testing &amp; Tools
          </h2>
          <ul className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <li key={tool} className={CHIP_CLASSES}>
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Education */}
      <section className="mb-12" aria-labelledby="education-heading">
        <h2 id="education-heading" className={`${HEADING_CLASSES} mb-4`}>
          Education
        </h2>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          University of Toronto
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Master&rsquo;s &amp; Bachelor&rsquo;s Degree in Electrical and Computer Engineering
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">2008 — 2013</p>
      </section>

      {/* Public Speaking */}
      <section aria-labelledby="speaking-heading">
        <h2 id="speaking-heading" className={`${HEADING_CLASSES} mb-4`}>
          Public Speaking
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Active speaker at international conferences and local meetups:
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 italic">
          {SPEAKING.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ExperienceItem({
  company,
  position,
  period,
  description,
}: {
  company: string;
  position: string;
  period: string;
  description: string;
}) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {company}
        </h3>
        <p className="text-sm font-mono text-blue-600 dark:text-blue-400 font-medium">{period}</p>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-3">{position}</p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{description}</p>
    </div>
  );
}
