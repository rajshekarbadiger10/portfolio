'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

export function CinematicLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(start);
          window.setTimeout(() => setVisible(false), 280);
          return 100;
        }
        return value + (value < 60 ? 12 : value < 90 ? 7 : 3);
      });
    }, 110);

    return () => window.clearInterval(start);
  }, []);

  const ambientBars = useMemo(() => Array.from({ length: 9 }, (_, index) => index), []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[#050505]"
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.16),transparent_40%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative flex flex-col items-center gap-8"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative flex h-36 w-36 items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border border-red/40"
                  animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-5 rounded-full border border-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <div className="text-display text-5xl tracking-[0.32em] text-red">RB</div>
              </div>
              <div className="space-y-3 text-center">
                <div className="text-xs uppercase tracking-[0.55em] text-white/50">Booting immersive interface</div>
                <div className="h-1.5 w-72 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-red to-white"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  />
                </div>
                <div className="text-sm tracking-[0.35em] text-white/60">{String(progress).padStart(3, '0')}%</div>
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center gap-2 px-8">
            {ambientBars.map((index) => (
              <motion.div
                key={index}
                className="h-full w-1 bg-gradient-to-t from-red/30 to-transparent"
                animate={{ scaleY: [0.2, 1, 0.3], opacity: [0.2, 1, 0.25] }}
                transition={{ duration: 2 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}