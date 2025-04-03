import type { UsageCode } from "../bt.types";

export const USAGE_UNKNOWN_COOLING_COMMAND = (cmd: string): UsageCode => ({
	ja: `不明な冷却コマンド: ${cmd}`,
	en: `Unknown cooling command: ${cmd}`,
});
