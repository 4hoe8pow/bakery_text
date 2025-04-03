"use client";

import { useContext, useRef, useState } from "react";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { useBakingCommand } from "../hooks/useBakingCommand";
import { useCoolingCommand } from "../hooks/useCoolingCommand";
import { useGeneralCommand } from "../hooks/useGeneralCommand";
import { useMixingCommand } from "../hooks/useMixingCommand";
import { usePackagingCommand } from "../hooks/usePackagingCommand";
import { usePantryCommand } from "../hooks/usePantryCommand";
import { usePurchasingCommand } from "../hooks/usePurchasingCommand";
import { useSalesFrontCommand } from "../hooks/useSalesFrontCommand";
import { useShapingCommand } from "../hooks/useShapingCommand";
import { useUtilitiesCommand } from "../hooks/useUtilitiesCommand";
import { useWasteCommand } from "../hooks/useWasteCommand";
import {
    BakingCommands,
    CoolingCommands,
    GeneralCommands,
    MixingCommands,
    PackagingCommands,
    PantryCommands,
    PurchasingCommands,
    SalesFrontCommands,
    ShapingCommands,
    UtilitiesCommands,
    WasteCommands,
} from "../utils/Command";
import { greeting } from "../utils/greeting";
import {
    USAGE_COMMAND_NOT_ALLOWED,
    USAGE_EMPTY,
    USAGE_UNKNOWN_COMMAND,
} from "../utils/usage/usageGeneral";
import { CommandInput } from "./CommandInput";
import { OutputLogger } from "./OutPutLogger";

export type LogProps = { message: string; level: LogLevel };

