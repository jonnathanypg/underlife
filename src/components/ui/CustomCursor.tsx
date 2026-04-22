'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const handleMouseDown = () => {
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(0.75)`;
    };

    const handleMouseUp = () => {
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(1)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      requestAnimationFrame(animate);
    };

    // Add hover class for interactive elements
    const handleLinkEnter = () => ring.classList.add('cursor-hover');
    const handleLinkLeave = () => ring.classList.remove('cursor-hover');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
      document.body.style.cursor = '';
    };
  }, []);

  // Only show on devices with fine pointer (no touch / mobile)
  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)' as unknown as number,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
        }}
        className="cursor-dot"
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: '2px solid var(--color-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)' as unknown as number,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
        className="cursor-ring"
      />
      <style>{`
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none !important; }
          body { cursor: auto !important; }
        }
        .cursor-ring.cursor-hover {
          width: 56px !important;
          height: 56px !important;
          border-color: var(--color-accent) !important;
          margin-left: -8px;
          margin-top: -8px;
        }
      `}</style>
    </>
  );
}
