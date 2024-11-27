import { StaticImageData } from "next/image";
import { I_Image } from "./ui";

export interface IUser {
    name: string;
    email: string;
    age: number;
}

type UserProjectsStates = "ownProject" | "forWork";

type BaseUserUserProject = {
    id: string;
    tags: string[];
    images: I_Image[];
    translationKey: string;
    type: UserProjectsStates;
    githubLink?: string;
    videoLink?: string;
};

export type IUserProjects =
    | (BaseUserUserProject & { title: string })
    | (BaseUserUserProject & { translationTitleKey: string });
