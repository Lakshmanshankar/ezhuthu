import { useEffect, useState } from "react";
import { Keyboard } from "./components/keyboard/Keyboard";
import { ModeToggle } from "./components/settings/mode-toggle";
import { tamil99Layout } from "./lib/tamil99";

export function TypingPage() {
	const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			setActiveKeys((prev) => {
				const next = new Set(prev);
				next.add(e.code);
				return next;
			});
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			setActiveKeys((prev) => {
				const next = new Set(prev);
				next.delete(e.code);
				return next;
			});
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
			<div className="w-full max-w-4xl space-y-8">
				<div className="text-center space-y-2">
					<ModeToggle />
					<h1 className="text-4xl font-bold text-foreground">Tamil Typing</h1>
					<p className="text-muted-foreground">
						Practice Tamil99 typing (Engine coming soon)
					</p>
				</div>

				{/* Placeholder for text display */}
				<div className="p-8 border rounded-lg bg-card text-card-foreground text-2xl font-medium tracking-wide leading-relaxed min-h-32 flex items-center justify-center">
					The text to type will appear here.
				</div>

				{/* The Keyboard visualizer */}
				<Keyboard layout={tamil99Layout} activeKeys={activeKeys} />
			</div>
		</div>
	);
}
