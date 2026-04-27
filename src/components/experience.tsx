import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface Exp {
    title: string;
    company: string;
    date: string;
    details: string[];
    color: string;
    logo?: string;
    banner?: string;
}

import icbcLogo from "../assets/icbcLogo.png";
import cienaLogo from "../assets/cienaLogo.png";
import ubcLogo from "../assets/ubc.png";
import ubcPhasBanner from "../assets/ubcphas.png";

const experiences: Exp[] = [
    {
        title: "Data Engineer Intern",
        company: "ICBC",
        date: "May 2026 – Aug 2026",
        details: [
            "Incoming internship"
        ],
        color: "bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent",
        logo: icbcLogo
    },
    {
        title: "Data Science Intern",
        company: "Ciena",
        date: "Jan 2025 – Apr 2026",
        details: [
            "Reduced production costs up to $600,000 per wafer lot, totalling over millions by engineering an automated early alert system in Python for production test data pipelines",
            "Leveraged Kubernetes and Docker to optimize data processing workloads, improving resource efficiency by 80%",
            "Achieved a >200x performance increase by re-architecting a legacy Scala data pipeline into a parallelized PySpark application, reducing runtime from 7 hours to ∼2 minutes",
            "Resolved race conditions in pipeline orchestration by introducing async polling to coordinate builds of upstream datasets, improving success rates by 40%"
        ],
        color: "text-red-500",
        logo: cienaLogo
    },
    {
        title: "Undergraduate Teaching Assistant",
        company: "UBC PHAS",
        date: "Sept 2025 – April 2026",
        details: ["Taught PHYS 157 and 158 respectively in term 1 and term 2 2025W",
            "Mentored 400+ students across the courses by delivering weekly tutorials and guiding problem-solving, and providing targeted assignment feedback"
        ],
        color: "text-blue-500",
        logo: ubcLogo,
        banner: ubcPhasBanner
    },
    {
        title: "Orientation Leader (Residence Stream)",
        company: "UBC",
        date: "Aug 2025",
        details: ["Facilitated the transition of 40+ first-year students into university life by providing guidance on academic resources and leading orientation activities",
            "Led a 2-hour long campus tour on key campus locations and buildings for Science students"],
        color: "text-blue-500",
        logo: ubcLogo
    },
    {
        title: "Undergraduate Teaching Assistant",
        company: "UBC PHAS",
        date: "Sept 2024 – Dec 2024",
        details: ["Taught PHYS 117 in term 1 2024W",
            "Mentored 200+ students across the courses by delivering weekly tutorials and guiding problem-solving, and answering conceptual questions in lectures"
        ],
        color: "text-blue-500",
        logo: ubcLogo,
        banner: ubcPhasBanner
    },
    {
        title: "Residence Orientation Leader",
        company: "UBC",
        date: "Aug 2024 - Sept 2024",
        details: ["Facilitated the transition of 30+ first-year students into university life by providing guidance on academic resources and leading orientation activities",
            "Led a 2-hour long campus tour on key campus locations and buildings for Science students"],
        color: "text-blue-500",
        logo: ubcLogo
    }
];

