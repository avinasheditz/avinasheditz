import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Loader2 } from 'lucide-react';

interface TransitionOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function TransitionOverlay({ isVisible, onComplete }: TransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
             onComplete?.();
          }
        });

        tl.set(overlayRef.current, { display: 'flex', opacity: 0 })
          .to(overlayRef.current, { 
            opacity: 1, 
            duration: 0.3, 
            ease: 'power2.inOut' 
          })
          .fromTo(contentRef.current, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
            '-=0.1'
          );

        // Progress animation
        gsap.to({ val: 0 }, {
          val: 100,
          duration: 0.6,
          ease: 'power2.inOut',
          onUpdate: function() {
            setProgress(Math.floor(this.targets()[0].val));
          }
        });
      });

      return () => ctx.revert();
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] items-center justify-center bg-black backdrop-blur-2xl"
    >
      <div ref={contentRef} className="text-center">
        <div className="relative mb-8 inline-block">
          <Loader2 className="w-12 h-12 text-white animate-spin opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-2xl font-heading italic font-bold mb-2 tracking-tight">Opening Service App</h2>
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
          <span>Syncing Workspace</span>
          <span className="w-8 text-left">{progress}%</span>
        </div>

        {/* Fancy Progress Bar */}
        <div className="mt-8 w-48 h-[2px] bg-white/5 rounded-full mx-auto overflow-hidden relative">
           <div 
            className="absolute inset-y-0 left-0 bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_white]"
            style={{ width: `${progress}%` }}
           />
        </div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
