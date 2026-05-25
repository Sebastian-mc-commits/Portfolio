"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaTimes, FaImages, FaPlay } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { SiSimilarweb } from "react-icons/si";
import { IUserProjects, UserProjectsStates } from "@/lib/interfaces/IUser";
import { ResolvedProjectColors } from "@/lib/interfaces/project";
import { Label } from "@/components/ui";

interface ProjectExpandedProps {
    project: IUserProjects;
    title: string;
    autoplayIndex: number;
    resolvedColors: ResolvedProjectColors;
    onClose: () => void;
    onOpenGallery: () => void;
}

const tagText: Record<UserProjectsStates, string> = {
    forAClient: "t_c_tag",
    forWork: "t_w_tag",
    ownProject: "t_p_tag",
};

export function ProjectExpanded({
    project,
    title,
    autoplayIndex,
    resolvedColors,
    onClose,
    onOpenGallery
}: ProjectExpandedProps) {
    const { t } = useTranslation();
    const { images, id, type, translationKey, link, videoLink, linkType, metadata } = project;

    const titleVariants = useMemo<Variants>(() => ({
        center: {
            y: -100,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.5 }
        },
        up: {
            y: 0,
            opacity: 0.9,
            scale: 0.9,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
    }), []);

    const imageItem = useMemo(() => ({
        hidden: {
            y: 30,
            opacity: 0,
            scale: 0.9,
            rotateX: -15
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 0.8,
            scale: 1,
            rotateX: 0,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 30
            }
        }),
    }), []);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/70 via-black/60 to-black/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                layout
                initial={{
                    width: "85%",
                    height: "60%",
                    scale: 0.9,
                    opacity: 0,
                    rotateX: -15
                }}
                animate={{
                    width: "95%",
                    height: "90%",
                    scale: 1,
                    opacity: 1,
                    rotateX: 0
                }}
                exit={{
                    opacity: 0,
                    scale: 0.95,
                    rotateX: 10,
                    transition: { duration: 0.25 }
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                    opacity: { duration: 0.3 }
                }}
                className={
                    "relative rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col " +
                    "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md " +
                    (resolvedColors.bgClass || "")
                }
                style={!resolvedColors.bgClass && resolvedColors.bgColor ? { backgroundColor: resolvedColors.bgColor } : undefined}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-50 rounded-full bg-white/90 dark:bg-neutral-800/90 p-3 shadow-lg hover:scale-110 hover:rotate-90 transition-all duration-200 backdrop-blur-sm border border-gray-200 dark:border-neutral-700"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

                <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                    <motion.h2
                        className={
                            "text-4xl sm:text-6xl font-black text-center tracking-tight " +
                            (resolvedColors.textClass ? resolvedColors.textClass : "text-gray-900 dark:text-gray-100")
                        }
                        style={!resolvedColors.textClass && resolvedColors.textColor ? { color: resolvedColors.textColor } : undefined}
                        variants={titleVariants}
                        animate="center"
                    >
                        {title}
                    </motion.h2>

                    <motion.div
                        className="mt-6 px-6 max-w-[85ch] text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <p className={
                            "text-base sm:text-lg leading-relaxed font-medium " +
                            (resolvedColors.textClass ? resolvedColors.textClass : "text-gray-600 dark:text-gray-300")
                        }
                            style={!resolvedColors.textClass && resolvedColors.textColor ? { color: resolvedColors.textColor } : undefined}>
                            {metadata?.description || t(translationKey)}
                        </p>
                    </motion.div>


                    <div className="absolute bottom-8 left-8 right-8">
                        <motion.div
                            className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl p-4 relative border border-white/20 dark:border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                        >
                            <div className="w-full overflow-hidden rounded-lg">
                                <motion.ul
                                    className="flex gap-6 w-max"
                                    initial={false}
                                    animate={{
                                        x: `calc(-${autoplayIndex * (100 / Math.max(1, images.length))}%)`
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 35
                                    }}
                                    style={{ willChange: "transform" }}
                                >
                                    {images.map((img, i) => (
                                        <motion.li
                                            key={`${id}-carousel-${i}`}
                                            custom={i}
                                            variants={imageItem}
                                            initial="hidden"
                                            animate="visible"
                                            className="flex-none w-[20rem] sm:w-[24rem] rounded-lg overflow-hidden shadow-xl bg-white dark:bg-neutral-800 border border-white/20 dark:border-neutral-700"
                                            whileHover={{
                                                scale: 1.05,
                                                y: -5,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt ?? `${title}-${i}`}
                                                width={960}
                                                height={540}
                                                className="object-cover w-full h-52 sm:h-60"
                                                placeholder="blur"
                                                priority={i < 3}
                                            />
                                            {img.alt && (
                                                <div className="p-3">
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                        {img.alt}
                                                    </p>
                                                </div>
                                            )}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            {link && linkType !== "none" && (
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href={link}
                                        target="_blank"
                                        className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex items-center gap-2 hover:bg-black dark:hover:bg-white transition-colors duration-200 font-medium text-sm"
                                    >
                                        {linkType === "website" ? <SiSimilarweb className="w-4 h-4" /> : <FaGithubSquare className="w-4 h-4" />}
                                    </Link>
                                </motion.div>
                            )}
                            {videoLink && (
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href={videoLink}
                                        target="_blank"
                                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors duration-200 font-medium text-sm"
                                    >
                                        <FaPlay className="w-3 h-3" />
                                        <span>{t("b_watch_demo")}</span>
                                    </Link>
                                </motion.div>
                            )}
                            <Label type={type} text={t(tagText[type])} />
                        </div>

                        <motion.button
                            onClick={onOpenGallery}
                            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors duration-200 font-medium text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaImages className="w-4 h-4" />
                            <span>{t("t_project_gallery")} ({images.length})</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
