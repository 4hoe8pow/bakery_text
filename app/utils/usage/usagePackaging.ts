import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_PACKAGING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な包装コマンド: ${cmd}`,
    en: `Unknown packaging command: ${cmd}`,
});
