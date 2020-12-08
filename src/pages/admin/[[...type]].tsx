import useUser from "../../hooks/useUser";
import styled from "styled-components";
import { useRouter } from "next/router";
// import {paddingPage} from 

const AdminPage = styled.div`
	min-height: 100vh;
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Admin() {
	const { loading } = useUser({ redirectTo: "/auth/login" });
	const router = useRouter();

	return (
		<AdminPage>
			{!loading && (
				<>
					<div></div>
					<div></div>
				</>
			)}
		</AdminPage>
	);
}

export async function getServerSideProps(ctx) {
	const { type } = ctx.query;
	if (type?.length > 1) return { notFound: true };
	if (!type || ["Appearance", "Settings", "analytics"].includes(type[0])) {
		return { props: {} };
	}
	return { notFound: true };
}
