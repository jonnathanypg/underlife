'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function AikrofyWidget() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure widget presence and visibility on every SPA page navigation
    if (typeof window !== 'undefined') {
      const fabRoot = document.getElementById('aikrofy-fab-root');
      if (fabRoot) {
        fabRoot.style.display = 'flex';
      }
    }
  }, [pathname]);

  return (
    <Script
      id="aikrofy-widget-script"
      src="https://app.aikrofy.com/widget.js"
      data-widget-id="3e502c00-45ae-4d6e-9bf6-5d60dab2ba46"
      strategy="lazyOnload"
    />
  );
}
