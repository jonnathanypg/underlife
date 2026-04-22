'use client';

import { useTranslations } from 'next-intl';
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
    folder: 'niños',
    images: [
      'fundacion-underlife-ninos-1.jpg',
      'fundacion-underlife-ninos-10.jpg',
      'fundacion-underlife-ninos-11.jpg',
      'fundacion-underlife-ninos-12.jpg',
      'fundacion-underlife-ninos-14.jpg',
      'fundacion-underlife-ninos-15.jpg',
      'fundacion-underlife-ninos-16.jpg',
      'fundacion-underlife-ninos-17.jpg',
      'fundacion-underlife-ninos-18.jpg',
      'fundacion-underlife-ninos-2.jpg',
      'fundacion-underlife-ninos-3.jpg',
      'fundacion-underlife-ninos-4.jpg',
      'fundacion-underlife-ninos-5.jpg',
      'fundacion-underlife-ninos-6.jpg',
      'fundacion-underlife-ninos-7.jpg',
      'fundacion-underlife-ninos-8.jpg',
      'fundacion-underlife-ninos-9.jpg'
    ]
  },
  {
    key: 'hiphop',
    folder: 'hiphop',
    images: [
      'fundacion-underlife-urban-fest-hiphop-1.jpg',
      'fundacion-underlife-urban-fest-hiphop-10.jpg',
      'fundacion-underlife-urban-fest-hiphop-11.jpg',
      'fundacion-underlife-urban-fest-hiphop-12.jpg',
      'fundacion-underlife-urban-fest-hiphop-13.jpg',
      'fundacion-underlife-urban-fest-hiphop-14.jpg',
      'fundacion-underlife-urban-fest-hiphop-15.jpg',
      'fundacion-underlife-urban-fest-hiphop-16.jpg',
      'fundacion-underlife-urban-fest-hiphop-17.jpg',
      'fundacion-underlife-urban-fest-hiphop-2.jpg',
      'fundacion-underlife-urban-fest-hiphop-3.jpg',
      'fundacion-underlife-urban-fest-hiphop-4.jpg',
      'fundacion-underlife-urban-fest-hiphop-5.jpg',
      'fundacion-underlife-urban-fest-hiphop-6.jpg',
      'fundacion-underlife-urban-fest-hiphop-7.jpg',
      'fundacion-underlife-urban-fest-hiphop-8.jpg',
      'fundacion-underlife-urban-fest-hiphop-9.jpg'
    ]
  },
  {
    key: 'innovation',
    folder: 'hackaton',
    images: [
      'fundacion-underlife-hackathon-tecnologia-1.jpg',
      'fundacion-underlife-hackathon-tecnologia-2.jpg',
      'fundacion-underlife-hackathon-tecnologia-4.jpg',
      'fundacion-underlife-hackathon-tecnologia-5.jpg',
      'fundacion-underlife-hackathon-tecnologia-6.jpg',
      'fundacion-underlife-hackathon-tecnologia-7.jpg'
    ]
  },
  {
    key: 'workshops',
    folder: 'talleres',
    images: [
      'fundacion-underlife-talleres-capacitacion-1.jpg',
      'fundacion-underlife-talleres-capacitacion-2.jpg',
      'fundacion-underlife-talleres-capacitacion-3.jpg',
      'fundacion-underlife-talleres-capacitacion-4.jpg'
    ]
  },
];

const videos = [
  'fundacion-underlife-video-impacto-1.mp4',
  'fundacion-underlife-video-impacto-2.mp4',
  'fundacion-underlife-video-impacto-3.mp4',
];

export default function GalleriesSection() {
  const t = useTranslations('galleries');
  const [activeGallery, setActiveGallery] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
                cursor: 'pointer'
              }}
            >
              {t(`${g.key}.title`)}
            </button>
          ))}
        </div>

        {/* 3D Infinite Carousel */}
        <div style={{ padding: '20px 0', width: '100%', position: 'relative' }} className="slider3d-wrapper">
          <Swiper
            key={activeGallery} // Force remount on category change
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
            {/* Duplicating images if count is low (< 10) to ensure smooth Swiper loop */}
            {(active.images.length < 10
              ? [...active.images, ...active.images, ...active.images]
              : active.images
            ).map((img, i) => (
              <SwiperSlide key={i} style={{ width: '300px', height: '350px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <img
                  src={`/recursos_opt/${active.folder}/${img}`}
                  alt={`${active.key} slide ${i}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

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
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={`/recursos_opt/Videos/${vid}`}
                  controls
                  preload="metadata"
                  onPlay={() => handlePlay(i)}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
