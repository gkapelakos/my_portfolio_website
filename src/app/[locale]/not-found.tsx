'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black font-sans relative overflow-hidden px-6 select-none">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-red-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-md w-full glass p-8 md:p-10 rounded-2xl border border-red-500/20 text-center shadow-2xl z-10 flex flex-col items-center gap-6"
      >
        <div className="p-3.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-500 w-max animate-bounce">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{t('title')}</h1>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">{t('desc')}</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg w-full"
        >
          {t('cta')}
        </Link>
      </motion.div>
    </div>
  );
}
