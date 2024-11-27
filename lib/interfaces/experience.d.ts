import { FunctionComponentElement } from "react";
import { IconBaseProps } from "react-icons";
import { I_Image } from "./ui";

type BaseExperienceType = {
    id: string;
    title: string;
    descriptionTranslationKey: string;
    icon: FunctionComponentElement<IconBaseProps>,
    date: string;
    fileUrl?: string;
}

type IExperience =
    | (BaseExperienceType & {
        type: "degrees_images",
        images: I_Image[]
    })
    | (BaseExperienceType & {
        type: "professional_degree" | "degree" | "course" | "work"
    })

export default IExperience;