import { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
    const [commandText, setCommandText] = useState("");
    const [showTerminal, setShowTerminal] = useState(true);
    const [isDrawing, setIsDrawing] = useState(false);
    const fullCommand = "> python3 turtle.py";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setCommandText(fullCommand.slice(0, i));
            i++;
            if (i > fullCommand.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setShowTerminal(false);
                }, 400);
            }
        }, 20);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-blue-500/30 overflow-hidden text-white">
            <Analytics />
            <SpeedInsights />

            {/* TURTLE DRAWING LAYER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <AnimatePresence>
                    {isDrawing && (
                        <svg width="800" height="800" viewBox="0 0 200 200" className="opacity-50">
                            {[...Array(15)].map((_, i) => (
                                <motion.circle
                                    key={i}
                                    cx="100"
                                    cy="100"
                                    r={10 + i * 6}
                                    stroke={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                                    strokeWidth="0.6"
                                    fill="none"
                                    strokeDasharray="1 1"
                                    // Start each circle at a different angle (i * 24 degrees)
                                    initial={{
                                        pathLength: 0,
                                        opacity: 0,
                                        rotate: i * 24
                                    }}
                                    animate={{
                                        pathLength: [0.2, 0.9, 0.2],
                                        opacity: [0.4, 0.8, 0.4],
                                        rotate: i % 2 === 0 ? [i * 24, i * 24 + 360] : [i * 24, i * 24 - 360]
                                    }}
                                    transition={{
                                        pathLength: {
                                            duration: 10 + (i * 0.5),
                                            repeat: Infinity,
                                            ease: "easeInOut" // Smoother growth/shrinkage
                                        },
                                        opacity: {
                                            duration: 3 + (i * 0.2),
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        rotate: {
                                            duration: 25 + (i * 3),
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    }}
                                />
                            ))}
                        </svg>
                    )}
                </AnimatePresence>
            </div>

            {/* MAIN CONTENT */}
            <main className="relative z-10 text-center space-y-6 max-w-2xl">

                <div className="h-12 flex items-center justify-center">
                    <AnimatePresence onExitComplete={() => setIsDrawing(true)}>
                        {showTerminal && (
                            <motion.div
                                key="terminal"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="font-mono text-xs md:text-sm text-emerald-500 tracking-wider"
                            >
                                {commandText}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-yellow-300 text-black text-[11px] font-black uppercase tracking-[0.2em] border-2 border-gray-500 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <span className="w-2 h-2 bg-red-600 animate-pulse" />
                    Under Construction
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Hi, I'm building something <span className="text-blue-500 italic text-glow">new.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl font-light italic">
                        let me cook
                    </p>
                </div>

                <footer className="pt-12 flex flex-col items-center gap-6">
                    <div className="h-px w-12 bg-zinc-800" />

                    <a
                        href="https://www.linkedin.com/in/martin0wong/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300"
                    >
                        <span className="text-xs font-mono tracking-widest uppercase">LinkedIn</span>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                </footer>
            </main>
        </div>
    );
}