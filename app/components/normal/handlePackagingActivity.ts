import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handlePackagingActivity = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Packaging, USAGE_TEXTS.PACKAGING_ACTIVITY);
};
