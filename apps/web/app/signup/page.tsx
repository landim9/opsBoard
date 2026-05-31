export default function SignupPage() {
  return (
    <main className="min-h-screen bg-bg flex">
      
      {/* Left Area - Brand & Visual */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-primary relative overflow-hidden">
         {/* Glow effect */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 opacity-50 pointer-events-none" />
         <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-100/20 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center shadow-sm">
              <span className="font-bold tracking-tight text-sm">OB</span>
            </div>
            <span className="font-bold text-xl tracking-tight">OpsBoard</span>
         </div>

         <div className="relative z-10 max-w-md animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold uppercase tracking-[0.18em] mb-6 border border-white/20">
              Transforme sua operação
            </div>
            <h1 className="text-4xl font-semibold tracking-tighter leading-tight text-white mb-6">
              Onde processos saem do papel e viram execução.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Junte-se a dezenas de empresas que substituíram planilhas caóticas por previsibilidade e controle.
            </p>
         </div>

         <div className="relative z-10 text-white/50 text-sm">
            © {new Date().getFullYear()} OpsBoard Inc.
         </div>
      </div>

      {/* Right Area - Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 selection:bg-primary-light selection:text-primary-700">
         <div className="w-full max-w-md animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-3xl font-semibold text-ink mb-2">Crie seu Workspace</h2>
            <p className="text-ink-secondary mb-10">Configure sua conta gratuita em 30 segundos.</p>

            {/* Card */}
            <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-md ring-1 ring-black/5">
               <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 p-8">
                  
                  <form className="space-y-5">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-medium text-ink mb-1.5">Nome</label>
                           <input 
                              type="text" 
                              placeholder="Seu nome" 
                              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-ink mb-1.5">Empresa</label>
                           <input 
                              type="text" 
                              placeholder="Nome do Workspace" 
                              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-ink mb-1.5">E-mail Profissional</label>
                        <input 
                           type="email" 
                           placeholder="nome@empresa.com" 
                           className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-ink-disabled" 
                        />
                     </div>
                     
                     <div>
                        <label className="block text-sm font-medium text-ink mb-1.5">Senha</label>
                        <input 
                           type="password" 
                           placeholder="Mínimo de 8 caracteres" 
                           className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-ink-disabled" 
                        />
                     </div>

                     <button className="w-full py-3 mt-6 bg-primary text-white rounded-xl text-sm font-semibold shadow-md hover:bg-primary-hover transition-colors active:scale-[0.98]">
                        Criar Conta Gratuita
                     </button>
                  </form>
               </div>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-ink-secondary mt-8">
               Já possui uma conta? <a href="/login" className="text-primary font-semibold hover:underline">Entrar</a>
            </p>
         </div>
      </div>

    </main>
  )
}
