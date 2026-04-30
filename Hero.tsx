import { Zap, Palette, BarChart3, Shield, ArrowRight } from 'lucide-react';

interface FeaturesGridProps {
  onOpenPricing?: () => void;
}

export function FeaturesGrid({ onOpenPricing }: FeaturesGridProps) {
  const cards = [
    {
      icon: Zap,
      title: "Days, Not Months",
      desc: "Raw footage to final render at a pace that redefines fast. Because waiting isn't a strategy."
    },
    {
      icon: Palette,
      title: "Obsessively Crafted",
      desc: "Every cut considered. Every frame refined. Visuals so precise, they feel inevitable."
    },
    {
      icon: BarChart3,
      title: "Built to Convert",
      desc: "Storytelling informed by data. Decisions backed by performance. Results you can measure."
    },
    {
      icon: Shield,
      title: "Secure by Default",
      desc: "Enterprise-grade protection comes standard. SSL, cloud redundancy, and NDA compliance."
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
         <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 uppercase tracking-widest">
            Why Us
         </div>
         <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[1]">
            The difference is everything.
         </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {cards.map((card, i) => (
          <div key={i} className="liquid-glass rounded-3xl p-8 hover-glow transition-all group cursor-default">
            <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
               <card.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-heading italic text-white mb-4 tracking-tight">
               {card.title}
            </h4>
            <p className="text-white/50 font-body font-light text-sm leading-relaxed">
               {card.desc}
            </p>
          </div>
        ))}
      </div>
 
      {/* View Price CTA */}
      <div className="flex flex-col items-center">
        <button 
          type="button"
          onClick={() => onOpenPricing?.()}
          className="group relative z-20 flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold hover-lift shadow-xl shadow-white/5"
        >
          View Price Catalog
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          
          {/* Subtle Glow */}
          <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <p className="mt-4 text-white/20 text-[10px] uppercase font-bold tracking-[0.3em]">
          Transparent Pricing • No hidden costs
        </p>
      </div>
    </section>
  );
}
