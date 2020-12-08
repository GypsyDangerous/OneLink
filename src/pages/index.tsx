import useUser from "../hooks/useUser";
import styled from "styled-components";
import {PaddingPage as MainPage} from "../components/shared/Page.styled"

export default function Home() {
	const { loading } = useUser({ redirectTo: "/landing", as: "/", loggedInRedirect: "/admin" });

	return <MainPage>{!loading && <h1>Hello next</h1>}</MainPage>;
}
