import { describe, expect, it } from "vitest";
import { type State, step } from "./engine";
import { previewFor } from "./preview";
import * as T from "./tamil99";

describe("preview map", () => {
	const PENDING_STATES: (string | null)[] = [
		null,
		...new Set(Object.values(T.CONSONANTS)),
	];
	const KEYS = [
		...Object.keys(T.CONSONANTS),
		...Object.keys(T.VOWELS),
		T.PULLI_KEY,
	];

	it("typed output for every (pending, key) pair equals cap", () => {
		for (const pending of PENDING_STATES) {
			const state: State = { pending };
			const view = previewFor(state);

			for (const code of KEYS) {
				const previewEntry = view[code];
				const r = step(state, code);

				if (r) {
					const isConsonant = code in T.CONSONANTS;
					const isVowel = code in T.VOWELS;
					let expectedCap = r.ins;
					if (pending) {
						if (isVowel && r.ins !== "") {
							expectedCap = pending + r.ins;
						} else if (isVowel && r.ins === "") {
							expectedCap = pending;
						} else if (isConsonant) {
							expectedCap = T.CONSONANTS[code];
						} else if (code === T.PULLI_KEY) {
							expectedCap = pending + r.ins;
						}
					}
					expect(previewEntry.cap).toBe(expectedCap);
					expect(previewEntry.ins).toBe(r.ins);
				}
			}
		}
	});
});
