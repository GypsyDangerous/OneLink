import { SetStateAction } from "react";
import { Dispatch } from "react";
import { createContext, useState } from "react";

export interface globalUser {
	user: {};
	accessToken: string | null;
	setUser: Dispatch<SetStateAction<{}>>;
	setAccessToken: Dispatch<SetStateAction<{}>>;
}

export const userContext = createContext<globalUser | null>(null);

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [accessToken, setAccessToken] = useState(null);
	return (
		<userContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
			{children}
		</userContext.Provider>
	);
};
