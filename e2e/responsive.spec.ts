import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 375, height: 812, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1440, height: 900, label: "desktop" },
] as const;

const OFFICIAL_PRICES = ["S/ 600", "S/ 900", "S/ 1,350"];

for (const viewport of VIEWPORTS) {
  test.describe(`responsive smoke @ ${viewport.width}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("sin overflow horizontal, precios oficiales y CTA Pro accesible", async ({
      page,
    }) => {
      await page.goto("/");
      await page.locator("#precios").scrollIntoViewIfNeeded();

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(hasHorizontalOverflow).toBe(false);

      await expect(page.locator("#precios")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Paquetes y precios" }),
      ).toBeVisible();

      for (const price of OFFICIAL_PRICES) {
        await expect(page.getByText(price, { exact: true }).first()).toBeVisible();
      }

      const proCta = page.getByRole("link", { name: /Elegir paquete Pro/ });
      await expect(proCta).toBeVisible();

      const tapTarget = await proCta.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const minHeight = Number.parseFloat(style.minHeight) || 0;
        const minWidth = Number.parseFloat(style.minWidth) || 0;

        return {
          width: Math.max(rect.width, minWidth),
          height: Math.max(rect.height, minHeight),
        };
      });

      expect(tapTarget.width).toBeGreaterThanOrEqual(44);
      expect(tapTarget.height).toBeGreaterThanOrEqual(44);
    });
  });
}
