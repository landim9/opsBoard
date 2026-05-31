export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
      <div>
         <h1 className="text-2xl font-semibold text-ink">Configurações</h1>
         <p className="text-ink-secondary">Gerencie seu workspace, membros e assinatura.</p>
      </div>

      <div className="grid gap-8">
         {/* Workspace Settings */}
         <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink mb-6">Perfil do Workspace</h2>
              
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-ink mb-2">Nome do Workspace</label>
                    <input type="text" defaultValue="Minha Empresa" className="w-full max-w-md bg-white border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-ink mb-2">URL Amigável (Slug)</label>
                    <div className="flex max-w-md">
                       <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-bg text-ink-secondary text-sm">
                          opsboard.app/
                       </span>
                       <input type="text" defaultValue="minha-empresa" className="flex-1 min-w-0 bg-white border border-border rounded-r-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                 </div>
                 <button className="px-6 py-2.5 bg-ink text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-ink-secondary transition-colors">
                    Salvar Alterações
                 </button>
              </div>
           </div>
         </div>

         {/* Billing Settings */}
         <div className="relative rounded-[2rem] p-1.5 bg-primary-light/50 border border-primary/20 shadow-sm ring-1 ring-black/5">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-white border border-primary/10 p-6 sm:p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              <div>
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    Plano Atual
                 </div>
                 <h2 className="text-2xl font-semibold text-ink mb-2">Plano Pro</h2>
                 <p className="text-ink-secondary text-sm">Seu ciclo atual renova em 01/07/2026.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-border text-ink rounded-xl text-sm font-semibold shadow-sm hover:bg-surface transition-colors">
                    Gerenciar no Stripe
                 </button>
              </div>
           </div>
         </div>

         {/* Members */}
         <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-semibold text-ink">Membros da Equipe</h2>
                 <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-sm hover:bg-primary-hover transition-colors">
                    + Convidar
                 </button>
              </div>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-white border border-border rounded-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">A</div>
                       <div>
                          <div className="font-medium text-ink">Admin (Você)</div>
                          <div className="text-xs text-ink-secondary">admin@opsboard.com</div>
                       </div>
                    </div>
                    <span className="text-xs font-semibold uppercase text-ink-disabled">Owner</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white border border-border rounded-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-bg border border-border text-ink-secondary flex items-center justify-center font-bold">M</div>
                       <div>
                          <div className="font-medium text-ink">Mariana Costa</div>
                          <div className="text-xs text-ink-secondary">mariana@opsboard.com</div>
                       </div>
                    </div>
                    <select className="bg-transparent text-xs font-semibold uppercase text-ink-secondary cursor-pointer focus:outline-none">
                       <option>Executor</option>
                       <option>Manager</option>
                       <option className="text-danger">Remover</option>
                    </select>
                 </div>
              </div>
           </div>
         </div>

      </div>
    </div>
  )
}
