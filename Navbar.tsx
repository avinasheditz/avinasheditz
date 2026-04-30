import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from '@/src/lib/utils';

interface HLSVideoProps {
  src: string;
  className?: string;
  poster?: string;
  desaturated?: boolean;
}

export function HLSVideo({ src, className, poster, desaturated }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Auto-play might be blocked
        });
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={cn(
        "w-full h-full object-cover",
        desaturated && "grayscale",
        className
      )}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
    />
  );
}
