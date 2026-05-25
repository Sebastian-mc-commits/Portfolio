"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import projectsData from "@/lib/data/projects";
import { DatabaseSchemaViewer } from "@/components/ui/DatabaseSchema";
import { DatabaseSchema } from "@/lib/interfaces/database-schema";

function getContrastColor(hexColor: string | undefined): string {
    if (!hexColor) return "#ffffff";
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default function DatabaseSchemaPage() {
    const params = useParams();
    const { t } = useTranslation();
    const projectId = params?.id as string | undefined;
    const [schema, setSchema] = useState<DatabaseSchema | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const project = useMemo(() => {
        if (!projectId) return null;
        return projectsData.find((p) => p.id === projectId) || null;
    }, [projectId]);

    const projectColor = useMemo(() => {
        if (!project) return "#1e3a5f";
        if ("bgColor" in project && project.bgColor) return project.bgColor;
        if ("backgroundColor" in project && project.backgroundColor) return project.backgroundColor;
        if ("bg" in project && project.bg) return project.bg;
        return "#1e3a5f";
    }, [project]);

    const textColor = useMemo(() => getContrastColor(projectColor), [projectColor]);
    const isLightBg = textColor === "#000000";

    useEffect(() => {
        async function loadSchema() {
            if (!project?.databaseSchemaFile) {
                setError("No database schema available for this project");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/data/database-schemas/${project.databaseSchemaFile}`);
                if (!response.ok) throw new Error("Failed to load schema");
                const data = await response.json();
                setSchema(data);
            } catch {
                setError("Failed to load database schema");
            } finally {
                setLoading(false);
            }
        }

        loadSchema();
    }, [project]);

    const title = project ? ("title" in project ? project.title : t(project.translationTitleKey)) : "";

    if (!project) {
        return (
            <main
                className="h-screen overflow-hidden flex items-center justify-center fixed inset-0 z-[100]"
                style={{ backgroundColor: isLightBg ? "#fafafa" : "#0a0a0a" }}
            >
                <div className="text-center">
                    <h1
                        className="text-3xl font-bold mb-4"
                        style={{ color: isLightBg ? "#18181b" : "#fafafa" }}
                    >
                        Project Not Found
                    </h1>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                            backgroundColor: projectColor,
                            color: textColor,
                        }}
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        <span>Back to Projects</span>
                    </Link>
                </div>
            </main>
        );
    }

    const bgColor = isLightBg ? "#f5f5f4" : "#2a2a2e";
    const cardBg = isLightBg ? "#ffffff" : "#3a3a3f";
    const borderColor = isLightBg ? "#e7e5e4" : "#4a4a50";
    const mutedText = isLightBg ? "#78716c" : "#b0b0b5";

    return (
        <main
            className="h-screen w-screen fixed inset-0 flex flex-col overflow-hidden z-[100]"
            style={{ backgroundColor: bgColor }}
        >
            {/* Header Bar */}
            <motion.header
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{
                    backgroundColor: cardBg,
                    borderBottom: `1px solid ${borderColor}`,
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href={`/projects/${projectId}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                    style={{
                        backgroundColor: projectColor,
                        color: textColor,
                    }}
                >
                    <FaArrowLeft className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium">Back</span>
                </Link>

                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: projectColor }}
                    />
                    <h1
                        className="text-lg font-semibold tracking-tight"
                        style={{
                            color: isLightBg ? "#18181b" : "#fafafa",
                            fontFamily: "ui-monospace, monospace",
                        }}
                    >
                        {title}
                    </h1>
                    <span
                        className="text-xs"
                        style={{
                            color: projectColor,
                            fontFamily: "ui-monospace, monospace",
                        }}
                    >
                        System Flow
                    </span>
                </div>

                <div
                    className="text-xs"
                    style={{ color: mutedText, fontFamily: "ui-monospace, monospace" }}
                >
                    {schema ? `${schema.flow.steps.length} steps` : ""}
                </div>
            </motion.header>

            {/* Schema Viewer */}
            <div className="flex-1 w-full">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                                style={{ borderColor: projectColor, borderTopColor: "transparent" }}
                            />
                            <span
                                className="text-sm"
                                style={{ color: mutedText, fontFamily: "ui-monospace, monospace" }}
                            >
                                Loading schema...
                            </span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                            style={{ backgroundColor: `${projectColor}15` }}
                        >
                            <span className="text-2xl">!</span>
                        </div>
                        <p
                            className="mb-4 text-sm"
                            style={{ color: mutedText }}
                        >
                            {error}
                        </p>
                        <Link
                            href={`/projects/${projectId}`}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                            style={{
                                backgroundColor: projectColor,
                                color: textColor,
                            }}
                        >
                            Back to Project
                        </Link>
                    </div>
                )}

                {schema && !loading && !error && (
                    <DatabaseSchemaViewer schema={schema} projectColor={projectColor} />
                )}
            </div>
        </main>
    );
}
