import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handleMixingTrouble = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Mixing, USAGE_TEXTS.MIXING_TROUBLE);
};
