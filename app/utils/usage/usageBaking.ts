import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_BAKING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な焼成コマンド: ${cmd}`,
    en: `Unknown baking command: ${cmd}`,
});
