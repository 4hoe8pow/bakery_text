import type { UsageCode } from "../bt.types";

export const USAGE_UNKNOWN_MIXING_COMMAND = (cmd: string): UsageCode => ({
	ja: `不明なミキシングコマンド: ${cmd}`,
	en: `Unknown mixing command: ${cmd}`,
});
