import { test, expect } from '@playwright/test';

test.describe('Database Schema Page', () => {
    test('should display database schema for city-matrix-db project', async ({ page }) => {
        await page.goto('/projects/city-matrix-db/database');

        await page.waitForLoadState('networkidle');

        const title = page.locator('h1');
        await expect(title).toBeVisible();

        // Check for "Database Schema" badge in the header
        const schemaBadge = page.locator('text=Database Schema');
        await expect(schemaBadge).toBeVisible();

        const titleFontSize = await title.evaluate(el => window.getComputedStyle(el).fontSize);
        const fontSizeNum = parseInt(titleFontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(16);

        const reactFlowContainer = page.locator('.react-flow');
        await expect(reactFlowContainer).toBeVisible({ timeout: 10000 });

        const tableNodes = page.locator('.react-flow__node');
        await expect(tableNodes.first()).toBeVisible({ timeout: 10000 });

        const nodeCount = await tableNodes.count();
        expect(nodeCount).toBeGreaterThan(0);
        console.log(`Found ${nodeCount} table nodes`);

        const edges = page.locator('.react-flow__edge');
        const edgeCount = await edges.count();
        console.log(`Found ${edgeCount} relationship edges`);
        expect(edgeCount).toBeGreaterThan(0);

        const edgePaths = page.locator('.react-flow__edge-path');
        const edgePathCount = await edgePaths.count();
        console.log(`Found ${edgePathCount} edge paths`);
        expect(edgePathCount).toBeGreaterThan(0);

        const footer = page.locator('footer');
        const footerVisible = await footer.isVisible().catch(() => false);
        const mainZIndex = await page.locator('main').evaluate(el => window.getComputedStyle(el).zIndex);
        console.log(`Main z-index: ${mainZIndex}, Footer visible: ${footerVisible}`);

        const backButton = page.locator('a[href*="/projects/city-matrix-db"]').first();
        await expect(backButton).toBeVisible();
    });

    test('should have relational layout with connected tables', async ({ page }) => {
        await page.goto('/projects/city-matrix-db/database');

        await page.waitForSelector('.react-flow__node', { timeout: 10000 });

        const edges = page.locator('.react-flow__edge');
        await expect(edges.first()).toBeVisible({ timeout: 5000 });

        const edgeLabels = page.locator('.react-flow__edge-textwrapper');
        const labelCount = await edgeLabels.count();
        console.log(`Found ${labelCount} edge labels`);

        if (labelCount > 0) {
            const firstLabel = await edgeLabels.first().textContent();
            console.log(`First edge label: ${firstLabel}`);
            expect(firstLabel).toContain('→');
        }
    });

    test('should take screenshot of database schema', async ({ page }) => {
        await page.goto('/projects/city-matrix-db/database');

        await page.waitForSelector('.react-flow__node', { timeout: 10000 });
        await page.waitForTimeout(1000);

        await page.screenshot({ path: 'screenshot-database-schema.png', fullPage: false });
        console.log('Screenshot saved as screenshot-database-schema.png');
    });
});
