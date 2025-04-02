interface ProgressIndicatorProps {
	progress: number;
}

export const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
	return (
		<div className="progress-indicator segmented">
			<span
				className="progress-indicator-bar"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};
