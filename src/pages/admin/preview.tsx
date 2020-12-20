import { SettingsContextProvider } from "../../contexts/settingsContext";
import useUser from "../../hooks/useUser";
import Preview from "../../components/admin/Preview";

export default function PreviewPage() {
	const { loading, user } = useUser({ redirectTo: "/auth/login" });

	return (
		<SettingsContextProvider>
			<Preview user={user} />;
		</SettingsContextProvider>
	);
}
