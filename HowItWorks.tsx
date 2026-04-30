import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { BlurText } from './BlurText';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const partners = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

  return (
    <section className="relative overflow-visible h-[1000px] flex flex-col items-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 w-full h-[80%] object-cover z-0 opacity-40"
        style={{ top: '20%' }}
        poster="/images/hero_bg.jpeg"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div 
        className="absolute bottom-0 left-0 w-full h-[300px] z-0 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }} 
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[180px] px-6 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="liquid-glass rounded-full px-1 py-1 mb-8 flex items-center gap-3"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">New</span>
          <span className="text-xs md:text-sm text-white/90 pr-3 font-body">Introducing AI-powered cinematic editing.</span>
        </motion.div>

        <BlurText 
          text="The Video Your Brand Deserves" 
          className="text-6xl md:text-7xl lg:text-[6.5rem] font-heading italic text-white leading-[0.85] tracking-[-3px] mb-8 justify-center"
          delay={0.2}
        />

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base md:text-xl text-white/70 font-body font-light leading-relaxed max-w-2xl mb-12"
        >
          Cinematic story. Breathtaking grade. Built by AI, refined by artists. 
          This is video production, wildly reimagined for the digital age.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={onOpenBooking}
            className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-2 group hover-lift"
          >
            <span className="font-semibold">Start My Project</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
          
          <button className="flex items-center gap-2 px-8 py-4 text-white font-medium hover:text-white/80 transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center liquid-glass group-hover:scale-110 transition-transform duration-300">
              <Play className="w-4 h-4 fill-white" />
            </div>
            Watch the Showreel
          </button>
        </motion.div>
 
        {/* Partners */}
        <div className="mt-32 w-full flex flex-col items-center gap-8">
           <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest text-white/50 font-bold">
             Trusted by the teams behind
           </div>
           <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
              {partners.map(p => (
                <span key={p} className="text-2xl md:text-4xl font-heading italic text-white/40 hover:text-white transition-all cursor-default hover:scale-110 duration-300">
                  {p}
                </span>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
