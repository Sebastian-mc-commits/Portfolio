import { I_Image } from "@/lib/interfaces/ui"
import Statistics from "@/public/images/courses/ESTADISTICA_page-0001.jpg"
import ProjectsManagement from "@/public/images/courses/GESTION DE PROYECTOS_page-0001.jpg"
import ISO19011 from "@/public/images/courses/ISO 19011_page-0001.jpg"
import ISO27001 from "@/public/images/courses/ISO 27001_page-0001.jpg"
import ISO29119 from "@/public/images/courses/ISO 29119_page-0001.jpg"
import ISO31000 from "@/public/images/courses/ISO 31000_page-0001.jpg"
import ISO9001 from "@/public/images/courses/ISO 9001_page-0001.jpg"
import ComputerScienceDegree from "@/public/images/courses/SENA TITULO_page-0001.jpg"
import Copnia from "@/public/images/courses/COPNIA.png"
import Testing from "@/public/images/courses/TESTING_page-0001.jpg"

const experienceImages: I_Image[] = [
    {
        src: ISO19011,
        alt: "ISO 19011 course"
    },
    {
        src: ISO27001,
        alt: "ISO 27001 course"
    },
    {
        src: ISO29119,
        alt: "ISO 29119 course"
    },
    {
        src: ISO31000,
        alt: "ISO 31000 course"
    },
    {
        src: ISO9001,
        alt: "ISO 9001 course"
    },
    {
        src: Testing,
        alt: "Testing course"
    },
    {
        src: ComputerScienceDegree,
        alt: "Computer Science degree"
    },
    {
        src: Statistics,
        alt: "Statistics course"
    },
    {
        src: ProjectsManagement,
        alt: "Projects Management course"
    },
]

export const computerScienceDegree: I_Image = {
    alt: "Sena degree",
    src: ComputerScienceDegree
}

export const copniaImage: I_Image = {
    alt: "Professional Certification COPNIA",
    src: Copnia
}

export default experienceImages;