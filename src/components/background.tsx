import { motion } from "framer-motion";
import earthIcon from "../assets/earth.svg";

interface BackgroundProps {
    isDrawing: boolean;
    isDark: boolean;
}

export default function Background({ isDrawing, isDark }: BackgroundProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
            {isDrawing && (
                <svg
                    className={`w-screen h-screen transition-opacity duration-1000 ${isDark ? 'opacity-40' : 'opacity-20'}`}
                    viewBox="0 0 200 200"
                    preserveAspectRatio="xMidYMid slice"
                >

                    {/* rings */}
                    {[...Array(15)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx="100" cy="100" r={20 + i * 6}
                            stroke={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                            strokeWidth="0.6"
                            fill="none"
                            strokeDasharray="1 1"
                            initial={{ pathLength: 0, opacity: 0, rotate: i * 24 }}
                            animate={{
                                pathLength: [0.2, 0.9, 0.2],
                                opacity: [0.4, 0.8, 0.4],
                                rotate: i % 2 === 0 ? [i * 24, i * 24 + 360] : [i * 24, i * 24 - 360]
                            }}
                            transition={{
                                pathLength: { duration: 10 + (i * 0.5), repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 4 + (i * 0.2), repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 25 + (i * 3), repeat: Infinity, ease: "linear" }
                            }}
                        />
                    ))}

                    {/* earth */}
                    {/*<g transform="translate(100, 100)">*/}
                    {/*    <motion.image*/}
                    {/*        href={earthIcon}*/}
                    {/*        x="-10"*/}
                    {/*        y="-10"*/}
                    {/*        width="20"*/}
                    {/*        height="20"*/}
                    {/*        initial={{ opacity: 0, scale: 0.5 }}*/}
                    {/*        animate={{ opacity: 1, scale: 1 }}*/}
                    {/*        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}*/}
                    {/*    />*/}

                    {/*    /!* Subtle Glass Shine Overlay *!/*/}
                    {/*    <motion.circle*/}
                    {/*        r="9"*/}
                    {/*        fill="url(#earth-shimmer)"*/}
                    {/*        initial={{ opacity: 0 }}*/}
                    {/*        animate={{ opacity: 1 }}*/}
                    {/*        transition={{ delay: 1, duration: 1 }}*/}
                    {/*    />*/}
                    {/*</g>*/}

                    <defs>
                        <radialGradient id="earth-shimmer" cx="40%" cy="40%" r="50%">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>
            )}
        </div>
    );
}