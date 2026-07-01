'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type PricingCardProps = {
  title: string;
  priceFromLabel: string;
  priceValue: string;
  perProjectLabel: string;
  features: string[];
  note: string;
  ctaLabel: string;
  onCtaClick: () => void;
};

export default function PricingCard({
  title,
  priceFromLabel,
  priceValue,
  perProjectLabel,
  features,
  note,
  ctaLabel,
  onCtaClick,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-lg mx-auto rounded-3xl glass shadow-2xl border border-border/80 overflow-hidden flex flex-col p-8 md:p-10"
    >
      {/* Decorative top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
      
      {/* Card Header */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-foreground mb-4">{title}</h4>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm font-semibold text-muted-foreground">{priceFromLabel}</span>
          <span className="text-4xl md:text-5xl font-extrabold text-foreground font-mono">{priceValue}</span>
          <span className="text-sm font-semibold text-muted-foreground">{perProjectLabel}</span>
        </div>
      </div>

      {/* Checklist Features */}
      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            key={index}
            className="flex items-start gap-3 text-sm font-medium text-foreground/90"
          >
            <div className="mt-0.5 rounded-full p-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Disclaimer Caveat */}
      <p className="text-xs text-muted-foreground leading-relaxed italic border-t border-border/50 pt-5 mb-6">
        {note}
      </p>

      {/* Action CTA Button */}
      <button
        onClick={onCtaClick}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:opacity-90 hover:scale-[1.01] active:scale-95 shadow-lg"
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
