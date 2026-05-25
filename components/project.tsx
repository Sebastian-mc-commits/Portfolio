"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { ProjectCard } from "./ui/Project";

type ProjectProps = IUserProjects;

export default function Project({
    images,
    tags,
    id,
    translationKey,
    type,
    link,
    videoLink,
    linkType,
    ...filteredProps
}: ProjectProps) {
    const { t } = useTranslation();

    const title = useMemo(() =>
        "title" in filteredProps ? filteredProps.title : t(filteredProps.translationTitleKey),
        [filteredProps, t]
    );

    const project: IUserProjects = useMemo(() => ({
        images,
        tags,
        id,
        translationKey,
        type,
        link,
        videoLink,
        linkType,
        ...filteredProps
    }), [images, tags, id, translationKey, type, link, videoLink, linkType, filteredProps]);

    return (
        <div className="mb-6 last:mb-0">
            <ProjectCard
                project={project}
                title={title}
            />
        </div>
    );
}
