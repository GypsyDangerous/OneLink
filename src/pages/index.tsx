import { useEffect, useState } from "react";
import { getAccessToken } from "../auth/accessToken";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import loginMutation from "../graphql/loginMutation";
import useUser from "../hooks/useUser";

export default function Home() {
	// const [loading, setLoading] = useState<boolean>(true)

	const { loading } = useUser({ redirectTo: "/landing", as: "/", loggedInRedirect: "/admin" });

	if (loading) {
		return <h1>loading...</h1>;
	}

	return (
		<div>
			<h1>Hello next</h1>
		</div>
	);
}
