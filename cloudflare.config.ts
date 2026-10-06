import { defineConfig } from "cf/config";

export default defineConfig({
  accountId: "1aac95682250f53e3d4643bae15a2045",
  worker: {
    name: "ai-sms-platform",
    compatibilityDate: "2026-10-06",
    compatibilityFlags: ["nodejs_compat"],
  },
});
