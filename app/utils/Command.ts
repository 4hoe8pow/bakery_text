export enum GeneralCommands {
	LS = "ls",
	TERM = "term",
	MODE = "mode",
	HELP = "help",
}

export enum PurchasingCommands {
	BUY = "buy",
}

export enum PantryCommands {
	CHECK = "check",
}

export enum MixingCommands {
	START = "start",
	STOP = "stop",
}

export enum CoolingCommands {
	ACTIVATE = "activate",
	DEACTIVATE = "deactivate",
}

export enum ShapingCommands {
	FORM = "form",
	RESET = "reset",
}

export enum BakingCommands {
	PREHEAT = "preheat",
	BAKE = "bake",
}

export enum PackagingCommands {
	WRAP = "wrap",
	SEAL = "seal",
}

export enum QualityControlCommands {
	INSPECT = "inspect",
	REPORT = "report",
}

export enum StorageCommands {
	STORE = "store",
	RETRIEVE = "retrieve",
}

export enum SalesFrontCommands {
	SELL = "sell",
	REFUND = "refund",
}

export enum WasteCommands {
	DISPOSE = "dispose",
	RECYCLE = "recycle",
}

export enum UtilitiesCommands {
	ENABLE = "enable",
	DISABLE = "disable",
}

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
	QualityControl = 7,
	Storage = 8,
	SalesFront = 9,
	Waste = 10,
	Utilities = 11,
}
