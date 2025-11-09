import { type IUserProjects } from "../interfaces/IUser";
import bitac from "../utils/imageExportation/bitac.images";
import sintravidImages from "../utils/imageExportation/sintravid.images";
import heatmapImages from "../utils/imageExportation/heatmap.images";
import trafficbotImages from "../utils/imageExportation/trafficbot.images";
import Astronaut from "@/public/images/projects/astronaut.jpg";

const projectsData: IUserProjects[] = [
    {
        id: "heatmap",
        backgroundColor: "#ff6b35",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 8,
            description: "Advanced SEO ranking analysis system similar to LocalDominator for geographic business positioning",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_heatmap",
            challengesKeys: [
                "challenge_heatmap_1",
                "challenge_heatmap_2",
                "challenge_heatmap_3",
                "challenge_heatmap_4"
            ],
            keyFeaturesKeys: [
                "feature_heatmap_1",
                "feature_heatmap_2",
                "feature_heatmap_3",
                "feature_heatmap_4",
                "feature_heatmap_5"
            ]
        },
        images: heatmapImages,
        tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "REDIS", "CELERY", "NUMPY", "PANDAS", "SQLALCHEMY"],
        translationKey: "u_p_d_heatmap",
        translationTitleKey: "u_p_t_heatmap",
        type: "forWork",
        link: "https://github.com/Sebastian-mc-commits/heatmap-seo.git",
        linkType: "github"
    },
    {
        id: "trafficbot",
        backgroundColor: "#4ecdc4",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 7,
            description: "Intelligent Google Maps position improvement bot with strategic automation and goal planning",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_trafficbot",
            challengesKeys: [
                "challenge_trafficbot_1",
                "challenge_trafficbot_2",
                "challenge_trafficbot_3",
                "challenge_trafficbot_4"
            ],
            keyFeaturesKeys: [
                "feature_trafficbot_1",
                "feature_trafficbot_2",
                "feature_trafficbot_3",
                "feature_trafficbot_4",
                "feature_trafficbot_5"
            ]
        },
        images: trafficbotImages,
        tags: ["PYTHON", "SELENIUM GRID", "SELENIUM HUB", "PLAYWRIGHT", "POSTGRESQL", "REDIS", "CELERY"],
        translationKey: "u_p_d_trafficbot",
        translationTitleKey: "u_p_t_trafficbot",
        type: "forWork",
        link: "https://github.com/Sebastian-mc-commits/traffic-bot.git",
        linkType: "github"
    },
    {
        id: "contracts-api",
        backgroundColor: "#667eea",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 5,
            description: "Enterprise-level contract signing API with AWS S3 integration and legal compliance",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_contracts",
            challengesKeys: [
                "challenge_contracts_1",
                "challenge_contracts_2",
                "challenge_contracts_3",
                "challenge_contracts_4"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1", // Using existing keys as placeholders
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: [{
            src: Astronaut,
            alt: "Contracts API Interface"
        }],
        tags: ["PYTHON", "FASTAPI", "AWS S3", "POSTGRESQL", "JWT", "LEGAL TECH"],
        translationKey: "u_p_d_contracts_api",
        translationTitleKey: "u_p_t_contracts_api",
        type: "forWork",
        link: "https://github.com/Sebastian-mc-commits/contracts-api.git",
        linkType: "github"
    },
    {
        id: "wordpress-ai",
        backgroundColor: "#a8e6cf",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 9,
            description: "AI-powered WordPress plugin for automated content and design generation (In Development)",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_wordpress_ai",
            challengesKeys: [
                "challenge_wordpress_ai_1",
                "challenge_wordpress_ai_2",
                "challenge_wordpress_ai_3",
                "challenge_wordpress_ai_4"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1", // Using existing keys as placeholders
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: [{
            src: Astronaut,
            alt: "WordPress AI Builder Interface"
        }],
        tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "PHP", "WORDPRESS", "AI", "MACHINE LEARNING"],
        translationKey: "u_p_d_wordpress_ai",
        translationTitleKey: "u_p_t_wordpress_ai",
        type: "forWork",
        link: "https://github.com/Sebastian-mc-commits/wordpress-ai-builder.git",
        linkType: "github"
    },
    {
        id: "1",
        backgroundColor: "#1a1a2e",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 9,
            description: "A comprehensive desktop automation system that revolutionizes manual workflow processes",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_bitac",
            challengesKeys: [
                "challenge_bitac_1",
                "challenge_bitac_2",
                "challenge_bitac_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: bitac,
        tags: ["RUST", "TAURI JS", "HTML", "CSS", "VANILLA JS", "Desktop App"],
        title: "App Bitac",
        translationKey: "u_p_d_bitac",
        type: "forAClient",
        link: "https://github.com/Sebastian-mc-commits/bitac.git",
        linkType: "github",
        videoLink: "https://www.youtube.com/watch?v=kl39KHS07Xc"
    },
    {
        id: "Sintravid",
        backgroundColor: "#16a085",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 7,
            description: "Healthcare company WordPress enhancement with custom plugins and role management",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_sintravid",
            challengesKeys: [
                "challenge_bitac_1", // Using existing keys as placeholders
                "challenge_bitac_2",
                "challenge_bitac_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
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
        backgroundColor: "#2c3e50",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 7,
            description: "Intelligent chatbot with natural language processing and MySQL integration",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_chatbot",
            challengesKeys: [
                "challenge_bitac_1", // Using existing keys as placeholders
                "challenge_bitac_2",
                "challenge_bitac_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: [{
            alt: "Chatbot Interface",
            src: Astronaut
        }],
        tags: ["PHP", "HTML", "JAVASCRIPT", "CSS", "MYSQL", "NLP"],
        translationKey: "u_p_d_chatbot",
        translationTitleKey: "u_p_t_chatbot",
        type: "forWork",
        link: "https://github.com/Sebastian-mc-commits/customChatbot.git",
        linkType: "github"
    },
    {
        id: "4",
        backgroundColor: "#e74c3c",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 6,
            description: "Full-stack ecommerce platform with advanced admin functionality",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_ecommerce",
            challengesKeys: [
                "challenge_bitac_1", // Using existing keys as placeholders
                "challenge_bitac_2",
                "challenge_bitac_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: [{
            src: Astronaut,
            alt: "Ecommerce Dashboard"
        }],
        tags: ["NEXT JS", "REACT JS", "EXPRESS JS", "CSS", "NODE JS", "MONGODB"],
        translationKey: "u_p_d_e_commerce",
        translationTitleKey: "u_p_t_e_commerce",
        type: "ownProject",
        link: "https://github.com/Sebastian-mc-commits/ecommerce.git",
        linkType: "github"
    },
    {
        id: "5",
        backgroundColor: "#f39c12",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 3,
            description: "Cross-platform Bitcoin monitoring application with detailed analytics",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_bitcoin",
            challengesKeys: [
                "challenge_bitac_1", // Using existing keys as placeholders
                "challenge_bitac_2",
                "challenge_bitac_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: [{
            src: Astronaut,
            alt: "Bitcoin Monitor Dashboard"
        }],
        tags: ["NODE JS", "ELECTRON", "ANGULAR", "CSS", "TYPESCRIPT", "CRYPTOCURRENCY API"],
        translationKey: "u_p_d_bitcoin",
        translationTitleKey: "u_p_t_bitcoin",
        type: "ownProject",
        link: "https://github.com/Sebastian-mc-commits/ElectronApp.git",
        linkType: "github"
    },
    {
        id: "6",
        backgroundColor: "#9b59b6",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 3,
            description: "Comprehensive class management platform for educational institutions",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_classroom",
            challengesKeys: [
                "challenge_bitac_1", // Using existing keys as placeholders
                "challenge_bitac_2",
                "challenge_bitac_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: [{
            src: Astronaut,
            alt: "Classroom Management Interface"
        }],
        tags: ["PHP", "JAVASCRIPT", "CSS", "MYSQL", "HTML", "EDUCATION TECH"],
        translationKey: "u_p_d_classroom",
        translationTitleKey: "u_p_t_classroom",
        type: "ownProject",
        link: "https://github.com/Sebastian-mc-commits/tutoriaEstudiantil.git",
        linkType: "github"
    }
]

export default projectsData;