#!/usr/bin/env node
import { chromium } from "playwright";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const TARGETS = [
    {
        html: join(ROOT, "cv", "index.html"),
        pdf: join(ROOT, "public", "PDF", "en_CV_v2.pdf"),
        label: "English",
    },
    {
        html: join(ROOT, "cv", "index-es.html"),
        pdf: join(ROOT, "public", "PDF", "CV_v2.pdf"),
        label: "Spanish",
    },
];

async function render(browser, { html, pdf, label }) {
    const url = pathToFileURL(html).href;
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
        path: pdf,
        format: "Letter",
        printBackground: true,
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
        preferCSSPageSize: true,
    });
    await page.close();
    console.log(`ok    ${label}  ->  ${pdf}`);
}

const browser = await chromium.launch();
try {
    for (const target of TARGETS) {
        await render(browser, target);
    }
} finally {
    await browser.close();
}
