#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_ROOT = join(ROOT, "public", "images", "projects");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("GEMINI_API_KEY env var required");
    process.exit(1);
}

const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const BASE_STYLE =
    "minimalist isometric 3D illustration, deep dark cinematic background (midnight navy or near-black charcoal), dramatic studio lighting with luminous glowing edge highlights, neon accent glow, soft volumetric light, modern tech aesthetic, no text, no letters, no labels, no logos, no people, no faces, no hands, abstract geometric shapes, moody atmospheric composition";

const PROJECTS = [
    {
        id: "bookkeeping",
        prompts: [
            `Isometric 3D illustration of a secure financial API gateway on a dark midnight backdrop: floating invoices and receipts streaming through a translucent portal with a softly glowing shield, glowing teal and amber accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of an accounting ledger processing engine on a deep charcoal scene: stacked balance sheets connected by luminous pipelines to coins and payment gears, glowing emerald and warm gold accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of a bank reconciliation result panel on a dark navy background: matched statement rows lining up with ledger entries, glowing checkmark badges hovering above a sleek dark dashboard, electric violet and cyan accents, ${BASE_STYLE}`,
        ],
    },
    {
        id: "signatures",
        prompts: [
            `Isometric 3D illustration of a contract document arriving for signing on a dark cinematic scene: a stylized parchment sheet with a luminous wax seal hovering inside a glowing secure cloud frame, neon violet and electric indigo, ${BASE_STYLE}`,
            `Isometric 3D illustration of a digital signing process on a midnight backdrop: an abstract pen tracing a glowing signature line on a floating document, luminous cryptographic key shapes orbiting around, neon purple and teal accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of secure document storage on a deep dark scene: stacked sealed envelope shapes inside a translucent cloud vault with glowing lock icons, electric violet and slate accents, ${BASE_STYLE}`,
        ],
    },
    {
        id: "lead-scrapper",
        prompts: [
            `Isometric 3D illustration of a dark global map with luminous neon location pins clustered over abstract continents, a glowing magnifying lens hovering above one cluster, neon emerald and cyan glow, ${BASE_STYLE}`,
            `Isometric 3D illustration of an abstract crawling pipeline on a midnight scene: rotating gears, network nodes and proxy server stacks linked by luminous lines over a dark map grid, neon green and teal accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of organized business lead records on a deep dark scene: a tidy grid of rounded data cards stacked inside a translucent glowing database cylinder, neon mint and aqua accents, ${BASE_STYLE}`,
        ],
    },
    {
        id: "storage",
        prompts: [
            `Isometric 3D illustration of an abstract API gateway on a midnight backdrop with a glowing key shape unlocking a translucent portal, luminous data parcels queued behind it, electric indigo and periwinkle glow, ${BASE_STYLE}`,
            `Isometric 3D illustration of a validation and routing engine on a deep dark scene: floating cube-shaped data packets passing through a series of luminous inspection rings, neon violet and electric blue accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of a sleek dark database cylinder layered with luminous horizontal data rings, glowing beams of light flowing into it from above, electric indigo and lavender, ${BASE_STYLE}`,
        ],
    },
    {
        id: "page-city-matrix",
        prompts: [
            `Isometric 3D illustration of an abstract dark city grid map with luminous neon location markers pulsing over rounded districts, electric cyan and azure glow, ${BASE_STYLE}`,
            `Isometric 3D illustration of a content generation pipeline on a midnight scene: a stream of blank rounded page tiles flowing through a glowing template builder, neon azure and teal accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of a luminous rising SEO chart over an abstract dark city skyline silhouette, ascending neon arrow line and floating rank-position dots, electric cyan and indigo, ${BASE_STYLE}`,
        ],
    },
    {
        id: "blog-generator",
        prompts: [
            `Isometric 3D illustration on a dark cinematic scene of luminous idea bulbs and abstract topic tokens drifting toward a glowing intake funnel, warm neon amber and gold accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of an abstract AI engine on a midnight backdrop: a translucent rounded brain shape with luminous circuit lines, surrounded by orbiting paragraph blocks, glowing orange and warm rose accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of finished article cards stacked neatly on a sleek dark platform, soft glowing light rays from above, warm honey and coral glow, ${BASE_STYLE}`,
        ],
    },
    {
        id: "content-creator",
        prompts: [
            `Isometric 3D illustration of knowledge source shapes (books, document tiles, data tiles) on a midnight scene streaming into a luminous glowing ingestion ring, neon purple and magenta accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of an abstract vector embedding cloud on a deep dark backdrop: a constellation of small luminous connected nodes forming a soft glowing sphere, neon violet and pink accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of unique generated content tiles emerging from a glowing portal on a dark scene, each tile slightly different in shape and color, neon lavender and rose accents, ${BASE_STYLE}`,
        ],
    },
    {
        id: "city-matrix-db",
        prompts: [
            `Isometric 3D illustration of geographic map tiles flowing into an organized stack on a midnight backdrop, each tile a different luminous accent hue, glowing teal and aquamarine, ${BASE_STYLE}`,
            `Isometric 3D illustration of a structured dark database cylinder layered with luminous glowing rings, neatly arranged rounded city tiles inside, electric teal and cyan accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of one luminous city tile paired with a unique abstract photograph frame floating beside it on a deep dark scene, neon aquamarine and seafoam accents, ${BASE_STYLE}`,
        ],
    },
    {
        id: "2",
        folder: "chatbot",
        prompts: [
            `Isometric 3D illustration of luminous chat bubble shapes flowing into a glowing intake panel on a midnight backdrop, abstract conversation icons floating around, electric blue and steel accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of an abstract natural language processing engine on a deep dark scene: a translucent rounded brain shape with luminous connected word-tile shapes orbiting around it, neon navy and electric purple accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of a sleek dark database cylinder beside a luminous reply chat bubble, glowing line connecting them, electric slate and blue accents, ${BASE_STYLE}`,
        ],
    },
    {
        id: "4",
        folder: "ecommerce",
        prompts: [
            `Isometric 3D illustration of a product catalog grid on a midnight backdrop: rounded product tiles arranged on dark shelves with luminous floating price tags, glowing coral and pink accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of an abstract shopping cart and a luminous payment terminal connected by a glowing flow line on a deep dark scene, with a credit-card-shaped tile, neon red and warm orange accents, ${BASE_STYLE}`,
            `Isometric 3D illustration of an order fulfillment scene on a midnight backdrop: neatly stacked package cubes on a luminous conveyor with a dark truck silhouette in the distance, glowing rose and warm amber accents, ${BASE_STYLE}`,
        ],
    },
];

