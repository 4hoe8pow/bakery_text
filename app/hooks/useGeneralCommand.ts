import { useCallback, useContext } from "react";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { GeneralCommands } from "../utils/Command";
import {
    USAGE_ACTIVATING_TERMINAL,
    USAGE_EMPTY,
    USAGE_HELP_HEADER,
    USAGE_HELP_LS,
    USAGE_HELP_MODE,
    USAGE_HELP_TERM_FORMAT,
    USAGE_HELP_TERM_OPEN,
    USAGE_INVALID_MODE_ID,
    USAGE_INVALID_OR_MISSING_ID_MODE,
    USAGE_INVALID_TERMINAL_ID,
    USAGE_INVALID_TERM_SUBCOMMAND,
    USAGE_LANGUAGE_CHANGED,
    USAGE_LS_ITEM,
    USAGE_MISSING_ID_TERM_OPEN,
    USAGE_MODE_CHANGED,
    USAGE_TERM_FORMATTED,
    USAGE_UNKNOWN_COMMAND,
    USAGE_UPDATED_TERMINAL_POSITION,
} from "../utils/usage/usageGeneral";

export const useGeneralCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
    setMode: React.Dispatch<React.SetStateAction<TerminalSectionId>>,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }

    const {
        terminals,
        updateTerminalPosition,
        activateTerminal,
        updateLanguage,
    } = context;

    const helpExec = useCallback(() => {
        addOutput(USAGE_HELP_HEADER, LogLevel.WARN);
        addOutput(USAGE_EMPTY, LogLevel.WARN);
        addOutput(USAGE_HELP_LS, LogLevel.WARN);
        addOutput(USAGE_HELP_MODE, LogLevel.WARN);
        addOutput(USAGE_HELP_TERM_OPEN, LogLevel.WARN);
        addOutput(USAGE_HELP_TERM_FORMAT, LogLevel.WARN);
    }, [addOutput]);

    const lsExec = useCallback(() => {
        for (const [key, value] of Object.entries(TerminalSectionId)) {
            if (Number.isNaN(Number(key))) {
                addOutput(USAGE_LS_ITEM(value as string, key), LogLevel.INFO);
            }
        }
    }, [addOutput]);

    const termExec = useCallback(
        (subCommand: string, id: string | undefined) => {
            switch (subCommand) {
                case "open":
                    if (id) {
                        const terminalId = Number(id);
                        if (
                            Number.isNaN(terminalId) ||
                            !(terminalId in TerminalSectionId)
                        ) {
                            addOutput(
                                USAGE_INVALID_TERMINAL_ID(id),
                                LogLevel.ERROR,
                            );
                            break;
                        }
                        addOutput(
                            USAGE_ACTIVATING_TERMINAL(
                                TerminalSectionId[terminalId],
                            ),
                            LogLevel.INFO,
                        );
                        activateTerminal(terminalId as TerminalSectionId);
                    } else {
                        addOutput(USAGE_MISSING_ID_TERM_OPEN, LogLevel.ERROR);
                    }
                    break;
                case "format": {
                    const spacing = 81; // ターミナル間のスペース
                    let currentY = 10; // 現在のY座標を追跡

                    // 画面サイズを取得
                    const screenWidth = window.innerWidth;

                    // ターミナルをIDの昇順でソート
                    const sortedTerminals = [...terminals].sort(
                        (a, b) => a.id - b.id,
                    );

                    for (const terminal of sortedTerminals) {
                        const newPosition = {
                            x: screenWidth / 2,
                            y: currentY,
                            z: terminal.position.z,
                        }; // 中央に配置
                        updateTerminalPosition(terminal.id, newPosition);
                        addOutput(
                            USAGE_UPDATED_TERMINAL_POSITION(
                                terminal.id,
                                newPosition,
                            ),
                            LogLevel.INFO,
                        );
                        currentY += spacing;
                    }
                    addOutput(USAGE_TERM_FORMATTED, LogLevel.INFO);
                    break;
                }
                default:
                    addOutput(
                        USAGE_INVALID_TERM_SUBCOMMAND(subCommand),
                        LogLevel.ERROR,
                    );
            }
        },
        [addOutput, terminals, updateTerminalPosition, activateTerminal],
    );

    const modeExec = useCallback(
        (id: string | undefined) => {
            if (id) {
                const modeId = Number(id);
                if (Number.isNaN(modeId) || !(modeId in TerminalSectionId)) {
                    addOutput(USAGE_INVALID_MODE_ID(id), LogLevel.ERROR);
                    return;
                }
                setMode(modeId); // モードを変更

                addOutput(
                    USAGE_MODE_CHANGED(TerminalSectionId[modeId]),
                    LogLevel.INFO,
                );
            } else {
                addOutput(USAGE_INVALID_OR_MISSING_ID_MODE, LogLevel.ERROR);
            }
        },
        [addOutput, setMode],
    );

    const changeLangExec = useCallback(
        (lang: "ja" | "en") => {
            updateLanguage(lang);
            addOutput(USAGE_LANGUAGE_CHANGED(lang), LogLevel.INFO);
        },
        [addOutput, updateLanguage],
    );

    return useCallback(
        (command: GeneralCommands, ...args: string[]) => {
            switch (command) {
                case GeneralCommands.LS:
                    lsExec();
                    break;
                case GeneralCommands.TERM:
                    termExec(args[0], args[1]);
                    break;
                case GeneralCommands.MODE:
                    modeExec(args[0]);
                    break;
                case GeneralCommands.HELP:
                    helpExec();
                    break;
                case GeneralCommands.EN:
                    changeLangExec("en");
                    break;
                case GeneralCommands.JA:
                    changeLangExec("ja");
                    break;
                default:
                    addOutput(USAGE_UNKNOWN_COMMAND, LogLevel.ERROR);
            }
        },
        [lsExec, termExec, modeExec, helpExec, changeLangExec, addOutput],
    );
};
