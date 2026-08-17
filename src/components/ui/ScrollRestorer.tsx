'use client';

import { useEffect } from 'react';

export default function ScrollRestorer() {
  useEffect(() => {
    // Handle hash scrolling (#donar, #proyectos, etc.)
    if (typeof window !== 'undefined' && window.location.hash) {
      const scrollToHash = () => {
        try {
          const rawHash = window.location.hash.split('?')[0].split('&')[0];
          if (rawHash && /^#[a-zA-Z0-9_-]+$/.test(rawHash)) {
            const el = document.getElementById(rawHash.slice(1)) || document.querySelector(rawHash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } catch (err) {
          console.warn('Scroll to hash skipped:', err);
        }
      };

      scrollToHash();
      const t1 = setTimeout(scrollToHash, 200);
      const t2 = setTimeout(scrollToHash, 600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    // Check if we have a saved scroll position
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    if (savedScrollPos) {
      const scrollY = parseInt(savedScrollPos, 10);
      const restoreScroll = () => {
        window.scrollTo({
          top: scrollY,
          behavior: 'instant'
        });
        sessionStorage.removeItem('scrollPos');
      };

      restoreScroll();
      setTimeout(restoreScroll, 100);
    }
  }, []);

  return null;
}
