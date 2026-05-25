"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TechStackTag } from "@/components/ui/TechStackTag";
import { ListIcon } from "@/components/ui/ListIcon";
import { ProjectContentProps } from "@/lib/interfaces/project";
import { generateAccentColors } from "@/lib/utils";

export function ProjectContent({ project, resolvedColors }: ProjectContentProps) {
    const { t } = useTranslation();
    const { tags, metadata, id } = project;

    const accentColors = useMemo(() => {
        return generateAccentColors(resolvedColors.bgColor);
    }, [resolvedColors.bgColor]);

    const textStyle = !resolvedColors.textClass && resolvedColors.textColor
        ? { color: resolvedColors.textColor }
        : undefined;

    const mutedTextStyle = !resolvedColors.textClass && resolvedColors.textColor
        ? { color: resolvedColors.textColor, opacity: 0.7 }
        : undefined;

    const headingClass = resolvedColors.textClass || "";
    const mutedClass = resolvedColors.textClass ? `${resolvedColors.textClass} opacity-70` : "";

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <h2 className={`text-xl font-semibold mb-6 text-center ${headingClass || "text-gray-100"}`} style={textStyle}>Tech Stack</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {tags.map((tag) => (
                        <TechStackTag key={`${id}-${tag}`} tag={tag} projectId={id} />
                    ))}
                </div>
            </motion.section>

            {(metadata?.developmentProcessKey || metadata?.developmentProcess) && (
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <h2 className={`text-xl font-semibold mb-4 ${headingClass || "text-gray-100"}`} style={textStyle}>
                        {t("side_panel_development_process")}
                    </h2>
                    <div
                        className="p-6 border-l-4"
                        style={{
                            backgroundColor: `${accentColors.processIcon}15`,
                            borderLeftColor: accentColors.processIcon
                        }}
                    >
                        <p className={`leading-relaxed ${mutedClass || "text-gray-300"}`} style={mutedTextStyle}>
                            {metadata.developmentProcessKey
                                ? t(metadata.developmentProcessKey)
                                : metadata.developmentProcess}
                        </p>
                    </div>
                </motion.section>
            )}

            {(metadata?.challengesKeys?.length || metadata?.challenges?.length) && (
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <h2 className={`text-xl font-semibold mb-4 ${headingClass || "text-gray-100"}`} style={textStyle}>
                        {t("side_panel_challenges")}
                    </h2>
                    <div
                        className="border-l-4 overflow-hidden"
                        style={{
                            borderLeftColor: accentColors.challengeIcon
                        }}
                    >
                        {(metadata?.challengesKeys || metadata?.challenges)?.map((item, i, arr) => (
                            <div
                                key={i}
                                className="p-4 flex items-start gap-3"
                                style={{
                                    backgroundColor: `${accentColors.challengeIcon}${i % 2 === 0 ? '12' : '08'}`,
                                    borderBottom: i < arr.length - 1 ? `1px solid ${accentColors.challengeIcon}20` : 'none'
                                }}
                            >
                                <ListIcon variant="challenge" size={20} bgColor={resolvedColors.bgColor} />
                                <p className={`text-sm leading-relaxed ${mutedClass || "text-gray-300"}`} style={mutedTextStyle}>
                                    {metadata?.challengesKeys ? t(item) : item}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {(metadata?.keyFeaturesKeys?.length || metadata?.keyFeatures?.length) && (
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    <h2 className={`text-xl font-semibold mb-4 ${headingClass || "text-gray-100"}`} style={textStyle}>
                        {t("side_panel_key_features")}
                    </h2>
                    <div
                        className="border-l-4 overflow-hidden"
                        style={{
                            borderLeftColor: accentColors.featureIcon
                        }}
                    >
                        {(metadata?.keyFeaturesKeys || metadata?.keyFeatures)?.map((item, i, arr) => (
                            <div
                                key={i}
                                className="p-4 flex items-start gap-3"
                                style={{
                                    backgroundColor: `${accentColors.featureIcon}${i % 2 === 0 ? '12' : '08'}`,
                                    borderBottom: i < arr.length - 1 ? `1px solid ${accentColors.featureIcon}20` : 'none'
                                }}
                            >
                                <ListIcon variant="feature" size={20} bgColor={resolvedColors.bgColor} />
                                <p className={`text-sm leading-relaxed ${mutedClass || "text-gray-300"}`} style={mutedTextStyle}>
                                    {metadata?.keyFeaturesKeys ? t(item) : item}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}
        </div>
    );
}
