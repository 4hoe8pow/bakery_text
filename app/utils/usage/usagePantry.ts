import type { UsageCode } from "../../bt.types";

export const USAGE_ERROR_TERMINAL_CONTEXT: UsageCode = {
    ja: "エラー: ターミナルコンテキストが利用できません。",
    en: "Error: Terminal context not available.",
};

export const USAGE_INGREDIENT_ITEM = (
    key: string,
    value: number,
): UsageCode => ({
    ja: `${key} = ${value.toFixed(3)} g`,
    en: `${key} = ${value.toFixed(3)} g`,
});

export const USAGE_UNKNOWN_PANTRY_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明なパントリーコマンド: ${cmd}`,
    en: `Unknown pantry command: ${cmd}`,
});
