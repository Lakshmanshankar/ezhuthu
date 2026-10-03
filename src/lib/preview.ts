import { type State, step } from "./engine";
import * as T from "./tamil99";

export interface KeyPreview {
	ins: string; // what gets appended: 'ா', '்க', 'அ'
	cap: string; // what the keycap shows: 'கா', 'க்க', 'ஆ'
	noop: boolean; // true if the key adds nothing (e.g. அ  after a consonant)
	kind: "consonant" | "vowel" | "pulli";
}

const KEY_KINDS: [string, KeyPreview["kind"]][] = [
	...Object.keys(T.CONSONANTS).map(
		(c) => [c, "consonant"] as [string, "consonant"],
	),
	...Object.keys(T.VOWELS).map((c) => [c, "vowel"] as [string, "vowel"]),
	[T.PULLI_KEY, "pulli"],
];

const PENDING_STATES: (string | null)[] = [
	null,
	...new Set(Object.values(T.CONSONANTS)),
];

const TABLE = new Map<string | null, Record<string, KeyPreview>>();

for (const pending of PENDING_STATES) {
	const row: Record<string, KeyPreview> = {};
	for (const [code, kind] of KEY_KINDS) {
		const r = step({ pending }, code);
		if (!r) continue;
		let cap = r.ins;
		if (pending) {
			if (kind === "vowel" && r.ins !== "") {
				cap = pending + r.ins;
			} else if (kind === "vowel" && r.ins === "") {
				cap = pending;
			} else if (kind === "consonant") {
				cap = T.CONSONANTS[code];
			} else if (kind === "pulli") {
				cap = pending + r.ins;
			}
		}

		row[code] = {
			ins: r.ins,
			cap,
			noop: pending !== null && r.ins === "",
			kind,
		};
	}
	TABLE.set(pending, row);
}

// biome-ignore lint/style/noNonNullAssertion:  false positive
export const previewFor = (s: State) => TABLE.get(s.pending)!;
