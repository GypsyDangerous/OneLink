import Head from "next/head";
import useUser from "../hooks/useUser";

export default function Home() {

	const {user} = useUser({redirectTo: "/landing", as: "/"})

	return (
		<div>
			<h1>Hello Next</h1>
		</div>
	);
}
