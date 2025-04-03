import { useCallback, useContext } from "react";
import { LogLevel, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { MixingCommands } from "../utils/Command";
import { USAGE_UNKNOWN_MIXING_COMMAND } from "../utils/usage/usageMixing";

export const useMixingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const mixExec = useCallback(() => {}, []);

    return (cmd: MixingCommands) => {
        switch (cmd) {
            case MixingCommands.START:
                mixExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_MIXING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
