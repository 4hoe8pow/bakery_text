import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useContext,
} from "react";
import { TerminalContext } from "../context/TerminalContext";
import {
	LogLevel,
	PurchasingCommands,
	TerminalSectionId,
} from "../utils/Command";
import type { Ingredient } from "../context/TerminalContext";

export const usePurchasingCommand = (
	addOutput: (message: string, level?: LogLevel) => void,
	replaceOutput: (message: string, level?: LogLevel) => void,
	setIsInputEnabled: Dispatch<SetStateAction<boolean>>,
) => {
	const context = useContext(TerminalContext);
	if (!context) {
		throw new Error("TerminalContext is not available");
	}

	const buyExec = useCallback(
		async (itemStr: string, quantity: number) => {
			// itemStr が Ingredient のキーであるかをチェック
			if (!Object.keys(context.ingredientCost).includes(itemStr)) {
				addOutput(
					"Invalid item specified for 'buy' command. Please specify a valid ingredient.",
					LogLevel.ERROR,
				);
				return;
			}

			// itemStr を keyof Ingredient にキャスト
			const item = itemStr as keyof Ingredient;

			// 小計計算
			const costPerUnit = context.ingredientCost[item] ?? 0;
			const subtotal = costPerUnit * quantity;

			// 資金チェックと更新
			try {
				context.updateCash("expense", subtotal);
			} catch (error) {
				addOutput(
					`Insufficient funds to purchase ${quantity} kg of ${item}.`,
					LogLevel.ERROR,
				);
				return;
			}

			context.addNews(
				TerminalSectionId.Purchasing,
				`Purchased item: ${item}, Quantity: ${quantity}, Cost: $${subtotal.toFixed(2)}`,
			);

			let progress = 0;
			const spinner = ["／", "ー", "＼", "｜"];
			let spinnerIndex = 0;
			addOutput("");
			const updateProgress = () =>
				new Promise<void>((resolve) => {
					const intervalId = setInterval(() => {
						replaceOutput(`Purchasing... ${spinner[spinnerIndex]}`);

						progress += 10;
						context.updateProgress(TerminalSectionId.Purchasing, progress);
						spinnerIndex = (spinnerIndex + 1) % spinner.length;

						if (progress >= 100) {
							clearInterval(intervalId);
							resolve();
						}
					}, 500);
				});

			await updateProgress();

			// 在庫更新
			context.updateRepository(true, { [item]: quantity });

			// 完了メッセージ
			addOutput("Purchase completed.", LogLevel.INFO);

			context.addNews(
				TerminalSectionId.Pantry,
				`Purchased ${item}, ${quantity}kg added to stock.`,
			);
		},
		[addOutput, replaceOutput, context],
	);

	return useCallback(
		async (command: PurchasingCommands, ...args: string[]) => {
			switch (command) {
				case PurchasingCommands.BUY:
					setIsInputEnabled(false);
					await buyExec(args[0], Number.parseInt(args[1])); // 原料名と数量
					setIsInputEnabled(true);
					break;
				default:
					addOutput(`Unknown purchasing command: ${command}`, LogLevel.ERROR);
			}
		},
		[buyExec, setIsInputEnabled, addOutput],
	);
};
