import { HLSVideo } from './HLSVideo';
import { motion } from 'motion/react';

interface StartSectionProps {
  onOpenBooking: () => void;
}

export function StartSection({ onOpenBooking }: StartSectionProps) {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <HLSVideo src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" />
        {/* Fades */}
        <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 uppercase tracking-widest">
           How It Works
        </div>
        
        <h2 className="text-5xl md:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          You film it. <br/> We perfect it.
        </h2>

        <p className="text-white/60 font-body font-light text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
          Upload your raw footage. Our AI-assisted workflow handles the rest—cuts, 
          color grading, sound design, and delivery. All in days, not weeks.
        </p>

        <button 
          onClick={onOpenBooking}
          className="liquid-glass-strong rounded-full px-10 py-5 text-lg font-bold group hover:scale-105 transition-transform"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
}
