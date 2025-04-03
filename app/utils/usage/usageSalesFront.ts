import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_SALESFRONT_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な販売フロントコマンド: ${cmd}`,
    en: `Unknown sales front command: ${cmd}`,
});
