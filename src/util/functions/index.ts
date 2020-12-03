export const silentRefresh = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
			credentials: "include"
		});
		if (!response.ok) return null;
		const json = await response.json()
		return json?.data?.token
	} catch (err) {
		console.log(err);
		return null;
	}
};
