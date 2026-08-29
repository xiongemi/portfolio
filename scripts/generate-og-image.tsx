import { ImageResponse } from 'next/og';

export const alt = 'Emily Xiong — Software Engineer in Toronto';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Required by `output: 'export'` — the image is rendered once at build time.
export const dynamic = 'force-static';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        backgroundImage:
          'radial-gradient(at 0% 0%, #2a1d3d 0px, transparent 55%), radial-gradient(at 100% 0%, #14243f 0px, transparent 55%)',
        padding: 64,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(15,23,42,0.72)',
          overflow: 'hidden',
        }}
      >
        {/* window chrome */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#eab308' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#22c55e' }} />
          <div
            style={{
              marginLeft: 20,
              fontFamily: MONO,
              fontSize: 20,
              color: '#94a3b8',
            }}
          >
            about.json
          </div>
        </div>

        {/* body */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '44px 56px', gap: 6 }}>
          <div style={{ fontFamily: MONO, fontSize: 30, color: '#eab308' }}>{'{'}</div>
          {[
            ['name', 'Emily Xiong'],
            ['title', 'Software Engineer'],
            ['location', 'Toronto, Canada'],
            ['stack', 'React · React Native · TypeScript'],
            ['shipped', '10 iOS apps · Nx core maintainer'],
          ].map(([key, value]) => (
            <div
              key={key}
              style={{ display: 'flex', fontFamily: MONO, fontSize: 30, marginLeft: 36 }}
            >
              <span style={{ color: '#22d3ee' }}>"{key}"</span>
              <span style={{ color: '#64748b' }}>:&nbsp;</span>
              <span style={{ color: '#34d399' }}>"{value}"</span>
              <span style={{ color: '#64748b' }}>,</span>
            </div>
          ))}
          <div style={{ fontFamily: MONO, fontSize: 30, color: '#eab308' }}>{'}'}</div>
        </div>
      </div>
    </div>,
    size,
  );
}
