import { useContext, useCallback } from "react";
import { PantryCommands, LogLevel } from "../utils/Command";
import { TerminalContext } from "../context/TerminalContext";

export const usePantryCommand = (
	addOutput: (message: string, level?: LogLevel) => void,
) => {
	const terminalContext = useContext(TerminalContext);

	const checkExec = useCallback(() => {
		if (!terminalContext) {
			addOutput("Error: Terminal context not available", LogLevel.ERROR);
			return;
		}

		const repository = terminalContext.repository;

		for (const [key, value] of Object.entries(repository)) {
			addOutput(`${key} = ${value.toFixed(3)} KG`, LogLevel.INFO);
		}
	}, [terminalContext, addOutput]);

	return (cmd: PantryCommands) => {
		switch (cmd) {
			case PantryCommands.CHECK:
				checkExec();
				break;
			default:
				addOutput(`Unknown pantry command: ${cmd}`, LogLevel.ERROR);
		}
	};
};
