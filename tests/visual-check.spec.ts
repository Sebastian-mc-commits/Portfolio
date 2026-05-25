import { test, expect } from '@playwright/test';

test('visual inspection of projects gallery', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'test-results/1-homepage-top.png', fullPage: false });

  const header = page.locator('[data-testid="main-header"]');
  const headerCount = await header.count();
  console.log('Header element count:', headerCount);

  if (headerCount > 0) {
    const headerBox = await header.boundingBox();
    console.log('Header bounding box:', headerBox);
    const isVisible = await header.isVisible();
    console.log('Header isVisible:', isVisible);
  }

  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('Current scroll position:', scrollY);

  const projectsSection = page.locator('#projects');
  const box = await projectsSection.boundingBox();
  console.log('Projects section position:', box);

  if (box) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), box.y);
    await page.waitForTimeout(1500);
  }

  await page.screenshot({ path: 'test-results/2-projects-at-start.png', fullPage: false });

  const cards = page.locator('[data-testid^="project-card-"]');
  const cardCount = await cards.count();
  console.log('Number of project cards:', cardCount);

  console.log('\n=== CARD POSITIONS AT PROJECTS START ===');
  for (let i = 0; i < Math.min(cardCount, 4); i++) {
    const card = cards.nth(i);
    const cardBox = await card.boundingBox();
    if (cardBox) {
      const isFullyVisible = cardBox.x >= 0 && cardBox.x + cardBox.width <= 1920;
      console.log(`Card ${i}: x=${cardBox.x.toFixed(0)} to ${(cardBox.x + cardBox.width).toFixed(0)}, visible=${isFullyVisible}`);
    }
  }

  const viewportWidth = 1920;
  const firstCard = await cards.nth(0).boundingBox();
  const thirdCard = await cards.nth(2).boundingBox();

  if (firstCard && thirdCard) {
    const leftPadding = firstCard.x;
    const rightPadding = viewportWidth - (thirdCard.x + thirdCard.width);

    console.log('\n=== CENTERING CHECK ===');
    console.log(`Left padding: ${leftPadding.toFixed(0)}px`);
    console.log(`Right padding: ${rightPadding.toFixed(0)}px`);
    console.log(`Difference: ${Math.abs(leftPadding - rightPadding).toFixed(0)}px`);

    const allThreeVisible =
      firstCard.x >= -100 &&
      thirdCard.x + thirdCard.width <= viewportWidth + 100;

    console.log(`All 3 cards visible (with 100px tolerance): ${allThreeVisible}`);
    expect(allThreeVisible).toBe(true);
  }

  if (box) {
    await page.evaluate((y) => window.scrollTo({ top: y + 800, behavior: 'smooth' }), box.y);
    await page.waitForTimeout(2500);
  }

  await page.screenshot({ path: 'test-results/3-projects-scrolled.png', fullPage: false });

  const headerAfterScroll = page.locator('[data-testid="main-header"]');
  const headerCountAfter = await headerAfterScroll.count();
  console.log('\nHeader element count after scroll:', headerCountAfter);

  if (headerCountAfter > 0) {
    const isVisibleAfter = await headerAfterScroll.isVisible();
    console.log('Header isVisible after scroll:', isVisibleAfter);
    expect(isVisibleAfter).toBe(false);
  } else {
    console.log('Header element removed from DOM (expected behavior)');
  }
});
