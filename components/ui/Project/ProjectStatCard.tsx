"use client";

import { ProjectStatCardProps } from "@/lib/interfaces/project";

export function ProjectStatCard({
    icon,
    title,
    value,
    className = ""
}: ProjectStatCardProps) {
    return (
        <div className={`group relative overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 border border-gray-200 dark:border-neutral-700 p-3 hover:shadow-md transition-all duration-300 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400">
                        {icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {title}
                    </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {value}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
    );
}
