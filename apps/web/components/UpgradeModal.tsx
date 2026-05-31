import React from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
  limit: number;
  currentUsage: number;
}

export function UpgradeModal({ isOpen, onClose, reason, limit, currentUsage }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-black/5 animate-fade-up">
         
         <div className="p-8">
            <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center text-xl mb-6 shadow-sm border border-primary/20">
               ↗
            </div>
            
            <h2 className="text-2xl font-semibold text-ink mb-2">Limite do Plano Atingido</h2>
            <p className="text-ink-secondary mb-8">{reason}</p>

            <div className="bg-surface rounded-xl border border-border p-4 mb-8">
               <div className="flex justify-between items-end mb-2">
                  <div className="text-sm font-medium text-ink">Uso Atual</div>
                  <div className="text-sm font-medium text-ink"><span className="text-lg font-semibold">{currentUsage}</span> / {limit}</div>
               </div>
               <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-danger rounded-full" style={{ width: '100%' }} />
               </div>
            </div>

            <div className="flex gap-4">
               <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-white border border-border rounded-xl text-sm font-semibold text-ink shadow-sm hover:bg-surface transition-colors"
               >
                  Agora não
               </button>
               <a 
                  href="/settings/billing"
                  className="flex-1 py-3 text-center bg-primary text-white rounded-xl text-sm font-semibold shadow-md hover:bg-primary-hover transition-colors"
               >
                  Fazer Upgrade
               </a>
            </div>
         </div>

      </div>
    </div>
  );
}
