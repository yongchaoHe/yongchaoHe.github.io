'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);
  const prevPathname = useRef(pathname);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Fade in after navigation
    setOpacity(0);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpacity(1);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        opacity,
        transition: opacity === 0 ? 'none' : 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {children}
    </div>
  );
}
