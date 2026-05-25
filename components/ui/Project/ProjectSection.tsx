"use client";

import { ProjectSectionProps } from "@/lib/interfaces/project";

export function ProjectSection({
    title,
    children,
    className = ""
}: ProjectSectionProps) {
    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base tracking-tight border-b border-gray-200 dark:border-neutral-700 pb-1.5">
                {title}
            </h3>
            {children}
        </div>
    );
}
