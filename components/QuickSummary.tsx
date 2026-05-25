"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FadeInImage } from "@/components/ui/FadeInImage";
import { motion, useAnimationControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaDocker, FaAws, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { SiTypescript, SiFastapi, SiPostgresql, SiRedis, SiNextdotjs, SiNestjs, SiCelery, SiSelenium } from "react-icons/si";
import projectsData from "@/lib/data/projects";

interface QuickSummaryProps {
    onScrollDown: () => void;
}

const coreSkills = [
    { icon: SiFastapi, name: "FastAPI", color: "#009688" },
    { icon: SiNestjs, name: "NestJS", color: "#E0234E" },
    { icon: SiNextdotjs, name: "Next.js", color: "#0f172a" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
    { icon: SiRedis, name: "Redis", color: "#DC382D" },
    { icon: SiCelery, name: "Celery", color: "#37814A" },
    { icon: SiSelenium, name: "Selenium", color: "#43B02A" },
    { icon: FaDocker, name: "Docker", color: "#2496ED" },
    { icon: FaAws, name: "AWS", color: "#FF9900" },
];

// Generate code lines with dynamic visitor name
function generateCodeLines(visitorName: string) {
    return [
        { text: "class", color: "text-purple-400" },
        { text: " WelcomeToMyPortfolio", color: "text-yellow-300" },
        { text: ":\n", color: "text-white" },
        { text: '    """', color: "text-gray-500" },
        { text: "Backend Developer", color: "text-gray-500" },
        { text: '"""\n\n', color: "text-gray-500" },
        { text: "    def", color: "text-purple-400" },
        { text: " __init__", color: "text-cyan-300" },
        { text: "(", color: "text-white" },
        { text: "self", color: "text-orange-400" },
        { text: "):\n", color: "text-white" },
        { text: "        self", color: "text-orange-400" },
        { text: ".name = ", color: "text-white" },
        { text: '"Sebastián Machado"', color: "text-green-400" },
        { text: "\n        self", color: "text-orange-400" },
        { text: ".role = ", color: "text-white" },
        { text: '"Backend Developer"', color: "text-green-400" },
        { text: "\n        self", color: "text-orange-400" },
        { text: ".stack = ", color: "text-white" },
        { text: "[", color: "text-white" },
        { text: '"Python"', color: "text-green-400" },
        { text: ", ", color: "text-white" },
        { text: '"FastAPI"', color: "text-green-400" },
        { text: "]\n\n", color: "text-white" },
        { text: "    def", color: "text-purple-400" },
        { text: " greet", color: "text-cyan-300" },
        { text: "(", color: "text-white" },
        { text: "self", color: "text-orange-400" },
        { text: ", visitor):\n", color: "text-white" },
        { text: "        return", color: "text-purple-400" },
        { text: " f", color: "text-white" },
        { text: '"Welcome, {visitor}!"', color: "text-green-400" },
        { text: "\n\n", color: "text-white" },
        { text: "# ", color: "text-gray-500" },
        { text: "Initialize", color: "text-gray-500" },
        { text: "\n", color: "text-white" },
        { text: "dev", color: "text-white" },
        { text: " = ", color: "text-white" },
        { text: "WelcomeToMyPortfolio", color: "text-yellow-300" },
        { text: "()", color: "text-white" },
        { text: "\ndev", color: "text-white" },
        { text: ".greet(", color: "text-cyan-300" },
        { text: `"${visitorName}"`, color: "text-green-400" },
        { text: ")", color: "text-white" },
    ];
}

interface TypewriterCodeProps {
    onProgress: (progress: number) => void;
    onComplete: () => void;
    visitorName: string;
}

function TypewriterCode({ onProgress, onComplete, visitorName }: TypewriterCodeProps) {
    const [codeLines, setCodeLines] = useState(() => generateCodeLines(visitorName));
    const [displayedCode, setDisplayedCode] = useState<{ text: string; color: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [totalChars, setTotalChars] = useState(() => codeLines.reduce((acc, line) => acc + line.text.length, 0));
    const [typedChars, setTypedChars] = useState(0);

    // Regenerate code lines when visitor name changes
    useEffect(() => {
        const newCodeLines = generateCodeLines(visitorName);
        setCodeLines(newCodeLines);
        setTotalChars(newCodeLines.reduce((acc, line) => acc + line.text.length, 0));
    }, [visitorName]);

    useEffect(() => {
        if (currentIndex >= codeLines.length) {
            if (!isComplete) {
                setIsComplete(true);
                setTimeout(onComplete, 150);
            }
            return;
        }

        const currentLine = codeLines[currentIndex];

        if (charIndex < currentLine.text.length) {
            const char = currentLine.text[charIndex];
            const isNewline = char === '\n';
            const isPunctuation = ['{', '}', '(', ')', '[', ']', ':', ',', '.'].includes(char);
            const speed = isNewline ? 12 : isPunctuation ? 5 : 4;

            const timeout = setTimeout(() => {
                setDisplayedCode(prev => {
                    const newCode = [...prev];
                    if (newCode.length <= currentIndex) {
                        newCode.push({ text: currentLine.text[charIndex], color: currentLine.color });
                    } else {
                        newCode[currentIndex] = {
                            text: newCode[currentIndex].text + currentLine.text[charIndex],
                            color: currentLine.color
                        };
                    }
                    return newCode;
                });
                setCharIndex(charIndex + 1);
                setTypedChars(prev => {
                    const newTyped = prev + 1;
                    onProgress(newTyped / totalChars);
                    return newTyped;
                });
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            setCurrentIndex(currentIndex + 1);
            setCharIndex(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, charIndex, isComplete, totalChars]);

    return (
        <div className="font-mono text-[11px] sm:text-xs leading-relaxed whitespace-pre">
            {displayedCode.map((segment, idx) => (
                <motion.span
                    key={idx}
                    className={segment.color}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                >
                    {segment.text}
                </motion.span>
            ))}
            <motion.span
                className="inline-block w-1.5 h-3.5 bg-green-400 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
}

// Get visitor name from URL parameter (?visitor=Name)
function getVisitorName(): string {
    if (typeof window === 'undefined') return 'You';

    const urlParams = new URLSearchParams(window.location.search);
    const visitorParam = urlParams.get('visitor');

    if (visitorParam && visitorParam.trim()) {
        return visitorParam.trim();
    }

    return 'You';
}

export default function QuickSummary({ onScrollDown }: QuickSummaryProps) {
    const { t } = useTranslation();
    const controls = useAnimationControls();
    const [codeProgress, setCodeProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [visitorName, setVisitorName] = useState('You');

    // Get visitor name on client side
    useEffect(() => {
        setVisitorName(getVisitorName());
    }, []);

    const FEATURED_IDS = ["heatmap", "page-city-matrix"];
    const featuredProjects = useMemo(
        () =>
            FEATURED_IDS
                .map((id) => projectsData.find((p) => p.id === id))
                .filter((p): p is NonNullable<typeof p> => Boolean(p)),
        // FEATURED_IDS is a stable in-module constant
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        document.body.style.overflow = "hidden";
        // Dispatch event to hide header
        window.dispatchEvent(new CustomEvent("quickSummaryVisible", { detail: true }));
        return () => {
            document.body.style.overflow = "";
            window.dispatchEvent(new CustomEvent("quickSummaryVisible", { detail: false }));
        };
    }, []);

    const handleCodeProgress = useCallback((progress: number) => {
        setCodeProgress(progress);
    }, []);

    const handleCodeComplete = useCallback(() => {
        setIsComplete(true);
    }, []);

    const handleScrollDown = async () => {
        await controls.start({
            y: "-100%",
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        });
        onScrollDown();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] overflow-hidden h-screen"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
        >
            <motion.div className="h-full flex" animate={controls}>
                {/* LEFT SIDE - Summary Content (full width on mobile) */}
                <motion.div
                    className="w-full md:w-1/2 h-full flex flex-col bg-white dark:bg-gray-950 relative overflow-hidden"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                >
                    <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto">
                        {/* Header */}
                        <motion.header
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: codeProgress > 0.01 ? 1 : 0, y: codeProgress > 0.01 ? 0 : 20 }}
                            transition={{ duration: 0.15 }}
                        >
                            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                                SEBASTIÁN
                                <br />
                                <span className="text-emerald-600 dark:text-emerald-400">MACHADO CANO</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
                                {t("quick_summary_role")}
                            </p>
                        </motion.header>

                        {/* Summary */}
                        <motion.section
                            className="mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: codeProgress > 0.05 ? 1 : 0, y: codeProgress > 0.05 ? 0 : 15 }}
                            transition={{ duration: 0.15 }}
                        >
                            <h2 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-emerald-500"></span>
                                {t("quick_summary_about_title")}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                                {t("quick_summary_about")}
                            </p>
                        </motion.section>

                        {/* Experience */}
                        <motion.section
                            className="mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: codeProgress > 0.1 ? 1 : 0, y: codeProgress > 0.1 ? 0 : 15 }}
                            transition={{ duration: 0.15 }}
                        >
                            <h2 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-emerald-500"></span>
                                <FaBriefcase className="w-2.5 h-2.5" />
                                {t("quick_summary_experience_title") || "Experience"}
                            </h2>
                            <div className="space-y-1.5">
                                <div className="border-l-2 border-emerald-500/60 pl-2.5">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-[11px]">Lead Developer</h3>
                                    <p className="text-gray-500 text-[9px]">Geeks5g • 2026</p>
                                </div>
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-2.5">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-[11px]">Full Stack Developer</h3>
                                    <p className="text-gray-500 text-[9px]">Geeks5g • 2025</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Skills */}
                        <motion.section
                            className="mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: codeProgress > 0.15 ? 1 : 0, y: codeProgress > 0.15 ? 0 : 15 }}
                            transition={{ duration: 0.15 }}
                        >
                            <h2 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-emerald-500"></span>
                                {t("quick_summary_skills_title")}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3">
                                {coreSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        title={skill.name}
                                        aria-label={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: codeProgress > 0.15 + (index * 0.008) ? 1 : 0,
                                            scale: codeProgress > 0.15 + (index * 0.008) ? 1 : 0.8
                                        }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <skill.icon
                                            style={{ color: skill.color }}
                                            className="w-5 h-5"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Projects */}
                        <motion.section
                            className="mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: codeProgress > 0.25 ? 1 : 0, y: codeProgress > 0.25 ? 0 : 15 }}
                            transition={{ duration: 0.15 }}
                        >
                            <h2 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5 flex items-center gap-2">
                                <span className="w-4 h-0.5 bg-violet-500"></span>
                                {t("quick_summary_projects_title")}
                            </h2>
                            <div className="grid grid-cols-2 gap-1.5">
                                {featuredProjects.map((project, index) => {
                                    const thumbnail = project.images?.[0];
                                    return (
                                        <motion.div
                                            key={project.id}
                                            className="flex items-center gap-2 p-1.5 rounded border border-gray-200 dark:border-white/10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: codeProgress > 0.28 + (index * 0.02) ? 1 : 0 }}
                                            transition={{ duration: 0.12 }}
                                        >
                                            {thumbnail && (
                                                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-white/5">
                                                    <FadeInImage
                                                        src={thumbnail.src}
                                                        alt={thumbnail.alt}
                                                        fill
                                                        sizes="80px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white text-[10px] line-clamp-1">
                                                    {"translationTitleKey" in project ? t(project.translationTitleKey) : project.title}
                                                </h3>
                                                <p className="text-[8px] text-gray-500 line-clamp-2 mt-0.5">
                                                    {t(project.translationKey)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>

                        {/* Education & Languages */}
                        <motion.div
                            className="grid grid-cols-2 gap-3"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: codeProgress > 0.35 ? 1 : 0, y: codeProgress > 0.35 ? 0 : 15 }}
                            transition={{ duration: 0.15 }}
                        >
                            <section>
                                <h2 className="text-[9px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <FaGraduationCap className="w-2.5 h-2.5 text-emerald-500" />
                                    {t("quick_summary_education_title") || "Education"}
                                </h2>
                                <div className="space-y-1.5">
                                    <div>
                                        <p className="text-[9px] text-gray-700 dark:text-gray-300 leading-tight">
                                            {t("quick_summary_education_degree")}
                                        </p>
                                        <p className="text-[8px] text-gray-500">
                                            {t("quick_summary_education_status")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-700 dark:text-gray-300 leading-tight">
                                            {t("quick_summary_education_degree_2")}
                                        </p>
                                        <p className="text-[8px] text-gray-500">
                                            {t("quick_summary_education_status_2")}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-[9px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                                    {t("quick_summary_languages_title") || "Languages"}
                                </h2>
                                <div className="text-[9px] text-gray-700 dark:text-gray-300 space-y-0.5">
                                    <p>Spanish <span className="text-gray-500">Native</span></p>
                                    <p>English <span className="text-gray-500">B2</span></p>
                                </div>
                            </section>
                        </motion.div>

                        {/* Scroll Button */}
                        <motion.div
                            className="mt-auto pt-4 flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: codeProgress > 0.45 ? 1 : 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <p className="text-[10px] text-gray-500 mb-1.5">
                                Ver más
                            </p>
                            <motion.button
                                onClick={handleScrollDown}
                                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ y: [0, 3, 0] }}
                                transition={{ y: { repeat: Infinity, duration: 1.5 } }}
                            >
                                <FaChevronDown className="w-3 h-3" />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* RIGHT SIDE - Code Editor (hidden on mobile) */}
                <motion.div
                    className="hidden md:flex md:w-1/2 h-full bg-[#0d1117] flex-col"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                >
                    {/* Window title bar */}
                    <div className="flex items-center justify-center px-4 py-2 bg-[#161b22] border-b border-gray-800 flex-shrink-0">
                        <span className="text-gray-500 text-[11px] font-medium">portfolio.py</span>
                    </div>

                    {/* Code content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="flex gap-4">
                            {/* Line numbers */}
                            <div className="text-gray-600 text-[10px] font-mono select-none text-right leading-relaxed min-w-[20px]">
                                {Array.from({ length: 22 }, (_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            {/* Code */}
                            <div className="flex-1">
                                <TypewriterCode
                                    onProgress={handleCodeProgress}
                                    onComplete={handleCodeComplete}
                                    visitorName={visitorName}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Terminal output */}
                    <motion.div
                        className="border-t border-gray-800 bg-[#0d1117] px-4 py-3 flex-shrink-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isComplete ? 1 : 0 }}
                        transition={{ delay: 0.05, duration: 0.15 }}
                    >
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                            <span className="text-green-500">➜</span>
                            <span className="text-emerald-400">~</span>
                            <span className="text-gray-300">python portfolio.py</span>
                        </div>
                        <motion.div
                            className="text-[11px] font-mono mt-1.5 flex items-center gap-2"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 5 }}
                            transition={{ delay: 0.1, duration: 0.15 }}
                        >
                            <span className="text-yellow-400">→</span>
                            <span className="text-green-400">Welcome, {visitorName}!</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
