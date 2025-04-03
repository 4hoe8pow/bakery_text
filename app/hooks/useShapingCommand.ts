import { useCallback, useContext } from "react";
import { LogLevel, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { ShapingCommands } from "../utils/Command";
import { USAGE_UNKNOWN_SHAPING_COMMAND } from "../utils/usage/usageShaping";

export const useShapingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const shapeExec = useCallback(() => {}, []);

    return (cmd: ShapingCommands) => {
        switch (cmd) {
            case ShapingCommands.RESET:
                shapeExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_SHAPING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
