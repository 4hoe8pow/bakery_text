import type { UsageCode } from "../bt.types";

export const USAGE_EMPTY: UsageCode = {
	ja: "",
} as const;

export const USAGE_HELP_HEADER: UsageCode = {
	ja: "利用可能なコマンド一覧:",
	en: "Here are the available commands:",
};

export const USAGE_HELP_LS: UsageCode = {
	ja: "ls - すべてのセクションの名前とIDを一覧表示",
	en: "ls - List the names and IDs of all sections.",
};

export const USAGE_HELP_MODE: UsageCode = {
	ja: "mode {id} - 別のセクションに切り替えます。",
	en: "mode {id} - Switch to a different section.",
};

export const USAGE_HELP_TERM_OPEN: UsageCode = {
	ja: "term open {id} - 指定したIDのターミナルを開く。",
	en: "term open {id} - Open a terminal with the specified ID.",
};

export const USAGE_HELP_TERM_FORMAT: UsageCode = {
	ja: "term format - 開いているターミナルを整理する。",
	en: "term format - Arrange the open terminals neatly.",
};

export const USAGE_TERM_FORMATTED: UsageCode = {
	ja: "ターミナルが整理されました。",
	en: "Terminals have been formatted.",
};

export const USAGE_UNKNOWN_COMMAND: UsageCode = {
	ja: "不明なコマンドです。",
	en: "Unknown command.",
};

export const USAGE_LS_ITEM = (
	sectionName: string,
	sectionId: string,
): UsageCode => ({
	ja: `-[ ${sectionName} ] ${sectionId}`,
	en: `-[ ${sectionName} ] ${sectionId}`,
});

export const USAGE_INVALID_TERMINAL_ID = (id: string): UsageCode => ({
	ja: `無効なターミナルID: ${id}。有効なTerminalSectionIdに対応する数値である必要があります。`,
	en: `Invalid Terminal ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
});

export const USAGE_ACTIVATING_TERMINAL = (terminalName: string): UsageCode => ({
	ja: `ターミナルをアクティブ化しています: ${terminalName.toUpperCase()}`,
	en: `Activating Terminal: ${terminalName.toUpperCase()}`,
});

export const USAGE_MISSING_ID_TERM_OPEN: UsageCode = {
	ja: "'term open'のIDが不足しています。",
	en: "Missing ID for 'term open'.",
};

export const USAGE_UPDATED_TERMINAL_POSITION = (
	id: number,
	position: { x: number; y: number; z: number },
): UsageCode => ({
	ja: `ターミナルID: ${id} の位置を更新しました: (${position.x}, ${position.y}, ${position.z})`,
	en: `Updated Terminal ID: ${id} to Position: (${position.x}, ${position.y}, ${position.z})`,
});

export const USAGE_INVALID_TERM_SUBCOMMAND = (
	subCommand: string,
): UsageCode => ({
	ja: `無効なtermサブコマンド: ${subCommand}`,
	en: `Invalid term subcommand: ${subCommand}`,
});

export const USAGE_INVALID_MODE_ID = (id: string): UsageCode => ({
	ja: `無効なモードID: ${id}。有効なTerminalSectionIdに対応する数値である必要があります。`,
	en: `Invalid Mode ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
});

export const USAGE_MODE_CHANGED = (modeName: string): UsageCode => ({
	ja: `モードが変更されました: ${modeName.toUpperCase()}`,
	en: `Mode changed to: ${modeName.toUpperCase()}`,
});

export const USAGE_INVALID_OR_MISSING_ID_MODE: UsageCode = {
	ja: "'mode'のIDが無効または不足しています。",
	en: "Invalid or missing ID for 'mode'.",
};

export const USAGE_LANGUAGE_CHANGED = (lang: "ja" | "en"): UsageCode => ({
	ja: `言語が変更されました: ${lang === "ja" ? "日本語" : "英語"}`,
	en: `Language changed to: ${lang === "ja" ? "Japanese" : "English"}`,
});

export const USAGE_COMMAND_NOT_ALLOWED = (cmd: string): UsageCode => ({
	ja: `コマンド "${cmd}" は現在のモードでは使用できません。`,
	en: `Command "${cmd}" is not allowed in the current mode.`,
});
