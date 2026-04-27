import React from 'react';

// for the work entries in about
interface WorkItemProps {
    title: string;
    company: string;
    companyClass?: string;
    date: string;
    marker?: string;
}

export function WorkItem({ title, company, companyClass, date, marker }: WorkItemProps) {
    return (
        <div className="flex flex-row items-center justify-between py-3 text-sm md:text-base">
            <div className="flex flex-col">
                <span className="font-medium">
                    {title} @ <span className={`${companyClass || ''}`}>{company}</span>
                </span>
                <span className="sm:hidden text-xs text-zinc-500">
                    {date} {marker && <span className="text-blue-500 ml-1 font-bold">{marker}</span>}
                </span>
            </div>
            <span className="hidden sm:flex text-xs font-mono text-zinc-500">
                {date} {marker && <span className="text-blue-500 ml-1 font-bold">{marker}</span>}
            </span>
        </div>
    );
}

// for header dropdown
interface ExternalLinkProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    isDark: boolean;
}

export function ExternalLink({ href, label, icon, isDark }: ExternalLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                isDark ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
            }`}
        >
            <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>{icon}</span>
            {label}
        </a>
    );
}