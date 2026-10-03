import { useEffect, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { defaultLayout, Keyboard } from "@/components/keyboard/Keyboard";
import { Navbar } from "@/components/Navbar";
import { type State as EngineState, step } from "@/lib/engine";
import { previewFor } from "@/lib/preview";
import { getFallbackTamilChar, tamil99Layout } from "@/lib/tamil99";
import { useSettingsStore } from "@/store/settings";

const isTamilChar = (char: string) => {
	return /[\u0B80-\u0BFF]/.test(char);
};

export function VisualiserPage() {
	const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
	const [typedText, setTypedText] = useState("");
	const [engineState, setEngineState] = useState<EngineState>({
		pending: null,
	});
	const { keyboardView, setKeyboardView } = useSettingsStore();

	const dynamicTamilLayout = useMemo(() => {
		const preview = previewFor(engineState);
		return tamil99Layout.map((row) =>
			row.map((key) => {
				const p = preview[key.id];
				if (p) {
					return { ...key, label: p.cap, noop: p.noop };
				}
				return key;
			}),
		);
	}, [engineState]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey || e.altKey) return;

			setActiveKeys((prev) => {
				const next = new Set(prev);
				next.add(e.code);
				return next;
			});

			if (e.code === "Backspace") {
				setTypedText((prev) => prev.slice(0, -1));
				setEngineState({ pending: null });
				return;
			}

			if (e.code === "Space") {
				e.preventDefault();
				setTypedText((prev) => `${prev} `);
				setEngineState({ pending: null });
				return;
			}
			if (e.code === "Enter") {
				e.preventDefault();
				setTypedText((prev) => `${prev}\n`);
				setEngineState({ pending: null });
				return;
			}

			if (e.key.length === 1) {
				let charToType = e.key;

				if (keyboardView === "tamil") {
					const r = step(engineState, e.code);
					if (r) {
						e.preventDefault();
						setTypedText((prev) => prev + r.ins);
						setEngineState({ pending: r.pending });
						return;
					} else {
						const fallback = getFallbackTamilChar(e.code, e.shiftKey);
						if (fallback) {
							e.preventDefault();
							setTypedText((prev) => prev + fallback);
							setEngineState({ pending: null });
							return;
						}
					}
				}

				if (isTamilChar(charToType) && keyboardView !== "tamil") {
					setKeyboardView("tamil");
				} else if (!isTamilChar(charToType)) {
					const fallback = getFallbackTamilChar(e.code, e.shiftKey);
					if (fallback) {
						charToType = fallback;
						if (keyboardView !== "tamil") {
							setKeyboardView("tamil");
						}
					} else {
						if (/[a-zA-Z]/.test(e.key) && keyboardView !== "latin") {
							setKeyboardView("latin");
						}
					}
				}

				e.preventDefault();
				setTypedText((prev) => prev + charToType);
				setEngineState({ pending: null });
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			setActiveKeys((prev) => {
				const next = new Set(prev);
				next.delete(e.code);
				return next;
			});
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [engineState, keyboardView, setKeyboardView]);

	return (
		<div className="flex flex-col items-center min-h-screen bg-background">
			<Navbar />
			<div className="w-full max-w-4xl space-y-12 p-4 mt-12">
				<div className="p-8 rounded-lg text-card-foreground text-3xl font-medium tracking-wide leading-relaxed min-h-32 flex items-center justify-center font-tamil whitespace-pre-wrap text-center">
					{typedText || (
						<span className="text-muted-foreground opacity-50">
							<FormattedMessage id="app.typing.placeholder.hint" />
						</span>
					)}
				</div>

				<Keyboard
					layout={keyboardView === "tamil" ? dynamicTamilLayout : defaultLayout}
					activeKeys={activeKeys}
				/>
			</div>
		</div>
	);
}
