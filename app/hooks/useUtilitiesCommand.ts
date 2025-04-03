import { useCallback, useContext } from "react";
import { LogLevel, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { UtilitiesCommands } from "../utils/Command";
import { USAGE_UNKNOWN_UTILITIES_COMMAND } from "../utils/usage/usageUtilities";

export const useUtilitiesCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const fooExec = useCallback(() => {}, []);

    return (cmd: UtilitiesCommands) => {
        switch (cmd) {
            case UtilitiesCommands.ENABLE:
                fooExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_UTILITIES_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
