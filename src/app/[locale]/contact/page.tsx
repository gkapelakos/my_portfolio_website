'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import TerminalEasterEgg from '@/components/TerminalEasterEgg';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations();
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      {/* Structured SEO JSON-LD for Contact page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Giannis Kapelakos',
            url: 'https://kapelakos.dev/contact',
            description: 'Get in touch with Giannis Kapelakos for freelance web development projects.',
          }),
        }}
      />

      <Navbar onTerminalToggle={() => setTerminalOpen(true)} />

      <main className="relative min-h-screen w-full pt-32 pb-24 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[140px] pointer-events-none" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold mb-6">
              <MessageCircle className="w-3.5 h-3.5" />
              {t('Contact.title')}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              {t('Contact.title')}
            </h1>
            <p className="text-muted-foreground text-base font-medium max-w-xl mx-auto leading-relaxed">
              {t('Contact.subtitle')}
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
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
          </motion.div>
        </div>
      </main>

      <Footer />
      <TerminalEasterEgg isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
