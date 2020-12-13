import { SetStateAction } from "react";
import { Dispatch } from "react";
import { createContext, useState } from "react";

interface link {
	name: string;
	path: string;
	order: number;
	color: string;
	active: boolean;
	id: string;
}

export interface User {
	username?: string;
	photo?: string;
	email?: string;
	Page?: { links: link[] };
}

export interface globalUser {
	user: User;
	accessToken: string | null;
	setUser: Dispatch<SetStateAction<{}>>;
	setAccessToken: Dispatch<SetStateAction<{}>>;
	setLoading: Dispatch<SetStateAction<{}>>;
	loading: boolean;
}

export const userContext = createContext<globalUser | null>(null);

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [accessToken, setAccessToken] = useState(null);
	const [loading, setLoading] = useState(true);

	return (
		<userContext.Provider
			value={{ user, setUser, accessToken, setAccessToken, loading, setLoading }}
		>
			{children}
		</userContext.Provider>
	);
};
