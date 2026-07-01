'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from '@/components/Icons';
import Image from 'next/image';

type ProjectCardProps = {
  name: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string;
  badge?: string;
  liveLabel: string;
  repoLabel: string;
};

export default function ProjectCard3D({
  name,
  description,
  image,
  tech,
  liveUrl,
  repoUrl,
  badge,
  liveLabel,
  repoLabel,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Mouse positions relative to the card bounds
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateXSpring = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateYSpring = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  // Translation (depth/parallax) for child elements
  const childTranslateX = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 200 });
  const childTranslateY = useSpring(useTransform(y, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full group select-none [perspective:1000px]"
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
        }}
        className="relative w-full rounded-2xl glass-card overflow-hidden p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center cursor-none transition-shadow duration-300"
      >
        {/* Glow behind card on hover */}
        <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Project Preview Image */}
        <motion.div
          style={{
            x: childTranslateX,
            y: childTranslateY,
          }}
          className="relative w-full lg:w-[45%] aspect-[4/3] rounded-xl overflow-hidden border border-border/60 bg-zinc-950 shrink-0"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </motion.div>

        {/* Project Info */}
        <div className="flex-1 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center justify-between gap-4 mb-3">
              {badge && (
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {badge}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {name}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
              {description}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-foreground/80 font-semibold px-3 py-1 rounded-lg bg-secondary/80 border border-border/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center mt-auto">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02] shadow-lg active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              {liveLabel}
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-muted text-foreground border border-border/60 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
            >
              <Github className="w-4 h-4" />
              {repoLabel}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
