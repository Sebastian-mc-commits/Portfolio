import { chromium } from "playwright";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
try {
    await page.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2500);

    await page.evaluate(() => document.querySelector("#projects")?.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "C:/tmp/desktop-projects.png", fullPage: false });

    const widthInfo = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
    }));
    console.log("desktop width:", JSON.stringify(widthInfo));
    console.log("ok desktop projects");
} catch (e) {
    console.error("error:", e.message);
} finally {
    await browser.close();
}
