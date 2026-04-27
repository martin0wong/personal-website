import { useState, useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { motion, AnimatePresence } from "framer-motion";

// Assets & Components
import sunIcon from './assets/sun.svg';
import moonIcon from './assets/moon.svg';
import Background from "./components/background";
import { ExternalLink } from "./components/UIHelpers";

// Tab Components
import AboutContent from "./components/about.tsx";
import ExperienceContent from "./components/experience.tsx";
// import ProjectsContent from "./components/";
import Todo from "./components/todo.tsx";

export default function App() {
    const [activeTab, setActiveTab] = useState("About");
    const [isDark, setIsDark] = useState(true);
    const [commandText, setCommandText] = useState("");
    const [showTerminal, setShowTerminal] = useState(true);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isLinksOpen, setIsLinksOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fullCommand = "> git checkout main --feature-flag=DRAW_TURTLE_BG";
    const tabs = ["About", "Experience", "Projects"];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setCommandText(fullCommand.slice(0, i));
            i++;
            if (i > fullCommand.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setShowTerminal(false);
                    setIsDrawing(true);
                }, 300);
            }
        }, 15);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLinksOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`min-h-screen flex justify-center p-6 selection:bg-blue-500/30 overflow-y-auto overflow-x-hidden transition-colors duration-700 ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
            <Analytics />
            <SpeedInsights />

            <header className="fixed top-0 right-0 p-8 z-50 flex items-center gap-8 bg-transparent">
                <nav className="flex items-center gap-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative cursor-pointer text-sm font-medium tracking-wide transition-colors duration-300 ${
                                activeTab === tab ? "text-blue-400" : isDark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-black"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400" />
                            )}
                        </button>
                    ))}

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLinksOpen(!isLinksOpen)}
                            className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-1 ${
                                isLinksOpen ? "text-yellow-400" : isDark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-black"
                            }`}
                        >
                            External Links
                            <motion.span animate={{ rotate: isLinksOpen ? 180 : 0 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {isLinksOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className={`absolute top-full right-0 mt-4 w-32 p-1.5 rounded-sm border shadow-xl backdrop-blur-md ${
                                        isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-200'
                                    }`}
                                >
                                    <ExternalLink href="https://www.linkedin.com/in/martin0wong/" label="LinkedIn" isDark={isDark} icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>} />
                                    <ExternalLink href="https://github.com/martin0wong" label="GitHub" isDark={isDark} icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'}`}>
                    <img src={isDark ? sunIcon : moonIcon} alt="Theme" className={`w-5 h-5 ${isDark ? 'invert' : ''}`} />
                </button>
            </header>

            <Background isDrawing={isDrawing} isDark={isDark} />

            <main className="relative z-10 w-full max-w-4xl pt-32 pb-20">
                <AnimatePresence mode="wait">
                    {showTerminal ? (
                        <motion.div key="terminal" exit={{ opacity: 0, y: -10 }} className="h-64 flex items-center justify-center font-mono text-xs text-emerald-500">
                            {commandText}<span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse" />
                        </motion.div>
                    ) : (
                        <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.4 }}>
                            {activeTab === "About" && <AboutContent isDark={isDark} />}
                            {activeTab === "Experience" && <ExperienceContent isDark={isDark} />}
                            {activeTab === "Projects" && <Todo isDark={isDark} />}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showTerminal && (
                    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-12 text-left">
                        <div className="min-h-[20px]">
                            {activeTab === "About" && (
                                <p className={`text-[10px] font-mono leading-relaxed max-w-xl ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    <span className="text-blue-500 mr-2">[1]</span>
                                    Extended from 4-months full-time to 8-months full-time, followed by 8-months part-time extension.
                                </p>
                            )}
                        </div>
                    </footer>
                )}
            </main>
        </div>
    );
}