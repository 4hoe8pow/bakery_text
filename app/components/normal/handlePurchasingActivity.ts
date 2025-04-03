import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handlePurchasingActivity = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Purchasing, USAGE_TEXTS.PURCHASING_ACTIVITY);
};
