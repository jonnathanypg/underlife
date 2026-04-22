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
    folder: 'CDI CARITAS ALEGRES - SAN EMILIO',
    images: [
      'fundacion-underlife-cdi-caritas-alegres-san-emilio-1.jpeg',
      'fundacion-underlife-cdi-caritas-alegres-san-emilio-2.jpg',
      'fundacion-underlife-cdi-caritas-alegres-san-emilio-3.jpeg',
      'fundacion-underlife-cdi-caritas-alegres-san-emilio-4.jpg',
      'fundacion-underlife-cdi-caritas-alegres-san-emilio-7.jpg',
      'fundacion-underlife-cdi-caritas-alegres-san-emilio-8.jpg'
    ]
  },
  {
    key: 'pedacitos',
    folder: 'CDI PEDACITOS DE AMOR - VERGELES',
    images: [
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-10.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-2.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-3.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-4.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-5.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-6.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-7.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-8.jpg',
      'fundacion-underlife-cdi-pedacitos-de-amor-vergeles-9.jpg'
    ]
  },
  {
    key: 'gotitas',
    folder: 'CDI GOTITAS DEL SABER - SAN MIGUEL',
    images: [
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-1.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-10.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-11.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-12.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-13.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-14.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-15.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-16.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-17.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-18.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-2.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-3.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-4.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-5.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-6.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-7.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-8.jpg',
      'fundacion-underlife-cdi-gotitas-del-saber-san-miguel-9.jpg'
    ]
  },
  {
    key: 'amiguitos',
    folder: 'CDI AMIGUITOS A JUGAR - UNIDA NORTE',
    images: [
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-1.jpeg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-10.jpeg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-2.jpg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-3.jpeg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-3.jpg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-4.jpeg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-5.jpg',
      'fundacion-underlife-cdi-amiguitos-a-jugar-unida-norte-7.jpg'
    ]
  },
];

export default function CDIMarquee() {
  const t = useTranslations('cdi');

  const allImages = useMemo(() => {
    return cdiCenters.flatMap((c) =>
      c.images.map((imgName) => ({
        src: `/recursos_opt/${c.folder}/${imgName}`,
        label: t(`centers.${c.key}`),
      }))
    );
  }, [t]);

  const [shuffledImages, setShuffledImages] = useState<{ src: string, label: string }[]>([]);

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
                    alt={img.label}
                    loading="lazy"
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
