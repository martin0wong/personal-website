import { WorkItem } from "./UIHelpers";

import logo from "../assets/logo.svg";
import zazu from "../assets/zazu.jpg";

export default function About({ isDark }: { isDark: boolean }) {
    return (
        <div className="max-w-2xl mx-auto space-y-10 text-left">
            <section className="flex items-center gap-5">
                <img src={logo}  alt="pfp" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-zinc-800 shadow-sm" />
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Martin Wong</h1>
                    <p className={`text-sm md:text-base font-light ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Vancouver, BC • 3rd year CS & Stats @ <span className="text-blue-500 font-medium">UBC</span>
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex flex-col gap-2">
                    <span className="font-semibold uppercase tracking-[0.25em] text-[10px] md:text-xs text-zinc-500">about me</span>
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        still figuring out what I want to do in the future... open to ideas
                        <img
                            src={zazu}
                            alt="zazu"
                            className="inline-block w-7 h-7 border border-zinc-800 shadow-sm align-middle ml-2 object-cover"
                        />
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <span className="font-semibold uppercase tracking-[0.25em] text-[10px] md:text-xs text-zinc-500">experience (brief)</span>
                <div className={`flex flex-col divide-y ${isDark ? 'divide-zinc-800' : 'divide-zinc-200'}`}>
                    <WorkItem title="Data Engineer Intern" company="ICBC"
                              companyClass="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                              date="May 2026 – Aug 2026" />
                    <WorkItem title="Data Science Intern" company="Ciena"
                              companyClass="text-red-500"
                              date="Jan 2025 – Apr 2026" marker="[1]" />
                    <WorkItem title="Undergraduate Teaching Assistant"
                              company="UBC PHAS"
                              companyClass="text-blue-500 font-medium"
                              date="Sept 2025 – April 2026" />
                    <WorkItem title="Residence Orientation Leader"
                              company="UBC"
                              companyClass="text-blue-500 font-medium"
                              date="Aug 2025" />
                    <WorkItem title="Undergraduate Teaching Assistant"
                              company="UBC PHAS"
                              companyClass="text-blue-500 font-medium"
                              date="Sept 2024 – Dec 2024" />
                    <WorkItem title="Residence Orientation Leader"
                              company="UBC"
                              companyClass="text-blue-500 font-medium"
                              date="Aug 2024 – Sept 2024" />
                </div>
            </section>
        </div>
    );
}