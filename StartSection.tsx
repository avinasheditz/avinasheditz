import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPricing: () => void;
  onOpenServices: () => void;
}

export function Navbar({ onOpenBooking, onOpenPricing, onOpenServices }: NavbarProps) {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', onClick: onOpenServices },
    { name: 'Work', href: '#' },
    { name: 'Process', href: '#' },
    { name: 'Pricing', onClick: onOpenPricing },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-8 lg:px-16 py-3">
      <div className="w-full max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
             {/* Placeholder for src/assets/logo-icon.png */}
             <span className="text-black font-heading italic text-xl font-bold">A</span>
          </div>
          <span className="font-heading italic text-2xl tracking-tight hidden sm:block">Avinash Editz</span>
        </div>

        {/* Center Pill */}
        <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-1.5 py-1">
          {navLinks.map((link) => (
            link.onClick ? (
              <button
                key={link.name}
                onClick={link.onClick}
                className="px-4 py-2 text-sm font-medium text-white/90 interactive-link font-body transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/90 interactive-link font-body transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
          <a
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-white/40 interactive-link font-body transition-colors"
          >
            Admin
          </a>
          <button 
            onClick={onOpenBooking}
            className="ml-2 bg-white text-black rounded-full px-5 py-2 text-sm font-semibold flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/10"
          >
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Spacer */}
        <div className="md:hidden">
           <button className="bg-white text-black rounded-full px-4 py-1.5 text-sm font-semibold">
              Menu
           </button>
        </div>
      </div>
    </nav>
  );
}
