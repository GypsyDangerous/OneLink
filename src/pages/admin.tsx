import useUser from "../hooks/useUser";
import styled from "styled-components";
import Page from "../components/shared/Page.styled"

const AdminPage = styled(Page)`
	justify-content: center;
	align-items: center;
`;

export default function Admin() {
	const { loading } = useUser({ redirectTo: "/auth/login" });

	return <AdminPage>{!loading && <div>admin</div>}</AdminPage>;
}
