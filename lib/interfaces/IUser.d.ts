import { StaticImageData } from "next/image";
import { I_Image } from "./ui";
import { ReactNode } from "react";

export interface IUser {
    name: string;
    email: string;
    age: number;
}

export type UserProjectsStates = "ownProject" | "forWork" | "forAClient";

type BaseUserUserProject = {
    id: string;
    tags: string[];
    images: I_Image[];
    translationKey: string;
    type: UserProjectsStates;
    link: string;
    videoLink?: string;
    linkType: "github" | "website";
    backgroundColor?: string;
    metadata: {
        difficultyLevel: "easy" | "medium" | "hard";
        difficultyRankNumber: number;
        description: string;
        technologiesUsed?: ReactNode[];
        developmentProcessKey?: string;
        challengesKeys?: string[];
        keyFeaturesKeys?: string[];
        // Legacy fields for backward compatibility
        developmentProcess?: string;
        challenges?: string[];
        keyFeatures?: string[];
    }
};

export type IUserProjects =
    | (BaseUserUserProject & { title: string })
    | (BaseUserUserProject & { translationTitleKey: string });
