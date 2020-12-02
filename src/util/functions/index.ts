export const silentRefresh = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
		});
		if (!response.ok) return null;
		const json = await response.json()
		return json.accessToken
	} catch (err) {
		console.log(err);
		return null;
	}
};
