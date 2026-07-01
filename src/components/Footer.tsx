'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '@/components/Icons';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('Nav');
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  // Scroll to a section on the home page; if already on another page, navigate home first
  const handleScrollLink = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const pos = elRect - bodyRect - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    } else {
      router.push(`/#${section}`);
    }
  };

  const scrollSections = ['about', 'skills', 'projects', 'services'] as const;

  return (
    <footer className="w-full border-t border-border/40 bg-zinc-950/40 py-12 md:py-16 mt-20 select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-xs text-muted-foreground font-semibold">
            &copy; {currentYear} Giannis Kapelakos. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">
            Built with Next.js, Framer Motion, and Tailwind CSS.
          </p>
        </div>

        {/* Section Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {scrollSections.map((section) => (
            <button
              key={section}
              onClick={() => handleScrollLink(section)}
              className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-none uppercase tracking-wider"
            >
              {t(section)}
            </button>
          ))}
          {/* Contact links to dedicated page */}
          <Link
            href="/contact"
            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-none uppercase tracking-wider"
          >
            {t('contact')}
          </Link>
        </nav>

        {/* Social Shortcuts */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gkapelakos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-border/40 transition-colors cursor-none"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/gkapelakos/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-border/40 transition-colors cursor-none"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:johnkapelakos5@gmail.com"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-border/40 transition-colors cursor-none"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
