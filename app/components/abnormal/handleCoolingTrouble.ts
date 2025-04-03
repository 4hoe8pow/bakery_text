import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handleCoolingTrouble = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Cooling, USAGE_TEXTS.COOLING_TROUBLE);
};
