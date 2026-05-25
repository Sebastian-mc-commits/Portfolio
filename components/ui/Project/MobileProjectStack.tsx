"use client";

import { useContext, createContext, useEffect, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { getTechIconConfig } from "@/components/ui/TechStackTag";
import { FadeInImage } from "@/components/ui/FadeInImage";

const MountedContext = createContext(false);

const bgClassToColor: Record<string, string> = {
    "bg-black": "#000000",
    "bg-white": "#ffffff",
    "bg-red-600": "#dc2626",
    "bg-blue-600": "#2563eb",
    "bg-green-600": "#16a34a",
    "bg-gray-800": "#1f2937",
    "bg-slate-700": "#334155",
    "bg-yellow-400": "#facc15",
    "bg-purple-600": "#9333ea",
    "bg-pink-600": "#db2777",
    "bg-indigo-600": "#4f46e5",
};

function getProjectBgColor(project: IUserProjects): string {
    const bgKey = project.bgColor || project.backgroundColor || project.bg;
    const resolvedColors = resolveProjectColors(bgKey);
    return (
        resolvedColors.bgColor ||
        bgClassToColor[resolvedColors.bgClass || ""] ||
        "#0a0a0a"
    );
}

interface MobileProjectStackProps {
    projects: IUserProjects[];
    t: (key: string) => string;
}

interface MobileCardProps {
    project: IUserProjects;
    index: number;
    t: (key: string) => string;
}

function MobileCard({ project, index, t }: MobileCardProps) {
    const { setTransitionOrigin } = useTransitionOrigin();
    const isMounted = useContext(MountedContext);
    const { images, tags, id } = project;
    const title =
        "title" in project ? project.title : (isMounted ? t(project.translationTitleKey) : project.translationTitleKey);
    const coreStack = tags.slice(0, 3);
    const bgColorValue = getProjectBgColor(project);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        setTransitionOrigin({
            x: e.clientX,
            y: e.clientY,
            bgColor: bgColorValue,
        });
    };

    return (
        <motion.article
            className="relative w-full rounded-2xl overflow-hidden shadow-xl"
            style={{ backgroundColor: bgColorValue }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <div className="relative aspect-[4/3]">
                {images[0] ? (
                    <FadeInImage
                        src={images[0].src}
                        alt={images[0].alt ?? title}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        sizes="100vw"
                    />
                ) : (
                    <div className="w-full h-full" style={{ backgroundColor: bgColorValue }} />
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 to-transparent" />
                <h3
                    className="absolute left-4 bottom-3 right-4 text-lg font-bold text-white tracking-tight leading-tight"
                    suppressHydrationWarning
                >
                    {title}
                </h3>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-900">
                <div className="flex gap-3">
                    {coreStack.map((tag) => {
                        const cfg = getTechIconConfig(tag);
                        return (
                            <Icon
                                key={`${id}-${tag}`}
                                icon={cfg.icon}
                                style={{ color: cfg.color }}
                                className="w-6 h-6"
                                aria-label={tag}
                            />
                        );
                    })}
                </div>

                <Link
                    href={`/projects/${id}`}
                    onClick={handleClick}
                    aria-label={isMounted ? t("b_view_details") : "View Project"}
                    className="flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-transform hover:scale-105"
                    style={{ backgroundColor: bgColorValue, color: "#fff" }}
                >
                    <FaArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </motion.article>
    );
}

export function MobileProjectStack({ projects, t }: MobileProjectStackProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <MountedContext.Provider value={isMounted}>
            <div className="flex flex-col gap-5 pb-12">
                {projects.map((project, index) => (
                    <MobileCard key={project.id} project={project} index={index} t={t} />
                ))}
            </div>
        </MountedContext.Provider>
    );
}
