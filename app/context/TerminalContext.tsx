"use client";

import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { TerminalSectionId } from "../utils/Command";
import { v4 as uuidv4 } from "uuid";

interface TerminalPosition {
	x: number;
	y: number;
	z: number;
}

interface News {
	id: string;
	datetime: Date;
	description: string;
}

export interface Ingredient {
	flour: number;
	yeast: number;
	salt: number;
	butter: number;
	sugar: number;
	milk: number;
	redBeanPaste: number;
	malt: number;
}

export type TerminalStatus = "HEALTHY" | "NOT_HEALTHY";
export type TransactionType = "income" | "expense";

interface TerminalStatusText {
	terminalStatus: TerminalStatus;
	sectionText: string;
}

export interface Terminal {
	id: TerminalSectionId;
	position: TerminalPosition;
	zIndex: number;
	statusText: TerminalStatusText;
	news: News[];
	visible: boolean;
	progress: number;
}

export interface TerminalContextType {
	terminals: Terminal[];
	cash: number;
	repository: Ingredient;
	ingredientCost: Ingredient;
	updateCash: (type: TransactionType, amount: number) => void;
	updateTerminalPosition: (
		id: TerminalSectionId,
		position: TerminalPosition,
	) => void;
	activateTerminal: (id: TerminalSectionId) => void;
	deactivateTerminal: (id: TerminalSectionId) => void;
	addNews: (id: TerminalSectionId, description: string) => void;
	updateProgress: (id: TerminalSectionId, progress: number) => void;
	updateRepository: (isRestock: boolean, stock: Partial<Ingredient>) => void;
	updateIngredientCost: (cost: Partial<Ingredient>) => void;
	updateTerminalStatus: (
		id: TerminalSectionId,
		statusText: TerminalStatusText,
	) => void;
	resetGame: () => void;
}

// デフォルト値を定義
const DEFAULT_CASH = 10000.0;

const DEFAULT_INGREDIENT: Ingredient = {
	flour: 100.0,
	yeast: 10.0,
	salt: 10.0,
	butter: 10.0,
	sugar: 10.0,
	milk: 10.0,
	redBeanPaste: 10.0,
	malt: 10.0,
};

const DEFAULT_INGREDIENT_COST: Ingredient = {
	flour: 1.0,
	yeast: 1.0,
	salt: 1.0,
	butter: 1.0,
	sugar: 1.0,
	milk: 1.0,
	redBeanPaste: 1.0,
	malt: 1.0,
};

export const TerminalContext = createContext<TerminalContextType | undefined>(
	undefined,
);

export const TerminalProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [terminals, setTerminals] = useState<Terminal[]>([]);
	const [cash, setCash] = useState<number>(DEFAULT_CASH);
	const [repository, setRepository] = useState<Ingredient>(DEFAULT_INGREDIENT);
	const [ingredientCost, setIngredientCost] = useState<Ingredient>(
		DEFAULT_INGREDIENT_COST,
	);

	const updateCash = useCallback(
		(type: TransactionType, amount: number) => {
			if (type === "expense" && cash < amount) {
				throw new Error("Cash cannot be less than zero");
			}
			setCash((prevCash) =>
				type === "income" ? prevCash + amount : prevCash - amount,
			);
		},
		[cash],
	);

	const updateTerminalPosition = useCallback(
		(id: TerminalSectionId, position: TerminalPosition) => {
			setTerminals((prev) =>
				prev.map((terminal) =>
					terminal.id === id ? { ...terminal, position } : terminal,
				),
			);
		},
		[],
	);

	const addTerminal = useCallback((id: TerminalSectionId) => {
		setTerminals((prev) => {
			if (prev.some((terminal) => terminal.id === id)) return prev;
			const maxZIndex = Math.max(0, ...prev.map((t) => t.zIndex));
			return [
				...prev,
				{
					id,
					position: { x: 100 + id * 50, y: 100 + id * 50, z: maxZIndex + 1 },
					zIndex: maxZIndex + 1,
					statusText: { terminalStatus: "HEALTHY", sectionText: "" },
					news: [
						{
							id: uuidv4(),
							datetime: new Date(),
							description: "Welcome to Terminal!",
						},
					],
					visible: false,
					progress: 0,
				},
			];
		});
	}, []);

	const activateTerminal = useCallback((id: TerminalSectionId) => {
		setTerminals((prev) =>
			prev.map((terminal) =>
				terminal.id === id ? { ...terminal, visible: true } : terminal,
			),
		);
	}, []);

	const deactivateTerminal = useCallback((id: TerminalSectionId) => {
		setTerminals((prev) =>
			prev.map((terminal) =>
				terminal.id === id ? { ...terminal, visible: false } : terminal,
			),
		);
	}, []);

	const addNews = useCallback((id: TerminalSectionId, description: string) => {
		setTerminals((prev) =>
			prev.map((terminal) =>
				terminal.id === id
					? {
							...terminal,
							news: [
								...terminal.news,
								{ id: uuidv4(), datetime: new Date(), description },
							],
						}
					: terminal,
			),
		);
	}, []);

	const updateProgress = useCallback(
		(id: TerminalSectionId, progress: number) => {
			setTerminals((prev) =>
				prev.map((terminal) =>
					terminal.id === id
						? { ...terminal, progress: progress >= 100 ? 0 : progress }
						: terminal,
				),
			);
		},
		[],
	);

	const updateRepository = useCallback(
		(isRestock: boolean, stock: Partial<Ingredient>) => {
			setRepository((prev) => ({
				...prev,
				...Object.fromEntries(
					Object.entries(stock).map(([key, value]) => [
						key,
						Math.max(
							prev[key as keyof Ingredient] +
								(isRestock ? (value ?? 0) : -(value ?? 0)),
							0,
						),
					]),
				),
			}));
		},
		[],
	);

	const updateIngredientCost = useCallback((cost: Partial<Ingredient>) => {
		setIngredientCost((prev) => ({ ...prev, ...cost }));
	}, []);

	const updateTerminalStatus = useCallback(
		(id: TerminalSectionId, statusText: TerminalStatusText) => {
			setTerminals((prev) =>
				prev.map((terminal) =>
					terminal.id === id ? { ...terminal, statusText } : terminal,
				),
			);
		},
		[],
	);

	const resetGame = useCallback(() => {
		setTerminals([]);
		setCash(DEFAULT_CASH);
		setRepository(DEFAULT_INGREDIENT);
		setIngredientCost(DEFAULT_INGREDIENT_COST);

		const terminalIds = Object.values(TerminalSectionId).filter(
			(id) => typeof id === "number",
		) as TerminalSectionId[];

		for (const id of terminalIds) {
			addTerminal(id);
		}
	}, [addTerminal]);

	useEffect(() => {
		resetGame();
	}, [resetGame]);

	return (
		<TerminalContext.Provider
			value={{
				terminals,
				cash,
				repository,
				ingredientCost,
				updateCash,
				updateTerminalPosition,
				activateTerminal,
				deactivateTerminal,
				addNews,
				updateProgress,
				updateRepository,
				updateIngredientCost,
				updateTerminalStatus,
				resetGame,
			}}
		>
			{children}
		</TerminalContext.Provider>
	);
};
