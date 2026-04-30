import { HLSVideo } from './HLSVideo';
import { ArrowUpRight } from 'lucide-react';

interface CtaFooterProps {
  onOpenBooking: () => void;
}

export function CtaFooter({ onOpenBooking }: CtaFooterProps) {
  return (
    <section className="relative pt-40 pb-16 px-6">
       <div className="absolute inset-0 z-0">
          <HLSVideo src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" />
          <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-black/60 pointer-events-none" />
       </div>

       <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading italic text-white leading-[0.85] mb-12 tracking-tighter">
             Your next video <br/> starts here.
          </h2>
          <p className="text-white/60 font-body font-light text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
             Book a free strategy call. See what AI-powered editing can do for your story. 
             No commitment, just world-class results.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-32">
             <button 
               onClick={onOpenBooking}
               className="liquid-glass-strong rounded-full px-10 py-5 text-xl font-bold flex items-center gap-2 group hover:scale-105 transition-transform"
             >
                Book a Free Call
                <ArrowUpRight className="w-6 h-6" />
             </button>
             <button className="bg-white text-black rounded-full px-10 py-5 text-xl font-bold hover:bg-gray-200 transition-colors">
                View Pricing
             </button>
          </div>

          {/* Footer Bar */}
          <div className="w-full pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-white/40 text-xs font-medium uppercase tracking-widest font-bold">
                (c) 2026 AVINASH EDITZ. ALL RIGHTS RESERVED.
             </div>
             <div className="flex items-center gap-8">
                {["Privacy", "Terms", "Contact"].map(link => (
                  <a key={link} href="#" className="text-white/40 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors">
                    {link}
                  </a>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
}
