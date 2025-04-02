import { UtilitiesCommands } from "../utils/Command";
import { LogLevel } from "../utils/Command";

export const useUtilitiesCommand = (
	addOutput: (message: string, level?: LogLevel) => void,
) => {
	return (cmd: UtilitiesCommands, ...args: string[]) => {
		switch (cmd) {
			case UtilitiesCommands.ENABLE:
				addOutput("Utility enabled.", LogLevel.INFO);
				break;
			case UtilitiesCommands.DISABLE:
				addOutput("Utility disabled.");
				break;
			default:
				addOutput(`Unknown utilities command: ${cmd}`, LogLevel.ERROR);
		}
	};
};
