import { useCallback, useContext } from "react";
import { LogLevel, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { BakingCommands } from "../utils/Command";
import { USAGE_UNKNOWN_BAKING_COMMAND } from "../utils/usage/usageBaking";

export const useBakingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const bakeExec = useCallback(() => {}, []);

    return (cmd: BakingCommands) => {
        switch (cmd) {
            case BakingCommands.BAKE:
                bakeExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_BAKING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
