import { Languages } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useSettingsStore } from "@/store/settings";
import { ModeToggle } from "./settings/mode-toggle";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function Navbar() {
	const { language, setLanguage, keyboardView, toggleKeyboardView } =
		useSettingsStore();

	return (
		<header className="w-full flex justify-center py-4">
			<div className="w-full max-w-4xl flex items-center justify-between px-4">
				<div className="flex items-center gap-6">
					<h1 className="text-xl font-bold tracking-tight text-primary">
						<Link to="/">
							<FormattedMessage id="app.title" />
						</Link>
					</h1>
					<nav className="flex items-center gap-4 text-sm font-medium">
						<Link
							to="/"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<FormattedMessage id="nav.type" />
						</Link>
						<Link
							to="/visualiser"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<FormattedMessage id="nav.visualiser" />
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						onClick={toggleKeyboardView}
						className="h-9"
					>
						{keyboardView === "tamil" ? "QWERTY" : "Tamil - 99 Layout"}
					</Button>

					<Select
						value={language}
						onValueChange={(val) => setLanguage(val as "en" | "ta")}
					>
						<SelectTrigger className="w-30 h-9">
							<Languages className="w-4 h-4 mr-2" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent className={"p-1"}>
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="ta">தமிழ்</SelectItem>
						</SelectContent>
					</Select>

					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
