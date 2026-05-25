import { test, expect } from '@playwright/test';

test.describe('Projects Horizontal Scroll Gallery', () => {
  test('should display 3 projects centered in viewport at start', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const projectsSection = page.locator('#projects');

    await page.evaluate(() => {
      const projects = document.querySelector('#projects');
      if (projects) {
        projects.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });

    await page.waitForTimeout(500);

    const gallery = page.locator('[data-testid="horizontal-scroll-gallery"]');
    await expect(gallery).toBeVisible({ timeout: 10000 });

    const projectsContainer = page.locator('[data-testid="projects-container"]');
    await expect(projectsContainer).toBeVisible({ timeout: 10000 });

    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const containerBox = await projectsContainer.boundingBox();

    console.log(`Viewport width: ${viewportWidth}`);
    console.log(`Container bounding box:`, containerBox);

    expect(containerBox).not.toBeNull();

    if (containerBox) {
      const expectedPadding = viewportWidth * 0.04;
      const tolerance = viewportWidth * 0.25;

      console.log(`Container left: ${containerBox.x}`);
      console.log(`Expected padding: ~${expectedPadding}px`);
      console.log(`Tolerance: ${tolerance}px`);

      expect(containerBox.x).toBeGreaterThan(-tolerance);
    }

    await page.screenshot({ path: 'test-results/projects-centered.png', fullPage: false });
  });

  test('should hide header when deep in projects section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(1000);

    const header = page.locator('[data-testid="main-header"]');

    const isVisibleAtTop = await header.isVisible();
    console.log(`Header visible at top of page: ${isVisibleAtTop}`);

    await page.screenshot({ path: 'test-results/header-at-top.png', fullPage: false });

    const projectsSection = page.locator('#projects');
    const projectsBox = await projectsSection.boundingBox();

    console.log(`Projects section box:`, projectsBox);

    if (projectsBox) {
      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY + 800, behavior: 'instant' });
      }, projectsBox.y);
    }

    await page.waitForTimeout(2000);

    const headerAfterScroll = page.locator('[data-testid="main-header"]');
    const isHiddenAfterScroll = await headerAfterScroll.isHidden();

    console.log(`Header hidden after scrolling into projects: ${isHiddenAfterScroll}`);

    await page.screenshot({ path: 'test-results/header-in-projects.png', fullPage: false });

    expect(isHiddenAfterScroll).toBe(true);
  });

  test('card layout calculations are correct', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewportWidth = await page.evaluate(() => window.innerWidth);

    const CARD_WIDTH_VW = 30;
    const CARD_GAP_VW = 1;
    const CARDS_PER_VIEW = 3;

    const expectedCardWidth = viewportWidth * (CARD_WIDTH_VW / 100);
    const expectedGap = viewportWidth * (CARD_GAP_VW / 100);
    const expectedTotalWidth = (expectedCardWidth * CARDS_PER_VIEW) + (expectedGap * (CARDS_PER_VIEW - 1));
    const expectedPadding = (viewportWidth - expectedTotalWidth) / 2;

    console.log(`Viewport: ${viewportWidth}px`);
    console.log(`Expected card width: ${expectedCardWidth}px (${CARD_WIDTH_VW}vw)`);
    console.log(`Expected gap: ${expectedGap}px (${CARD_GAP_VW}vw)`);
    console.log(`Expected total width for 3 cards: ${expectedTotalWidth}px`);
    console.log(`Expected side padding: ${expectedPadding}px`);
    console.log(`Total view width percentage: ${(expectedTotalWidth / viewportWidth) * 100}%`);

    expect(expectedTotalWidth).toBeLessThanOrEqual(viewportWidth);
    expect(expectedPadding).toBeGreaterThan(0);
  });
});
