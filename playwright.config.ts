import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

import { defineConfig, devices } from "@playwright/test";

function loadLocalEnv(): void {
  for (const file of [".env.local", ".env"]) {
    const envPath = resolve(__dirname, file);
    if (!existsSync(envPath)) {
      continue;
    }

    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separator = trimmed.indexOf("=");
      if (separator === -1) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  }
}

loadLocalEnv();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? "github" : "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: isCI ? "pnpm build && pnpm start" : "pnpm dev",
        url: "http://localhost:3000",
        reuseExistingServer: !isCI,
        timeout: isCI ? 180_000 : 60_000,
        env: {
          ...process.env,
          // Keep http://localhost assets on HTTP so WebKit can hydrate (see next.config.ts).
          DISABLE_CSP_UPGRADE: "true",
        },
      },
});
