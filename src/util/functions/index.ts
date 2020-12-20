import chroma from "chroma-js";

export const silentRefresh = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
			credentials: "include",
		});
		if (!response.ok) return null;
		const json = await response.json();
		return json?.data?.token;
	} catch (err) {
		console.log(err.message);
		return null;
	}
};

export const splitByCaps = (string: string) => {
	return string.split(/(?=[A-Z])/).join(" ");
};

export const getTextColor = (color, invert?: boolean) => {
	const isBright = chroma(color).luminance() > 0.4;
	const brightIndex = isBright ? 1 : 0;
	const colors = ["black", "white"];
	return invert ? colors.reverse()[brightIndex] : colors[brightIndex];
};