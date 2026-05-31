export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center p-4 selection:bg-primary-light selection:text-primary-700">
      
      <div className="w-full max-w-md animate-fade-up">
         {/* Logo / Brand */}
         <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] mb-4">
              <span className="text-white font-bold tracking-tight">OB</span>
            </div>
            <h1 className="text-2xl font-semibold text-ink">Bem-vindo de volta</h1>
            <p className="text-ink-secondary mt-1">Entre na sua conta OpsBoard</p>
         </div>

         {/* Card */}
         <div className="relative rounded-[2rem] p-1.5 bg-white border border-border shadow-lg ring-1 ring-black/5">
            <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface border border-border/50 p-8">
               
               <form className="space-y-5">
                  <div>
                     <label className="block text-sm font-medium text-ink mb-1.5">E-mail</label>
                     <input 
                        type="email" 
                        placeholder="nome@empresa.com" 
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-ink-disabled" 
                     />
                  </div>
                  
                  <div>
                     <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-ink">Senha</label>
                        <a href="/recuperar" className="text-xs text-primary font-medium hover:underline">Esqueceu a senha?</a>
                     </div>
                     <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-ink-disabled" 
                     />
                  </div>

                  <button className="w-full py-3 mt-4 bg-primary text-white rounded-xl text-sm font-semibold shadow-md hover:bg-primary-hover transition-colors active:scale-[0.98]">
                     Entrar
                  </button>
               </form>

               <div className="mt-8 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border"></div>
                  <span className="text-xs text-ink-disabled font-medium uppercase tracking-wider">Ou entre com</span>
                  <div className="h-px flex-1 bg-border"></div>
               </div>

               <div className="mt-6">
                  <button className="w-full py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-ink shadow-sm hover:bg-surface transition-colors flex items-center justify-center gap-2">
                     Google
                  </button>
               </div>
            </div>
         </div>

         {/* Footer */}
         <p className="text-center text-sm text-ink-secondary mt-8">
            Não tem uma conta? <a href="/signup" className="text-primary font-semibold hover:underline">Criar Workspace</a>
         </p>
      </div>

    </main>
  )
}
