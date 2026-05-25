"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ProjectLinkButtonProps, ProjectButtonColor } from "@/lib/interfaces/project";

const primaryColorClasses: Record<ProjectButtonColor, string> = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-blue-500/25",
    green: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-green-500 shadow-green-500/25",
    purple: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-purple-500 shadow-purple-500/25",
    orange: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-orange-500 shadow-orange-500/25"
};

const secondaryColorClasses: Record<ProjectButtonColor, string> = {
    blue: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700/50 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 text-blue-700 dark:text-blue-300",
    green: "bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200 dark:border-green-700/50 hover:from-green-100 hover:to-emerald-200 dark:hover:from-green-800/30 dark:hover:to-emerald-700/30 text-green-700 dark:text-green-300",
    purple: "bg-gradient-to-r from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 border-purple-200 dark:border-purple-700/50 hover:from-purple-100 hover:to-violet-200 dark:hover:from-purple-800/30 dark:hover:to-violet-700/30 text-purple-700 dark:text-purple-300",
    orange: "bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 border-orange-200 dark:border-orange-700/50 hover:from-orange-100 hover:to-red-200 dark:hover:from-orange-800/30 dark:hover:to-red-700/30 text-orange-700 dark:text-orange-300"
};

export function ProjectLinkButton({
    href,
    icon,
    label,
    variant = "secondary",
    color = "blue"
}: ProjectLinkButtonProps) {
    const colorClasses = variant === "primary" ? primaryColorClasses[color] : secondaryColorClasses[color];

    return (
        <Link
            href={href}
            target="_blank"
            className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 group transform hover:scale-105 hover:shadow-md ${colorClasses}`}
        >
            <div className="flex items-center gap-2">
                <div className="p-0.5">
                    {icon}
                </div>
                <span className="font-semibold text-xs">
                    {label}
                </span>
            </div>
            <FaExternalLinkAlt className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
        </Link>
    );
}