export default function ExperienceContent({ isDark }: { isDark: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset:["start start", "end end"]
    });

    const treeX = useTransform(scrollYProgress,[0, 0.12], ["50%", "10%"]);
    const treeScale = useTransform(scrollYProgress, [0, 0.12],[1.8, 0.4]);
    const treeY = useTransform(scrollYProgress, [0, 0.12],["10vh", "0vh"]);
    const treeOpacity = useTransform(scrollYProgress,[0, 0.8, 1], [1, 1, 0.4]);

    const lineOpacity = useTransform(scrollYProgress, [0.02, 0.08], [0, 1]);
    const lineSpring = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <div ref={containerRef} className="relative w-full min-h-[400vh] max-w-[1400px] mx-auto">

            <div className="sticky top-20 h-0 z-20 w-full">
                <motion.div
                    style={{ left: treeX, scale: treeScale, y: treeY, opacity: treeOpacity, x: "-50%" }}
                    className="absolute flex flex-col items-center pointer-events-none"
                >
                    <svg width="600" height="600" viewBox="0 0 200 200" className="overflow-visible">
                        <RecursiveBranch x={100} y={190} angle={0} length={45} depth={0} />
                    </svg>

                    <motion.p style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                              className={`text-[10px] font-mono uppercase tracking-[0.6em] mt-4 whitespace-nowrap 
                              ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        What opportunities lie ahead?
                    </motion.p>
                </motion.div>
            </div>

            {/* TIMELINE*/}
            <motion.div
                style={{ opacity: lineOpacity }}
                className={`absolute left-[10%] -translate-x-1/2 top-[35vh] bottom-0 w-[2px] ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'} z-0`}
            >
                <motion.div style={{ scaleY: lineSpring, originY: 0 }} className={`w-full h-full ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
            </motion.div>

            <div className="h-[120vh]" />

            <div className="relative z-10 space-y-[40vh] pb-[30vh]">
                {experiences.map((exp, index) => (
                    <TimelineCard key={index} exp={exp} isDark={isDark} />
                ))}
            </div>
        </div>
    );
}

function TimelineCard({ exp, isDark }: { exp: Exp, isDark: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: 20 }}
            viewport={{ margin: "-25% 0px -25% 0px" }}
            transition={{ duration: 0.5 }}
            className="relative flex w-full justify-end pr-4 md:pr-12"
        >
            {/* THE DOT */}
            <div className="absolute left-[10%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-400 z-30 border-2 border-black dark:border-zinc-950 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />

            <div className={`w-[82%] md:w-[85%] rounded-sm border overflow-hidden transition-colors ${
                isDark ? 'bg-zinc-950/60 border-zinc-800 shadow-xl backdrop-blur-sm' : 'bg-white border-zinc-200 shadow-md'
            }`}>

                {/* BANNER */}
                {exp.banner && (
                    <div className="w-full h-32 md:h-48 overflow-hidden border-b border-zinc-800/50">
                        <img
                            src={exp.banner}
                            alt="banner"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-6 md:p-8">
                    <div className="flex flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-1 text-left">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                {exp.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
                                <span className={`text-base md:text-lg font-semibold ${exp.color}`}>
                                    {exp.company}
                                </span>
                                <span className="text-zinc-600 dark:text-zinc-500 text-sm">•</span>
                                <span className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">
                                    {exp.date}
                                </span>
                            </div>
                        </div>

                        {/* LOGO */}
                        {exp.logo && (
                            <div className="shrink-0">
                                <img
                                    src={exp.logo}
                                    alt="logo"
                                    className={`w-14 h-14 md:w-20 md:h-20 rounded-sm border p-1.5 bg-white dark:bg-zinc-900 object-contain shadow-md ${
                                        isDark ? 'border-zinc-800' : 'border-zinc-200'
                                    }`}
                                />
                            </div>
                        )}
                    </div>

                    {/* DETAILS */}
                    <ul className="mt-6 md:mt-8 space-y-3 text-left">
                        {exp.details.map((detail, i) => (
                            <li key={i} className="text-sm md:text-base text-zinc-400 font-light leading-relaxed flex gap-3 group">
                                <span className="text-green-600 mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                <span>{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

function RecursiveBranch({ x, y, angle, length, depth }: { x: number, y: number, angle: number, length: number, depth: number }) {
    if (depth > 10) return null;
    const x2 = x + length * Math.sin((angle * Math.PI) / 180);
    const y2 = y - length * Math.cos((angle * Math.PI) / 180);
    return (
        <>
            <motion.line
                x1={x} y1={y} x2={x2} y2={y2}
                stroke="#00a63e"
                strokeWidth={depth === 0 ? 3 : Math.max(0.2, 4 / (depth + 1))}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: depth * 0.08 }}
            />
            <RecursiveBranch x={x2} y={y2} angle={angle - 15} length={length * 0.78} depth={depth + 1} />
            <RecursiveBranch x={x2} y={y2} angle={angle + 15} length={length * 0.78} depth={depth + 1} />
        </>
    );
}