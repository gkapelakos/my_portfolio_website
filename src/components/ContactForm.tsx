'use client';

import React, { useState } from 'react';
import { useToast } from './Toast';
import { Mail, Send, Copy, Check } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '@/components/Icons';
import { motion } from 'framer-motion';

type ContactFormProps = {
  ctaLabel: string;
  emailLabel: string;
  githubLabel: string;
  linkedinLabel: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  sendLabel: string;
  sendingLabel: string;
  successMsg: string;
  errorMsg: string;
  copyLabel: string;
  copiedMsg: string;
};

export default function ContactForm({
  ctaLabel,
  emailLabel,
  githubLabel,
  linkedinLabel,
  formName,
  formEmail,
  formMessage,
  sendLabel,
  sendingLabel,
  successMsg,
  errorMsg,
  copyLabel,
  copiedMsg,
}: ContactFormProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const myEmail = 'johnkapelakos5@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(myEmail);
      setCopied(true);
      showToast(copiedMsg, 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all fields', 'error');
      return;
    }

    setIsSending(true);

    // Simulate sending email
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast(successMsg, 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      showToast(errorMsg, 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Cards Info */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <h4 className="text-xl font-bold text-foreground mb-2">{ctaLabel}</h4>
        
        {/* Email Copy Card */}
        <div className="p-5 rounded-2xl border border-border/40 bg-secondary/10 flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-semibold">{emailLabel}</span>
              <p className="text-sm font-bold text-foreground font-mono mt-0.5">{myEmail}</p>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary hover:bg-muted text-foreground border border-border/80 font-bold text-xs transition-all active:scale-98"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copyLabel}
          </button>
        </div>

        {/* Social Link Cards */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href="https://github.com/gkapelakos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-border/40 bg-secondary/10 flex flex-col gap-3 hover:border-foreground/20 hover:bg-secondary/20 transition-all cursor-none"
          >
            <div className="p-2.5 rounded-xl bg-foreground/5 border border-border text-foreground w-max">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-semibold">{githubLabel}</span>
              <p className="text-xs font-bold text-foreground mt-0.5">@gkapelakos</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/gkapelakos/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-border/40 bg-secondary/10 flex flex-col gap-3 hover:border-blue-500/20 hover:bg-secondary/20 transition-all cursor-none"
          >
            <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-blue-500 w-max">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-semibold">{linkedinLabel}</span>
              <p className="text-xs font-bold text-foreground mt-0.5">gkapelakos</p>
            </div>
          </a>
        </div>
      </div>

      {/* Message Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-border/50 bg-secondary/10">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">{formName}</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 focus:ring-0 text-sm text-foreground outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">{formEmail}</label>
          <input
            type="email"
            required
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 focus:ring-0 text-sm text-foreground outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">{formMessage}</label>
          <textarea
            required
            rows={5}
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="px-4 py-3 rounded-xl bg-secondary/50 border border-border/80 focus:border-primary/50 focus:ring-0 text-sm text-foreground outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:opacity-90 active:scale-98 disabled:opacity-50"
        >
          {isSending ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              {sendingLabel}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {sendLabel}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
