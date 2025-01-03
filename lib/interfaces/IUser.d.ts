import { StaticImageData } from "next/image";
import { I_Image } from "./ui";

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
};

export type IUserProjects =
    | (BaseUserUserProject & { title: string })
    | (BaseUserUserProject & { translationTitleKey: string });
