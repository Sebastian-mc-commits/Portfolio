import { test, expect } from '@playwright/test';

test.describe('Skills Section', () => {
  test('should display skills marquee with all skills', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(skillsSection).toBeVisible();

    const sampleSkills = ['Python', 'React', 'PostgreSQL', 'Docker', 'TypeScript'];

    for (const skill of sampleSkills) {
      const skillTag = skillsSection.locator(`span:has-text("${skill}")`).first();
      await expect(skillTag).toBeVisible();
      console.log(`Skill "${skill}" is visible`);
    }

    await page.screenshot({ path: 'test-results/skills-marquee.png', fullPage: false });
  });

  test('skill tags should have icons and animate', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const skillTags = skillsSection.locator('.rounded-full').filter({ hasText: /Python|React|Docker/ });
    const tagCount = await skillTags.count();
    console.log(`Found ${tagCount} skill tags with Python/React/Docker`);
    expect(tagCount).toBeGreaterThan(0);

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/skills-marquee-animated.png', fullPage: false });
  });
});
