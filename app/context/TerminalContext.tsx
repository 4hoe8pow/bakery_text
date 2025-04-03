"use client";

import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    type BreadCookingStatus,
    type BreadType,
    TerminalSectionId,
    type UsageCode,
} from "../bt.types";
import { mapAndUpdate } from "../utils/news";

interface TerminalPosition {
    x: number;
    y: number;
    z: number;
}

export interface News {
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

export interface Bread {
    id: string;
    kind: BreadType;
    cookStatus: BreadCookingStatus;
}

export type TerminalStatus = "HEALTHY" | "ANOMALY";
export type TransactionType = "income" | "expense";

interface TerminalStatusText {
    terminalStatus: TerminalStatus;
    sectionText: string;
}

export interface Terminal {
    id: TerminalSectionId;
    position: TerminalPosition;
    statusText: TerminalStatusText;
    news: News[];
    visible: boolean;
    progress: number;
    troubleProbability: number;
}

export interface TerminalContextType {
    terminals: Terminal[];
    cash: number;
    repository: Ingredient;
    ingredientCost: Ingredient;
    language: "ja" | "en";
    bread: Bread[];
    setLanguage: (lang: "ja" | "en") => void;
    updateLanguage: (lang: "ja" | "en") => void;
    updateCash: (type: TransactionType, amount: number) => void;
    updateTerminalPosition: (
        id: TerminalSectionId,
        position: TerminalPosition,
    ) => void;
    activateTerminal: (id: TerminalSectionId) => void;
    deactivateTerminal: (id: TerminalSectionId) => void;
    addNews: (id: TerminalSectionId, usage: UsageCode) => void;
    updateProgress: (id: TerminalSectionId, progress: number) => void;
    updateRepository: (
        isRestock: boolean,
        stock: Partial<Ingredient>,
    ) => boolean;
    updateIngredientCost: (cost: Partial<Ingredient>) => void;
    updateTerminalStatus: (
        id: TerminalSectionId,
        statusText: TerminalStatusText,
    ) => void;
    resetGame: () => void;
    updateTroubleProbability: (
        id: TerminalSectionId,
        probability: number,
    ) => void;
    updateBread: (updatedBread: Bread[]) => void;
}

const DEFAULT_CASH = 1_000.0;

const DEFAULT_INGREDIENT: Ingredient = {
    flour: 100_000.0,
    yeast: 10_000.0,
    salt: 10_000.0,
    butter: 10_000.0,
    sugar: 10_000.0,
    milk: 10_000.0,
    redBeanPaste: 10_000.0,
    malt: 10_000.0,
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
    const [repository, setRepository] =
        useState<Ingredient>(DEFAULT_INGREDIENT);
    const [ingredientCost, setIngredientCost] = useState<Ingredient>(
        DEFAULT_INGREDIENT_COST,
    );
    const [language, setLanguage] = useState<"ja" | "en">("ja");
    const [bread, setBread] = useState<Bread[]>([]); // 作業途中のパンの状態

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
            setTerminals((prev) => {
                const maxZIndex = Math.max(0, ...prev.map((t) => t.position.z));
                return prev.map((terminal) =>
                    terminal.id === id
                        ? {
                              ...terminal,
                              position: { ...position, z: maxZIndex + 1 },
                          }
                        : terminal,
                );
            });
        },
        [],
    );

    const addTerminal = useCallback((id: TerminalSectionId) => {
        const getDescription = (id: TerminalSectionId): string => {
            switch (id) {
                case TerminalSectionId.Purchasing:
                    return "This is where you purchase ingredients!";
                case TerminalSectionId.Pantry:
                    return "This is where you store ingredients!";
                case TerminalSectionId.Mixing:
                    return "This is where you mix ingredients to make dough!";
                case TerminalSectionId.Cooling:
                    return "This is where dough is fermented and cooled!";
                case TerminalSectionId.Shaping:
                    return "This is where dough is shaped!";
                case TerminalSectionId.Baking:
                    return "This is where dough is baked into bread!";
                case TerminalSectionId.Packaging:
                    return "This is where bread is packaged!";
                case TerminalSectionId.SalesFront:
                    return "This is where bread is sold!";
                case TerminalSectionId.Waste:
                    return "This is where waste is managed!";
                case TerminalSectionId.Utilities:
                    return "This is where water, electricity, and gas are managed!";
                default:
                    return "This is an undefined area!";
            }
        };

        setTerminals((prev) => {
            if (prev.some((terminal) => terminal.id === id)) return prev;
            const maxZIndex = Math.max(0, ...prev.map((t) => t.position.z));
            return [
                ...prev,
                {
                    id,
                    position: {
                        x: 100 + id * 50,
                        y: 100 + id * 50,
                        z: maxZIndex + 1,
                    },
                    statusText: { terminalStatus: "HEALTHY", sectionText: "" },
                    news: [
                        {
                            id: uuidv4(),
                            datetime: new Date(),
                            description: getDescription(id),
                        },
                    ],
                    visible: false,
                    progress: 0,
                    troubleProbability: 0.1,
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

    const addNews = useCallback(
        (id: TerminalSectionId, usage: UsageCode) => {
            const localizedDescription =
                language === "en" && usage.en ? usage.en : usage.ja;
            setTerminals((prev) =>
                mapAndUpdate(prev, id, localizedDescription),
            );
        },
        [language],
    );

    const updateProgress = useCallback(
        (id: TerminalSectionId, progress: number) => {
            setTerminals((prev) =>
                prev.map((terminal) =>
                    terminal.id === id
                        ? {
                              ...terminal,
                              progress: progress >= 100 ? 0 : progress,
                          }
                        : terminal,
                ),
            );
        },
        [],
    );

    const updateRepository = useCallback(
        (isRestock: boolean, stock: Partial<Ingredient>): boolean => {
            let isSuccess = true;

            setRepository((prev) => {
                const updatedRepository = { ...prev };

                for (const [key, value] of Object.entries(stock)) {
                    const ingredientKey = key as keyof Ingredient;
                    const newValue =
                        prev[ingredientKey] +
                        (isRestock ? (value ?? 0) : -(value ?? 0));

                    if (!isRestock && newValue < 0) {
                        isSuccess = false;
                        return prev; // 計算中止
                    }

                    updatedRepository[ingredientKey] = Math.max(newValue, 0);
                }

                return updatedRepository;
            });

            return isSuccess;
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

    const updateLanguage = useCallback((lang: "ja" | "en") => {
        setLanguage(lang);
    }, []);

    const updateTroubleProbability = useCallback(
        (id: TerminalSectionId, probability: number) => {
            setTerminals((prev) =>
                prev.map((terminal) =>
                    terminal.id === id
                        ? { ...terminal, troubleProbability: probability }
                        : terminal,
                ),
            );
        },
        [],
    );

    const updateBread = useCallback((updatedBread: Bread[]) => {
        setBread(updatedBread);
    }, []);

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
                language,
                bread,
                setLanguage,
                updateLanguage,
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
                updateTroubleProbability,
                updateBread,
            }}
        >
            {children}
        </TerminalContext.Provider>
    );
};
export { TerminalSectionId };
