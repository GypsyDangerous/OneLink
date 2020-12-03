import { useEffect, useContext, useState } from "react";
import Router from "next/router";
import { globalUser, userContext } from "../contexts/userContext";
import { silentRefresh } from "../util/functions";
import client from "../graphql/client";
import userQuery from "../graphql/userQuery";

interface userOptions {
	redirectTo: string;
	as?: string;
}

interface User extends globalUser {
	loading: boolean;
}

const useUser = (options: userOptions): User => {
	const context = useContext(userContext);
	const [loading, setLoading] = useState(true);
	if (!context) throw new Error("useUser can only be used within a userContextProvider");

	const { setUser, accessToken, setAccessToken } = context;

	useEffect(() => {
		setLoading(true);
		(async () => {
			if (!accessToken) {
				const token = await silentRefresh();
				console.log(token);
				if (!token) {
					// Router.push(options.redirectTo, options.as)
				} else {
					setAccessToken(token);
				}
			} else {
				const userData = await client.query({ query: userQuery, context: { headers: {} } });
				console.log(userData);
			}
		})();
	}, [accessToken]);

	return { ...context, loading };
};

export default useUser;
