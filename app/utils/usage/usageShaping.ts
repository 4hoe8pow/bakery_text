import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_SHAPING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な成形コマンド: ${cmd}`,
    en: `Unknown shaping command: ${cmd}`,
});
