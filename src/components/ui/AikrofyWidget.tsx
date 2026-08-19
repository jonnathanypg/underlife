'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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

  return null;
}
