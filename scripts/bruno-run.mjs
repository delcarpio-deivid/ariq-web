import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const targets = process.argv.slice(2);
const disableRateLimit = process.argv.includes("--disable-rate-limit");
const filteredTargets = targets.filter((target) => target !== "--disable-rate-limit");
const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const bruCli = path.join(
  projectRoot,
  "node_modules",
  "@usebruno",
  "cli",
  "bin",
  "bru.js",
);

const result = spawnSync(
  process.execPath,
  [bruCli, "run", ...filteredTargets, "--env", "local"],
  {
    cwd: path.join(projectRoot, "bruno"),
    stdio: "inherit",
    env: {
      ...process.env,
      ...(disableRateLimit ? { RATE_LIMIT_DISABLED: "true" } : {}),
    },
  },
);

process.exit(result.status ?? 1);
