import { createContext, useReducer } from "react";
import { SettingsReducer, SettingsActions } from "../reducers/settingsReducer";

export const settingsContext = createContext(null);

export const SettingsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(SettingsReducer, {
		links: [],
		backgroundColor: "#212121",
		linkColor: "#000000",
		linkStyle: "square",
		animation: "radial",
		contactInfo: {
			phone: "",
		},
	});

	const update = (key, value) => dispatch({ type: SettingsActions.UPDATE, key, value });

	const reset = state => dispatch({ type: SettingsActions.RESET, state });

	return (
		<settingsContext.Provider value={{ settings: state, update, reset }}>
			{children}
		</settingsContext.Provider>
	);
};
