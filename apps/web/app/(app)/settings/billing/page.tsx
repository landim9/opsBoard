export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-center gap-4 mb-8">
         <a href="/settings" className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-ink-secondary hover:bg-surface transition-colors">
            ←
         </a>
         <div>
            <h1 className="text-2xl font-semibold text-ink">Faturamento e Assinatura</h1>
            <p className="text-ink-secondary">Gerencie seu plano e acompanhe o uso das suas cotas.</p>
         </div>
      </div>

      <div className="grid gap-8">
         
         {/* Current Plan Overview */}
         <div className="relative rounded-[2rem] p-1.5 bg-primary-light/50 border border-primary/20 shadow-sm ring-1 ring-black/5">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-white border border-primary/10 p-6 sm:p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              <div>
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    Plano Atual
                 </div>
                 <h2 className="text-3xl font-semibold text-ink mb-2">Pro <span className="text-xl text-ink-secondary font-normal">/ R$ 59,00</span></h2>
                 <p className="text-ink-secondary text-sm">Próxima cobrança em 01 de Julho de 2026.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-border text-ink rounded-xl text-sm font-semibold shadow-sm hover:bg-surface transition-colors">
                    Gerenciar no Stripe ↗
                 </button>
              </div>
           </div>
         </div>

         {/* Usage Quotas */}
         <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink mb-6">Uso do Workspace</h2>
              
              <div className="space-y-8">
                 {/* Quota Item */}
                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <div>
                          <div className="font-medium text-ink">Membros da Equipe</div>
                          <div className="text-xs text-ink-secondary mt-1">O plano Pro permite até 20 membros.</div>
                       </div>
                       <div className="text-sm font-medium text-ink"><span className="text-xl font-semibold">14</span> / 20</div>
                    </div>
                    <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full transition-all" style={{ width: '70%' }} />
                    </div>
                 </div>

                 {/* Quota Item */}
                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <div>
                          <div className="font-medium text-ink">Rotinas Ativas</div>
                          <div className="text-xs text-ink-secondary mt-1">O plano Pro permite até 50 rotinas.</div>
                       </div>
                       <div className="text-sm font-medium text-ink"><span className="text-xl font-semibold">45</span> / 50</div>
                    </div>
                    <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                       <div className="h-full bg-warning rounded-full transition-all" style={{ width: '90%' }} />
                    </div>
                 </div>

                 {/* Quota Item */}
                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <div>
                          <div className="font-medium text-ink">Armazenamento de Evidências</div>
                          <div className="text-xs text-ink-secondary mt-1">Fotos e arquivos anexados.</div>
                       </div>
                       <div className="text-sm font-medium text-ink"><span className="text-xl font-semibold">1.2 GB</span> / 5 GB</div>
                    </div>
                    <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full transition-all" style={{ width: '24%' }} />
                    </div>
                 </div>
              </div>

              {/* Upgrade Banner inside Quotas */}
              <div className="mt-10 p-6 bg-ink rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-ink-secondary shadow-lg">
                 <div>
                    <h3 className="font-semibold text-lg mb-1">Atingindo os limites?</h3>
                    <p className="text-ink-disabled text-sm">O plano Business oferece rotinas e membros ilimitados, além de múltiplas filiais e API.</p>
                 </div>
                 <button className="whitespace-nowrap px-6 py-2.5 bg-white text-ink rounded-xl text-sm font-semibold shadow-sm hover:bg-surface transition-colors">
                    Falar com Vendas
                 </button>
              </div>

           </div>
         </div>

         {/* Invoices */}
         <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-sm ring-1 ring-black/5">
           <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 overflow-hidden">
              <div className="p-6 sm:px-8 border-b border-border/50 bg-white">
                 <h2 className="text-xl font-semibold text-ink">Histórico de Faturas</h2>
              </div>
              <table className="w-full text-left text-sm">
                 <thead className="bg-bg text-ink-secondary border-b border-border/50">
                    <tr>
                       <th className="px-6 py-4 sm:px-8 font-medium">Data</th>
                       <th className="px-6 py-4 font-medium">Valor</th>
                       <th className="px-6 py-4 font-medium">Status</th>
                       <th className="px-6 py-4 sm:px-8 text-right font-medium">Recibo</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50 bg-white">
                    <tr className="hover:bg-surface transition-colors">
                       <td className="px-6 py-4 sm:px-8 text-ink-secondary">01 Jun 2026</td>
                       <td className="px-6 py-4 font-medium text-ink">R$ 59,00</td>
                       <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-success-bg text-success text-[11px] font-bold uppercase tracking-wider rounded-full border border-success/20">Pago</span>
                       </td>
                       <td className="px-6 py-4 sm:px-8 text-right">
                          <button className="text-primary font-medium hover:underline">Download PDF</button>
                       </td>
                    </tr>
                    <tr className="hover:bg-surface transition-colors">
                       <td className="px-6 py-4 sm:px-8 text-ink-secondary">01 Mai 2026</td>
                       <td className="px-6 py-4 font-medium text-ink">R$ 59,00</td>
                       <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-success-bg text-success text-[11px] font-bold uppercase tracking-wider rounded-full border border-success/20">Pago</span>
                       </td>
                       <td className="px-6 py-4 sm:px-8 text-right">
                          <button className="text-primary font-medium hover:underline">Download PDF</button>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
         </div>

      </div>
    </div>
  )
}