export const BackgroundConsole = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState(""); // 現在の入力値
    const [output, setOutput] = useState<LogProps[]>(greeting); // 出力ログ
    const [buffer, setBuffer] = useState<string[]>([]); // コマンド履歴
    const [mode, setMode] = useState<TerminalSectionId>(
        TerminalSectionId.Purchasing,
    );
    const [isInputEnabled, setIsInputEnabled] = useState(true);
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const { language } = context;
    const getLocalizedMessage = (usage: UsageCode) =>
        language === "en" && usage.en ? usage.en : usage.ja;

    const addOutput = (usage: UsageCode, level: LogLevel = LogLevel.INFO) =>
        setOutput((prev) => [
            ...prev,
            { message: `| ${getLocalizedMessage(usage)}`, level },
        ]);

    const replaceOutput = (
        usage: UsageCode,
        level: LogLevel = LogLevel.INFO,
    ) => {
        setOutput((prevOutput) => {
            const updatedOutput = [...prevOutput];
            if (updatedOutput.length > 0) {
                updatedOutput[updatedOutput.length - 1] = {
                    message: `| ${getLocalizedMessage(usage)}`,
                    level,
                };
            }
            return updatedOutput;
        });
    };

    // 各セクションのコマンド実行関数を取得
    const generalCommandExecutor = useGeneralCommand(addOutput, setMode);
    const purchasingCommandExecutor = usePurchasingCommand(
        addOutput,
        replaceOutput,
        setIsInputEnabled,
    );
    const pantryCommandExecutor = usePantryCommand(addOutput);
    const utilitiesCommandExecutor = useUtilitiesCommand(addOutput);
    const mixingCommandExecutor = useMixingCommand(addOutput);
    const coolingCommandExecutor = useCoolingCommand(addOutput);
    const shapingCommandExecutor = useShapingCommand(addOutput);
    const bakingCommandExecutor = useBakingCommand(addOutput);
    const packagingCommandExecutor = usePackagingCommand(addOutput);
    const salesFrontCommandExecutor = useSalesFrontCommand(addOutput);
    const wasteCommandExecutor = useWasteCommand(addOutput);

    // コマンドを実行
    const handleExecuteCommand = (command: string) => {
        if (command.trim() === "") {
            addOutput(USAGE_EMPTY); // 空行を追加
            return;
        }
        const [cmd, ...args] = command.split(/\s+/);

        // 各セクションのコマンドと対応するモードをマッピング
        const commandMap = [
            {
                commands: GeneralCommands,
                mode: null,
                executor: generalCommandExecutor,
            },
            {
                commands: PurchasingCommands,
                mode: TerminalSectionId.Purchasing,
                executor: purchasingCommandExecutor,
            },
            {
                commands: PantryCommands,
                mode: TerminalSectionId.Pantry,
                executor: pantryCommandExecutor,
            },
            {
                commands: MixingCommands,
                mode: TerminalSectionId.Mixing,
                executor: mixingCommandExecutor,
            },
            {
                commands: CoolingCommands,
                mode: TerminalSectionId.Cooling,
                executor: coolingCommandExecutor,
            },
            {
                commands: ShapingCommands,
                mode: TerminalSectionId.Shaping,
                executor: shapingCommandExecutor,
            },
            {
                commands: BakingCommands,
                mode: TerminalSectionId.Baking,
                executor: bakingCommandExecutor,
            },
            {
                commands: PackagingCommands,
                mode: TerminalSectionId.Packaging,
                executor: packagingCommandExecutor,
            },
            {
                commands: SalesFrontCommands,
                mode: TerminalSectionId.SalesFront,
                executor: salesFrontCommandExecutor,
            },
            {
                commands: WasteCommands,
                mode: TerminalSectionId.Waste,
                executor: wasteCommandExecutor,
            },
            {
                commands: UtilitiesCommands,
                mode: TerminalSectionId.Utilities,
                executor: utilitiesCommandExecutor,
            },
        ] as const;

        // コマンドを検索して実行
        const matched = commandMap.find(({ commands }) =>
            Object.values(commands).includes(cmd as keyof typeof commands),
        );

        if (matched) {
            const { commands, mode: requiredMode } = matched;
            const executor =
                "executor" in matched ? matched.executor : undefined;

            // モードが一致しない場合は警告を表示
            if (requiredMode !== null && mode !== requiredMode) {
                addOutput(USAGE_COMMAND_NOT_ALLOWED(cmd), LogLevel.WARN);
                return;
            }

            // 実行関数がある場合は実行
            if (executor) {
                executor(cmd as keyof typeof commands, ...args);
            }
        } else {
            addOutput(USAGE_UNKNOWN_COMMAND, LogLevel.ERROR);
        }
    };

    // コマンド履歴を上下に移動する
    const history = (direction: "up" | "down") => {
        setInput((prevInput) => {
            const currentIndex = buffer.indexOf(prevInput);
            const newIndex =
                direction === "up"
                    ? currentIndex === -1
                        ? buffer.length - 1
                        : Math.max(currentIndex - 1, 0)
                    : currentIndex === -1 || currentIndex === buffer.length - 1
                      ? -1
                      : currentIndex + 1;

            const newInput = newIndex === -1 ? "" : buffer[newIndex] || "";
            setTimeout(() => {
                inputRef.current?.setSelectionRange(
                    newInput.length,
                    newInput.length,
                );
            }, 0);
            return newInput;
        });
    };

    // キー入力を処理する
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const actions: Record<string, () => void> = {
            Enter: () => {
                setOutput((prev) => [
                    ...prev,
                    {
                        message: `${TerminalSectionId[mode]} $ ${input}`,
                        level: LogLevel.INFO,
                    },
                ]);
                handleExecuteCommand(input);
                setBuffer((prev) => [...prev, input]);
                setInput("");
            },
            ArrowUp: () => history("up"),
            ArrowDown: () => history("down"),
        };
        actions[e.key]?.();
    };

    return (
        <div className="flex max-h-screen w-full flex-col px-4 text-white">
            {/* 出力ログを表示 */}
            <div className="flex-grow overflow-y-auto">
                <OutputLogger output={output} />
            </div>
            {/* コマンド入力を表示 */}
            <CommandInput
                handleKeyDown={handleKeyDown}
                input={input}
                inputRef={inputRef}
                mode={mode}
                setInput={setInput}
                isInputEnabled={isInputEnabled}
            />
        </div>
    );
};

export default BackgroundConsole;
