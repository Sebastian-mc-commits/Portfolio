import { chromium, devices } from "playwright";

const iPhone = devices["iPhone 13"];
const browser = await chromium.launch();
const context = await browser.newContext({ ...iPhone });
const page = await context.newPage();

page.on("pageerror", (err) => console.log("[browser error]", err.message));
page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warn") {
        console.log(`[browser ${msg.type()}]`, msg.text().slice(0, 200));
    }
});

try {
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(5000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "C:/tmp/mobile-home-fresh.png", fullPage: false });
    console.log("ok screenshot");

    const introInfo = await page.evaluate(() => {
        const img = document.querySelector("#home img");
        const h1 = document.querySelector("#home h1");
        return {
            imgClass: img?.className,
            imgComputed: img ? window.getComputedStyle(img).opacity : null,
            imgComplete: img?.complete,
            h1Text: h1?.textContent?.slice(0, 80),
        };
    });
    console.log("intro:", JSON.stringify(introInfo, null, 2));
} catch (e) {
    console.error("error:", e.message);
} finally {
    await browser.close();
}
