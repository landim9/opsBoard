import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(authOptions)
  // if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-bg flex selection:bg-primary-light selection:text-primary-700">
      
      {/* Sidebar - Dark theme matching high-end specs */}
      <aside className="w-64 bg-ink text-white flex-shrink-0 border-r border-ink flex flex-col p-4 z-10 hidden md:flex">
        <div className="font-bold text-xl tracking-tight mb-12 px-2 flex items-center gap-2">
           <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
             <span className="text-[10px]">OB</span>
           </div>
           OpsBoard
        </div>
        
        <nav className="flex-1 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            <span className="text-primary-100 opacity-80">📊</span> Dashboard
          </a>
          <a href="/routines" className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink-disabled hover:text-white hover:bg-white/5 transition-colors">
            <span className="opacity-60">📋</span> Rotinas
          </a>
          <a href="/executions" className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink-disabled hover:text-white hover:bg-white/5 transition-colors">
            <span className="opacity-60">🎯</span> Execuções
          </a>
          <a href="/audit" className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink-disabled hover:text-white hover:bg-white/5 transition-colors">
            <span className="opacity-60">🔒</span> Audit Trail
          </a>
        </nav>

        <div className="mt-auto space-y-4">
           {/* Plan Quota Mini-Widget */}
           <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-xs mb-2">
                 <span className="text-ink-disabled">Rotinas Ativas</span>
                 <span className="text-white font-medium">12 / 50</span>
              </div>
              <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-[24%]" />
              </div>
              <a href="/settings/billing" className="text-[10px] text-primary-100 uppercase tracking-wider font-semibold mt-3 inline-block hover:underline">
                 Fazer Upgrade
              </a>
           </div>

           <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink-disabled hover:text-white hover:bg-white/5 transition-colors">
            <span className="opacity-60">⚙️</span> Configurações
           </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 border-b border-border bg-surface flex items-center px-8 justify-between shrink-0">
           <h1 className="font-semibold text-ink">Dashboard</h1>
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                 A
              </div>
           </div>
        </header>
        <div className="flex-1 overflow-auto p-8 relative">
           {children}
        </div>
      </main>
      
    </div>
  )
}
