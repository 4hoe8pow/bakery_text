"use client";

import { useCallback, useContext, useEffect } from "react";
import { type Terminal, TerminalContext } from "../context/TerminalContext";
import { useAbnormalHandlers } from "../hooks/useAbnormalHandlers";
import { useNormalHandlers } from "../hooks/useNormalHandlers";
import TerminalWindowUnit from "./TerminalWindowUnit";

export const TerminalWindows = () => {
    const context = useContext(TerminalContext);
    if (!context) {
        return null;
    }
    const { terminals } = context;

    const abnormalHandlers = useAbnormalHandlers(context);
    const normalHandlers = useNormalHandlers(context);

    const handleTrouble = useCallback(
        (terminal: Terminal) => {
            switch (terminal.id) {
                case 0:
                    abnormalHandlers.handlePurchasingTrouble();
                    break;
                case 1:
                    abnormalHandlers.handlePantryTrouble();
                    break;
                case 2:
                    abnormalHandlers.handleMixingTrouble();
                    break;
                case 3:
                    abnormalHandlers.handleCoolingTrouble();
                    break;
                case 4:
                    abnormalHandlers.handleShapingTrouble();
                    break;
                case 5:
                    abnormalHandlers.handleBakingTrouble();
                    break;
                case 6:
                    abnormalHandlers.handlePackagingTrouble();
                    break;
                case 7:
                    abnormalHandlers.handleSalesFrontTrouble();
                    break;
                case 8:
                    abnormalHandlers.handleWasteTrouble();
                    break;
                case 9:
                    abnormalHandlers.handleUtilitiesTrouble();
                    break;
                default:
            }
        },
        [abnormalHandlers],
    );

    const handleNormalActivity = useCallback(
        (terminal: Terminal) => {
            switch (terminal.id) {
                case 0:
                    normalHandlers.handlePurchasingActivity();
                    break;
                case 1:
                    normalHandlers.handlePantryActivity();
                    break;
                case 2:
                    normalHandlers.handleMixingActivity();
                    break;
                case 3:
                    normalHandlers.handleCoolingActivity();
                    break;
                case 4:
                    normalHandlers.handleShapingActivity();
                    break;
                case 5:
                    normalHandlers.handleBakingActivity();
                    break;
                case 6:
                    normalHandlers.handlePackagingActivity();
                    break;
                case 7:
                    normalHandlers.handleSalesFrontActivity();
                    break;
                case 8:
                    normalHandlers.handleWasteActivity();
                    break;
                case 9:
                    normalHandlers.handleUtilitiesActivity();
                    break;
                default:
            }
        },
        [normalHandlers],
    );

    // FIXME
    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        terminals.forEach((terminal, index) => {
            const timer = setTimeout(() => {
                setInterval(() => {
                    handleNormalActivity(terminal);
                    if (Math.random() < terminal.troubleProbability) {
                        handleTrouble(terminal);
                    }
                }, 8000); // 8秒ごとに実行
            }, index * 1000); // 1秒ずつずらして開始
            timers.push(timer);
        });

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [terminals, handleTrouble, handleNormalActivity]);

    return (
        <>
            {terminals.map((terminal) => (
                <TerminalWindowUnit
                    key={terminal.id}
                    {...terminal}
                    visible={false}
                    progress={0}
                />
            ))}
        </>
    );
};
