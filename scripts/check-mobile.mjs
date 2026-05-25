import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();

try {
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(3500);

    await page.evaluate(() => document.querySelector("#skills")?.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "C:/tmp/mobile-skills.png", fullPage: false });
    console.log("ok skills");

    // Inspect skills section dimensions
    const info = await page.evaluate(() => {
        const sec = document.querySelector("#skills");
        if (!sec) return { found: false };
        const r = sec.getBoundingClientRect();
        const cs = window.getComputedStyle(sec);
        return {
            found: true,
            left: r.left,
            right: r.right,
            width: r.width,
            top: r.top,
            paddingLeft: cs.paddingLeft,
            paddingRight: cs.paddingRight,
            marginLeft: cs.marginLeft,
            marginRight: cs.marginRight,
            textAlign: cs.textAlign,
        };
    });
    console.log("skills section:", JSON.stringify(info, null, 2));
} catch (e) {
    console.error("error:", e.message);
} finally {
    await browser.close();
}
