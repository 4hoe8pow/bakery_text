import type { TerminalContextType } from "@/app/context/TerminalContext";
import { handleBakingActivity } from "../components/normal/handleBakingActivity";
import { handleCoolingActivity } from "../components/normal/handleCoolingActivity";
import { handleMixingActivity as mixingActivityHandler } from "../components/normal/handleMixingActivity";
import { handlePackagingActivity } from "../components/normal/handlePackagingActivity";
import { handlePantryActivity } from "../components/normal/handlePantryActivity";
import { handlePurchasingActivity } from "../components/normal/handlePurchasingActivity";
import { handleSalesFrontActivity } from "../components/normal/handleSalesFrontActivity";
import { handleShapingActivity } from "../components/normal/handleShapingActivity";
import { handleUtilitiesActivity } from "../components/normal/handleUtilitiesActivity";
import { handleWasteActivity } from "../components/normal/handleWasteActivity";
import {} from "../utils/usage/usageMixing";

export const useNormalHandlers = (context: TerminalContextType) => {
    return {
        handlePurchasingActivity: () => handlePurchasingActivity(context),
        handlePantryActivity: () => handlePantryActivity(context),
        handleMixingActivity: () => mixingActivityHandler(context),
        handleCoolingActivity: () => handleCoolingActivity(context),
        handleShapingActivity: () => handleShapingActivity(context),
        handleBakingActivity: () => handleBakingActivity(context),
        handlePackagingActivity: () => handlePackagingActivity(context),
        handleSalesFrontActivity: () => handleSalesFrontActivity(context),
        handleWasteActivity: () => handleWasteActivity(context),
        handleUtilitiesActivity: () => handleUtilitiesActivity(context),
    };
};
