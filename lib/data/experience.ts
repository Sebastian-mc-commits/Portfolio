import { createElement } from "react";
import IExperience from "../interfaces/experience";
import { LuGraduationCap } from "react-icons/lu";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import experienceImages, { computerScienceDegree, copniaImage } from "../utils/imageExportation/experience.images";

const experienceData: IExperience[] = [
    {
        id: "1",
        title: "Lead Developer",
        titleTranslationKey: "e_t_lead_developer",
        date: "02/2026 -",
        descriptionTranslationKey: "e_u_d_lead_developer",
        icon: createElement(CgWorkAlt),
        type: "work",
        company: "Geeks5g"
    },
    {
        id: "2",
        title: "Full Stack Developer",
        titleTranslationKey: "e_t_fullstack_developer",
        date: "01/2025 - 02/2026",
        descriptionTranslationKey: "e_u_d_fullstack_developer",
        icon: createElement(CgWorkAlt),
        type: "work",
        company: "Geeks5g"
    },
    {
        id: "3",
        title: "Auxiliar de Fábrica de Software",
        titleTranslationKey: "e_t_software_auxiliar",
        date: "05/2024 - 01/2025",
        descriptionTranslationKey: "e_u_d_software_auxiliar",
        icon: createElement(CgWorkAlt),
        type: "work",
        company: "SENA"
    },
    {
        id: "4",
        title: "Prácticas - Técnico de Software",
        titleTranslationKey: "e_t_software_intern",
        date: "06/2023 - 01/2024",
        descriptionTranslationKey: "e_u_d_software_intern",
        icon: createElement(HiOutlineAcademicCap),
        type: "work",
        company: "SENA"
    },
    {
        id: "5",
        title: "Desktop Developer",
        titleTranslationKey: "e_t_desktop_developer",
        date: "01/2023 - 02/2023",
        descriptionTranslationKey: "e_u_d_desktop_developer",
        icon: createElement(CgWorkAlt),
        type: "work",
        company: "Bitac (Freelance)"
    },
    {
        id: "6",
        date: "2022 - 2024",
        title: "Análisis y Desarrollo de Sistemas de Información",
        titleTranslationKey: "e_t_degree",
        descriptionTranslationKey: "e_u_d_system_degree",
        icon: createElement(LuGraduationCap),
        type: "degrees_images",
        images: [computerScienceDegree, copniaImage]
    },
    {
        id: "7",
        title: "Courses",
        titleTranslationKey: "e_t_courses",
        date: "",
        descriptionTranslationKey: "e_u_d_courses",
        icon: createElement(FaReact),
        type: "degrees_images",
        images: experienceImages
    }
]

export default experienceData;
