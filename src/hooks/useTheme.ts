import { useEffect } from "react";

const useTheme = (theme: string) => {
	useEffect(() => {
		document.body.setAttribute("data-theme", theme);
	}, [theme]);
};

export default useTheme;
