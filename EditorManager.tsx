import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Zap, Activity, HardDrive } from 'lucide-react';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    name: 'Adobe Premiere Pro',
    label: 'Pr',
    role: 'Editorial & Storytelling',
    usage: 95,
    color: 'from-[#00005b] to-[#0000cc]',
    borderColor: 'border-[#0000ff]/30',
    tags: ['4K/8K Editing', 'Multicam', 'Audio Logic']
  },
  {
    name: 'Avid Media Composer',
    label: 'Av',
    role: 'Industry Standard Editorial',
    usage: 90,
    color: 'from-[#1a1a1a] to-[#333333]',
    borderColor: 'border-white/20',
    tags: ['Bin Sharing', 'Media Management', 'Film Scribe']
  },
  {
    name: 'After Effects',
    label: 'Ae',
    role: 'Motion & Visual Effects',
    usage: 88,
    color: 'from-[#2e004f] to-[#d100ff]',
    borderColor: 'border-[#d100ff]/30',
    tags: ['VFX', 'Typography', 'Compositing']
  },
  {
    name: 'DaVinci Resolve',
    label: 'Dr',
    role: 'Precision Color Grading',
    usage: 92,
    color: 'from-[#4a4a4a] to-[#ff9100]',
    borderColor: 'border-[#ff9100]/30',
    tags: ['Color Science', 'HDR', 'Noise Reduction']
  }
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the bars
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.to(bar, {
          width: `${tools[i].usage}%`,
          duration: 1.5,
          delay: 0.2 + i * 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          }
        });
      });

      // Floating icons in background
      gsap.to('.floating-sensor', {
        y: 20,
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-black overflow-hidden relative"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <Cpu className="w-4 h-4 text-white/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Professional Hardware Acceleration</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading italic font-bold leading-tight">
              Powered by <br />
              <span className="text-white/40">Industry Giants.</span>
            </h2>
            
            <p className="text-white/40 font-body text-lg leading-relaxed max-w-md">
              We utilize a multi-software pipeline ensuring each stage of production is handled by the world's leading specialized tools.
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Activity className="w-5 h-5 text-green-500 mb-2" />
                  <div className="text-white text-xl font-heading font-bold">100%</div>
                  <div className="text-white/20 text-[10px] uppercase font-bold">Reliability</div>
               </div>
               <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Zap className="w-5 h-5 text-yellow-500 mb-2" />
                  <div className="text-white text-xl font-heading font-bold">&lt; 24h</div>
                  <div className="text-white/20 text-[10px] uppercase font-bold">Processing</div>
               </div>
            </div>
          </div>

          {/* Right Column: The Tools */}
          <div className="lg:col-span-7 space-y-6">
            {tools.map((tool, i) => (
              <div 
                key={i}
                className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover-lift transition-all duration-500 cursor-default"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  {/* Styled Logo Icon */}
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold tracking-tighter text-white shadow-2xl relative shrink-0",
                    "bg-gradient-to-br border-2 group-hover:scale-110 transition-transform duration-500",
                    tool.color,
                    tool.borderColor
                  )}>
                    {tool.label}
                    {/* Corner Accent */}
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/20" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-heading font-bold italic">{tool.name}</h3>
                        <p className="text-white/40 text-sm">{tool.role}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-white/20 uppercase tracking-widest">Mastery</span>
                        <div className="text-xl font-heading font-bold">{tool.usage}%</div>
                      </div>
                    </div>

                    {/* Usage Bar Container */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        ref={el => barsRef.current[i] = el}
                        className={cn("h-full w-0 bg-gradient-to-r", tool.color)}
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                       {tool.tags.map((tag, j) => (
                         <span key={j} className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/30 uppercase tracking-wider">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Background Icons */}
        <div className="absolute top-20 right-20 pointer-events-none">
           <HardDrive className="floating-sensor w-12 h-12 text-white/5" />
        </div>
        <div className="absolute bottom-20 left-10 pointer-events-none">
           <Activity className="floating-sensor w-10 h-10 text-white/5" />
        </div>
      </div>
    </section>
  );
}
