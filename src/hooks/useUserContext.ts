import { useContext } from "react";
import { userContext } from "../contexts/userContext";

const useUserContext = () => {
	const context = useContext(userContext);
	if (!context) throw new Error("useUser must be used with a userContextProvider");
	return context;
};
export default useUserContext;
