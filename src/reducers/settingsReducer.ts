export const SettingsActions = {
	UPDATE: "update",
	RESET: "reset",
};

export const SettingsReducer = (state, action) => {
	switch (action.type) {
		case SettingsActions.UPDATE:
			return { ...state, [action.key]: action.value };
		case SettingsActions.RESET:
			return action.state;
		default:
			throw new Error(`Bad Action: ${action.type}`);
	}
};
