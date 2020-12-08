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
		if (refresh) {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
				method: "POST",
				credentials: "include",
			}).then(async response => {
				setTokenRefreshed(true);
				if (!response.ok) return;
				const json = await response.json();
				const { token } = json.data;
				setAccessToken(token);
			});
		}
	}, []);

	useEffect(() => {
		if(!tokenRefreshed){

			setLoading(true);
			if (accessToken && user) {
				setLoading(false);
				if (loggedInRedirect) {
					Router.push(loggedInRedirect);
				}
				return;
			}
		}
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
						await Router.push(loggedInRedirect);
						setLoading(false);
					}
				} else if (redirectTo) {
					await Router.push(redirectTo, as);
					setLoading(false);
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
