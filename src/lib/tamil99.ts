import type { KeyboardLayout } from "@/components/keyboard/Keyboard";

// TODO: Grantha letter combinations, SHIFT combinations
// Tamil99 Layout mapped to standard QWERTY physical keys
export const tamil99Layout: KeyboardLayout = [
	[
		{ id: "Backquote", label: "`", subLabel: "~" },
		{ id: "Digit1", label: "1", subLabel: "௧" },
		{ id: "Digit2", label: "2", subLabel: "௨" },
		{ id: "Digit3", label: "3", subLabel: "௩" },
		{ id: "Digit4", label: "4", subLabel: "௪" },
		{ id: "Digit5", label: "5", subLabel: "௫" },
		{ id: "Digit6", label: "6", subLabel: "௬" },
		{ id: "Digit7", label: "7", subLabel: "௭" },
		{ id: "Digit8", label: "8", subLabel: "௮" },
		{ id: "Digit9", label: "9", subLabel: "௯" },
		{ id: "Digit0", label: "0", subLabel: "௰" },
		{ id: "Minus", label: "-", subLabel: "௱" },
		{ id: "Equal", label: "=", subLabel: "௲" },
		{ id: "Backspace", label: "Backspace", width: 2 },
	],
	[
		{ id: "Tab", label: "Tab", width: 1.5 },
		{ id: "KeyQ", label: "ஆ", subLabel: "Q" },
		{ id: "KeyW", label: "ஈ", subLabel: "W" },
		{ id: "KeyE", label: "ஊ", subLabel: "E" },
		{ id: "KeyR", label: "ஐ", subLabel: "R" },
		{ id: "KeyT", label: "ஏ", subLabel: "T" },
		{ id: "KeyY", label: "ள", subLabel: "Y" },
		{ id: "KeyU", label: "ற", subLabel: "U" },
		{ id: "KeyI", label: "ன", subLabel: "I" },
		{ id: "KeyO", label: "ட", subLabel: "O" },
		{ id: "KeyP", label: "ண", subLabel: "P" },
		{ id: "BracketLeft", label: "ச", subLabel: "{" },
		{ id: "BracketRight", label: "ஞ", subLabel: "}" },
		{ id: "Backslash", label: "\\", subLabel: "|", width: 1.5 },
	],
	[
		{ id: "CapsLock", label: "Caps", width: 1.75 },
		{ id: "KeyA", label: "அ", subLabel: "A" },
		{ id: "KeyS", label: "இ", subLabel: "S" },
		{ id: "KeyD", label: "உ", subLabel: "D" },
		{ id: "KeyF", label: "்", subLabel: "F" },
		{ id: "KeyG", label: "எ", subLabel: "G" },
		{ id: "KeyH", label: "க", subLabel: "H" },
		{ id: "KeyJ", label: "ப", subLabel: "J" },
		{ id: "KeyK", label: "ம", subLabel: "K" },
		{ id: "KeyL", label: "த", subLabel: "L" },
		{ id: "Semicolon", label: "ந", subLabel: "ன" },
		{ id: "Quote", label: "ய", subLabel: '"' },
		{ id: "Enter", label: "Enter", width: 2.25 },
	],
	[
		{ id: "ShiftLeft", label: "Shift", width: 2.25 },
		{ id: "KeyZ", label: "ஔ", subLabel: "Z" },
		{ id: "KeyX", label: "ஓ", subLabel: "X" },
		{ id: "KeyC", label: "ஒ", subLabel: "C" },
		{ id: "KeyV", label: "வ", subLabel: "V" },
		{ id: "KeyB", label: "ங", subLabel: "B" },
		{ id: "KeyN", label: "ல", subLabel: "N" },
		{ id: "KeyM", label: "ர", subLabel: "M" },
		{ id: "Comma", label: ",", subLabel: "<" },
		{ id: "Period", label: ".", subLabel: ">" },
		{ id: "Slash", label: "ழ", subLabel: "?" },
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

export function getFallbackTamilChar(
	code: string,
	shiftKey: boolean,
): string | null {
	for (const row of tamil99Layout) {
		for (const key of row) {
			if (key.id === code) {
				if (shiftKey && key.subLabel && key.subLabel.length === 1) {
					return key.subLabel;
				}
				if (key.label.length === 1) {
					return key.label;
				}
			}
		}
	}
	return null;
}

export const CONSONANTS: Record<string, string> = {
	KeyH: "க",
	KeyB: "ங",
	BracketLeft: "ச",
	BracketRight: "ஞ",
	KeyO: "ட",
	KeyP: "ண",
	KeyL: "த",
	Semicolon: "ந",
	KeyJ: "ப",
	KeyK: "ம",
	Quote: "ய",
	KeyM: "ர",
	KeyN: "ல",
	KeyV: "வ",
	Slash: "ழ",
	KeyY: "ள",
	KeyU: "ற",
	KeyI: "ன",
} as const;

export const VOWELS: Record<string, string> = {
	KeyA: "அ",
	KeyQ: "ஆ",
	KeyS: "இ",
	KeyW: "ஈ",
	KeyD: "உ",
	KeyE: "ஊ",
	KeyG: "எ",
	KeyT: "ஏ",
	KeyR: "ஐ",
	KeyC: "ஒ",
	KeyX: "ஓ",
	KeyZ: "ஔ",
} as const;

export const PULLI_KEY = "KeyF";
export const PULLI_CHAR = "்";
export const VOWEL_SIGNS: Record<string, string> = {
	KeyQ: "ா",
	KeyS: "ி",
	KeyW: "ீ",
	KeyD: "ு",
	KeyE: "ூ",
	KeyG: "ெ",
	KeyT: "ே",
	KeyR: "ை",
	KeyC: "ொ",
	KeyX: "ோ",
	KeyZ: "ௌ",
} as const;
