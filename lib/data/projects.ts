import { type IUserProjects } from "../interfaces/IUser";
import bitac from "../utils/imageExportation/bitac.images";
import Astronaut from "@/public/images/projects/astronaut.jpg";

const projectsData: IUserProjects[] = [
    {
        id: "1",
        images: bitac,
        tags: ["RUST", "TAURI JS", "HTML", "CSS", "VANILLA JS"],
        title: "App Bitac",
        translationKey: "u_p_d_bitac",
        type: "ownProject",
        githubLink: "https://github.com/Sebastian-mc-commits/bitac.git"
    },
    {
        id: "2",
        images: [{
            alt: "Preview",
            src: Astronaut
        }],
        tags: ["PHP", "HTML", "JAVASCRIPT", "CSS", "MYSQL"],
        translationKey: "u_p_d_chatbot",
        translationTitleKey: "u_p_t_chatbot",
        type: "ownProject",
        githubLink: "https://github.com/Sebastian-mc-commits/customChatbot.git"
    },
    {
        id: "4",
        images: [{
            src: Astronaut,
            alt: "Preview"
        }],
        tags: ["NEXT JS", "REACT JS", "EXPRESS JS", "CSS", "NODE JS"],
        translationKey: "u_p_d_e_commerce",
        translationTitleKey: "u_p_t_e-commerce",
        type: "ownProject",
        githubLink: "https://github.com/Sebastian-mc-commits/ecommerce.git"
    },
    {
        id: "5",
        images: [{
            src: Astronaut,
            alt: "Preview"
        }],
        tags: ["NODE JS", "ELECTRON", "ANGULAR", "CSS", "NODE JS"],
        translationKey: "u_p_d_bitcoin",
        translationTitleKey: "u_p_t_bitcoin",
        type: "ownProject",
        githubLink: "https://github.com/Sebastian-mc-commits/ElectronApp.git"
    },
    {
        id: "6",
        images: [{
            src: Astronaut,
            alt: "Preview"
        }],
        tags: ["PHP", "JAVASCRIPT", "CSS", "MYSQL", "HTML"],
        translationKey: "u_p_d_classroom",
        translationTitleKey: "u_p_t_classroom",
        type: "ownProject",
        githubLink: "https://github.com/Sebastian-mc-commits/tutoriaEstudiantil.git"
    }
]

export default projectsData;