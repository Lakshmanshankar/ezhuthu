import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import enMessages from "./locales/en.json";
import taMessages from "./locales/ta.json";

import { TypingPage } from "./pages/TypingPage";
import { VisualiserPage } from "./pages/VisualiserPage";
import { useSettingsStore } from "./store/settings";

type MessageKeys = keyof typeof enMessages;
const messages: Record<string, Record<MessageKeys, string>> = {
	en: enMessages,
	ta: taMessages,
};

function App() {
	const { language } = useSettingsStore();

	return (
		<IntlProvider locale={language} messages={messages[language]}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TypingPage />} />
					<Route path="/visualiser" element={<VisualiserPage />} />
				</Routes>
			</BrowserRouter>
		</IntlProvider>
	);
}

export default App;
