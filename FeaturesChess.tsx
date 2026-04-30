import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/src/lib/utils';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  direction?: 'top' | 'bottom';
}

export function BlurText({ text, delay = 0, className, direction = 'bottom' }: BlurTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(' ');

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: direction === 'bottom' ? 50 : -50 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.1,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
