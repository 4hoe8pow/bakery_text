export type UsageCode = {
    ja: string;
    en?: string;
};

export enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
}

export enum TerminalSectionId {
    Purchasing = 0,
    Pantry = 1,
    Mixing = 2,
    Cooling = 3,
    Shaping = 4,
    Baking = 5,
    Packaging = 6,
    SalesFront = 7,
    Waste = 8,
    Utilities = 9,
}

export enum BreadType {
    Croissant = 0,
    Anpan = 1,
    Begguette = 2,
    Ciabatta = 3,
    Naan = 4,
    Begal = 5,
}

export enum BreadCookingStatus {
    Raw = 0, // 材料を混ぜただけの状態（未発酵）
    FirstProofed = 1, // 一次発酵済み
    Shaped = 2, // 成型済み（二次発酵前）
    SecondProofed = 3, // 二次発酵済み
    Baked = 4, // 焼成済み
    Packaged = 5, // 包装済み（完成）
    Shelved = 6, // 陳列中（販売中）
    Sold = 7, // 販売済み
    Discarded = 8, // 廃棄済み
}
