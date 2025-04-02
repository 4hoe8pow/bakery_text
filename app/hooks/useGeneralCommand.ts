import { useCallback, useContext } from "react";
import { TerminalContext } from "../context/TerminalContext";
import { GeneralCommands, LogLevel, TerminalSectionId } from "../utils/Command";

export const useGeneralCommand = (
	addOutput: (message: string, level?: LogLevel) => void,
	setMode: React.Dispatch<React.SetStateAction<TerminalSectionId>>,
) => {
	const context = useContext(TerminalContext);
	if (!context) {
		throw new Error("TerminalContext is not available");
	}

	const { terminals, updateTerminalPosition, activateTerminal } = context;

	const helpExec = useCallback(() => {
		addOutput("Here are the available commands:", LogLevel.WARN);
		addOutput("", LogLevel.WARN);
		addOutput("ls - List the names and IDs of all sections.", LogLevel.WARN);
		addOutput(
			"mode {id} - Switch to a different section. You must switch sections to access section-specific commands.",
			LogLevel.WARN,
		);
		addOutput(
			"term open {id} - Open a terminal. Enter an ID from 0 to 11, which you can find using the 'ls' command.",
			LogLevel.WARN,
		);
		addOutput(
			"term format - Arrange the open terminals neatly.",
			LogLevel.WARN,
		);
	}, [addOutput]);

	const lsExec = useCallback(() => {
		for (const [key, value] of Object.entries(TerminalSectionId)) {
			if (Number.isNaN(Number(key))) {
				addOutput(`-[ ${value} ] ${key}`, LogLevel.INFO);
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
								`Invalid Terminal ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
								LogLevel.ERROR,
							);
							break;
						}
						addOutput(
							`Activating Terminal: ${TerminalSectionId[terminalId].toUpperCase()}`,
							LogLevel.INFO,
						);
						activateTerminal(terminalId as TerminalSectionId);
					} else {
						addOutput("Missing ID for 'term open'", LogLevel.ERROR);
					}
					break;
				case "format": {
					const spacing = 81; // ターミナル間のスペース
					let currentY = 10; // 現在のY座標を追跡

					// 画面サイズを取得
					const screenWidth = window.innerWidth;

					// ターミナルをIDの昇順でソート
					const sortedTerminals = [...terminals].sort((a, b) => a.id - b.id);

					for (const terminal of sortedTerminals) {
						const newPosition = {
							x: screenWidth / 2,
							y: currentY,
							z: terminal.position.z,
						}; // 中央に配置
						updateTerminalPosition(terminal.id, newPosition);
						addOutput(
							`Updated Terminal ID: ${terminal.id} to Position: (${newPosition.x}, ${newPosition.y}, ${newPosition.z})`,
							LogLevel.INFO,
						);
						currentY += spacing;
					}
					addOutput("Terminals have been formatted", LogLevel.INFO);
					break;
				}
				default:
					addOutput(`Invalid term subcommand: ${subCommand}`, LogLevel.ERROR);
			}
		},
		[addOutput, terminals, updateTerminalPosition, activateTerminal],
	);

	const modeExec = useCallback(
		(id: string | undefined) => {
			if (id) {
				const modeId = Number(id);
				if (Number.isNaN(modeId) || !(modeId in TerminalSectionId)) {
					addOutput(
						`Invalid Mode ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
						LogLevel.ERROR,
					);
					return;
				}
				setMode(modeId); // モードを変更

				addOutput(
					`Mode changed to: ${TerminalSectionId[modeId].toUpperCase()}`,
					LogLevel.INFO,
				);
			} else {
				addOutput("Invalid or missing ID for 'mode'", LogLevel.ERROR);
			}
		},
		[addOutput, setMode],
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
				default:
					addOutput(`Unknown command: ${command}`, LogLevel.ERROR);
			}
		},
		[lsExec, termExec, modeExec, helpExec, addOutput],
	);
};
