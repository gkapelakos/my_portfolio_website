'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CursorEffect() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Position of cursor (dot)
  const cursorXDot = useMotionValue(-100);
  const cursorYDot = useMotionValue(-100);

  useEffect(() => {
    // Only run on desktop devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      cursorXDot.set(e.clientX - 5);  // Center of 10px dot
      cursorYDot.set(e.clientY - 5);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.getAttribute('role') === 'button';

      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorXDot, cursorYDot, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
      style={{
        x: cursorXDot,
        y: cursorYDot,
      }}
      animate={{
        scale: hovered ? 1.8 : 1,
      }}
      transition={{ type: 'spring', stiffness: 800, damping: 35 }}
    />
  );
}
