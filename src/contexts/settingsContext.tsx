import { createContext, useReducer } from "react";
import { SettingsReducer, SettingsActions } from "../reducers/settingsReducer";

export const settingsContext = createContext(null);

export const SettingsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(SettingsReducer, {
		links: [],
		backgroundColor: "#282828",
		linkColor: "#2c4d5a",
		linkStyle: "square",
		animation: "radial",
		contactInfo: {
			phone: "",
		},
	});

	const addLink = link => dispatch({ type: SettingsActions.APPENDLINK, value: link });

	const update = (key, value) => dispatch({ type: SettingsActions.UPDATE, key, value });

	const reset = state => dispatch({ type: SettingsActions.RESET, state });

	return (
		<settingsContext.Provider value={{ settings: state, update, reset, addLink }}>
			{children}
		</settingsContext.Provider>
	);
};
