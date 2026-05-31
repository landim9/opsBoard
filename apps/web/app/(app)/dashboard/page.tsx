export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      
      {/* KPI Cards - Double Bezel Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative rounded-2xl p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
          <div className="w-full h-full rounded-[calc(1rem-0.375rem)] bg-surface flex flex-col p-4 border border-border/50">
             <span className="text-sm font-medium text-ink-secondary mb-1">Rotinas Hoje</span>
             <span className="text-3xl font-semibold text-ink">12</span>
          </div>
        </div>
        
        <div className="relative rounded-2xl p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
          <div className="w-full h-full rounded-[calc(1rem-0.375rem)] bg-success-bg/30 flex flex-col p-4 border border-success/10">
             <span className="text-sm font-medium text-success-text mb-1">Concluídas</span>
             <span className="text-3xl font-semibold text-success">8</span>
          </div>
        </div>
        
        <div className="relative rounded-2xl p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
          <div className="w-full h-full rounded-[calc(1rem-0.375rem)] bg-warning-bg/30 flex flex-col p-4 border border-warning/10">
             <span className="text-sm font-medium text-warning-text mb-1">Pendentes</span>
             <span className="text-3xl font-semibold text-warning">3</span>
          </div>
        </div>

        <div className="relative rounded-2xl p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
          <div className="w-full h-full rounded-[calc(1rem-0.375rem)] bg-danger-bg/30 flex flex-col p-4 border border-danger/10">
             <span className="text-sm font-medium text-danger-text mb-1">Em Atraso</span>
             <span className="text-3xl font-semibold text-danger">1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Pending Tasks List */}
         <div className="lg:col-span-2 relative rounded-[2rem] p-1.5 bg-white border border-border shadow-md ring-1 ring-black/5">
           <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-semibold text-ink">Minhas Pendências</h2>
                 <button className="text-sm text-primary font-medium hover:underline">Ver todas</button>
              </div>

              <div className="space-y-3">
                 {/* Task Item */}
                 <div className="group flex items-center justify-between p-4 rounded-xl border border-border bg-white hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-5 h-5 rounded border-2 border-ink-disabled group-hover:border-primary transition-colors cursor-pointer" />
                       <div>
                          <div className="font-medium text-ink">Fechamento de Caixa (Matriz)</div>
                          <div className="text-xs text-ink-secondary">Vence às 18:00 • Hoje</div>
                       </div>
                    </div>
                    <div className="px-2.5 py-1 bg-warning-bg text-warning text-xs font-semibold rounded-full border border-warning/20">
                       Pendente
                    </div>
                 </div>

                 {/* Task Item (Overdue) */}
                 <div className="group flex items-center justify-between p-4 rounded-xl border border-danger/30 bg-danger-bg/10 hover:border-danger/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-5 h-5 rounded border-2 border-danger/50 group-hover:border-danger transition-colors cursor-pointer" />
                       <div>
                          <div className="font-medium text-ink">Verificação de Extintores</div>
                          <div className="text-xs text-danger">Venceu ontem às 12:00</div>
                       </div>
                    </div>
                    <div className="px-2.5 py-1 bg-danger text-white text-xs font-semibold rounded-full shadow-sm">
                       Atrasado
                    </div>
                 </div>
              </div>
           </div>
         </div>

         {/* Activity Feed */}
         <div className="lg:col-span-1 relative rounded-[2rem] p-1.5 bg-white border border-border shadow-md ring-1 ring-black/5">
           <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 flex flex-col p-6">
              <h2 className="text-lg font-semibold text-ink mb-6">Atividade Recente</h2>
              
              <div className="relative border-l-2 border-border ml-3 space-y-6">
                 <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-success-bg border-2 border-success z-10" />
                    <div className="text-sm font-medium text-ink">Limpeza do Salão concluída</div>
                    <div className="text-xs text-ink-secondary mt-0.5">por Carlos Silva • Há 5 min</div>
                 </div>
                 <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-light border-2 border-primary z-10" />
                    <div className="text-sm font-medium text-ink">Nova rotina criada: Backup BD</div>
                    <div className="text-xs text-ink-secondary mt-0.5">por Admin • Há 2 horas</div>
                 </div>
                 <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-success-bg border-2 border-success z-10" />
                    <div className="text-sm font-medium text-ink">Abertura de Loja concluída</div>
                    <div className="text-xs text-ink-secondary mt-0.5">por Mariana Costa • Hoje, 08:05</div>
                 </div>
              </div>
           </div>
         </div>
      </div>

    </div>
  )
}
