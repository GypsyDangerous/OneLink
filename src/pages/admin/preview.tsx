import { SettingsContextProvider } from "../../contexts/settingsContext";
import Preview from "../../components/admin/Preview";
import { PaddingPage } from "../../components/shared/Page.styled";
import useUserContext from "../../hooks/useUserContext";

export default function PreviewPage() {
	// const { loading, user } = useUser({ redirectTo: "/auth/login" });
	const { user } = useUserContext();

	return (
		<SettingsContextProvider>
			<PaddingPage>
				<Preview modified={false} user={user} links={[...(user?.Page?.links || [])]} />;
			</PaddingPage>
		</SettingsContextProvider>
	);
}
