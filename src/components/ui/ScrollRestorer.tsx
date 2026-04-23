'use client';

import { useEffect } from 'react';

export default function ScrollRestorer() {
  useEffect(() => {
    // Check if we have a saved scroll position
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    
    if (savedScrollPos) {
      // Small delay to ensure the DOM is rendered and settled
      // especially with GSAP and dynamic layouts
      const scrollY = parseInt(savedScrollPos, 10);
      
      const restoreScroll = () => {
        window.scrollTo({
          top: scrollY,
          behavior: 'instant'
        });
        sessionStorage.removeItem('scrollPos');
      };

      // Try immediately
      restoreScroll();
      
      // And a backup after a short delay for heavy sections
      setTimeout(restoreScroll, 100);
    }
  }, []);

  return null;
}
