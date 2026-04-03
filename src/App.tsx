import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function App() {
    return (
        <>
            <Analytics/>
            <SpeedInsights/>
            <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-blue-500/30">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
                </div>

                <main className="relative z-10 text-center space-y-6 max-w-2xl">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-yellow-300 text-black text-[11px] font-black uppercase tracking-[0.2em] border-2 border-gray-500 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        <span className="w-2 h-2 bg-red-600 animate-pulse" />
                        Under Construction
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                            Hi, I'm building something <span className="text-blue-500 italic">new.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl font-light">
                            let me cook
                        </p>
                    </div>

                    <footer className="pt-12 flex flex-col items-center gap-6">
                        <div className="h-px w-12 bg-zinc-800" />

                        <a
                            href="https://github.com/martin0wong/personal-website"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300"
                        >
                            <span className="text-xs font-mono tracking-widest uppercase">Head to GitHub for the time being...</span>
                            <svg
                                viewBox="0 0 24 24"
                                width="16" height="16"
                                stroke="currentColor" strokeWidth="2" fill="none"
                                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </a>
                    </footer>
                </main>
            </div>
        </>
    );
}