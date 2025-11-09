import { createElement } from "react";
import IExperience from "../interfaces/experience";
import { LuGraduationCap } from "react-icons/lu";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import experienceImages, { computerScienceDegree, copniaImage } from "../utils/imageExportation/experience.images";

const experienceData: IExperience[] = [
    {
        id: "1",
        date: "2022 - 2024",
        title: "Analisis y Desarrollo de Sistemas de Información",
        descriptionTranslationKey: "e_u_d_system_degree",
        icon: createElement(LuGraduationCap),
        type: "degrees_images",
        images: [computerScienceDegree, copniaImage]
    },
    {
        id: "2",
        title: "Software Developer",
        date: "01/11/2025 - present",
        descriptionTranslationKey: "e_u_d_geeks5g",
        icon: createElement(CgWorkAlt),
        type: "work",
        fileUrl: ""
    },
    {
        id: "3",
        title: "Técnico de Fábrica de Software",
        date: "15/07/2023 - 15/01/2024 & 01/05/2024 - 01/01/2025",
        descriptionTranslationKey: "e_u_d_software_technician",
        icon: createElement(CgWorkAlt),
        type: "work",
        fileUrl: ""
    },
    {
        id: "4",
        title: "Desktop Developer",
        date: "01/01/2023 - 01/02/2023",
        descriptionTranslationKey: "e_u_d_desktop_developer",
        icon: createElement(CgWorkAlt),
        type: "work",
    },
    {
        id: "5",
        title: "Courses",
        date: "",
        descriptionTranslationKey: "e_u_d_courses",
        icon: createElement(FaReact),
        type: "degrees_images",
        images: experienceImages
    }
]

export default experienceData;