"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaImages, FaEye } from "react-icons/fa";
import { UserProjectsStates } from "@/lib/interfaces/IUser";
import { ProjectCardProps } from "@/lib/interfaces/project";
import { useTransitionOrigin } from "@/context/transition-context";
import { resolveProjectColors } from "@/lib/utils";
import { MouseEvent } from "react";

const tagText: Record<UserProjectsStates, string> = {
    forAClient: "t_c_tag",
    forWork: "t_w_tag",
    ownProject: "t_p_tag",
};

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

const getBgColorFromClass = (bgClass?: string): string => {
    if (!bgClass) return "#0a0a0a";
    return bgClassToColor[bgClass] || "#0a0a0a";
};

export function ProjectCard({
    project,
    title,
}: ProjectCardProps) {
    const { t } = useTranslation();
    const { setTransitionOrigin } = useTransitionOrigin();
    const { images, tags, id, type, translationKey, metadata } = project;
    const coreStack = tags.slice(0, 4);

    const bgKey = project.bgColor || project.backgroundColor || project.bg;
    const resolvedColors = resolveProjectColors(bgKey);
    const bgColorValue = resolvedColors.bgColor || getBgColorFromClass(resolvedColors.bgClass);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        setTransitionOrigin({
            x: e.clientX,
            y: e.clientY,
            bgColor: bgColorValue,
        });
    };

    return (
        <Link href={`/projects/${id}`} onClick={handleClick}>
            <motion.div
                className="group relative rounded-card overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{
                    y: -4,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                layout
            >
            <div className="relative p-card">
                <div className="flex gap-4">
                    <div className="flex-none w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        {images[0] ? (
                            <Image
                                src={images[0].src}
                                alt={images[0].alt ?? title}
                                width={128}
                                height={128}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                placeholder="blur"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <FaImages className="w-5 h-5 text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors duration-200 truncate">
                                {title}
                            </h3>
                            <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                                {t(tagText[type])}
                            </span>
                        </div>
                        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {metadata?.description || t(translationKey)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex gap-1.5 flex-wrap">
                    {coreStack.map((tag) => (
                        <span
                            key={`${id}-tag-${tag}`}
                            className="font-mono text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center">
                        <FaEye className="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>
            </motion.div>
        </Link>
    );
}
