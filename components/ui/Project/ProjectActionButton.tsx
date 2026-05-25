"use client";

import { ProjectActionButtonProps, ProjectButtonColor } from "@/lib/interfaces/project";

const colorClasses: Record<ProjectButtonColor, string> = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-blue-500/25",
    green: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-green-500 shadow-green-500/25",
    purple: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-purple-500 shadow-purple-500/25",
    orange: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-orange-500 shadow-orange-500/25"
};

export function ProjectActionButton({
    onClick,
    icon,
    label,
    color = "purple"
}: ProjectActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border transition-all duration-300 group w-full transform hover:scale-105 hover:shadow-md ${colorClasses[color]}`}
        >
            <div className="p-0.5">
                {icon}
            </div>
            <span className="font-semibold text-xs">
                {label}
            </span>
        </button>
    );
}
