import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handleBakingTrouble = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Baking, USAGE_TEXTS.BAKING_TROUBLE);
};
