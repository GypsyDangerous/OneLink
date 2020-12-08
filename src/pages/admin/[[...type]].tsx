import useUser from "../../hooks/useUser";
import styled from "styled-components";

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

	return <AdminPage>{!loading && <div>admin</div>}</AdminPage>;
}
