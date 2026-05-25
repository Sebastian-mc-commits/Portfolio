"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaTimes, FaImages, FaPlay, FaCogs } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { SiSimilarweb } from "react-icons/si";
import { IUserProjects, UserProjectsStates } from "@/lib/interfaces/IUser";
import { Label } from "@/components/ui";
import { ProjectStatCard } from "./ProjectStatCard";
import { ProjectSection } from "./ProjectSection";
import { ProjectLinkButton } from "./ProjectLinkButton";
import { ProjectActionButton } from "./ProjectActionButton";

interface ProjectGalleryProps {
    project: IUserProjects;
    title: string;
    onClose: () => void;
    onDevelopmentProcessOpen: (project: IUserProjects) => void;
}

const tagText: Record<UserProjectsStates, string> = {
    forAClient: "t_c_tag",
    forWork: "t_w_tag",
    ownProject: "t_p_tag",
};

const TAG_COLORS = [
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
    "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50",
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50",
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50",
    "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/50"
];

const BENTO_PATTERNS = [
    "bento-item-large",
    "bento-item-medium",
    "bento-item-small",
    "bento-item-wide",
    "bento-item-tall",
    "bento-item-small",
];

function getBentoClass(index: number): string {
    return BENTO_PATTERNS[index % BENTO_PATTERNS.length] || "bento-item-small";
}

export function ProjectGallery({
    project,
    title,
    onClose,
    onDevelopmentProcessOpen
}: ProjectGalleryProps) {
    const { t } = useTranslation();
    const { images, id, type, tags, link, videoLink, linkType, metadata } = project;

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-full h-full max-w-7xl max-h-[95vh] flex rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-gray-200/20 dark:border-neutral-700/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <motion.div
                    className="w-80 flex-shrink-0 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-700 overflow-y-auto"
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="p-6 space-y-6 h-full">
                        <div className="border-b border-gray-200 dark:border-neutral-700 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                                {title}
                            </h2>
                            {metadata?.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {metadata.description}
                                </p>
                            )}
                        </div>

                        <ProjectSection title={t("t_project_links")} className="space-y-2">
                            <div className="grid grid-cols-1 gap-2">
                                <ProjectActionButton
                                    onClick={() => onDevelopmentProcessOpen(project)}
                                    icon={<FaCogs className="w-4 h-4" />}
                                    label={t("b_development_process")}
                                    color="purple"
                                />
                                {link && linkType !== "none" && (
                                    <ProjectLinkButton
                                        href={link}
                                        icon={linkType === "website" ? <SiSimilarweb className="w-4 h-4" /> : <FaGithubSquare className="w-4 h-4" />}
                                        label={linkType === "website" ? t("b_view_website") : t("b_view_repository")}
                                        color={linkType === "website" ? "green" : "blue"}
                                    />
                                )}
                                {videoLink && (
                                    <ProjectLinkButton
                                        href={videoLink}
                                        icon={<FaPlay className="w-4 h-4" />}
                                        label={t("b_watch_demo")}
                                        color="orange"
                                    />
                                )}
                            </div>
                        </ProjectSection>

                        <ProjectSection title={t("t_project_stats")} className="bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
                            <div className="grid grid-cols-1 gap-2">
                                <ProjectStatCard
                                    icon={<FaImages className="w-4 h-4" />}
                                    title={t("t_images_count")}
                                    value={images.length}
                                />
                            </div>
                        </ProjectSection>

                        <ProjectSection title={t("t_project_type")}>
                            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                                <Label type={type} text={t(tagText[type])} />
                            </div>
                        </ProjectSection>

                        <ProjectSection title={t("t_project_technologies")}>
                            <div className="flex flex-wrap gap-1.5">
                                {tags.map((tag, index) => (
                                    <span
                                        key={`${id}-sidebar-tag-${tag}`}
                                        className={`text-xs px-2.5 py-1.5 rounded-md border font-semibold transition-all duration-200 hover:scale-105 ${TAG_COLORS[index % TAG_COLORS.length]}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </ProjectSection>
                    </div>
                </motion.div>

                <div className="flex-1 flex flex-col relative bg-white dark:bg-neutral-900">
                    <div className="absolute right-4 top-4 z-50">
                        <motion.button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white text-white dark:text-gray-900 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaTimes className="w-4 h-4" />
                        </motion.button>
                    </div>

                    <div className="p-6 pb-4 border-b border-gray-200 dark:border-neutral-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {t("t_project_gallery")}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            {images.length} {t("t_images_count").toLowerCase()}
                        </p>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto">
                        <motion.div
                            className="bento-grid gap-4"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: { transition: { staggerChildren: 0.03 } },
                                hidden: { transition: { staggerChildren: 0.01, staggerDirection: -1 } }
                            }}
                        >
                            {images.map((img, i) => (
                                <motion.div
                                    key={`${id}-gallery-${i}`}
                                    className={`group rounded-lg overflow-hidden bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 ${getBentoClass(i)}`}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.95, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            transition: { type: "spring", stiffness: 400, damping: 25 }
                                        }
                                    }}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                >
                                    <div className="relative h-full overflow-hidden">
                                        <Image
                                            src={img.src}
                                            alt={img.alt ?? `${title}-${i}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            placeholder="blur"
                                            priority={i < 6}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
                                            {i + 1}
                                        </div>
                                        {img.alt && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-white text-xs leading-relaxed line-clamp-2">
                                                    {img.alt}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
