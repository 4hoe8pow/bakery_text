"use client";

import { useContext } from "react";
import { BackgroundConsole } from "./components/BackgroundConsole";
import { MyTerminalWindow } from "./components/MyTerminalWindow";
import { TerminalProvider } from "./context/TerminalContext";
import { TerminalContext } from "./context/TerminalContext";

export default function Home() {
	return (
		<TerminalProvider>
			<BackgroundConsole />
			<TerminalWindows />
		</TerminalProvider>
	);
}

const TerminalWindows = () => {
	const { terminals } = useContext(TerminalContext) ?? { terminals: [] };
	return (
		<>
			{terminals.map((terminal) => (
				<MyTerminalWindow
					{...terminal}
					key={terminal.id}
					zIndex={0}
					visible={false}
					progress={0}
				/>
			))}
		</>
	);
};
