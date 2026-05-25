'use client';

import { motion } from 'framer-motion';

export function BackgroundEffects() {
  const particles = Array.from({ length: 28 }, (_, index) => index);

  return (
    <>
      <div className="noise" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="grid-overlay absolute inset-0 opacity-[0.14]" />
        <motion.div
          className="mesh-gradient absolute inset-0 opacity-70"
          animate={{ opacity: [0.48, 0.68, 0.48], scale: [1, 1.02, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="ambient-rays absolute left-[-10%] top-[10%] hidden h-[76vh] w-[54vw] opacity-35 lg:block"
          animate={{ opacity: [0.16, 0.3, 0.16], x: [0, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-red/18 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 14, 0], opacity: [0.38, 0.62, 0.38] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[8%] top-[10%] h-80 w-80 rounded-full bg-glow/18 blur-3xl"
          animate={{ y: [0, -18, 0], x: [0, -16, 0], opacity: [0.26, 0.42, 0.26] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="wireframe-sphere absolute left-[4%] top-[26%] hidden h-[28rem] w-[28rem] lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <span className="wireframe-sphere-core" />
        </motion.div>
        <motion.div
          className="ambient-fog absolute left-[-6%] top-[40%] h-[22rem] w-[46rem]"
          animate={{ opacity: [0.16, 0.28, 0.16], y: [0, 14, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {particles.map((index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-red/70"
            style={{
              left: `${(index * 7.5) % 100}%`,
              top: `${(index * 11.5) % 100}%`
            }}
            animate={{ y: [0, -18, 0], opacity: [0.08, 0.42, 0.08], scale: [1, 1.25, 1] }}
            transition={{
              duration: 8 + index * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.14
            }}
          />
        ))}
      </div>
    </>
  );
}