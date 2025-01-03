import { type IUserProjects } from "../interfaces/IUser";
import bitac from "../utils/imageExportation/bitac.images";
import Astronaut from "@/public/images/projects/astronaut.jpg";
import sintravidImages from "../utils/imageExportation/sintravid.images";

const projectsData: IUserProjects[] = [
    {
        id: "1",
        images: bitac,
        tags: ["RUST", "TAURI JS", "HTML", "CSS", "VANILLA JS"],
        title: "App Bitac",
        translationKey: "u_p_d_bitac",
        type: "forAClient",
        link: "https://github.com/Sebastian-mc-commits/bitac.git",
        linkType: "github"
    },
    {
        id: "Sintravid",
        images: sintravidImages,
        tags: ["PHP", "WORDPRESS", "HTML", "CSS", "MYSQL", "VANILLA JS", "WordPress Plugin Development"],
        title: "Sintravid",
        translationKey: "e_u_d_sintravid",
        type: "forWork",
        link: "https://sintravid.com",
        linkType: "website"
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
        type: "forWork",
        link: "https://github.com/Sebastian-mc-commits/customChatbot.git",
        linkType: "github"
    },
    {
        id: "4",
        images: [{
            src: Astronaut,
            alt: "Preview"
        }],
        tags: ["NEXT JS", "REACT JS", "EXPRESS JS", "CSS", "NODE JS"],
        translationKey: "u_p_d_e_commerce",
        translationTitleKey: "u_p_t_e_commerce",
        type: "ownProject",
        link: "https://github.com/Sebastian-mc-commits/ecommerce.git",
        linkType: "github"
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
        link: "https://github.com/Sebastian-mc-commits/ElectronApp.git",
        linkType: "github"
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
        link: "https://github.com/Sebastian-mc-commits/tutoriaEstudiantil.git",
        linkType: "github"
    }
]

export default projectsData;