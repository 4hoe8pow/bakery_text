import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_UTILITIES_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な設備コマンド: ${cmd}`,
    en: `Unknown utilities command: ${cmd}`,
});
