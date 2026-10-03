import * as T from "./tamil99";

export interface State {
	pending: string | null;
}

export function step(
	state: State,
	code: string,
): { ins: string; pending: string | null } | null {
	const isConsonant = code in T.CONSONANTS;
	const isVowel = code in T.VOWELS;
	const isPulli = code === T.PULLI_KEY;

	if (isConsonant) {
		const char = T.CONSONANTS[code];
		return { ins: char, pending: char };
	}

	if (isVowel) {
		if (state.pending !== null) {
			if (code === "KeyA") {
				return { ins: "", pending: null };
			}
			return { ins: T.VOWEL_SIGNS[code], pending: null };
		} else {
			return { ins: T.VOWELS[code], pending: null };
		}
	}

	if (isPulli) {
		if (state.pending !== null) {
			return { ins: T.PULLI_CHAR, pending: null };
		} else {
			return { ins: T.PULLI_CHAR, pending: null };
		}
	}

	return null;
}
