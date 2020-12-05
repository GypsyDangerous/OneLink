import { useEffect, useContext, useState } from "react";
import Router from "next/router";
import { globalUser, userContext } from "../contexts/userContext";
import { silentRefresh } from "../util/functions";
import client from "../graphql/client";
import userQuery from "../graphql/userQuery";
import { getAccessToken, setAccessToken } from "../auth/accessToken";

interface userOptions {
	redirectTo?: string;
	as?: string;
	refresh?: boolean;
	loggedInRedirect?: string;
}

interface User extends globalUser {
	loading: boolean;
}

const useUser = ({ refresh, redirectTo, as, loggedInRedirect }: userOptions = {}): User => {
	const context = useContext(userContext);
	const [loading, setLoading] = useState(true);
	const [tokenRefreshed, setTokenRefreshed] = useState(false);
	if (!context) throw new Error("useUser can only be used within a userContextProvider");
	const accessToken = getAccessToken();

	const { setUser } = context;

	useEffect(() => {
		setTokenRefreshed(false);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
			credentials: "include",
		}).then(async response => {
			setTokenRefreshed(true);
			if (!response.ok) return;
			const json = await response.json();

			const { token } = json.data;
			setAccessToken(token);
			// if (!accessToken) Router.push("/landing", "/")
		});
	}, [refresh]);

	useEffect(() => {
		setLoading(true);
		if (tokenRefreshed) {
			(async () => {
				if (accessToken) {
					const userData = await client.query({
						query: userQuery,
						context: { headers: {} },
					});
					setUser(userData);
					if (loggedInRedirect) {
						Router.push(loggedInRedirect);
					}
				} else if (redirectTo) {
					Router.push(redirectTo, as);
				}
				setTimeout(() => {
					setLoading(false);
				}, 100);
			})();
		}
	}, [accessToken, loading, redirectTo, as, tokenRefreshed]);

	return { ...context, loading };
};

export default useUser;
