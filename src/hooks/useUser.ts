import { useEffect, useContext, useState } from "react";
import Router from "next/router";
import { globalUser, userContext } from "../contexts/userContext";
import { silentRefresh } from "../util/functions";

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
		if (!accessToken) {
			// silent refresh
			(async () => {
				const token = await silentRefresh();
				if (!token) {
					// Router.push(options.redirectTo, options.as)
				} else {
					setAccessToken(token);
				}
			})();
		}
	}, [accessToken]);

	return { ...context, loading };
};

export default useUser;
