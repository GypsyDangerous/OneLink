import useUser from "../hooks/useUser";

export default function Admin() {

	useUser({redirectTo: "/auth/login"})

	return <div></div>;
}
