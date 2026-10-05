import { cn } from "@/lib/utils";

export type KeyDefinition = {
	id: string; // Physical key code like "KeyA", "Space", "Enter"
	label: string; // Primary label
	subLabel?: string; // Shift state or secondary label
	width?: number; // Relative width (default 1)
	noop?: boolean; // Whether the key action is a no-op currently
};

export type KeyboardLayout = KeyDefinition[][];

// Standard QWERTY physical layout mapping for visual reference
export const defaultLayout: KeyboardLayout = [
	[
		{ id: "Backquote", label: "`", subLabel: "~" },
		{ id: "Digit1", label: "1", subLabel: "!" },
		{ id: "Digit2", label: "2", subLabel: "@" },
		{ id: "Digit3", label: "3", subLabel: "#" },
		{ id: "Digit4", label: "4", subLabel: "$" },
		{ id: "Digit5", label: "5", subLabel: "%" },
		{ id: "Digit6", label: "6", subLabel: "^" },
		{ id: "Digit7", label: "7", subLabel: "&" },
		{ id: "Digit8", label: "8", subLabel: "*" },
		{ id: "Digit9", label: "9", subLabel: "(" },
		{ id: "Digit0", label: "0", subLabel: ")" },
		{ id: "Minus", label: "-", subLabel: "_" },
		{ id: "Equal", label: "=", subLabel: "+" },
		{ id: "Backspace", label: "Backspace", width: 2 },
	],
	[
		{ id: "Tab", label: "Tab", width: 1.5 },
		{ id: "KeyQ", label: "q", subLabel: "Q" },
		{ id: "KeyW", label: "w", subLabel: "W" },
		{ id: "KeyE", label: "e", subLabel: "E" },
		{ id: "KeyR", label: "r", subLabel: "R" },
		{ id: "KeyT", label: "t", subLabel: "T" },
		{ id: "KeyY", label: "y", subLabel: "Y" },
		{ id: "KeyU", label: "u", subLabel: "U" },
		{ id: "KeyI", label: "i", subLabel: "I" },
		{ id: "KeyO", label: "o", subLabel: "O" },
		{ id: "KeyP", label: "p", subLabel: "P" },
		{ id: "BracketLeft", label: "[", subLabel: "{" },
		{ id: "BracketRight", label: "]", subLabel: "}" },
		{ id: "Backslash", label: "\\", subLabel: "|", width: 1.5 },
	],
	[
		{ id: "CapsLock", label: "Caps", width: 1.75 },
		{ id: "KeyA", label: "a", subLabel: "A" },
		{ id: "KeyS", label: "s", subLabel: "S" },
		{ id: "KeyD", label: "d", subLabel: "D" },
		{ id: "KeyF", label: "f", subLabel: "F" },
		{ id: "KeyG", label: "g", subLabel: "G" },
		{ id: "KeyH", label: "h", subLabel: "H" },
		{ id: "KeyJ", label: "j", subLabel: "J" },
		{ id: "KeyK", label: "k", subLabel: "K" },
		{ id: "KeyL", label: "l", subLabel: "L" },
		{ id: "Semicolon", label: ";", subLabel: ":" },
		{ id: "Quote", label: "'", subLabel: '"' },
		{ id: "Enter", label: "Enter", width: 2.25 },
	],
	[
		{ id: "ShiftLeft", label: "Shift", width: 2.25 },
		{ id: "KeyZ", label: "z", subLabel: "Z" },
		{ id: "KeyX", label: "x", subLabel: "X" },
		{ id: "KeyC", label: "c", subLabel: "C" },
		{ id: "KeyV", label: "v", subLabel: "V" },
		{ id: "KeyB", label: "b", subLabel: "B" },
		{ id: "KeyN", label: "n", subLabel: "N" },
		{ id: "KeyM", label: "m", subLabel: "M" },
		{ id: "Comma", label: ",", subLabel: "<" },
		{ id: "Period", label: ".", subLabel: ">" },
		{ id: "Slash", label: "/", subLabel: "?" },
		{ id: "ShiftRight", label: "Shift", width: 2.75 },
	],
	[
		{ id: "ControlLeft", label: "Ctrl", width: 1.5 },
		{ id: "MetaLeft", label: "Win", width: 1.25 },
		{ id: "AltLeft", label: "Alt", width: 1.25 },
		{ id: "Space", label: "", width: 6.25 },
		{ id: "AltRight", label: "Alt", width: 1.25 },
		{ id: "MetaRight", label: "Win", width: 1.25 },
		{ id: "ContextMenu", label: "Menu", width: 1.25 },
		{ id: "ControlRight", label: "Ctrl", width: 1.5 },
	],
];

export interface KeyboardProps {
	layout?: KeyboardLayout;
	activeKeys?: Set<string>;
	targetKey?: string; // The key the user is supposed to type next
}

export function Keyboard({
	layout = defaultLayout,
	activeKeys = new Set(),
	targetKey,
}: KeyboardProps) {
	return (
		<div className="flex flex-col gap-2 p-4 bg-muted/30 rounded-xl border border-border/50 w-full max-w-4xl mx-auto shadow-sm font-tamil">
			{layout.map((row, rowIndex) => (
				<div
					key={row[0]?.id || `row-${rowIndex}`}
					className="flex gap-2 justify-center w-full"
				>
					{row.map((key) => {
						const isActive = activeKeys.has(key.id);
						const isTarget = targetKey === key.id;

						return (
							<div
								key={key.id}
								className={cn(
									"relative flex flex-col justify-center items-center rounded-md border shadow-xs transition-colors duration-75 min-w-10 h-12 text-sm select-none",
									isActive
										? "bg-accent text-primary border-accent shadow-inner scale-[0.98]"
										: isTarget
											? "bg-accent border-accent-foreground/10 text-primary-foreground animate-pulse"
											: "bg-background text-foreground border-border",
									key.label.length > 1 &&
										!/[\u0B80-\u0BFF]/.test(key.label) &&
										"text-xs px-2 text-muted-foreground",
									key.noop && "opacity-40",
								)}
								style={{
									flexGrow: key.width || 1,
									flexBasis: `${(key.width || 1) * 2.5}rem`,
								}}
							>
								{key.subLabel && (
									<span className="absolute top-1 left-2 text-[0.65rem] opacity-60">
										{key.subLabel}
									</span>
								)}
								<span
									className={cn(key.subLabel && "absolute bottom-1 right-2")}
								>
									{key.label}
								</span>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
