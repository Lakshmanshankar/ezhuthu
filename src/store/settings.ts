import { create } from "zustand";

type AppLanguage = "en" | "ta";

interface SettingsState {
	language: AppLanguage;
	setLanguage: (lang: AppLanguage) => void;
	toggleLanguage: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
	language: "en",
	setLanguage: (lang) => set({ language: lang }),
	toggleLanguage: () =>
		set((state) => ({ language: state.language === "en" ? "ta" : "en" })),
}));
