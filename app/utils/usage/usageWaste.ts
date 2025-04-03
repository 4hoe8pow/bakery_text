import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_WASTE_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な廃棄コマンド: ${cmd}`,
    en: `Unknown waste command: ${cmd}`,
});
