import { motion } from "framer-motion";

export default function Todo({ isDark }: { isDark: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-yellow-300 text-black text-[11px] font-black uppercase tracking-[0.2em] border-2 border-gray-500 transition-shadow ${
                isDark ? 'shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            }`}>
                <span className="w-2 h-2 bg-red-600 animate-pulse" />
                Under Construction
            </div>
            <div className="space-y-4">
                <p className={`text-lg md:text-xl font-light italic transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Check back soon for updates
                </p>
            </div>
        </motion.div>
    );
}