'use client';

import { useTranslations } from '@/lib/LanguageContext';
import { useState, useRef, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

interface GalleryGroup {
  key: string;
  folder: string;
  images: string[];
}

const galleries: GalleryGroup[] = [
  {
    key: 'children',
    folder: 'ninos',
    images: [
      'fundacion-underlife-ninos-proteccion-1.webp',
      'fundacion-underlife-ninos-proteccion-2.webp',
      'fundacion-underlife-ninos-proteccion-3.webp',
      'fundacion-underlife-ninos-proteccion-4.webp',
      'fundacion-underlife-ninos-proteccion-5.webp',
      'fundacion-underlife-ninos-proteccion-7.webp',
      'fundacion-underlife-ninos-proteccion-8.webp',
      'fundacion-underlife-ninos-proteccion-9.webp',
      'fundacion-underlife-ninos-proteccion-10.webp',
      'fundacion-underlife-ninos-proteccion-11.webp',
      'fundacion-underlife-ninos-proteccion-12.webp',
      'fundacion-underlife-ninos-proteccion-13.webp',
      'fundacion-underlife-ninos-proteccion-14.webp',
      'fundacion-underlife-ninos-proteccion-15.webp',
      'fundacion-underlife-ninos-proteccion-16.webp',
      'fundacion-underlife-ninos-proteccion-17.webp',
      'fundacion-underlife-ninos-proteccion-18.webp',
    ],
  },
  {
    key: 'hiphop',
    folder: 'hiphop',
    images: [
      'fundacion-underlife-urban-fest-hiphop-1.webp',
      'fundacion-underlife-urban-fest-hiphop-2.webp',
      'fundacion-underlife-urban-fest-hiphop-3.webp',
      'fundacion-underlife-urban-fest-hiphop-4.webp',
      'fundacion-underlife-urban-fest-hiphop-5.webp',
      'fundacion-underlife-urban-fest-hiphop-6.webp',
      'fundacion-underlife-urban-fest-hiphop-7.webp',
      'fundacion-underlife-urban-fest-hiphop-8.webp',
      'fundacion-underlife-urban-fest-hiphop-9.webp',
      'fundacion-underlife-urban-fest-hiphop-10.webp',
      'fundacion-underlife-urban-fest-hiphop-11.webp',
      'fundacion-underlife-urban-fest-hiphop-12.webp',
      'fundacion-underlife-urban-fest-hiphop-13.webp',
      'fundacion-underlife-urban-fest-hiphop-14.webp',
      'fundacion-underlife-urban-fest-hiphop-15.webp',
      'fundacion-underlife-urban-fest-hiphop-16.webp',
      'fundacion-underlife-urban-fest-hiphop-17.webp',
    ],
  },
  {
    key: 'innovation',
    folder: 'hackathon',
    images: [
      'fundacion-underlife-hackathon-tecnologia-2.webp',
      'fundacion-underlife-hackathon-tecnologia-3.webp',
      'fundacion-underlife-hackathon-tecnologia-5.webp',
      'fundacion-underlife-hackathon-tecnologia-6.webp',
      'fundacion-underlife-hackathon-tecnologia-7.webp',
    ],
  },
  {
    key: 'workshops',
    folder: 'talleres',
    images: [
      'fundacion-underlife-talleres-capacitacion-1.webp',
      'fundacion-underlife-talleres-capacitacion-2.webp',
      'fundacion-underlife-talleres-capacitacion-3.webp',
      'fundacion-underlife-talleres-capacitacion-4.webp',
    ],
  },
];

const videos = [
  { webm: 'fundacion-underlife-video-impacto-1.webm', mp4: 'fundacion-underlife-video-impacto-1.mp4', poster: '/recursos_opt/Videos/impacto-1-poster.webp' },
  { webm: 'fundacion-underlife-video-impacto-2.webm', mp4: 'fundacion-underlife-video-impacto-2.mp4', poster: '/recursos_opt/Videos/impacto-2-poster.webp' },
  { webm: 'fundacion-underlife-video-impacto-3.webm', mp4: 'fundacion-underlife-video-impacto-3.mp4', poster: '/recursos_opt/Videos/impacto-3-poster.webp' },
];

export default function GalleriesSection() {
  const t = useTranslations('galleries');
  const [activeTab, setActiveTab] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const swiperRef = useRef<any>(null);

  // Defer gallery images background preloading during browser idle to avoid blocking main thread and FCP/LCP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const schedulePreload = () => {
        galleries.forEach((g) => {
          g.images.forEach((img) => {
            const image = new Image();
            image.src = `/recursos_opt/${g.folder}/${img}`;
          });
        });
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(schedulePreload, { timeout: 3000 });
      } else {
        const timer = setTimeout(schedulePreload, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
  };

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((v, i) => {
      if (i !== index && v) v.pause();
    });
  };

  return (
    <section id="proyectos" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            <span className="gradient-text" style={{ padding: '0 10px' }}>
              {t(`${galleries[activeTab].key}.title`)}
            </span>
          </h2>
          <p className="section-subtitle">{t(`${galleries[activeTab].key}.body`)}</p>
        </div>

        {/* Gallery Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {galleries.map((g, i) => (
            <button
              key={g.key}
              onClick={() => handleTabChange(i)}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all var(--duration-fast) var(--ease-out)',
                background: activeTab === i ? 'var(--gradient-accent)' : 'var(--glass-bg)',
                color: activeTab === i ? '#fff' : 'var(--text-secondary)',
                border: activeTab === i ? 'none' : '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              {t(`${g.key}.title`)}
            </button>
          ))}
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="slider3d-wrapper"
          style={{
            padding: '20px 0',
            width: '100%',
            position: 'relative',
          }}
        >
          {(() => {
            const activeGallery = galleries[activeTab];
            let activeImages = [...activeGallery.images];
            while (activeImages.length < 15) {
              activeImages = [...activeImages, ...activeGallery.images];
            }

            return (
              <>
                <Swiper
                  key={`${activeGallery.key}-${activeTab}`}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  observer={true}
                  observeParents={true}
                  slideToClickedSlide={true}
                  slidesPerView="auto"
                  coverflowEffect={{
                    rotate: 25,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{ clickable: true }}
                  modules={[EffectCoverflow, Pagination, Autoplay]}
                  className="mySwiper"
                  style={{ width: '100%', paddingTop: '30px', paddingBottom: '60px' }}
                >
                  {activeImages.map((img, i) => (
                    <SwiperSlide
                      key={`${activeGallery.key}-${i}`}
                      style={{ width: '300px', height: '350px' }}
                    >
                      <img
                        src={`/recursos_opt/${activeGallery.folder}/${img}`}
                        alt={`Fundación Underlife — ${t(`${activeGallery.key}.title`)} (${i + 1})`}
                        loading="lazy"
                        decoding="async"
                        width={300}
                        height={350}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '16px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                          display: 'block',
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Click Zones — role="button" required for aria-label on div */}
                <div
                  role="button"
                  tabIndex={0}
                  className="swiper-nav-zone-left"
                  onClick={() => swiperRef.current?.slidePrev()}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && swiperRef.current?.slidePrev()}
                  style={{ position: 'absolute', top: 0, left: 0, width: '15%', height: '100%', zIndex: 10, cursor: 'w-resize' }}
                  aria-label="Diapositiva anterior"
                />
                <div
                  role="button"
                  tabIndex={0}
                  className="swiper-nav-zone-right"
                  onClick={() => swiperRef.current?.slideNext()}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && swiperRef.current?.slideNext()}
                  style={{ position: 'absolute', top: 0, right: 0, width: '15%', height: '100%', zIndex: 10, cursor: 'e-resize' }}
                  aria-label="Diapositiva siguiente"
                />
              </>
            );
          })()}
        </div>

        {/* Video Section */}
        <div style={{ marginTop: 60 }}>
          <div className="section-header">
            <h3 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32, verticalAlign: 'middle', marginRight: 12, display: 'inline-block', color: 'var(--color-primary)' }}>
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
              <span className="gradient-text">{t('reels.title')}</span>
            </h3>
            <p className="section-subtitle">{t('reels.body')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {videos.map((vid, i) => (
              <div key={i} className="media-frame aspect-video" style={{ borderRadius: 'var(--radius-md)', background: '#000' }}>
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  controls
                  preload="none"
                  poster={vid.poster}
                  onPlay={() => handlePlay(i)}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src={`/recursos_opt/Videos/${vid.webm}`} type="video/webm" />
                  {vid.mp4 && <source src={`/recursos_opt/Videos/${vid.mp4}`} type="video/mp4" />}
                  <track kind="captions" srcLang="es" label="Español" src="/recursos_opt/Videos/captions-es.vtt" default />
                  <track kind="captions" srcLang="en" label="English" src="/recursos_opt/Videos/captions-en.vtt" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
