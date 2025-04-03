import { useCallback, useContext } from "react";
import { LogLevel, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { CoolingCommands } from "../utils/Command";
import { USAGE_UNKNOWN_COOLING_COMMAND } from "../utils/usage/usageCooling";

export const useCoolingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const coolExec = useCallback(() => {}, []);

    return (cmd: CoolingCommands) => {
        switch (cmd) {
            case CoolingCommands.ACTIVATE:
                coolExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_COOLING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
