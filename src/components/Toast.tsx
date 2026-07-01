'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center justify-between gap-4 p-4 rounded-xl border glass shadow-2xl overflow-hidden"
              style={{
                borderColor:
                  toast.type === 'success'
                    ? 'rgba(16, 185, 129, 0.25)'
                    : toast.type === 'error'
                    ? 'rgba(239, 68, 68, 0.25)'
                    : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Type indicator vertical bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  backgroundColor:
                    toast.type === 'success'
                      ? '#10b981'
                      : toast.type === 'error'
                      ? '#ef4444'
                      : '#3b82f6',
                }}
              />
              
              <div className="flex items-center gap-3 pl-2">
                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                <p className="text-sm font-medium text-foreground">{toast.message}</p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
