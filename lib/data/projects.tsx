import { type IUserProjects } from "../interfaces/IUser";
import bitac from "../utils/imageExportation/bitac.images";
import sintravidImages from "../utils/imageExportation/sintravid.images";
import heatmapImages from "../utils/imageExportation/heatmap.images";
import trafficbotImages from "../utils/imageExportation/trafficbot.images";
import bookkeepingImages from "../utils/imageExportation/bookkeeping.images";
import signaturesImages from "../utils/imageExportation/signatures.images";
import leadScrapperImages from "../utils/imageExportation/leadScrapper.images";
import storageImages from "../utils/imageExportation/storage.images";
import pageCityMatrixImages from "../utils/imageExportation/pageCityMatrix.images";
import blogGeneratorImages from "../utils/imageExportation/blogGenerator.images";
import contentCreatorImages from "../utils/imageExportation/contentCreator.images";
import cityMatrixDbImages from "../utils/imageExportation/cityMatrixDb.images";
import chatbotImages from "../utils/imageExportation/chatbot.images";
import ecommerceImages from "../utils/imageExportation/ecommerce.images";

const projectsData: IUserProjects[] = [
    {
        id: "bookkeeping",
        backgroundColor: "#1e3a5f",
        databaseSchemaFile: "bookkeeping.json",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 9,
            isFeatured: true,
            description: "Full-featured tax and accounting SaaS platform with AI-assisted features",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_bookkeeping",
            challengesKeys: [
                "challenge_bookkeeping_1",
                "challenge_bookkeeping_2",
                "challenge_bookkeeping_3",
                "challenge_bookkeeping_4"
            ],
            keyFeaturesKeys: [
                "feature_bookkeeping_1",
                "feature_bookkeeping_2",
                "feature_bookkeeping_3",
                "feature_bookkeeping_4",
                "feature_bookkeeping_5"
            ]
        },
        images: bookkeepingImages,
        tags: ["NESTJS", "NEXT.JS 15", "KAFKA", "POSTGRESQL", "REDIS", "AWS COGNITO", "RADIX UI", "TYPESCRIPT"],
        translationKey: "u_p_d_bookkeeping",
        translationTitleKey: "u_p_t_bookkeeping",
        type: "forWork",
        linkType: "none"
    },
    {
        id: "heatmap",
        backgroundColor: "#ff6b35",
        databaseSchemaFile: "heatmap.json",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 8,
            description: "Advanced SEO ranking analysis system for geographic business visibility and competitive positioning",
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
        linkType: "none"
    },
    {
        id: "signatures",
        backgroundColor: "#8b5cf6",
        databaseSchemaFile: "signatures.json",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 7,
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
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: signaturesImages,
        tags: ["PYTHON", "FASTAPI", "AWS S3", "POSTGRESQL", "JWT", "LEGAL TECH"],
        translationKey: "u_p_d_contracts_api",
        translationTitleKey: "u_p_t_contracts_api",
        type: "forWork",
        linkType: "none"
    },
    {
        id: "lead-scrapper",
        backgroundColor: "#10b981",
        databaseSchemaFile: "lead-scrapper.json",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 7,
            description: "A service to find leads in Google My Business across worldwide locations",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_heatmap",
            challengesKeys: [
                "challenge_heatmap_1",
                "challenge_heatmap_2",
                "challenge_heatmap_3"
            ],
            keyFeaturesKeys: [
                "feature_heatmap_1",
                "feature_heatmap_2",
                "feature_heatmap_3",
                "feature_heatmap_4"
            ]
        },
        images: leadScrapperImages,
        tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "SELENIUM", "REDIS", "CELERY", "PROXY ROTATION"],
        translationKey: "u_p_d_lead_scrapper",
        translationTitleKey: "u_p_t_lead_scrapper",
        type: "forWork",
        linkType: "none"
    },
    {
        id: "storage",
        backgroundColor: "#6366f1",
        databaseSchemaFile: "storage.json",
        metadata: {
            difficultyLevel: "medium",
            difficultyRankNumber: 6,
            description: "Backend database to store information with API key access, URL validation, and cron job validation",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_heatmap",
            challengesKeys: [
                "challenge_contracts_1",
                "challenge_contracts_2",
                "challenge_contracts_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: storageImages,
        tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "REDIS", "API KEYS", "CRON JOBS", "SQLALCHEMY"],
        translationKey: "u_p_d_storage",
        translationTitleKey: "u_p_t_storage",
        type: "forWork",
        linkType: "none"
    },
    {
        id: "page-city-matrix",
        backgroundColor: "#0ea5e9",
        databaseSchemaFile: "page-city-matrix.json",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 8,
            description: "WordPress plugin that creates pages for each selected city to improve SEO",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_wordpress_ai",
            challengesKeys: [
                "challenge_wordpress_ai_1",
                "challenge_wordpress_ai_2",
                "challenge_wordpress_ai_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: pageCityMatrixImages,
        tags: ["PHP", "WORDPRESS", "MYSQL", "PYTHON", "FASTAPI", "SEO", "REACT"],
        translationKey: "u_p_d_page_city_matrix",
        translationTitleKey: "u_p_t_page_city_matrix",
        type: "forWork",
        videoLink: "https://drive.google.com/file/d/1_SS2S1DN02pKKxHA4r-ZTnav8Df4FnAZ/view",
        link: "https://www.platformconnection.com/",
        linkType: "website"
    },
    {
        id: "blog-generator",
        backgroundColor: "#f59e0b",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 8,
            description: "AI-powered blog generator that creates unique content based on website data",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_wordpress_ai",
            challengesKeys: [
                "challenge_wordpress_ai_1",
                "challenge_wordpress_ai_2",
                "challenge_wordpress_ai_3"
            ],
            keyFeaturesKeys: [
                "feature_bitac_1",
                "feature_bitac_2",
                "feature_bitac_3",
                "feature_bitac_4"
            ]
        },
        images: blogGeneratorImages,
        tags: ["PHP", "WORDPRESS", "PYTHON", "FASTAPI", "AI", "OPENAI", "SEO"],
        translationKey: "u_p_d_blog_generator",
        translationTitleKey: "u_p_t_blog_generator",
        type: "forWork",
        videoLink: "https://drive.google.com/file/d/1Udsp2_KLnaUytd7J919Jp26ic22lfBch/view",
        linkType: "none"
    },
    {
        id: "content-creator",
        backgroundColor: "#7c3aed",
        databaseSchemaFile: "content-creator.json",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 9,
            description: "Backend for AI plugins using vector databases for unique content generation",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_wordpress_ai",
            challengesKeys: [
                "challenge_wordpress_ai_1",
                "challenge_wordpress_ai_2",
                "challenge_wordpress_ai_3",
                "challenge_wordpress_ai_4"
            ],
            keyFeaturesKeys: [
                "feature_bookkeeping_1",
                "feature_bookkeeping_2",
                "feature_bookkeeping_3",
                "feature_bookkeeping_4"
            ]
        },
        images: contentCreatorImages,
        tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "VECTOR DB", "OPENAI", "REDIS", "CELERY"],
        translationKey: "u_p_d_content_creator",
        translationTitleKey: "u_p_t_content_creator",
        type: "forWork",
        linkType: "none"
    },
    {
        id: "city-matrix-db",
        backgroundColor: "#14b8a6",
        databaseSchemaFile: "city-matrix-db.json",
        metadata: {
            difficultyLevel: "medium",
            difficultyRankNumber: 6,
            description: "Database service managing all US cities with unique images per city",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_heatmap",
            challengesKeys: [
                "challenge_heatmap_1",
                "challenge_heatmap_2"
            ],
            keyFeaturesKeys: [
                "feature_heatmap_1",
                "feature_heatmap_2",
                "feature_heatmap_3"
            ]
        },
        images: cityMatrixDbImages,
        tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "SQLALCHEMY", "REST API"],
        translationKey: "u_p_d_city_matrix_db",
        translationTitleKey: "u_p_t_city_matrix_db",
        type: "forWork",
        linkType: "none"
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
        linkType: "none"
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
    },
    {
        id: "Sintravid",
        backgroundColor: "#16a085",
        metadata: {
            difficultyLevel: "hard",
            difficultyRankNumber: 7,
            description: "Healthcare sector WordPress enhancement with custom plugins and role management",
            technologiesUsed: [],
            developmentProcessKey: "dev_process_sintravid",
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
        images: chatbotImages,
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
        images: ecommerceImages,
        tags: ["NEXT JS", "REACT JS", "EXPRESS JS", "CSS", "NODE JS", "MONGODB"],
        translationKey: "u_p_d_e_commerce",
        translationTitleKey: "u_p_t_e_commerce",
        type: "ownProject",
        link: "https://github.com/Sebastian-mc-commits/ecommerce.git",
        linkType: "github"
    },
]

export default projectsData;
