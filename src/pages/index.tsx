import { useEffect, useState } from "react";
import { getAccessToken } from "../auth/accessToken";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import loginMutation from "../graphql/loginMutation";
import useUser from "../hooks/useUser";
import styled from "styled-components";
import Loading from "../components/shared/Loading";

const MainPage = styled.div`
	min-height: 100vh;
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Home() {
	// const [loading, setLoading] = useState<boolean>(true)

	const { loading } = useUser({ redirectTo: "/landing", as: "/", loggedInRedirect: "/admin" });

	return <MainPage>{loading ? <Loading loading={loading} /> : <h1>Hello next</h1>}</MainPage>;
}
