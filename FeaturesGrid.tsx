import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface FeaturesChessProps {
  onOpenBooking: () => void;
}

export function FeaturesChess({ onOpenBooking }: FeaturesChessProps) {
  const rows = [
    {
      badge: "Automation",
      title: "Editing at the speed of thought.",
      body: "Our AI identifies the best takes, syncs audio, and generates initial assemblies in seconds. You get the polish of a master editor with the speed of light.",
      btn: "Learn more",
      gif: "https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif"
    },
    {
      badge: "Color Grading",
      title: "Cinematic looks, automatically applied.",
      body: "Every frame is an art piece. AI-powered color matching ensures your footage looks consistent and premium across any camera or lighting setup.",
      btn: "See how it works",
      gif: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
      reverse: true
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col gap-32">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 uppercase tracking-widest">
           Capabilities
        </div>
        <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[1] max-w-xl">
           Pro features. Zero complexity.
        </h2>
      </div>

      {rows.map((row, i) => (
        <div 
          key={i} 
          className={cn(
            "flex flex-col lg:flex-row items-center gap-16 lg:gap-24",
            row.reverse && "lg:flex-row-reverse"
          )}
        >
          {/* Text */}
          <div className="flex-1 flex flex-col items-start text-left">
             <div className="text-white/40 font-body text-sm font-semibold uppercase tracking-widest mb-4">
                {row.badge}
             </div>
             <h3 className="text-3xl md:text-5xl font-heading italic text-white leading-[1] mb-6">
                {row.title}
             </h3>
             <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 leading-relaxed">
                {row.body}
             </p>
             <button 
               onClick={onOpenBooking}
               className="liquid-glass-strong rounded-full px-6 py-3 font-semibold group"
             >
                {row.btn}
             </button>
          </div>

          {/* Gif Container */}
          <div className="flex-1 w-full aspect-video liquid-glass rounded-3xl overflow-hidden relative group">
             <img 
               src={row.gif} 
               alt="Feature preview" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
          </div>
        </div>
      ))}
    </section>
  );
}
