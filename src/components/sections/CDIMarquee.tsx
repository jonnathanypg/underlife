'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const cdiCenters = [
  {
    key: 'caritas',
    folder: 'cdi-caritas-alegres',
    images: [
      'fundacion-underlife-cdi-caritas-1.webp',
      'fundacion-underlife-cdi-caritas-2.webp',
      'fundacion-underlife-cdi-caritas-3.webp',
      'fundacion-underlife-cdi-caritas-4.webp',
      'fundacion-underlife-cdi-caritas-5.webp',
      'fundacion-underlife-cdi-caritas-6.webp',
      'fundacion-underlife-cdi-caritas-7.webp',
      'fundacion-underlife-cdi-caritas-8.webp',
      'fundacion-underlife-cdi-caritas-9.webp'
    ]
  },
  {
    key: 'pedacitos',
    folder: 'cdi-pedacitos-de-amor',
    images: [
      'fundacion-underlife-cdi-pedacitos-1.webp',
      'fundacion-underlife-cdi-pedacitos-2.webp',
      'fundacion-underlife-cdi-pedacitos-3.webp',
      'fundacion-underlife-cdi-pedacitos-4.webp',
      'fundacion-underlife-cdi-pedacitos-5.webp',
      'fundacion-underlife-cdi-pedacitos-6.webp',
      'fundacion-underlife-cdi-pedacitos-7.webp',
      'fundacion-underlife-cdi-pedacitos-8.webp',
      'fundacion-underlife-cdi-pedacitos-9.webp',
      'fundacion-underlife-cdi-pedacitos-10.webp'
    ]
  },
  {
    key: 'gotitas',
    folder: 'cdi-gotitas-del-saber',
    images: [
      'fundacion-underlife-cdi-gotitas-1.webp',
      'fundacion-underlife-cdi-gotitas-2.webp',
      'fundacion-underlife-cdi-gotitas-3.webp',
      'fundacion-underlife-cdi-gotitas-4.webp',
      'fundacion-underlife-cdi-gotitas-5.webp',
      'fundacion-underlife-cdi-gotitas-6.webp',
      'fundacion-underlife-cdi-gotitas-7.webp',
      'fundacion-underlife-cdi-gotitas-8.webp',
      'fundacion-underlife-cdi-gotitas-9.webp',
      'fundacion-underlife-cdi-gotitas-10.webp',
      'fundacion-underlife-cdi-gotitas-11.webp',
      'fundacion-underlife-cdi-gotitas-12.webp',
      'fundacion-underlife-cdi-gotitas-13.webp',
      'fundacion-underlife-cdi-gotitas-14.webp',
      'fundacion-underlife-cdi-gotitas-15.webp',
      'fundacion-underlife-cdi-gotitas-16.webp',
      'fundacion-underlife-cdi-gotitas-17.webp',
      'fundacion-underlife-cdi-gotitas-18.webp'
    ]
  },
  {
    key: 'amiguitos',
    folder: 'cdi-amiguitos-a-jugar',
    images: [
      'fundacion-underlife-cdi-amiguitos-1.webp',
      'fundacion-underlife-cdi-amiguitos-2.webp',
      'fundacion-underlife-cdi-amiguitos-3.webp',
      'fundacion-underlife-cdi-amiguitos-4.webp',
      'fundacion-underlife-cdi-amiguitos-5.webp',
      'fundacion-underlife-cdi-amiguitos-6.webp',
      'fundacion-underlife-cdi-amiguitos-7.webp',
      'fundacion-underlife-cdi-amiguitos-8.webp',
      'fundacion-underlife-cdi-amiguitos-9.webp',
      'fundacion-underlife-cdi-amiguitos-10.webp'
    ]
  },
];

export default function CDIMarquee() {
  const t = useTranslations('cdi');

  const allImages = useMemo(() => {
    return cdiCenters.flatMap((c) =>
      c.images.map((imgName, idx) => ({
        src: `/recursos_opt/${c.folder}/${imgName}`,
        label: t(`centers.${c.key}`),
        alt: `Fundación Underlife — ${t(`centers.${c.key}`)} (${idx + 1})`,
      }))
    );
  }, [t]);

  const [shuffledImages, setShuffledImages] = useState<{ src: string, label: string, alt: string }[]>([]);

  useEffect(() => {
    // Shuffle images on client to avoid server-client hydration mismatch
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, [allImages]);

  return (
    <section id="convenio-cdi" className="section section-dark" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('headline')} <span className="gradient-text">{t('headlineAccent')}</span></h2>
          <p className="section-subtitle">{t('body')}</p>
        </div>
      </div>

      <div style={{ padding: '10px 0', width: '100%' }}>
        {shuffledImages.length > 0 && (
          <Swiper
            modules={[Autoplay, Navigation, FreeMode]}
            navigation={true}
            freeMode={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={'auto'}
            spaceBetween={12}
            className="cdi-swiper"
            style={{ width: '100%', padding: '0 40px' }}
          >
            {shuffledImages.map((img, i) => (
              <SwiperSlide key={i} style={{ width: 220, height: 220, borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 'inherit' }} className="media-frame">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={220}
                    height={220}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 8px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: '#fff', fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold' }}>
                    {img.label}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
