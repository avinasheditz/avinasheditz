import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Upload, 
  Scissors, 
  Sparkles, 
  Share2, 
  MousePointer2, 
  Play, 
  Layers, 
  Zap 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Drop Your Raw Footage',
    description: 'Upload your clips. Don\'t worry about the mess, that\'s our playground.',
    icon: Upload,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    title: 'We Sculpt the Narrative',
    description: 'Rhythmic cuts, pacing, and storytelling that keeps viewers hooked.',
    icon: Scissors,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Premium Visual Polish',
    description: 'Color grading, sound design, and motion graphics for that high-end feel.',
    icon: Sparkles,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400'
  },
  {
    title: 'Ready for the World',
    description: 'Optimized for all platforms. Just hit post and watch the metrics fly.',
    icon: Share2,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400'
  }
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Section
      gsap.from('.how-it-works-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // 2. Animate Cards
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // 3. Timeline Loop
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 4,
        repeat: -1,
        ease: 'none'
      });

      gsap.to(playheadRef.current, {
        left: '100%',
        duration: 4,
        repeat: -1,
        ease: 'none'
      });

      // 4. Floating Tools
      const tools = toolsRef.current?.children;
      if (tools) {
        Array.from(tools).forEach((tool, i) => {
          gsap.to(tool as any, {
            y: 15,
            rotation: 10,
            duration: 2 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });
      }

      // 5. Video Preview Pulse
      gsap.to('.video-preview-glow', {
        opacity: 0.8,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="how-it-works"
      className="relative py-32 overflow-hidden bg-[#050505]"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/30 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/20 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 how-it-works-title">
          <h2 className="text-5xl md:text-7xl font-heading italic font-bold tracking-tight mb-6">
            Create Like <span className="text-white/40">a Pro</span>
          </h2>
          <p className="text-lg md:text-xl text-white/40 font-body max-w-2xl mx-auto">
            Our streamlined process takes the weight off your shoulders, delivering high-end edits that convert.
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {steps.map((step, i) => (
            <div 
              key={i}
              className="step-card group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg",
                step.color
              )}>
                <step.icon className={cn("w-6 h-6", step.iconColor)} />
              </div>
              <div className="text-white/20 font-heading italic font-bold text-4xl mb-4">0{i + 1}</div>
              <h3 className="text-xl font-heading italic font-bold mb-3">{step.title}</h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Highlight: The Editing Console */}
        <div className="max-w-5xl mx-auto">
          <div className="liquid-glass rounded-[40px] p-8 md:p-12 border border-white/5 relative overflow-hidden group">
            {/* Fake Video Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  <Play className="w-3 h-3 fill-current" /> Live Rendering
                </div>
                <h3 className="text-3xl md:text-4xl font-heading italic font-bold leading-tight">
                  Surgical Precision in <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Every Pixel.</span>
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  We don't just cut clips. We align sound design, color physics, and emotional triggers to ensure your message hits the mark.
                </p>
                
                {/* Floating Tool Icons */}
                <div ref={toolsRef} className="flex gap-4 pt-4">
                  {[Scissors, Layers, MousePointer2, Zap].map((Icon, i) => (
                    <div key={i} className="tool-icon w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 group-hover:border-white/30 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* Fake UI Overlay */}
                   <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/40 tracking-widest">REC 00:12:44:03</span>
                   </div>
                   <Play className="w-16 h-16 text-white/10 group-hover:text-blue-500/50 transition-colors" />
                </div>
                {/* Visual Glow */}
                <div className="video-preview-glow absolute inset-0 bg-blue-500/10 mix-blend-overlay opacity-0" />
              </div>
            </div>

            {/* Fake Timeline UI */}
            <div ref={timelineRef} className="mt-12 pt-12 border-t border-white/5 relative">
              <div className="flex justify-between text-[10px] text-white/20 font-mono mb-4 uppercase tracking-[0.2em]">
                <span>00:00:00:00</span>
                <span>Timeline Preview</span>
                <span>00:01:30:00</span>
              </div>
              
              <div className="relative h-12 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                {/* Progress Tracks */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 flex gap-1 px-1">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-full rounded-sm opacity-30 grow",
                        i % 5 === 0 ? "bg-blue-500" : "bg-white/20"
                      )} 
                    />
                  ))}
                </div>
                
                {/* Active Progress */}
                <div ref={progressRef} className="absolute top-0 left-0 h-full w-0 bg-blue-500/20 border-r border-blue-400 z-10" />
                
                {/* Playhead */}
                <div ref={playheadRef} className="absolute top-0 left-0 w-[2px] h-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)] z-20">
                  <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-blue-400 rotate-45 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
