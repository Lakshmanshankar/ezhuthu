import * as T from "./tamil99";

export interface State {
	pending: string | null;
}

/**
 * @param state current state
 * @param code physical key code
 * @param shiftKey whether shift key is pressed
 * @returns { ins: string, pending: string | null } or null
 *
 * When state is consonant, there is no pending state.
 * When state is vowel, the pending state is the vowel sign. (ா, ி, ீ, ு, ூ, ெ, ே, ை, ொ, ோ, ௌ)
 * When state is pulli, the pending state is the pulli character. (்)
 * */
export function step(
	state: State,
	code: string,
	shiftKey: boolean = false,
): { ins: string; pending: string | null } | null {
	if (shiftKey) {
		if (code in T.GRANTHA_CONSONANTS) {
			const char = T.GRANTHA_CONSONANTS[code];
			if (char === T.SHRI_CHAR) {
				// special case: No vowel sign for "ஸ்ரீ"
				return { ins: char, pending: null };
			}
			return { ins: char, pending: char };
		}
		return null;
	}

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
