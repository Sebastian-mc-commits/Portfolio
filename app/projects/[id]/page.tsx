"use client";

import { useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import projectsData from "@/lib/data/projects";
import { resolveProjectColors } from "@/lib/utils";
import { ProjectHero, ProjectContent } from "@/components/ui/Project";
import { useTransitionOrigin } from "@/context/transition-context";

export default function ProjectDetailPage() {
    const params = useParams();
    const { t } = useTranslation();
    const { setActiveProjectBg } = useTransitionOrigin();
    const projectId = params?.id as string | undefined;

    const project = useMemo(() => {
        if (!projectId) return null;
        return projectsData.find((p) => p.id === projectId) || null;
    }, [projectId]);

    const bgKey = useMemo(() => {
        if (!project) return undefined;
        if ("bgColor" in project && project.bgColor) return project.bgColor;
        if ("backgroundColor" in project && project.backgroundColor) return project.backgroundColor;
        if ("bg" in project && project.bg) return project.bg;
        return undefined;
    }, [project]);

    const resolvedColors = useMemo(() => resolveProjectColors(bgKey), [bgKey]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [projectId]);

    useEffect(() => {
        if (resolvedColors) {
            setActiveProjectBg({
                bgColor: resolvedColors.bgColor,
                bgClass: resolvedColors.bgClass,
                textColor: resolvedColors.textColor,
                textClass: resolvedColors.textClass,
            });
        }
        return () => setActiveProjectBg(null);
    }, [resolvedColors, setActiveProjectBg]);

    if (!projectId || !project) {
        return (
            <main className="min-h-screen bg-surface pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
                    <p className="text-gray-400 mb-8">The project you are looking for does not exist.</p>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        <span>Back to Projects</span>
                    </Link>
                </div>
            </main>
        );
    }

    const title = "title" in project ? project.title : t(project.translationTitleKey);

    return (
        <main className="min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <ProjectHero project={project} title={title} resolvedColors={resolvedColors} />
                <ProjectContent project={project} resolvedColors={resolvedColors} />
            </motion.div>
        </main>
    );
}
