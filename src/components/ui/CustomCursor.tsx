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
      dot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const handleMouseDown = () => {
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(0.75)`;
    };

    const handleMouseUp = () => {
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(1)`;
    };

    const animate = () => {
      // Increased from 0.12 to 0.22 for faster following
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      requestAnimationFrame(animate);
    };

    // Add hover class for interactive elements
    const handleLinkEnter = () => {
      ring.classList.add('cursor-hover');
      dot.classList.add('dot-hover');
    };
    const handleLinkLeave = () => {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('dot-hover');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive');
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
          width: 12, // Increased from 8
          height: 12, // Increased from 8
          backgroundColor: 'var(--color-primary)', // Using primary for better contrast
          boxShadow: '0 0 10px var(--color-primary)', // Glow effect
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)' as unknown as number,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
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
          border: '1.5px solid var(--color-accent)', // Swapped colors for better balance
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
          width: 64px !important;
          height: 64px !important;
          border-color: var(--color-primary) !important;
          margin-left: -12px;
          margin-top: -12px;
          background-color: rgba(var(--color-primary-rgb), 0.05);
        }
        .cursor-dot.dot-hover {
          background-color: var(--color-accent) !important;
          box-shadow: 0 0 15px var(--color-accent);
          width: 8px !important;
          height: 8px !important;
        }
      `}</style>
    </>
  );
}
