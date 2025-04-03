import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handleUtilitiesActivity = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Utilities, USAGE_TEXTS.UTILITIES_ACTIVITY);
};
