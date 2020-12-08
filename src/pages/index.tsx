import useUser from "../hooks/useUser";
import styled from "styled-components";

const MainPage = styled.div`
	min-height: 100vh;
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Home() {
	const { loading } = useUser({ redirectTo: "/landing", as: "/", loggedInRedirect: "/admin" });

	return <MainPage>{!loading && <h1>Hello next</h1>}</MainPage>;
}
