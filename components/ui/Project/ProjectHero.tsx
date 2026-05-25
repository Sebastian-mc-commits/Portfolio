"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithubSquare, FaPlay, FaArrowLeft, FaProjectDiagram } from "react-icons/fa";
import { SiSimilarweb } from "react-icons/si";
import { useMemo } from "react";
import { UserProjectsStates } from "@/lib/interfaces/IUser";
import { ProjectHeroProps } from "@/lib/interfaces/project";
import { generateAccentColors } from "@/lib/utils";
import { ImageGallery } from "./ImageGallery";

const tagText: Record<UserProjectsStates, string> = {
    forAClient: "t_c_tag",
    forWork: "t_w_tag",
    ownProject: "t_p_tag",
};

const titleVariants: Variants = {
    initial: { y: 0, opacity: 0, scale: 0.9 },
    animate: {
        y: -10,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 25, delay: 0.2 },
    },
};

const contentVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.35 } },
};

const galleryVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.5 },
    },
};

const tagVariants: Variants = {
    initial: { opacity: 0, scale: 0.8, rotate: 0 },
    animate: {
        opacity: 1,
        scale: 1,
        rotate: 12,
        transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.4 },
    },
};

export function ProjectHero({ project, title, resolvedColors }: ProjectHeroProps) {
    const { t } = useTranslation();
    const { images, type, link, videoLink, linkType, translationKey, metadata, databaseSchemaFile, id } = project;

    const textStyle = !resolvedColors.textClass && resolvedColors.textColor
        ? { color: resolvedColors.textColor }
        : undefined;

    const tagBgStyle = resolvedColors.textColor
        ? { backgroundColor: resolvedColors.textColor, color: resolvedColors.bgColor || "#000" }
        : undefined;

    const accentColors = useMemo(
        () => generateAccentColors(resolvedColors.bgColor),
        [resolvedColors.bgColor]
    );

    return (
        <section className="relative flex flex-col items-center pt-28 pb-12 px-6">
            <motion.div
                className="fixed top-6 left-6 z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <Link
                    href="/#projects"
                    className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all group ${resolvedColors.textClass || ""} bg-white/10 hover:bg-white/20 border border-white/10`}
                    style={textStyle}
                >
                    <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </Link>
            </motion.div>

            <div className="relative inline-block max-w-5xl">
                <motion.h1
                    className={`text-5xl sm:text-6xl lg:text-7xl font-black text-center tracking-tight ${resolvedColors.textClass || ""}`}
                    style={textStyle}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                >
                    {title}
                </motion.h1>

                <motion.span
                    className={`absolute -right-4 -top-2 sm:-right-8 sm:-top-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-none text-xs sm:text-sm font-bold shadow-lg ${!tagBgStyle ? "bg-white/90 text-gray-900" : ""}`}
                    style={tagBgStyle}
                    variants={tagVariants}
                    initial="initial"
                    animate="animate"
                >
                    {t(tagText[type])}
                </motion.span>
            </div>

            <motion.p
                className={`mt-6 text-base sm:text-lg text-center max-w-2xl leading-relaxed opacity-90 ${resolvedColors.textClass || ""}`}
                style={textStyle}
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                {metadata?.description || t(translationKey)}
            </motion.p>

            <motion.div
                className="mt-6 flex flex-wrap justify-center gap-3"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                {link && linkType !== "none" && (
                    <Link
                        href={link}
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110"
                        style={textStyle}
                        title={linkType === "website" ? t("b_view_website") : t("b_view_repository")}
                    >
                        {linkType === "website" ? <SiSimilarweb className="w-5 h-5" /> : <FaGithubSquare className="w-6 h-6" />}
                    </Link>
                )}
                {videoLink && (
                    <Link
                        href={videoLink}
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110"
                        style={textStyle}
                        title={t("b_watch_demo")}
                    >
                        <FaPlay className="w-4 h-4" />
                    </Link>
                )}
                {databaseSchemaFile && (
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Link
                            href={`/projects/${id}/database`}
                            target="_blank"
                            className="flex items-center justify-center w-12 h-12 rounded-full transition-transform hover:scale-110 shadow-lg"
                            style={{
                                backgroundColor: accentColors.primary,
                                color: resolvedColors.bgColor || resolvedColors.textColor,
                                boxShadow: `0 4px 16px ${accentColors.primary}55`,
                            }}
                            title={t("b_view_database")}
                            aria-label={t("b_view_database")}
                        >
                            <FaProjectDiagram className="w-5 h-5" />
                        </Link>
                    </motion.div>
                )}
            </motion.div>

            {images.length > 0 && (
                <motion.div
                    className="mt-10 w-full max-w-4xl"
                    variants={galleryVariants}
                    initial="initial"
                    animate="animate"
                >
                    <ImageGallery images={images} title={title} compact />
                </motion.div>
            )}
        </section>
    );
}
