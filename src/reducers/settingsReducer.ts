export const SettingsActions = {
	UPDATE: "update",
	RESET: "reset",
	APPENDLINK: "appendlink",
};

export const SettingsReducer = (state, action) => {
	switch (action.type) {
		case SettingsActions.APPENDLINK:
			return { ...state, links: [...state.links, action.value] };
		case SettingsActions.UPDATE:
			return { ...state, [action.key]: action.value };
		case SettingsActions.RESET:
			return action.state;
		default:
			throw new Error(`Bad Action: ${action.type}`);
	}
};
