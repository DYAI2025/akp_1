import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute('data-cursor'));
      } else {
        setLabel(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide cursor on touch devices using a CSS class on body instead
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      document.body.classList.add('custom-cursor');
    }
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: position.x,
        y: position.y,
        scale: label ? 1 : 0.5,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      style={{ width: 80, height: 80 }}
    >
      <div className={`relative flex items-center justify-center transition-all ${label ? 'bg-ink/5' : 'bg-ink'} rounded-full backdrop-blur-sm 
        ${label ? 'w-20 h-20 border border-ink/20' : 'w-4 h-4'}`}>
        {label && (
          <span className="text-[10px] tracking-widest uppercase font-sans text-ink whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </motion.div>
  );
}
