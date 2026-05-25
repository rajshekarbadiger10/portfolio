'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/components/ui/utils';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.4 }
    );

    links.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 md:px-12"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 backdrop-blur-2xl">
        <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
          <span className="text-display text-3xl text-red">RB</span>
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-white',
                  isActive && 'text-white'
                )}
              >
                {isActive ? <span className="absolute inset-0 rounded-full bg-red/15" /> : null}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}