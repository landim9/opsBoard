export default function ExecutionsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-semibold text-ink">Execuções</h1>
           <p className="text-ink-secondary">Acompanhe as tarefas pendentes e o histórico de execuções.</p>
        </div>
        <div className="flex bg-surface p-1 rounded-full border border-border">
           <button className="px-4 py-1.5 rounded-full bg-white shadow-sm text-sm font-medium text-ink">Pendentes</button>
           <button className="px-4 py-1.5 rounded-full text-sm font-medium text-ink-secondary hover:text-ink">Histórico</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Pending Task Card */}
         <div className="group relative rounded-[2rem] p-1.5 bg-white border border-border shadow-md ring-1 ring-black/5 hover:border-primary/30 transition-colors">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 p-6">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-lg font-semibold text-ink">Fechamento de Caixa (Matriz)</h3>
                    <p className="text-sm text-ink-secondary mt-1">Verificar saldo em dinheiro e bater com o sistema PDV.</p>
                 </div>
                 <div className="px-2.5 py-1 bg-warning-bg text-warning text-xs font-semibold rounded-full border border-warning/20">
                    Hoje • 18:00
                 </div>
              </div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold border border-primary/20">M</div>
                 <span className="text-sm text-ink-secondary">Atribuído a Mariana Costa</span>
              </div>
              <button className="w-full py-3 bg-white border border-border rounded-xl text-sm font-semibold text-ink shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                 Iniciar Execução
              </button>
           </div>
         </div>

         {/* Overdue Task Card */}
         <div className="group relative rounded-[2rem] p-1.5 bg-danger-bg/10 border border-danger/20 shadow-md ring-1 ring-black/5 hover:border-danger/40 transition-colors">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-white border border-danger/10 p-6">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-lg font-semibold text-ink">Verificação de Extintores</h3>
                    <p className="text-sm text-ink-secondary mt-1">Checar validade e pressão de todos os extintores da unidade.</p>
                 </div>
                 <div className="px-2.5 py-1 bg-danger text-white text-xs font-semibold rounded-full shadow-sm">
                    Atrasado
                 </div>
              </div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-xs font-bold text-ink-secondary">?</div>
                 <span className="text-sm text-danger font-medium">Venceu ontem às 12:00</span>
              </div>
              <button className="w-full py-3 bg-danger text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-danger/90 transition-colors">
                 Resolver Agora
              </button>
           </div>
         </div>
      </div>
    </div>
  )
}
