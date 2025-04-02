"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { type Terminal, TerminalContext } from "../context/TerminalContext";
import { TerminalSectionId } from "../utils/Command";
import { ProgressIndicator } from "./ProgressIndicator";

export const MyTerminalWindow = ({
	id,
	position: initialPosition,
	news,
}: Terminal) => {
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

				// 新しい位置を計算
				let newX = e.clientX - dragStartPos.current.x;
				let newY = e.clientY - dragStartPos.current.y;

				// 画面からはみ出さないように制限
				newX = Math.max(0, Math.min(newX, windowWidth - windowWidthElement));
				newY = Math.max(0, Math.min(newY, windowHeight - windowHeightElement));

				setPosition({
					x: newX,
					y: newY,
					z: position.z,
				});
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
			>
				<div
					className={`title-bar cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
					onMouseDown={handleMouseDown}
				>
					<div className="title-bar-text">Terminal {TerminalSectionId[id]}</div>
					<div className="title-bar-controls">
						<button
							type="button"
							aria-label="Minimize"
							onClick={() => setIsMinimized(true)}
						/>
						<button
							type="button"
							aria-label="Maximize"
							onClick={() => setIsMinimized(false)}
						/>
						<button
							type="button"
							aria-label="Close"
							onClick={() => deactivateTerminal(id)}
						/>
					</div>
				</div>
				{!isMinimized && (
					<div className="window-body max-h-[278px] w-[450px] overflow-y-scroll">
						{news.map((item) => (
							<div key={item.id} className="flex flex-row space-x-4">
								<p>[&nbsp;{item.datetime.toISOString()}&nbsp;]</p>
								<strong>{item.description}</strong>
							</div>
						))}
					</div>
				)}
				<div className="status-bar">
					<p className="status-bar-field">
						{terminal.statusText.terminalStatus === "HEALTHY" ? (
							<span className="text-lime-300 mr-2">✔</span>
						) : (
							<span className="text-lime-900 mr-2">✖</span>
						)}
						{terminal.statusText.terminalStatus}
					</p>
					<p className="status-bar-field">{terminal.statusText.sectionText}</p>
				</div>
				{terminal.progress > 0 && (
					<ProgressIndicator progress={terminal.progress} />
				)}
			</div>
		)
	);
};
