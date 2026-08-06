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
    <>
      <style>{`
        @keyframes blog-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-fade { animation: blog-fade-in 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s both; }
      `}</style>
      <div className="blog-fade w-full h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
        <iframe
          ref={iframeRef}
          src="/blog/app/"
          title="LLM Viz"
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>
    </>
  );
}