async function generate(prompt) {
    const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    for (const p of parts) {
        if (p.inlineData?.data) {
            return Buffer.from(p.inlineData.data, "base64");
        }
    }
    throw new Error("no inlineData in response");
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function main() {
    const only = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;
    for (const project of PROJECTS) {
        if (only && !only.has(project.id)) continue;
        const folder = project.folder || project.id;
        const outDir = join(OUT_ROOT, folder);
        mkdirSync(outDir, { recursive: true });
        for (let i = 0; i < project.prompts.length; i++) {
            const num = i + 1;
            const file = join(outDir, `${folder}${num}.png`);
            if (existsSync(file) && !process.env.FORCE) {
                console.log(`skip  ${folder}/${folder}${num}.png (exists)`);
                continue;
            }
            const prompt = project.prompts[i];
            let attempt = 0;
            while (attempt < 3) {
                attempt++;
                try {
                    console.log(`gen   ${folder}/${folder}${num}.png  (attempt ${attempt})`);
                    const buf = await generate(prompt);
                    writeFileSync(file, buf);
                    console.log(`ok    ${folder}/${folder}${num}.png  ${buf.length} bytes`);
                    break;
                } catch (e) {
                    console.error(`fail  ${folder}/${folder}${num}.png  ${e.message}`);
                    if (attempt >= 3) throw e;
                    await sleep(2000 * attempt);
                }
            }
            await sleep(800);
        }
    }
    console.log("done");
}

main().catch((e) => {
    console.error("fatal:", e.message);
    process.exit(1);
});
