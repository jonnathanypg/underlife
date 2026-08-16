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
      'fundacion-underlife-ninos-proteccion-6.webp',
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
      'fundacion-underlife-hackathon-tecnologia-1.webp',
      'fundacion-underlife-hackathon-tecnologia-2.webp',
      'fundacion-underlife-hackathon-tecnologia-3.webp',
      'fundacion-underlife-hackathon-tecnologia-4.webp',
      'fundacion-underlife-hackathon-tecnologia-5.webp',
      'fundacion-underlife-hackathon-tecnologia-6.webp',
      'fundacion-underlife-hackathon-tecnologia-7.webp',
    ],
  },
  {
    key: 'workshops',
    folder: 'talleres',
    images: [
      'fundacion-underlife-talleres-comunitarios-1.webp',
      'fundacion-underlife-talleres-comunitarios-2.webp',
      'fundacion-underlife-talleres-comunitarios-3.webp',
      'fundacion-underlife-talleres-comunitarios-4.webp',
    ],
  },
];

const videos = [
  { webm: 'fundacion-underlife-video-impacto-1.webm', mp4: 'fundacion-underlife-video-impacto-1.mp4', poster: '/recursos_opt/Videos/impacto-1-poster.jpg' },
  { webm: 'fundacion-underlife-video-impacto-2.webm', mp4: 'fundacion-underlife-video-impacto-2.mp4', poster: '/recursos_opt/Videos/impacto-2-poster.jpg' },
  { webm: 'fundacion-underlife-video-impacto-3.webm', mp4: 'fundacion-underlife-video-impacto-3.mp4', poster: '/recursos_opt/Videos/impacto-3-poster.jpg' },
];

export default function GalleriesSection() {
  const t = useTranslations('galleries');
  const [activeGallery, setActiveGallery] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Preload all gallery images in background for instant, zero-flicker tab navigation
  useEffect(() => {
    galleries.forEach((group) => {
      group.images.forEach((imgName) => {
        const img = new Image();
        img.src = `/recursos_opt/${group.folder}/${imgName}`;
      });
    });
  }, []);

  const active = galleries[activeGallery];

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((v, i) => {
      if (i !== index && v) {
        v.pause();
      }
    });
  };

  return (
    <section id="proyectos" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="gradient-text" style={{ padding: '0 10px' }}>{t(`${active.key}.title`)}</span>
          </h2>
          <p className="section-subtitle">{t(`${active.key}.body`)}</p>
        </div>

        {/* Gallery Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {galleries.map((g, i) => (
            <button
              key={g.key}
              onClick={() => setActiveGallery(i)}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all var(--duration-normal) var(--ease-out)',
                background: activeGallery === i ? 'var(--gradient-accent)' : 'var(--glass-bg)',
                color: activeGallery === i ? '#fff' : 'var(--text-secondary)',
                border: activeGallery === i ? 'none' : '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              {t(`${g.key}.title`)}
            </button>
          ))}
        </div>

        {/* Pre-rendered 3D Infinite Carousels for Zero-Flicker Transition */}
        <div style={{ padding: '20px 0', width: '100%', position: 'relative' }} className="slider3d-wrapper">
          {galleries.map((galleryGroup, groupIndex) => {
            const isGroupActive = activeGallery === groupIndex;
            const imagesList =
              galleryGroup.images.length < 10
                ? [...galleryGroup.images, ...galleryGroup.images, ...galleryGroup.images]
                : galleryGroup.images;

            return (
              <div
                key={galleryGroup.key}
                style={{
                  display: isGroupActive ? 'block' : 'none',
                  transition: 'opacity 0.25s ease',
                  width: '100%',
                }}
              >
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slideToClickedSlide={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  modules={[EffectCoverflow, Pagination, Autoplay]}
                  className="mySwiper"
                  style={{ width: '100%', paddingTop: '30px', paddingBottom: '60px' }}
                >
                  {imagesList.map((img, i) => (
                    <SwiperSlide
                      key={`${galleryGroup.key}-${i}`}
                      style={{ width: '300px', height: '350px', backgroundPosition: 'center', backgroundSize: 'cover' }}
                    >
                      <img
                        src={`/recursos_opt/${galleryGroup.folder}/${img}`}
                        alt={`Fundación Underlife — ${t(`${galleryGroup.key}.title`)} (${i + 1})`}
                        loading="eager"
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
              </div>
            );
          })}

          {/* Invisible Navigation Click Zones */}
          <div
            className="swiper-nav-zone-left"
            onClick={() => {
              const swiper = (document.querySelector('.mySwiper') as any)?.swiper;
              if (swiper) swiper.slidePrev();
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '15%', height: '100%', zIndex: 10, cursor: 'w-resize' }}
          />
          <div
            className="swiper-nav-zone-right"
            onClick={() => {
              const swiper = (document.querySelector('.mySwiper') as any)?.swiper;
              if (swiper) swiper.slideNext();
            }}
            style={{ position: 'absolute', top: 0, right: 0, width: '15%', height: '100%', zIndex: 10, cursor: 'e-resize' }}
          />
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
