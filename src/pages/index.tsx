import { PaddingPage as MainPage } from "../components/shared/Page.styled";
import useUserContext from "../hooks/useUserContext";

export default function Home() {
	const { loading } = useUserContext();
	return <MainPage>{!loading && <h1></h1>}</MainPage>;
}
