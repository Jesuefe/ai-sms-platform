import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "ai-sms-platform",
    compatibilityDate: "2026-10-06",
    compatibilityFlags: ["nodejs_compat"],
  },
});
