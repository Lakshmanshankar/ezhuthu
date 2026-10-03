import { create } from "zustand";

type AppLanguage = "en" | "ta";
type KeyboardView = "tamil" | "latin"; // bramhic

interface SettingsState {
	language: AppLanguage;
	keyboardView: KeyboardView;
	setLanguage: (lang: AppLanguage) => void;
	toggleLanguage: () => void;
	toggleKeyboardView: () => void;
	setKeyboardView: (view: KeyboardView) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
	language: "en",
	keyboardView: "tamil",
	setLanguage: (lang) => set({ language: lang }),
	toggleLanguage: () =>
		set((state) => ({ language: state.language === "en" ? "ta" : "en" })),
	toggleKeyboardView: () =>
		set((state) => ({
			keyboardView: state.keyboardView === "tamil" ? "latin" : "tamil",
		})),
	setKeyboardView: (view) => set({ keyboardView: view }),
}));
