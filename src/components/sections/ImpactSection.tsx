'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="gradient-text-primary" style={{ fontSize: '2.8rem', fontWeight: 900 }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactSection() {
  const t = useTranslations('impact');
  const tHero = useTranslations('hero');

  const metrics = [
    { target: 2300, prefix: '+', label: tHero('stats.yearsLabel') },
    { target: 395, prefix: '+', label: tHero('stats.childrenLabel') },
    { target: 100, prefix: '+', label: tHero('stats.familiesLabel') },
    { target: 1500, prefix: '+', label: tHero('stats.youthLabel') },
  ];

  return (
    <section id="impacto" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p className="section-subtitle">{t('body')}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="glass-card"
              style={{
                padding: '36px 24px',
                textAlign: 'center',
              }}
            >
              <AnimatedCounter target={m.target} prefix={m.prefix} />
              <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: '0.9rem', fontWeight: 500 }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
