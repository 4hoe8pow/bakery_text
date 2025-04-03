"use client";

import { memo, useContext, useEffect, useRef, useState } from "react";
import { type Terminal, TerminalContext } from "../context/TerminalContext";
import { NewsContainer } from "./NewsContainer";
import { ProgressIndicator } from "./ProgressIndicator";
import { StatusBar } from "./StatusBar";
import { TitleBar } from "./TitleBar";

const TerminalWindow = ({ id, position: initialPosition, news }: Terminal) => {
	const terminalContext = useContext(TerminalContext);
	if (!terminalContext) return null;

	const { terminals, updateTerminalPosition, deactivateTerminal } =
		terminalContext;
	const terminal = terminals.find((t) => t.id === id);
	if (!terminal) return null;

	const [position, setPosition] = useState(initialPosition);
	const [isMinimized, setIsMinimized] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const dragStartPos = useRef({ x: 0, y: 0 });

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		dragStartPos.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	};

	const handleWindowMouseDown = () => {
		updateTerminalPosition(id, position); // ウィンドウ全体に触れたときにzIndexを更新
	};

	useEffect(() => {
		setPosition(initialPosition);
	}, [initialPosition]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			const windowElement = document.querySelector(".window");
			if (windowElement) {
				const windowWidthElement = windowElement.clientWidth;
				const windowHeightElement = windowElement.clientHeight;

				let newX = e.clientX - dragStartPos.current.x;
				let newY = e.clientY - dragStartPos.current.y;

				newX = Math.max(0, Math.min(newX, windowWidth - windowWidthElement));
				newY = Math.max(0, Math.min(newY, windowHeight - windowHeightElement));

				setPosition({ x: newX, y: newY, z: position.z });
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			updateTerminalPosition(id, {
				x: position.x,
				y: position.y,
				z: position.z,
			});
		};

		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [id, isDragging, position, updateTerminalPosition]);

	return (
		terminal.visible && (
			<div
				className="window absolute transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in"
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					zIndex: position.z,
				}}
				onMouseDown={handleWindowMouseDown}
			>
				<TitleBar
					isDragging={isDragging}
					handleMouseDown={handleMouseDown}
					setIsMinimized={setIsMinimized}
					deactivateTerminal={() => deactivateTerminal(id)}
					terminal={terminal}
				/>
				{!isMinimized && (
					<NewsContainer
						news={news}
						terminalStatus={terminal.statusText.terminalStatus}
					/>
				)}
				<StatusBar terminal={terminal} />
				{terminal.progress > 0 && (
					<ProgressIndicator progress={terminal.progress} />
				)}
			</div>
		)
	);
};

export default memo(TerminalWindow);
