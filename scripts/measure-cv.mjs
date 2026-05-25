import { chromium } from "playwright";
import { pathToFileURL } from "node:url";

const ROOT = "C:/Users/SM934/Downloads/projects/Portfolio";
const TARGETS = [
    { html: ROOT + "/cv/index.html", label: "English" },
    { html: ROOT + "/cv/index-es.html", label: "Spanish" },
];

const browser = await chromium.launch();
for (const { html, label } of TARGETS) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(html).href, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    // Letter page is 8.5" x 11" = 612pt x 792pt -> set viewport to that in px
    await page.setViewportSize({ width: 816, height: 1056 });
    const measurements = await page.evaluate(() => {
        const pageHeightPx = 11 * 96;
        const bodyHeight = document.body.scrollHeight;
        return { pageHeightPx, bodyHeight };
    });
    console.log(`${label}: body ${measurements.bodyHeight}px vs page ${measurements.pageHeightPx}px (${(measurements.bodyHeight / measurements.pageHeightPx * 100).toFixed(1)}%)`);
    await page.close();
}
await browser.close();
