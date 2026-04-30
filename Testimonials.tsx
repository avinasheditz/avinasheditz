import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Check, Zap, Star, Rocket } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    name: 'Basic',
    price: '499',
    icon: Zap,
    description: 'Perfect for getting started with professional editing.',
    features: [
      'Basic editing tools',
      'Limited exports (5/month)',
      'Standard 1080p quality',
      'Email support'
    ],
    highlight: false,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    name: 'Pro',
    price: '999',
    icon: Star,
    description: 'The sweet spot for creators and rising brands.',
    features: [
      'Advanced editing tools',
      'Unlimited exports',
      '4K Rendering',
      'Priority support',
      'Premium effects & transitions'
    ],
    highlight: true,
    color: 'from-purple-500/30 to-pink-500/30',
    badge: 'Most Popular'
  },
  {
    name: 'Prime',
    price: '1999',
    icon: Rocket,
    description: 'Elite results for established powerhouses.',
    features: [
      'All Pro features',
      'AI-powered enhancement',
      'Custom motion graphics',
      'Fast-track rendering',
      'Dedicated manager'
    ],
    highlight: false,
    color: 'from-amber-500/20 to-orange-500/20'
  }
];

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [isYearly, setIsYearly] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        setIsAnimating(true);
        document.body.style.overflow = 'hidden';
        const tl = gsap.timeline();

        // Ensure elements are visible for animation
        gsap.set(overlayRef.current, { display: 'flex', opacity: 0 });
        gsap.set(modalRef.current, { scale: 0.8, opacity: 0 });
        gsap.set(cardRefs.current, { y: 50, opacity: 0 });

        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
        .to(modalRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        }, '-=0.2')
        .to(cardRefs.current, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => setIsAnimating(false)
        }, '-=0.3');
      } else {
        // Skip closing animation on first mount
        if (overlayRef.current?.style.display === 'none') {
          document.body.style.overflow = 'auto';
          return;
        }

        setIsAnimating(true);
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' });
            document.body.style.overflow = 'auto';
            setIsAnimating(false);
          }
        });

        tl.to(cardRefs.current, {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(modalRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        }, '-=0.2')
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        }, '-=0.1');
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      ref={overlayRef}
      style={{ display: isOpen || isAnimating ? 'flex' : 'none' }}
      className="fixed inset-0 z-[100] items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[40px] relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8 md:p-12 overflow-y-auto scrollbar-hide">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading italic font-bold mb-4">Choose Your <span className="text-white/40">Tier</span></h2>
            <p className="text-white/40 font-body max-w-xl mx-auto mb-8">Flexible pricing built for creators at every scale. No hidden fees, just pure production value.</p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={cn("text-xs font-bold transition-colors", !isYearly ? "text-white" : "text-white/30")}>MONTHLY</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-12 h-6 rounded-full bg-white/10 relative p-1 group"
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform duration-300",
                  isYearly ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
              <span className={cn("text-xs font-bold transition-colors", isYearly ? "text-white" : "text-white/30")}>
                YEARLY <span className="ml-1 text-[10px] text-green-500">-20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const price = parseInt(plan.price);
              const displayPrice = isYearly ? Math.floor(price * 12 * 0.8) : price;
              
              return (
                <div 
                  key={i}
                  ref={el => cardRefs.current[i] = el}
                  className={cn(
                    "relative group p-8 rounded-[32px] border transition-all duration-500 flex flex-col h-full cursor-default",
                    plan.highlight 
                      ? "bg-white/[0.05] border-purple-500/30 ring-1 ring-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  , "hover-lift")}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                      {plan.badge}
                    </div>
                  )}

                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                    plan.color
                  )}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-heading font-bold italic mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-heading font-bold">₹{displayPrice}</span>
                      <span className="text-white/40 text-sm font-body">/{isYearly ? 'year' : 'project'}</span>
                    </div>
                  </div>

                <p className="text-white/40 text-sm font-body leading-relaxed mb-8 h-12">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                        <Check className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm text-white/60 font-body group-hover:text-white/90 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={cn(
                  "w-full py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95",
                  plan.highlight 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                )}>
                  Choose {plan.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

        {/* Bottom Deco */}
        <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
              Secure checkout • 24/7 Support • Guaranteed Delivery
            </p>
        </div>
      </div>
    </div>
  );
}
