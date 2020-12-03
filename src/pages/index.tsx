import useUser from "../hooks/useUser";
import { useState } from "react";
import loginMutation from "../graphql/loginMutation";
import client from "../graphql/client";

export default function Home() {
	const [data, setData] = useState({});

	const { user } = useUser({ redirectTo: "/landing", as: "/" });

	return (
		<div>
			<button
				onClick={() =>
					setData(
						client
							.mutate({
								mutation: loginMutation,
								variables: {
									email: "davidgraygs4@gmail.com",
									password: "Junglecraft6",
								},
							})
							.then(data => data)
							.catch(console.log)
					)
				}
			>
				login
			</button>
		</div>
	);
}
