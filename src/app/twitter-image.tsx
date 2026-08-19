import { ImageResponse } from 'next/og';

export const alt = 'Fundación Underlife — Innovación Social y Protección Infantil';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#090D16',
          padding: '70px 80px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 85, 255, 0.35) 0%, rgba(0, 85, 255, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '200px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 85, 0, 0.28) 0%, rgba(255, 85, 0) 0) 70%)',
          }}
        />

        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#FF5500',
              }}
            />
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#E2E8F0',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Organización Sin Fines de Lucro • Ecuador
            </span>
          </div>

          <div
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#94A3B8',
              letterSpacing: '0.04em',
            }}
          >
            fundacionunderlife.org
          </div>
        </div>

        {/* Center Main Punchline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>No solo asistimos a la vulnerabilidad;</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #0055FF 0%, #FF5500 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              innovamos para erradicarla.
            </span>
          </div>

          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.4,
              color: '#94A3B8',
              maxWidth: '920px',
              margin: 0,
            }}
          >
            Protección infantil integral, tecnología contra la desnutrición crónica y desarrollo comunitario en Ecuador.
          </p>
        </div>

        {/* Bottom Bar / Pillars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            zIndex: 10,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0055FF' }} />
            <span style={{ color: '#E2E8F0', fontSize: '18px', fontWeight: 600 }}>Centros CDI Infantiles</span>
          </div>
          <span style={{ color: '#475569' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5500' }} />
            <span style={{ color: '#E2E8F0', fontSize: '18px', fontWeight: 600 }}>Tour Artivismo 1000 Días</span>
          </div>
          <span style={{ color: '#475569' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0055FF' }} />
            <span style={{ color: '#E2E8F0', fontSize: '18px', fontWeight: 600 }}>Pensamiento Divergente</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
