export default function AuditTrailPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-semibold text-ink">Trilha de Atividades</h1>
           <p className="text-ink-secondary">Registro imutável de tudo que acontece na operação.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-ink px-5 py-2.5 rounded-full font-medium border border-border hover:bg-surface transition-colors shadow-sm">
           <span className="text-lg leading-none mb-[2px]">↓</span> Exportar CSV
        </button>
      </div>

      <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-md ring-1 ring-black/5">
        <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 overflow-hidden">
           <div className="p-4 border-b border-border/50 flex gap-4 bg-white">
              <input 
                 type="text" 
                 placeholder="Buscar por usuário, ação ou entidade..." 
                 className="flex-1 bg-surface border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <select className="bg-surface border border-border rounded-xl px-4 py-2 text-sm text-ink-secondary focus:outline-none">
                 <option>Todas as Ações</option>
                 <option>Execuções</option>
                 <option>Rotinas</option>
                 <option>Sistema</option>
              </select>
           </div>
           
           <table className="w-full text-left text-sm font-mono">
             <thead className="bg-bg border-b border-border/50 text-ink-secondary font-sans text-xs uppercase tracking-wider">
                <tr>
                   <th className="px-6 py-4 font-semibold">Timestamp</th>
                   <th className="px-6 py-4 font-semibold">Ator</th>
                   <th className="px-6 py-4 font-semibold">Ação</th>
                   <th className="px-6 py-4 font-semibold">Entidade</th>
                   <th className="px-6 py-4 font-semibold">IP</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border/50 bg-white">
                <tr className="hover:bg-surface transition-colors">
                   <td className="px-6 py-4 text-ink-secondary">2026-05-31 08:05:12</td>
                   <td className="px-6 py-4 font-sans font-medium text-ink">Mariana Costa</td>
                   <td className="px-6 py-4"><span className="text-success">executed</span></td>
                   <td className="px-6 py-4 text-ink-secondary">routine:abertura_loja</td>
                   <td className="px-6 py-4 text-ink-disabled text-xs">192.168.1.45</td>
                </tr>
                <tr className="hover:bg-surface transition-colors">
                   <td className="px-6 py-4 text-ink-secondary">2026-05-31 08:00:01</td>
                   <td className="px-6 py-4 font-sans font-medium text-ink-disabled italic">System (Cron)</td>
                   <td className="px-6 py-4"><span className="text-primary">created</span></td>
                   <td className="px-6 py-4 text-ink-secondary">execution:abertura_loja</td>
                   <td className="px-6 py-4 text-ink-disabled text-xs">-</td>
                </tr>
                <tr className="hover:bg-surface transition-colors">
                   <td className="px-6 py-4 text-ink-secondary">2026-05-30 18:30:44</td>
                   <td className="px-6 py-4 font-sans font-medium text-ink">Carlos Silva</td>
                   <td className="px-6 py-4"><span className="text-warning">skipped</span></td>
                   <td className="px-6 py-4 text-ink-secondary">routine:limpeza_salao</td>
                   <td className="px-6 py-4 text-ink-disabled text-xs">172.16.0.22</td>
                </tr>
                <tr className="hover:bg-surface transition-colors">
                   <td className="px-6 py-4 text-ink-secondary">2026-05-30 14:12:00</td>
                   <td className="px-6 py-4 font-sans font-medium text-ink">Admin</td>
                   <td className="px-6 py-4"><span className="text-danger">deleted</span></td>
                   <td className="px-6 py-4 text-ink-secondary">user:joao_antigo</td>
                   <td className="px-6 py-4 text-ink-disabled text-xs">201.55.12.9</td>
                </tr>
             </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}
