import { ReactNode } from "react";
import { IUserProjects } from "./IUser";
import { I_Image } from "./ui";

export interface ProjectStatCardProps {
    icon: ReactNode;
    title: string;
    value: string | number;
    className?: string;
}

export interface ProjectSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export type ProjectButtonColor = "blue" | "green" | "purple" | "orange";
export type ProjectButtonVariant = "primary" | "secondary";

export interface ProjectLinkButtonProps {
    href: string;
    icon: ReactNode;
    label: string;
    variant?: ProjectButtonVariant;
    color?: ProjectButtonColor;
}

export interface ProjectActionButtonProps {
    onClick: () => void;
    icon: ReactNode;
    label: string;
    variant?: ProjectButtonVariant;
    color?: ProjectButtonColor;
}

export interface DifficultyConfig {
    bg: string;
    text: string;
    label: string;
    level: number;
}

export interface ProjectCardProps {
    project: IUserProjects;
    title: string;
}

export interface FeaturedProjectCardProps {
    project: IUserProjects;
}

export interface ProjectContentProps {
    project: IUserProjects;
    resolvedColors: ResolvedProjectColors;
}

export interface ProjectHeroProps {
    project: IUserProjects;
    title: string;
    resolvedColors: ResolvedProjectColors;
}

export interface TechStackTagProps {
    tag: string;
    projectId: string;
}

export interface ProjectExpandedProps {
    project: IUserProjects;
    title: string;
    difficultyConfig: DifficultyConfig;
    autoplayIndex: number;
    resolvedColors: ResolvedProjectColors;
    onClose: () => void;
    onOpenGallery: () => void;
    onDevelopmentProcessOpen: (project: IUserProjects) => void;
}

export interface ProjectGalleryProps {
    project: IUserProjects;
    title: string;
    difficultyConfig: DifficultyConfig;
    onClose: () => void;
    onDevelopmentProcessOpen: (project: IUserProjects) => void;
}

export interface ResolvedProjectColors {
    bgClass?: string;
    bgColor?: string;
    textClass?: string;
    textColor?: string;
}

export type ProjectState = {
    isExpanded: boolean;
    autoplayIndex: number;
    isFullGalleryOpen: boolean;
};

export type ProjectAction =
    | { type: "OPEN_EXPANDED" }
    | { type: "CLOSE_EXPANDED" }
    | { type: "SET_AUTOPLAY_INDEX"; payload: number }
    | { type: "INCREMENT_AUTOPLAY" }
    | { type: "OPEN_GALLERY" }
    | { type: "CLOSE_GALLERY" }
    | { type: "RESET" };
