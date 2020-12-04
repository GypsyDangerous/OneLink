import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import loginMutation from "../graphql/loginMutation";
import client from "../graphql/client";
import { setAccessToken } from "../auth/accessToken";

export default function Home() {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
			credentials: "include",
		}).then(async x => {
			const { accessToken } = await x.json();
			setAccessToken(accessToken);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <h1>loading...</h1>;
	}

	return (
		<div>
			<h1>Hello next</h1>
		</div>
	);
}
