import { useEffect, useContext, useState } from "react";
import Router from "next/router";
import { globalUser, userContext } from "../contexts/userContext";
import client from "../graphql/client";
import userQuery from "../graphql/userQuery";
import { getAccessToken, setAccessToken } from "../auth/accessToken";
import useUserContext from "./useUserContext";
interface userOptions {
	redirectTo?: string;
	as?: string;
	refresh?: boolean;
	loggedInRedirect?: string;
}

const useUser = ({ refresh, redirectTo, as, loggedInRedirect }: userOptions = {}): globalUser => {
	const context = useUserContext();

	const [tokenRefreshed, setTokenRefreshed] = useState(false);
	const accessToken = getAccessToken();

	const { setUser, user, setLoading, loading } = context;

	useEffect(() => {
		setTokenRefreshed(false);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
			credentials: "include",
		}).then(async response => {
			if (!response.ok) return setTokenRefreshed(true);
			const json = await response.json();
			const { token } = json.data;
			setAccessToken(token);
			setTokenRefreshed(true);
		});
	}, []);

	useEffect(() => {
		setLoading(true);
		let id: NodeJS.Timeout;
		let loadingId: NodeJS.Timeout;
		if (tokenRefreshed) {
			id = setTimeout(async () => {
				if (accessToken) {
					if (!user) {
						const userData = await client.query({
							query: userQuery,
							context: { headers: {} },
						});
						setUser(userData);
					}
					if (loggedInRedirect) {
						setLoading(false);
						await Router.push(loggedInRedirect);
					}
				} else if (redirectTo) {
					setLoading(false);
					await Router.push(redirectTo, as);
				}
			}, 200);
			loadingId = setTimeout(() => {
				setLoading(false);
			}, 100);
		}
		return () => {
			clearTimeout(id);
			clearTimeout(loadingId);
		};
	}, [accessToken, redirectTo, as, tokenRefreshed]);

	return { ...context };
};

export default useUser;
