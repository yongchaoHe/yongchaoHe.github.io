'use client';

import { useEffect, useRef } from 'react';

export default function BlogPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleReset = () => {
      if (iframeRef.current) {
        iframeRef.current.src = '/blog/app/';
      }
    };
    window.addEventListener('reset-blog-iframe', handleReset);
    return () => window.removeEventListener('reset-blog-iframe', handleReset);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
      <iframe
        ref={iframeRef}
        src="/blog/app/"
        title="LLM Viz"
        className="w-full h-full border-0"
        allow="fullscreen"
      />
    </div>
  );
}
