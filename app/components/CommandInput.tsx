import { useContext, useEffect } from "react";
import { TerminalSectionId } from "../utils/Command";
import { TerminalContext } from "../context/TerminalContext";

// コマンド入力を処理するコンポーネント
export const CommandInput = ({
	input,
	mode,
	setInput,
	handleKeyDown,
	inputRef,
	isInputEnabled,
}: {
	input: string;
	mode: TerminalSectionId;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	handleKeyDown: (e: React.KeyboardEvent) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	isInputEnabled: boolean;
}) => {
	const context = useContext(TerminalContext);
	if (!context) {
		throw new Error("TerminalContext is not available");
	}

	const { cash } = context;
	// 入力フィールドにフォーカス
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			e.preventDefault();
			inputRef.current?.focus();
		};

		if (isInputEnabled && inputRef.current) {
			inputRef.current.focus();
		}

		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [inputRef, isInputEnabled]);

	return (
		<div className="flex w-full font-bold">
			<span className={isInputEnabled ? "text-white" : "text-gray-400"}>
				~&gt;&nbsp;{cash}&nbsp;@{TerminalSectionId[mode].toUpperCase()}
				&nbsp;$&nbsp;
			</span>
			<input
				ref={inputRef}
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				className="flex-grow !bg-[#0a0a0a] !shadow-none caret-green-500"
				disabled={!isInputEnabled}
			/>
		</div>
	);
};
