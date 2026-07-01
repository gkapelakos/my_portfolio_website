'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
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

  // Items that scroll to a section on the home page
  const scrollItems = [
    { id: 'about', label: t('about') },
    { id: 'skills', label: t('skills') },
    { id: 'projects', label: t('projects') },
    { id: 'services', label: t('services') },
  ];

  const isOnContactPage = pathname === '/contact';
  const isOnHomePage = !isOnContactPage;

  // Track scroll position to add border/background blur to header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight active nav item on scroll (home page only)
  useEffect(() => {
    if (!isOnHomePage) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
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
    const sections = ['about', 'skills', 'projects', 'services'];
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
  }, [isOnHomePage]);

  const handleLanguageChange = (nextLocale: 'en' | 'el') => {
    setLangDropdownOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (!isOnHomePage) {
      // Navigate home first, then let the browser handle the hash
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      {/* Hardware-accelerated glass background transition to prevent repaint lag and white flashes */}
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-300 pointer-events-none ${
          scrolled ? 'opacity-100' : 'opacity-0'
        } glass border-b border-border/50 shadow-lg`}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-foreground flex items-center gap-2 cursor-none select-none hover:opacity-85"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            GK
          </span>
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest border border-border px-1.5 py-0.5 rounded-lg bg-secondary/50">
            Dev
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-border/30 bg-secondary/15 backdrop-blur-md">
          {/* Scroll section items */}
          {scrollItems.map((item) => {
            const isActive = isOnHomePage && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 cursor-none select-none ${
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>
                {item.label}
              </button>
            );
          })}

          {/* Contact — dedicated page link */}
          <Link
            href="/contact"
            className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 cursor-none select-none ${
              isOnContactPage
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <AnimatePresence>
              {isOnContactPage && (
                <motion.div
                  key="contact-indicator"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                />
              )}
            </AnimatePresence>
            {t('contact')}
          </Link>
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
          <button
            onClick={onTerminalToggle}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all"
            aria-label="Open Linux Console"
          >
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all"
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleLanguageChange(locale === 'en' ? 'el' : 'en')}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40 transition-all uppercase text-xs font-extrabold"
            aria-label="Toggle Language"
          >
            {locale === 'en' ? 'EL' : 'EN'}
          </button>

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
              {scrollItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 font-semibold text-sm transition-colors ${
                    isOnHomePage && activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 font-semibold text-sm transition-colors ${
                  isOnContactPage ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {t('contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
