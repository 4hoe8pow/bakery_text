import { useRef, useState } from "react";
import { useGeneralCommand } from "../hooks/useGeneralCommand";
import { usePurchasingCommand } from "../hooks/usePurchasingCommand";
import { useUtilitiesCommand } from "../hooks/useUtilitiesCommand";
import {
	BakingCommands,
	CoolingCommands,
	GeneralCommands,
	LogLevel,
	MixingCommands,
	PackagingCommands,
	PantryCommands,
	PurchasingCommands,
	QualityControlCommands,
	SalesFrontCommands,
	ShapingCommands,
	StorageCommands,
	TerminalSectionId,
	UtilitiesCommands,
	WasteCommands,
} from "../utils/Command";
import { CommandInput } from "./CommandInput";
import { OutputLogger } from "./OutPutLogger";
import { greeting } from "../utils/greeting";
import { usePantryCommand } from "../hooks/usePantryCommand";

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

	const addOutput = (message: string, level: LogLevel = LogLevel.INFO) =>
		setOutput((prev) => [...prev, { message: `| ${message}`, level }]);

	const replaceOutput = (message: string, level: LogLevel = LogLevel.INFO) => {
		setOutput((prevOutput) => {
			const updatedOutput = [...prevOutput];
			if (updatedOutput.length > 0) {
				updatedOutput[updatedOutput.length - 1] = {
					message: `| ${message}`,
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

	// コマンドを実行
	const handleExecuteCommand = (command: string) => {
		if (command.trim() === "") {
			addOutput(""); // 空行を追加
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
			{ commands: MixingCommands, mode: TerminalSectionId.Mixing },
			{ commands: CoolingCommands, mode: TerminalSectionId.Cooling },
			{ commands: ShapingCommands, mode: TerminalSectionId.Shaping },
			{ commands: BakingCommands, mode: TerminalSectionId.Baking },
			{ commands: PackagingCommands, mode: TerminalSectionId.Packaging },
			{
				commands: QualityControlCommands,
				mode: TerminalSectionId.QualityControl,
			},
			{ commands: StorageCommands, mode: TerminalSectionId.Storage },
			{ commands: SalesFrontCommands, mode: TerminalSectionId.SalesFront },
			{ commands: WasteCommands, mode: TerminalSectionId.Waste },
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
			const executor = "executor" in matched ? matched.executor : undefined;

			// モードが一致しない場合は警告を表示
			if (requiredMode !== null && mode !== requiredMode) {
				addOutput(
					`Command "${cmd}" is not allowed in the current mode.`,
					LogLevel.WARN,
				);
				return;
			}

			// 実行関数がある場合は実行
			if (executor) {
				executor(cmd as keyof typeof commands, ...args);
			}
		} else {
			addOutput(`Unknown command: ${cmd}`, LogLevel.ERROR);
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
				inputRef.current?.setSelectionRange(newInput.length, newInput.length);
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
		<div className="w-full max-h-screen text-white flex flex-col px-4">
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
