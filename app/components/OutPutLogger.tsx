import { useRef, useEffect } from "react";
import { LogLevel } from "../utils/Command";
import type { LogProps } from "./BackgroundConsole";
import { v4 as uuidv4 } from "uuid";

// 出力ログを表示するコンポーネント
export const OutputLogger = ({ output }: { output: LogProps[] }) => {
	const outputRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [output.length]);

	return (
		<div className="h-full overflow-y-auto">
			{output.map(({ message, level }) => (
				<div
					key={uuidv4()}
					className={`py-0.5 ${level === LogLevel.INFO ? "text-green-500" : level === LogLevel.WARN ? "text-amber-200" : "text-red-500"}`}
				>
					{message}
				</div>
			))}
			{/* スクロール用ダミー */}
			<div ref={outputRef} />
		</div>
	);
};
