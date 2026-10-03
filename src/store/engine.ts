import { create } from "zustand";

export type GameState = "idle" | "playing" | "finished";

interface EngineState {
	state: GameState;
	text: string;
	typed: string;
	errors: number;
	totalKeystrokes: number;
	startTime: number | null;
	endTime: number | null;

	setText: (text: string) => void;
	typeChar: (char: string) => void;
	deleteChar: () => void;
	reset: () => void;
}

export const useEngineStore = create<EngineState>((set) => ({
	state: "idle",
	text: "",
	typed: "",
	errors: 0,
	totalKeystrokes: 0,
	startTime: null,
	endTime: null,

	setText: (text) =>
		set({
			text,
			typed: "",
			errors: 0,
			totalKeystrokes: 0,
			state: "idle",
			startTime: null,
			endTime: null,
		}),

	typeChar: (char) =>
		set((state) => {
			if (state.state === "finished") return state;

			const isFirstChar = state.state === "idle" && state.typed.length === 0;
			const startTime = isFirstChar ? Date.now() : state.startTime;
			const currentState = isFirstChar ? "playing" : state.state;

			const expectedChar = state.text[state.typed.length];

			// Increment keystrokes
			const totalKeystrokes = state.totalKeystrokes + 1;

			// If the user typed the wrong char, we record an error.
			// Depending on typing app mechanics, we might either:
			// A) Allow typing the wrong character and they have to backspace
			// B) Block the character if it's wrong (hard mode).
			// Let's go with A (allow wrong character) for standard typing test feel.
			const newTyped = state.typed + char;
			const isError = expectedChar !== char;
			const errors = isError ? state.errors + 1 : state.errors;

			const isFinished = newTyped.length === state.text.length && !isError;

			return {
				state: isFinished ? "finished" : currentState,
				typed: newTyped,
				errors,
				totalKeystrokes,
				startTime,
				endTime: isFinished ? Date.now() : null,
			};
		}),

	deleteChar: () =>
		set((state) => {
			if (state.state !== "playing" || state.typed.length === 0) return state;
			return { typed: state.typed.slice(0, -1) };
		}),

	reset: () =>
		set(() => ({
			typed: "",
			errors: 0,
			totalKeystrokes: 0,
			state: "idle",
			startTime: null,
			endTime: null,
		})),
}));
