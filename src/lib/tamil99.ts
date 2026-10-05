import type { KeyboardLayout } from "@/components/keyboard/Keyboard";

// TODO: Grantha letter combinations, SHIFT combinations
// Tamil99 Layout mapped to standard QWERTY physical keys
export const tamil99Layout: KeyboardLayout = [
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
		{ id: "KeyQ", label: "ஆ", subLabel: "ஸ" },
		{ id: "KeyW", label: "ஈ", subLabel: "ஷ" },
		{ id: "KeyE", label: "ஊ", subLabel: "ஜ" },
		{ id: "KeyR", label: "ஐ", subLabel: "ஹ" },
		{ id: "KeyT", label: "ஏ", subLabel: "க்ஷ" },
		{ id: "KeyY", label: "ள", subLabel: "ஸ்ரீ" },
		{ id: "KeyU", label: "ற", subLabel: "" },
		{ id: "KeyI", label: "ன", subLabel: "" },
		{ id: "KeyO", label: "ட", subLabel: "[" },
		{ id: "KeyP", label: "ண", subLabel: "]" },
		{ id: "BracketLeft", label: "ச", subLabel: "{" },
		{ id: "BracketRight", label: "ஞ", subLabel: "}" },
		{ id: "Backslash", label: "\\", subLabel: "|", width: 1.5 },
	],
	[
		{ id: "CapsLock", label: "Caps", width: 1.75 },
		{ id: "KeyA", label: "அ", subLabel: "௹" },
		{ id: "KeyS", label: "இ", subLabel: "௺" },
		{ id: "KeyD", label: "உ", subLabel: "௸" },
		{ id: "KeyF", label: "்", subLabel: "ஃ" },
		{ id: "KeyG", label: "எ", subLabel: "" },
		{ id: "KeyH", label: "க", subLabel: "" },
		{ id: "KeyJ", label: "ப", subLabel: "" },
		{ id: "KeyK", label: "ம", subLabel: '"' },
		{ id: "KeyL", label: "த", subLabel: ":" },
		{ id: "Semicolon", label: "ந", subLabel: ";" },
		{ id: "Quote", label: "ய", subLabel: "'" },
		{ id: "Enter", label: "Enter", width: 2.25 },
	],
	[
		{ id: "ShiftLeft", label: "Shift", width: 2.25 },
		{ id: "KeyZ", label: "ஔ", subLabel: "௳" },
		{ id: "KeyX", label: "ஓ", subLabel: "௴" },
		{ id: "KeyC", label: "ஒ", subLabel: "௵" },
		{ id: "KeyV", label: "வ", subLabel: "௶" },
		{ id: "KeyB", label: "ங", subLabel: "௷" },
		{ id: "KeyN", label: "ல", subLabel: "" },
		{ id: "KeyM", label: "ர", subLabel: "/" },
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
		{ id: "Backquote", label: "`", subLabel: "~" },
	],
];

export function getFallbackTamilChar(
	code: string,
	shiftKey: boolean,
): string | null {
	for (const row of tamil99Layout) {
		for (const key of row) {
			if (key.id === code) {
				if (shiftKey && key.subLabel) {
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

export const SHRI_CHAR = "ஸ்ரீ";

export const GRANTHA_CONSONANTS: Record<string, string> = {
	KeyQ: "ஸ",
	KeyW: "ஷ",
	KeyE: "ஜ",
	KeyR: "ஹ",
	KeyT: "க்ஷ",
	KeyY: SHRI_CHAR, // Special case: No, consonant + vowel sign
} as const;
