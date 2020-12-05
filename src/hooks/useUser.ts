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
}

interface User extends globalUser {
	loading: boolean;
}

const useUser = ({ refresh, redirectTo, as }: userOptions = {}): User => {
	const context = useContext(userContext);
	const [loading, setLoading] = useState(true);
	if (!context) throw new Error("useUser can only be used within a userContextProvider");
	const accessToken = getAccessToken();

	const { setUser } = context;

	useEffect(() => {
		if (refresh) {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
				method: "POST",
				credentials: "include",
			}).then(async response => {
				if (!response.ok) return;
				const json = await response.json();

				const { token } = json.data;
				setAccessToken(token);
				// if (!accessToken) Router.push("/landing", "/")
				setLoading(false);
			});
		}
	}, [refresh]);

	useEffect(() => {
		setLoading(true);
		(async () => {
			if (accessToken) {
				const userData = await client.query({ query: userQuery, context: { headers: {} } });
				console.log(userData);

				setLoading(false);
			} else if (redirectTo) {
				Router.push(redirectTo, as);
			}
		})();
	}, [accessToken]);

	return { ...context, loading };
};

export default useUser;
