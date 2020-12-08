import useUser from "../../hooks/useUser";
import styled from "styled-components";
import { useRouter } from "next/router";
import { PaddingPage } from "../../components/shared/Page.styled";

const AdminPage = styled(PaddingPage)`
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const AdminSection = styled.div`
	flex: 1 1 50%;
	outline: solid;
	align-self: stretch;
`;

export default function Admin() {
	const { loading } = useUser({ redirectTo: "/auth/login" });
	const router = useRouter();

	return (
		<AdminPage>
			{!loading && (
				<>
					<AdminSection></AdminSection>
					<AdminSection></AdminSection>
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
