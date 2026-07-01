'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useToast } from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard3D from '@/components/ProjectCard3D';
import GithubStats from '@/components/GithubStats';
import PricingCard from '@/components/PricingCard';
import ContactForm from '@/components/ContactForm';
import TerminalEasterEgg from '@/components/TerminalEasterEgg';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TermIcon,
  Cpu,
  Globe,
  Database,
  Settings,
  Layout,
  GitBranch,
  ArrowRight,
  Zap,
  Server,
  ChevronRight,
} from 'lucide-react';

export default function PortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { showToast } = useToast();

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    // Keyboard listener for ESC key (Terminal toggle) and Konami Code
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key triggers Linux terminal Console
      if (e.key === 'Escape') {
        setTerminalOpen((prev) => !prev);
      }

      // Check Konami Code progress
      if (e.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);
        if (nextIndex === konamiCode.length) {
          triggerKonamiConfetti();
          setKonamiIndex(0);
        }
      } else {
        // Reset if key is wrong, unless it matches the first key in the sequence
        setKonamiIndex(e.key === konamiCode[0] ? 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  const triggerKonamiConfetti = async () => {
    try {
      // Dynamic import to optimize bundle size and speed up Lighthouse loading scores
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899'],
      });
      showToast(t('EasterEgg.desc'), 'success');
    } catch (err) {
      console.error('Confetti loading error:', err);
    }
  };

  const handleCtaContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const pos = elRect - bodyRect - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleCtaProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const pos = elRect - bodyRect - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  // Skill Categories list
  const skillCategories = [
    {
      title: t('Skills.frontend'),
      icon: <Layout className="w-5 h-5 text-blue-400" />,
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      title: t('Skills.backend'),
      icon: <Server className="w-5 h-5 text-purple-400" />,
      skills: ['Node.js', 'REST APIs', 'Authentication', 'Database Integration', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: t('Skills.tools'),
      icon: <Settings className="w-5 h-5 text-emerald-400" />,
      skills: ['Git', 'GitHub', 'Linux (Arch/Ubuntu)', 'Vercel', 'Responsive Design', 'SEO', 'Performance Optimization'],
    },
  ];

  return (
    <>
      {/* Structured SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Giannis Kapelakos",
            "jobTitle": "Full-Stack Web Developer",
            "url": "https://kapelakos.dev",
            "sameAs": [
              "https://github.com/gkapelakos"
            ],
            "knowsAbout": [
              "Software Development",
              "Web Development",
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Linux",
              "Automation"
            ]
          })
        }}
      />
      <Navbar onTerminalToggle={() => setTerminalOpen(true)} />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        {/* Animated Neon Blobs (Apple/Vercel Style) */}
        <div className="absolute top-[10%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Matrix/Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Open for work badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold mb-6 shadow-sm select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {t('Hero.floatingBadge')}
            </motion.div>

            {/* Greeting */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2"
            >
              {t('Hero.greeting')}
            </motion.span>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4"
            >
              {t('Hero.name')}
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                {t('Hero.title')}
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground/90 max-w-xl mb-10 leading-relaxed font-medium"
            >
              "{t('Hero.subtitle')}"
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center w-full"
            >
              <button
                onClick={handleCtaProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:opacity-90 hover:scale-[1.02] shadow-lg active:scale-95 cursor-none"
              >
                {t('Hero.ctaProjects')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCtaContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary hover:bg-muted text-foreground border border-border/80 font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 cursor-none"
              >
                {t('Hero.ctaContact')}
              </button>

              <a
                href="https://github.com/gkapelakos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-xl bg-secondary hover:bg-muted text-foreground border border-border/80 transition-all hover:scale-[1.05] active:scale-95 cursor-none"
                title="GitHub Profile"
              >
                <Globe className="w-4.5 h-4.5" />
              </a>
            </motion.div>
          </div>

          {/* Floating UI Widget Showcase (Lighthouses, Prompts) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-6 relative select-none">
            {/* Widget 1: Developer Object Code Widget */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full p-6 rounded-2xl glass border border-border/50 shadow-2xl"
            >
              <div className="flex gap-1.5 mb-4 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
                <code className="text-zinc-400">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">developer</span> = &#123;{'\n'}
                  {'  '}name:{' '}
                  <span className="text-emerald-300">
                    "{t('Hero.name')}"
                  </span>
                  ,{'\n'}
                  {'  '}stack: [
                  <span className="text-emerald-300">"Next.js"</span>,{' '}
                  <span className="text-emerald-300">"React"</span>,{' '}
                  <span className="text-emerald-300">"TypeScript"</span>],{'\n'}
                  {'  '}os:{' '}
                  <span className="text-emerald-300">"Arch Linux"</span>,{'\n'}
                  {'  '}motto:{' '}
                  <span className="text-emerald-300">
                    "Build fast, automate everything."
                  </span>
                  {'\n'}&#125;;
                </code>
              </pre>
            </motion.div>

            {/* Widget 2: Setup Terminal log */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-[90%] self-end p-5 rounded-2xl glass border border-emerald-500/25 shadow-2xl bg-zinc-950/40"
            >
              <div className="flex items-center justify-between mb-3 text-[10px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <TermIcon className="w-3.5 h-3.5 text-emerald-400" />
                  autopilot-deploy.sh
                </span>
                <span>v1.0</span>
              </div>
              <div className="font-mono text-[10px] md:text-xs text-zinc-300 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-semibold">$</span>
                  <span>./autopilot-linux-setup.sh --prod</span>
                </div>
                <div className="text-zinc-500">[info] Installing system utilities...</div>
                <div className="text-zinc-400">
                  [success]{' '}
                  <span className="text-emerald-400">Lighthouse Score: 100/100</span>
                </div>
              </div>
            </motion.div>

            {/* floating absolute tech icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 p-3 rounded-xl border glass text-blue-400 shadow-xl"
            >
              <Cpu className="w-5 h-5 animate-pulse" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 p-3 rounded-xl border glass text-purple-400 shadow-xl"
            >
              <Database className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center md:text-left mb-16">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold border border-emerald-500/20 px-2.5 py-1 rounded-full bg-emerald-500/5">
              {t('About.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-2">
              {t('About.title')}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl">
              {t('About.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Description Paragraphs */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-base text-muted-foreground/90 font-medium leading-relaxed">
              <p>{t('About.paragraph1')}</p>
              <p>{t('About.paragraph2')}</p>
            </div>

            {/* Areas of Interest Grid */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                {t('About.interestsTitle')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { key: 'fullstack', icon: <Code22 className="w-4 h-4 text-blue-400" /> },
                  { key: 'uiux', icon: <Layout className="w-4 h-4 text-purple-400" /> },
                  { key: 'performance', icon: <Zap className="w-4 h-4 text-yellow-400" /> },
                  { key: 'automation', icon: <TermIcon className="w-4 h-4 text-emerald-400" /> },
                  { key: 'linux', icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
                  { key: 'opensource', icon: <GitBranch className="w-4 h-4 text-teal-400" /> },
                  { key: 'webtech', icon: <Globe className="w-4 h-4 text-pink-400" /> },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl border border-border/40 bg-secondary/10 flex items-center gap-3 hover:border-foreground/10 hover:bg-secondary/25 transition-all select-none"
                  >
                    <div className="p-1.5 rounded-lg bg-secondary border border-border w-max shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-foreground/90">
                      {t(`About.interests.${item.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-zinc-950/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold border border-emerald-500/20 px-2.5 py-1 rounded-full bg-emerald-500/5">
              {t('Skills.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-2">
              {t('Skills.title')}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl mx-auto">
              {t('Skills.subtitle')}
            </p>
          </div>

          {/* Staggered Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((cat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={idx}
                className="p-6 md:p-8 rounded-2xl border border-border/50 glass-card flex flex-col gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary border border-border">
                    {cat.icon}
                  </div>
                  <h3 className="text-md font-bold text-foreground">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold text-foreground/95 px-3.5 py-1.5 rounded-xl bg-secondary border border-border/40 hover:border-foreground/20 hover:bg-secondary/80 transition-all select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
          {/* Header */}
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold border border-emerald-500/20 px-2.5 py-1 rounded-full bg-emerald-500/5">
              {t('Projects.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-2">
              {t('Projects.title')}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl">
              {t('Projects.subtitle')}
            </p>
          </div>

          {/* Project 1 & 2 */}
          <div className="flex flex-col gap-12">
            <ProjectCard3D
              name={t('Projects.backplane.name')}
              description={t('Projects.backplane.desc')}
              image="/images/backplane.png"
              tech={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
              liveUrl="https://backplane-website.vercel.app/"
              repoUrl="https://github.com/gkapelakos"
              badge={t('Projects.featured')}
              liveLabel={t('Projects.liveDemo')}
              repoLabel={t('Projects.viewRepo')}
            />

            <ProjectCard3D
              name={t('Projects.pennypilot.name')}
              description={t('Projects.pennypilot.desc')}
              image="/images/pennypilot.png"
              tech={['React', 'Vite', 'Node.js', 'MongoDB', 'Chart.js']}
              liveUrl="https://pennypilot-website.vercel.app/"
              repoUrl="https://github.com/gkapelakos/PennyPilot"
              badge={t('Projects.featured')}
              liveLabel={t('Projects.liveDemo')}
              repoLabel={t('Projects.viewRepo')}
            />
          </div>

          {/* Open Source Contribution Section */}
          <div className="border-t border-border/40 pt-16 flex flex-col gap-10">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">{t('Projects.openSourceTitle')}</h3>
              <p className="text-muted-foreground text-sm font-semibold max-w-xl mt-1">
                {t('Projects.openSourceSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-border/50 glass-card flex flex-col justify-between gap-6 relative group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TermIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Shell Script</span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {t('Projects.autopilot.name')}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                    {t('Projects.autopilot.desc')}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-mono text-zinc-500">github.com/gkapelakos/...</span>
                  <a
                    href="https://github.com/gkapelakos/Autopilot-Linux-Script"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-all cursor-none"
                  >
                    {t('Projects.viewRepo')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Integration Section */}
      <section id="github" className="py-24 bg-zinc-950/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <GithubStats
            title={t('Github.title')}
            subtitle={t('Github.subtitle')}
            viewProfileLabel={t('Github.viewProfile')}
            reposLabel={t('Github.repos')}
            followersLabel={t('Github.followers')}
            contribsLabel={t('Github.contribs')}
            languagesLabel={t('Github.languages')}
            graphTitleLabel={t('Github.graphTitle')}
          />
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold border border-emerald-500/20 px-2.5 py-1 rounded-full bg-emerald-500/5">
              {t('Services.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-2">
              {t('Services.title')}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl mx-auto">
              {t('Services.subtitle')}
            </p>
          </div>

          <PricingCard
            title={t('Services.devTitle')}
            priceFromLabel={t('Services.priceFrom')}
            priceValue={t('Services.priceVal')}
            perProjectLabel={t('Services.perProject')}
            features={[
              t('Services.features.business'),
              t('Services.features.landing'),
              t('Services.features.portfolio'),
              t('Services.features.company'),
              t('Services.features.responsive'),
              t('Services.features.seo'),
              t('Services.features.forms'),
              t('Services.features.performance'),
            ]}
            note={t('Services.note')}
            ctaLabel={t('Services.cta')}
            onCtaClick={handleCtaContact}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-950/20 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold border border-emerald-500/20 px-2.5 py-1 rounded-full bg-emerald-500/5">
              {t('Contact.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-2">
              {t('Contact.title')}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold max-w-xl mx-auto">
              {t('Contact.subtitle')}
            </p>
          </div>

          <ContactForm
            ctaLabel={t('Contact.cta')}
            emailLabel={t('Contact.email')}
            githubLabel={t('Contact.github')}
            linkedinLabel={t('Contact.linkedin')}
            formName={t('Contact.formName')}
            formEmail={t('Contact.formEmail')}
            formMessage={t('Contact.formMessage')}
            sendLabel={t('Contact.send')}
            sendingLabel={t('Contact.sending')}
            successMsg={t('Contact.success')}
            errorMsg={t('Contact.error')}
            copyLabel={t('Contact.copyEmail')}
            copiedMsg={t('Contact.emailCopied')}
          />
        </div>
      </section>

      <Footer />

      {/* Hidden Terminal Console Modal */}
      <TerminalEasterEgg isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}

// Internal customized sub-icon for design consistency
function Code22(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}
