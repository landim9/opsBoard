import Image from 'next/image'

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-primary-light selection:text-primary-700">
      {/* Navigation - Fluid Island Pattern */}
      <nav className="fixed top-0 w-full flex justify-center pt-6 z-50 px-4">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-sm ring-1 ring-black/5">
          <div className="font-bold tracking-tight text-ink text-lg">OpsBoard</div>
          <div className="hidden md:flex gap-8 text-sm text-ink-secondary font-medium">
            <a href="#funcionalidades" className="hover:text-ink transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-ink transition-colors">Como funciona</a>
            <a href="#planos" className="hover:text-ink transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Entrar
            </a>
            <a href="/signup" className="group flex items-center gap-2 text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-hover transition-all active:scale-[0.98]">
              Começar Grátis
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[0.5px] transition-transform">
                <span className="text-[10px]">↗</span>
              </div>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
          
          {/* Background Glow (Subtle) */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/50 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50" />

          {/* Left: Copy */}
          <div className="flex-1 space-y-8 animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/10 bg-primary-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Menos improviso. Mais execução.
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-balance leading-[1.05]">
              Sua operação,<br />
              <span className="text-primary">organizada</span> e visível.
            </h1>
            
            <p className="text-lg lg:text-xl text-ink-secondary max-w-[500px] leading-relaxed">
              Crie rotinas, acompanhe execuções e veja o que está pendente sem depender de planilhas, mensagens soltas ou da memória da equipe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/signup" className="group flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-hover transition-all active:scale-[0.98] shadow-md">
                Criar Workspace
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform">
                  <span className="text-[12px]">↗</span>
                </div>
              </a>
              <a href="#demo" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium border border-border bg-white hover:bg-surface transition-colors">
                Ver demonstração
              </a>
            </div>
            
            <div className="pt-8 flex items-center gap-4 text-sm text-ink-secondary">
              <div className="flex -space-x-2">
                {/* Avatars placeholder */}
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-bg bg-border flex items-center justify-center text-[10px]">
                    👤
                  </div>
                ))}
              </div>
              <p>Junte-se a <span className="font-semibold text-ink">100+ equipes</span> operacionais.</p>
            </div>
          </div>

          {/* Right: Asset (Dashboard Mockup using Double-Bezel) */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="relative rounded-[2.5rem] p-2.5 bg-white/40 border border-white/60 shadow-xl backdrop-blur-md ring-1 ring-black/5 rotate-[-1deg] hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div className="relative rounded-[calc(2.5rem-0.625rem)] overflow-hidden border border-border bg-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                {/* Top Window Bar */}
                <div className="h-10 border-b border-border bg-white/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                {/* Mockup Image Area */}
                <div className="aspect-[16/9] w-full bg-surface flex items-center justify-center text-ink-disabled relative overflow-hidden">
                   {/* In a real scenario, we would use next/image here pointing to the generated mockup. For now, a stylish placeholder */}
                   <div className="absolute inset-0 bg-gradient-to-br from-surface to-white flex flex-col items-center justify-center p-8 text-center">
                     <span className="text-4xl mb-4">📊</span>
                     <p className="font-medium text-ink-secondary">Dashboard Interativo</p>
                     <p className="text-sm mt-2 max-w-[250px] text-balance">O mock do OpsBoard foi gerado em background. Substitua com a imagem final.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Spacer */}
      <div className="h-24" />
      
      {/* Como Funciona - Asymmetric Steps */}
      <section id="como-funciona" className="py-24 px-4 bg-surface rounded-[3rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-6">
              O fim do improviso em <span className="text-primary text-balance">três passos.</span>
            </h2>
            <p className="text-lg text-ink-secondary">
              OpsBoard não exige meses de implantação. É feito para que você mapeie sua operação hoje e comece a executar amanhã.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Mapeie a rotina', desc: 'Transforme o que está na cabeça da equipe em rotinas claras com frequência e SLA.', icon: '📋' },
              { num: '02', title: 'Atribua e execute', desc: 'Cada membro sabe exatamente o que fazer hoje. Sem precisar perguntar no WhatsApp.', icon: '🎯' },
              { num: '03', title: 'Acompanhe', desc: 'O painel mostra o que foi feito, o que atrasou e onde a operação está travando.', icon: '📈' }
            ].map((step, i) => (
              <div key={i} className="group relative p-8 rounded-[2rem] bg-bg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-8 right-8 text-6xl font-bold text-ink-disabled opacity-20 group-hover:text-primary-100 transition-colors">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-xl mb-12">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-ink mb-3">{step.title}</h3>
                <p className="text-ink-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24" />

      {/* Features - Asymmetrical Bento Grid */}
      <section id="funcionalidades" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-6">
                Controle sem burocracia.
              </h2>
              <p className="text-lg text-ink-secondary">
                Tudo que você precisa para garantir que a operação aconteça, sem os jargões corporativos de um ERP.
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
            {/* Cell 1: Large Image/Hero Feature (col-span-8, row-span-2) */}
            <div className="md:col-span-8 md:row-span-2 relative rounded-[2rem] p-1.5 bg-white/40 border border-white/60 shadow-lg ring-1 ring-black/5 overflow-hidden group">
              <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border flex flex-col p-8 relative overflow-hidden">
                <div className="max-w-md relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border mb-6">
                    <span className="text-primary">⚙️</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-ink mb-3">Motor de Recorrência Automático</h3>
                  <p className="text-ink-secondary leading-relaxed">
                    Crie tarefas que se repetem sozinhas (diário, semanal ou customizado) com prazos calculados automaticamente. Nunca mais esqueça de uma manutenção preventiva ou fechamento de caixa.
                  </p>
                </div>
                {/* Decorative UI element representing the engine */}
                <div className="absolute right-0 bottom-0 w-[60%] h-[70%] bg-bg border-t border-l border-border rounded-tl-2xl shadow-[-8px_-8px_24px_rgba(40,37,29,0.04)] p-6 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col gap-4">
                   <div className="h-10 w-full bg-white rounded-lg border border-border flex items-center px-4"><div className="w-20 h-2 bg-primary/20 rounded-full"/></div>
                   <div className="h-10 w-3/4 bg-white rounded-lg border border-border flex items-center px-4"><div className="w-16 h-2 bg-warning/20 rounded-full"/></div>
                   <div className="h-10 w-full bg-white rounded-lg border border-border flex items-center px-4"><div className="w-24 h-2 bg-success/20 rounded-full"/></div>
                </div>
              </div>
            </div>

            {/* Cell 2: Audit Trail (col-span-4, row-span-1) */}
            <div className="md:col-span-4 md:row-span-1 relative rounded-[2rem] p-1.5 bg-white/40 border border-white/60 shadow-md ring-1 ring-black/5 group">
              <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-ink border border-ink flex flex-col p-8 relative overflow-hidden">
                <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Trilha de Atividades (Audit)</h3>
                <p className="text-ink-disabled text-sm relative z-10">
                  Registro imutável. Saiba exatamente quem executou o quê e quando. A promessa de provar a operação.
                </p>
                {/* Abstract log lines */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 opacity-50">
                  <div className="font-mono text-[10px] text-primary-100">08:00: system.routine.created</div>
                  <div className="font-mono text-[10px] text-success-bg">09:12: user.execution.done</div>
                  <div className="font-mono text-[10px] text-white">09:15: user.evidence.uploaded</div>
                </div>
              </div>
            </div>

            {/* Cell 3: Metrics (col-span-4, row-span-1) */}
            <div className="md:col-span-4 md:row-span-1 relative rounded-[2rem] p-1.5 bg-primary-light border border-primary/20 shadow-md ring-1 ring-black/5">
              <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-primary border border-primary-hover flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="text-5xl font-mono tracking-tighter mb-2">100%</div>
                <div className="text-primary-100 font-medium">Clareza Operacional</div>
              </div>
            </div>

            {/* Cell 4: Notifications (col-span-6, row-span-1) */}
            <div className="md:col-span-6 md:row-span-1 relative rounded-[2rem] p-1.5 bg-white/40 border border-white/60 shadow-md ring-1 ring-black/5 group">
              <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border flex flex-col p-8 justify-between relative overflow-hidden">
                 <div>
                    <h3 className="text-xl font-semibold text-ink mb-2">Alertas de Atraso</h3>
                    <p className="text-ink-secondary text-sm">Não seja pego de surpresa. Seja notificado quando prazos (SLAs) são violados.</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-warning-bg text-warning text-xs font-semibold rounded-full border border-warning/20">Atraso na filial Norte</div>
                 </div>
              </div>
            </div>

            {/* Cell 5: Evidence (col-span-6, row-span-1) */}
            <div className="md:col-span-6 md:row-span-1 relative rounded-[2rem] p-1.5 bg-white/40 border border-white/60 shadow-md ring-1 ring-black/5">
              <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border flex items-center p-8 gap-6">
                 <div className="flex-1">
                    <h3 className="text-xl font-semibold text-ink mb-2">Upload de Evidências</h3>
                    <p className="text-ink-secondary text-sm">Anexe fotos ou PDFs diretamente na execução para comprovar o serviço.</p>
                 </div>
                 <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-2xl rotate-3">
                   📸
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24" />

      {/* Pricing - Z-Axis Cascade simulation on desktop */}
      <section id="planos" className="py-24 px-4 bg-ink text-white rounded-[3rem] mx-4 md:mx-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Assinatura simples que cresce com você.
            </h2>
            <p className="text-lg text-ink-disabled">
              Comece validando sua operação no plano Free, escale para o Pro com histórico ilimitado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
            
            {/* Free */}
            <div className="p-8 rounded-[2rem] bg-[#1A1816] border border-white/10 md:translate-x-4 z-10 hover:z-30 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="text-3xl font-semibold mb-2">R$ 0<span className="text-lg text-ink-disabled font-normal">/mês</span></div>
              <p className="text-sm text-ink-disabled mb-8 h-10">Validar o uso com a equipe</p>
              <ul className="space-y-4 mb-8 text-sm text-white/80">
                <li className="flex gap-3"><span className="text-primary-100">✓</span> 3 Membros</li>
                <li className="flex gap-3"><span className="text-primary-100">✓</span> 5 Rotinas Ativas</li>
                <li className="flex gap-3"><span className="text-primary-100">✓</span> 30 dias de histórico</li>
              </ul>
              <a href="/signup" className="block text-center w-full py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-medium">Começar Grátis</a>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-[2rem] bg-primary border border-primary-hover shadow-2xl scale-105 z-20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                Recomendado
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-4xl font-semibold mb-2">R$ 59<span className="text-lg text-white/70 font-normal">/mês</span></div>
              <p className="text-sm text-white/80 mb-8 h-10">Escalar operação com histórico</p>
              <ul className="space-y-4 mb-8 text-sm text-white">
                <li className="flex gap-3"><span>✓</span> 20 Membros</li>
                <li className="flex gap-3"><span>✓</span> 50 Rotinas Ativas</li>
                <li className="flex gap-3"><span>✓</span> Histórico Ilimitado</li>
                <li className="flex gap-3"><span>✓</span> Exportação (CSV/XLSX)</li>
                <li className="flex gap-3"><span>✓</span> Trilha de Atividades (Audit)</li>
              </ul>
              <a href="/signup" className="block text-center w-full py-3 rounded-full bg-white text-primary hover:bg-surface transition-colors font-semibold shadow-md">Assinar Pro</a>
            </div>

            {/* Business */}
            <div className="p-8 rounded-[2rem] bg-[#1A1816] border border-white/10 md:-translate-x-4 z-10 hover:z-30 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Business</h3>
              <div className="text-3xl font-semibold mb-2">Custom</div>
              <p className="text-sm text-ink-disabled mb-8 h-10">Múltiplas unidades e API</p>
              <ul className="space-y-4 mb-8 text-sm text-white/80">
                <li className="flex gap-3"><span className="text-primary-100">✓</span> Membros Ilimitados</li>
                <li className="flex gap-3"><span className="text-primary-100">✓</span> Rotinas Ilimitadas</li>
                <li className="flex gap-3"><span className="text-primary-100">✓</span> Múltiplas Filiais</li>
                <li className="flex gap-3"><span className="text-primary-100">✓</span> Acesso API REST</li>
              </ul>
              <a href="/contato" className="block text-center w-full py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-medium">Falar com vendas</a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-bold tracking-tight text-ink">OpsBoard</div>
          <div className="text-sm text-ink-secondary flex items-center gap-6">
            <a href="/privacidade" className="hover:text-ink transition-colors">Privacidade</a>
            <a href="/termos" className="hover:text-ink transition-colors">Termos</a>
            <a href="/login" className="hover:text-ink transition-colors">Login</a>
          </div>
          <div className="text-xs text-ink-disabled">
            © {new Date().getFullYear()} OpsBoard Inc.
          </div>
        </div>
      </footer>
      
    </main>
  )
}
