export default function RoutinesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-semibold text-ink">Rotinas</h1>
           <p className="text-ink-secondary">Gerencie os processos recorrentes da sua operação.</p>
        </div>
        <button className="group flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-hover transition-all active:scale-[0.98] shadow-md">
           Nova Rotina
           <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
             <span className="text-lg leading-none mb-[2px]">+</span>
           </div>
        </button>
      </div>

      <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-md ring-1 ring-black/5">
        <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 overflow-hidden">
           <table className="w-full text-left text-sm">
             <thead className="bg-bg border-b border-border/50 text-ink-secondary font-medium">
                <tr>
                   <th className="px-6 py-4 font-medium">Nome da Rotina</th>
                   <th className="px-6 py-4 font-medium">Frequência</th>
                   <th className="px-6 py-4 font-medium">Responsável Padrão</th>
                   <th className="px-6 py-4 font-medium">Status</th>
                   <th className="px-6 py-4"></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border/50 bg-white">
                <tr className="hover:bg-surface transition-colors group">
                   <td className="px-6 py-4 font-medium text-ink">Fechamento de Caixa</td>
                   <td className="px-6 py-4 text-ink-secondary">Diário • 18:00</td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center text-[10px] font-bold">M</div>
                         <span className="text-ink-secondary">Mariana Costa</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-success-bg text-success text-[11px] font-bold uppercase tracking-wider rounded-full border border-success/20">Ativa</span>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <button className="text-ink-disabled group-hover:text-ink transition-colors font-medium">Editar</button>
                   </td>
                </tr>
                <tr className="hover:bg-surface transition-colors group">
                   <td className="px-6 py-4 font-medium text-ink">Verificação de Extintores</td>
                   <td className="px-6 py-4 text-ink-secondary">Mensal • Dia 1</td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-bg border border-border flex items-center justify-center text-[10px] font-bold text-ink-secondary">?</div>
                         <span className="text-ink-secondary italic">Qualquer um</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-success-bg text-success text-[11px] font-bold uppercase tracking-wider rounded-full border border-success/20">Ativa</span>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <button className="text-ink-disabled group-hover:text-ink transition-colors font-medium">Editar</button>
                   </td>
                </tr>
             </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}
