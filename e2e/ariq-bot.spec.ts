import { test, expect } from "@playwright/test";

import { buildWhatsAppUrl } from "../lib/whatsapp";

function getWhatsAppText(urlString: string): string {
  const text = new URL(urlString).searchParams.get("text");
  if (!text) {
    return "";
  }

  return decodeURIComponent(text.replace(/\+/g, "%20"));
}

test("ARIQ Bot preview y calificación de precios cierran en WhatsApp Pro", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const preview = page.getByRole("button", {
    name: "Abrir chat de ARIQ Bot: ¿En qué te ayudo hoy?",
  });
  await expect(preview).toBeVisible();

  await preview.click();

  const dialog = page.getByRole("dialog", { name: "Chat de ARIQ Bot" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("En línea · Arequipa")).toBeVisible();

  await dialog.getByRole("button", { name: "Consultar Precios" }).click();
  await dialog.getByRole("button", { name: "WhatsApp: no doy abasto" }).click();
  await expect(dialog.getByText(/Pro \(recomendado\)/)).toBeVisible();

  const expectedUrl = buildWhatsAppUrl("pro");
  const waLink = dialog.getByRole("link", {
    name: "Continuar la conversación de ARIQ Bot en WhatsApp",
  });
  await expect(waLink).toHaveAttribute("href", expectedUrl);

  const popupPromise = context.waitForEvent("page");
  await dialog.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  const popup = await popupPromise;

  const navigated = await popup
    .waitForURL(/wa\.me|whatsapp\.com/, { timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  if (navigated) {
    expect(getWhatsAppText(popup.url())).toBe(getWhatsAppText(expectedUrl));
  }
});
