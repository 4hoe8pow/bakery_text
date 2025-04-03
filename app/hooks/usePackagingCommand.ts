import { useCallback, useContext } from "react";
import { LogLevel, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { PackagingCommands } from "../utils/Command";
import { USAGE_UNKNOWN_PACKAGING_COMMAND } from "../utils/usage/usagePackaging";

export const usePackagingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const packageExec = useCallback(() => {}, []);

    return (cmd: PackagingCommands) => {
        switch (cmd) {
            case PackagingCommands.SEAL:
                packageExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_PACKAGING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
