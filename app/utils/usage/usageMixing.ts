import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_MIXING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な混錬コマンド: ${cmd}`,
    en: `Unknown mixing command: ${cmd}`,
});

export const USAGE_MIXING_SUCCESS: UsageCode = {
    ja: "混錬が成功しました！",
    en: "Mixing was successful!",
};

export const USAGE_MIXING_ERROR: UsageCode = {
    ja: "原料が不足しています。",
    en: "Ingredients are insufficient.",
};
