import { test, expect } from "@playwright/test";

import { buildWhatsAppUrl } from "../lib/whatsapp";

function getWhatsAppText(urlString: string): string {
  const text = new URL(urlString).searchParams.get("text");
  if (!text) {
    return "";
  }

  return decodeURIComponent(text.replace(/\+/g, "%20"));
}

test("Elegir Pro abre WhatsApp con mensaje canónico del paquete Pro", async ({
  page,
  context,
}) => {
  await page.goto("/");

  await page.locator("#precios").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "Paquetes y precios" }),
  ).toBeVisible();

  const proLink = page.getByRole("link", { name: /Elegir paquete Pro/ });
  const expectedUrl = buildWhatsAppUrl("pro");
  await expect(proLink).toHaveAttribute("href", expectedUrl);

  const popupPromise = context.waitForEvent("page");
  await proLink.click();
  const popup = await popupPromise;

  const navigated = await popup
    .waitForURL(/wa\.me|whatsapp\.com/, { timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  if (navigated) {
    expect(getWhatsAppText(popup.url())).toBe(getWhatsAppText(expectedUrl));
  }
});
