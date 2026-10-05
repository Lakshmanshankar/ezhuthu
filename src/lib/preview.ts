import { type State, step } from "./engine";
import * as T from "./tamil99";

export interface KeyPreview {
	ins: string; // what gets appended: 'ா', '்க', 'அ'
	cap: string; // what the keycap shows: 'கா', 'க்க', 'ஆ'
	noop: boolean; // true if the key adds nothing
}

const PENDING_STATES: (string | null)[] = [
	null,
	...new Set([
		...Object.values(T.CONSONANTS),
		...Object.values(T.GRANTHA_CONSONANTS),
	]),
];

const TABLE = new Map<string | null, Record<string, KeyPreview>>();

// All active codes in tamil99
const ALL_CODES = new Set([
	...Object.keys(T.CONSONANTS),
	...Object.keys(T.VOWELS),
	T.PULLI_KEY,
]);

for (const pending of PENDING_STATES) {
	const row: Record<string, KeyPreview> = {};
	for (const code of ALL_CODES) {
		const r = step({ pending }, code, false);
		if (r) {
			let cap = r.ins;
			const isVowelSign =
				code in T.VOWELS &&
				pending !== null &&
				r.ins !== "" &&
				r.ins !== T.VOWELS[code];
			const isPulli = code === T.PULLI_KEY && pending !== null;

			if (pending) {
				if (isVowelSign) {
					if (pending === T.SHRI_CHAR) {
						// special case: No vowel sign for "ஸ்ரீ"
						cap = T.VOWELS[code];
					} else {
						cap = pending + r.ins;
					}
				} else if (code in T.VOWELS && r.ins === "") {
					cap = pending;
				} else if (code in T.CONSONANTS) {
					cap = T.CONSONANTS[code];
				} else if (isPulli) {
					cap = pending + r.ins;
				}
			}
			row[code] = {
				ins: r.ins,
				cap,
				noop: pending !== null && r.ins === "",
			};
		}
	}
	TABLE.set(pending, row);
}

export const previewFor = (s: State) =>
	// biome-ignore lint/style/noNonNullAssertion: false positive
	TABLE.get(s.pending) || TABLE.get(null)!;
