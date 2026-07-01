'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Languages, Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavbarProps = {
  onTerminalToggle: () => void;
};

export default function Navbar({ onTerminalToggle }: NavbarProps) {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'about', label: t('about') },
    { id: 'skills', label: t('skills') },
    { id: 'projects', label: t('projects') },
    { id: 'services', label: t('services') },
    { id: 'contact', label: t('contact') },
  ];

  // Track scroll position to add border/background blur to header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight active nav item on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['about', 'skills', 'projects', 'services', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLanguageChange = (nextLocale: 'en' | 'el') => {
    setLangDropdownOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4 glass border-b border-border/50 shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-extrabold tracking-tight text-foreground flex items-center gap-2 cursor-none select-none hover:opacity-85"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            Giannis Kapelakos
          </span>
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest border border-border px-1.5 py-0.5 rounded-lg bg-secondary/50">
            Dev
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-border/30 bg-secondary/15 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-none select-none ${
                activeSection === item.id
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls (Icons) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Terminal Trigger */}
          <button
            onClick={onTerminalToggle}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all cursor-none"
            title={t('terminal')}
            aria-label="Open Linux terminal Console"
          >
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all cursor-none"
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all cursor-none"
              aria-label="Switch Language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="uppercase">{locale}</span>
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-28 rounded-xl border glass shadow-2xl overflow-hidden z-20 py-1"
                  >
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full px-4 py-2 text-left text-xs font-semibold cursor-none hover:bg-secondary/80 ${
                        locale === 'en' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      English (EN)
                    </button>
                    <button
                      onClick={() => handleLanguageChange('el')}
                      className={`w-full px-4 py-2 text-left text-xs font-semibold cursor-none hover:bg-secondary/80 ${
                        locale === 'el' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      Ελληνικά (EL)
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile controls & Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Terminal Trigger */}
          <button
            onClick={onTerminalToggle}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all"
            aria-label="Open Linux Console"
          >
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Mobile Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all"
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Language Switch */}
          <button
            onClick={() => handleLanguageChange(locale === 'en' ? 'el' : 'en')}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all uppercase text-xs font-extrabold"
            aria-label="Toggle Language"
          >
            {locale === 'en' ? 'EL' : 'EN'}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full border-b border-border/40 glass absolute left-0 right-0 top-full overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 font-semibold text-sm transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
