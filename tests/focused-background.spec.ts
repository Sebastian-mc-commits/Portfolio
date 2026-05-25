import { test, expect } from '@playwright/test';

test.describe('Projects gallery focused background image', () => {
  test('background image covers full viewport width including edges', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Scroll fully into the projects section so the sticky is engaged
    await page.evaluate(() => {
      const section = document.getElementById('projects');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      // Scroll to about 30% through the gallery section
      window.scrollTo({ top: absoluteTop + rect.height * 0.3, behavior: 'instant' });
    });

    // Wait for animations
    await page.waitForTimeout(2500);

    // Take a full-page screenshot of the projects area
    await page.screenshot({
      path: 'test-results/projects-focused-bg-full.png',
      fullPage: false,
    });

    // Sample pixel colors from the screenshot buffer
    const screenshotBuffer = await page.screenshot({ fullPage: false });
    const { PNG } = await import('pngjs');
    const png = PNG.sync.read(screenshotBuffer);

    const samplePixel = (x: number, y: number) => {
      const idx = (png.width * y + x) << 2;
      return {
        r: png.data[idx],
        g: png.data[idx + 1],
        b: png.data[idx + 2],
        a: png.data[idx + 3],
      };
    };

    const edgeSamples = {
      topLeft: samplePixel(2, 2),
      midLeft: samplePixel(2, Math.floor(png.height / 2)),
      bottomLeft: samplePixel(2, png.height - 2),
      topRight: samplePixel(png.width - 2, 2),
      midRight: samplePixel(png.width - 2, Math.floor(png.height / 2)),
      bottomRight: samplePixel(png.width - 2, png.height - 2),
      center: samplePixel(Math.floor(png.width / 2), Math.floor(png.height / 2)),
    };

    // Scan the LEFT edge column to see where it transitions from white to image
    console.log('\nLeft edge column scan (x=2):');
    for (let y = 0; y < png.height; y += 50) {
      const px = samplePixel(2, y);
      const isWhite = px.r > 240 && px.g > 240 && px.b > 240;
      console.log(`  y=${y}: rgb(${px.r}, ${px.g}, ${px.b}) ${isWhite ? '⚪ WHITE' : '🎨 IMG'}`);
    }

    // Scan the TOP edge row
    console.log('\nTop edge row scan (y=2):');
    for (let x = 0; x < png.width; x += 100) {
      const px = samplePixel(x, 2);
      const isWhite = px.r > 240 && px.g > 240 && px.b > 240;
      console.log(`  x=${x}: rgb(${px.r}, ${px.g}, ${px.b}) ${isWhite ? '⚪ WHITE' : '🎨 IMG'}`);
    }

    // Scan a horizontal row at mid-height to see if cards extend to edges
    console.log('\nMid-row scan (y=450):');
    for (let x = 0; x < png.width; x += 50) {
      const px = samplePixel(x, 450);
      const isWhite = px.r > 240 && px.g > 240 && px.b > 240;
      console.log(`  x=${x}: rgb(${px.r}, ${px.g}, ${px.b}) ${isWhite ? '⚪ WHITE' : '🎨 IMG'}`);
    }

    console.log('Pixel color samples (PNG dimensions: ' + png.width + 'x' + png.height + '):');
    console.log(JSON.stringify(edgeSamples, null, 2));

    // If image is covering, edges should NOT be pure white (255, 255, 255)
    // The astronaut image has dark colors, so edges should have varied RGB
    const isWhiteish = (px: { r: number; g: number; b: number }) =>
      px.r > 240 && px.g > 240 && px.b > 240;

    console.log('\nEdge coverage analysis:');
    console.log('topLeft is white?', isWhiteish(edgeSamples.topLeft));
    console.log('midLeft is white?', isWhiteish(edgeSamples.midLeft));
    console.log('bottomLeft is white?', isWhiteish(edgeSamples.bottomLeft));
    console.log('topRight is white?', isWhiteish(edgeSamples.topRight));
    console.log('midRight is white?', isWhiteish(edgeSamples.midRight));
    console.log('bottomRight is white?', isWhiteish(edgeSamples.bottomRight));

    // Inspect the motion div and image computed styles
    const motionDivInfo = await page.evaluate(() => {
      const gallery = document.querySelector('[data-testid="horizontal-scroll-gallery"]');
      if (!gallery) return { error: 'No gallery' };
      const sticky = gallery.querySelector('.sticky');
      if (!sticky) return { error: 'No sticky' };

      const bgContainer = sticky.children[0] as HTMLElement;
      const motionDiv = bgContainer.querySelector('div') as HTMLElement;
      const img = bgContainer.querySelector('img') as HTMLImageElement;

      const bgStyle = window.getComputedStyle(bgContainer);
      const motionRect = motionDiv?.getBoundingClientRect();
      const motionStyle = motionDiv ? window.getComputedStyle(motionDiv) : null;
      const imgRect = img?.getBoundingClientRect();
      const imgStyle = img ? window.getComputedStyle(img) : null;

      return {
        bgContainer: {
          opacity: bgStyle.opacity,
          display: bgStyle.display,
          visibility: bgStyle.visibility,
          zIndex: bgStyle.zIndex,
        },
        motionDiv: motionDiv ? {
          rect: { left: motionRect!.left, right: motionRect!.right, top: motionRect!.top, bottom: motionRect!.bottom, width: motionRect!.width, height: motionRect!.height },
          opacity: motionStyle!.opacity,
          display: motionStyle!.display,
          visibility: motionStyle!.visibility,
          filter: motionStyle!.filter,
          transform: motionStyle!.transform,
        } : null,
        img: img ? {
          src: img.src,
          rect: { left: imgRect!.left, right: imgRect!.right, top: imgRect!.top, bottom: imgRect!.bottom, width: imgRect!.width, height: imgRect!.height },
          opacity: imgStyle!.opacity,
          display: imgStyle!.display,
          visibility: imgStyle!.visibility,
          objectFit: imgStyle!.objectFit,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
        } : null,
      };
    });

    console.log('\nMotion div / Image inspection:');
    console.log(JSON.stringify(motionDivInfo, null, 2));

    // Use elementsFromPoint to get the stack of elements at problematic locations
    const elementStacks = await page.evaluate(() => {
      const points = [
        { x: 2, y: 450, label: 'midLeft' },
        { x: 50, y: 450, label: 'midLeft+50' },
        { x: 1438, y: 450, label: 'midRight' },
      ];
      return points.map((p) => {
        const els = document.elementsFromPoint(p.x, p.y);
        return {
          ...p,
          stack: els.map((el) => ({
            tag: el.tagName,
            id: el.id,
            cls: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
            pos: window.getComputedStyle(el).position,
            zIdx: window.getComputedStyle(el).zIndex,
            bg: window.getComputedStyle(el).backgroundColor,
          })),
        };
      });
    });

    console.log('\nElement stacks at edges:');
    console.log(JSON.stringify(elementStacks, null, 2));

    // Get viewport dimensions
    const viewportSize = page.viewportSize();
    if (!viewportSize) throw new Error('No viewport size');

    // Sample pixel colors at the left and right edges
    const leftEdgeColor = await page.evaluate(() => {
      const img = document.querySelector('[data-testid="horizontal-scroll-gallery"] img');
      if (!img) return null;
      const rect = img.getBoundingClientRect();
      return {
        imgLeft: rect.left,
        imgRight: rect.right,
        imgWidth: rect.width,
        imgTop: rect.top,
        imgBottom: rect.bottom,
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight,
      };
    });

    console.log('Image bounding rect:', leftEdgeColor);

    // Check the background container position
    const containerInfo = await page.evaluate(() => {
      const gallery = document.querySelector('[data-testid="horizontal-scroll-gallery"]');
      if (!gallery) return null;
      const sticky = gallery.querySelector('.sticky');
      if (!sticky) return null;
      const bgContainer = sticky.children[0];
      if (!bgContainer) return null;
      const rect = bgContainer.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(bgContainer);
      return {
        bgLeft: rect.left,
        bgRight: rect.right,
        bgWidth: rect.width,
        bgTop: rect.top,
        bgBottom: rect.bottom,
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight,
        position: computedStyle.position,
        width: computedStyle.width,
        transform: computedStyle.transform,
        overflow: computedStyle.overflow,
      };
    });

    console.log('Background container info:', containerInfo);

    // Check main element padding
    const mainInfo = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return null;
      const style = window.getComputedStyle(main);
      const rect = main.getBoundingClientRect();
      return {
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        mainLeft: rect.left,
        mainRight: rect.right,
        mainWidth: rect.width,
      };
    });

    console.log('Main element info:', mainInfo);

    // Now verify the background container reaches the viewport edges
    expect(containerInfo).toBeTruthy();
    if (containerInfo) {
      expect(containerInfo.bgLeft).toBeLessThanOrEqual(0);
      expect(containerInfo.bgRight).toBeGreaterThanOrEqual(containerInfo.windowInnerWidth - 1);
    }
  });
});
