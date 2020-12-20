import { SettingsContextProvider } from "../../contexts/settingsContext";
import useUser from "../../hooks/useUser";
import Preview from "../../components/admin/Preview";
import { PaddingPage } from "../../components/shared/Page.styled";

export default function PreviewPage() {
	const { loading, user } = useUser({ redirectTo: "/auth/login" });

	return (
		<SettingsContextProvider>
			<PaddingPage>
				<Preview user={user} links={[...(user?.Page?.links || [])]} />;
			</PaddingPage>
		</SettingsContextProvider>
	);
}
