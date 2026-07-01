'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';

type TerminalEasterEggProps = {
  isOpen: boolean;
  onClose: () => void;
};

type HistoryItem = {
  type: 'input' | 'output';
  text: string;
};

export default function TerminalEasterEgg({ isOpen, onClose }: TerminalEasterEggProps) {
  const t = useTranslations('Terminal');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal output
  useEffect(() => {
    if (isOpen) {
      setHistory([
        { type: 'output', text: t('welcome') },
      ]);
      // Focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, t]);

  // Scroll to bottom whenever history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus on terminal input when clicking anywhere inside the terminal window
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, text: `${t('prompt')} ${cmd}` }];

    if (!trimmedCmd) {
      setHistory(newHistory);
      return;
    }

    let output = '';

    switch (trimmedCmd) {
      case 'help':
        output = t('helpText');
        break;
      case 'about':
        output = t('aboutText');
        break;
      case 'skills':
        output = t('skillsText');
        break;
      case 'projects':
        output = t('projectsText');
        break;
      case 'contact':
        output = t('contactText');
        break;
      case 'neofetch':
        output = t('neofetchText');
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        onClose();
        setInputVal('');
        return;
      default:
        output = `bash: command not found: ${trimmedCmd}. Type 'help' for available commands.`;
        break;
    }

    setHistory([...newHistory, { type: 'output', text: output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`flex flex-col rounded-xl border border-zinc-800 bg-black text-zinc-300 font-mono shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'w-full h-full' : 'w-full max-w-3xl h-[450px]'
          }`}
          onClick={handleTerminalClick}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold text-zinc-400">{t('title')}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(!isFullscreen);
                }}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-zinc-500 hover:text-red-500 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Console Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text custom-scrollbar text-sm leading-relaxed">
            {history.map((item, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {item.type === 'input' ? (
                  <span className="text-emerald-500 font-semibold">{item.text}</span>
                ) : (
                  <span className="text-zinc-300">{item.text}</span>
                )}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-semibold shrink-0">{t('prompt')}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-zinc-100 outline-none border-none p-0 focus:ring-0 font-mono text-sm"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
