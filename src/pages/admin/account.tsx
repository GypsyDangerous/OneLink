import styled from "styled-components";
import { PaddingPage } from "../../components/shared/Page.styled";

const AccountPage = styled(PaddingPage)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3rem;
`;

const AccountTitle = styled.h1`
	margin-top: 4rem;
	font-size: 2rem;
`;

const AccountSection = styled.div`
	width: 25%;
`;

const AccountSectionContent = styled.div`
	background: white;
	padding: 1rem;
	width: 100%;
	margin-top: 1rem;
	border-radius: .125rem;
`;

const account = () => {
	return (
		<AccountPage>
			<AccountTitle>My Account</AccountTitle>
			<AccountSection>
				<h2>My information</h2>
				<AccountSectionContent></AccountSectionContent>
			</AccountSection>
			<AccountSection>
				<h2>Account actions</h2>
				<AccountSectionContent></AccountSectionContent>
			</AccountSection>
			<AccountSection>
				<h2>Danger Zone</h2>
				<AccountSectionContent></AccountSectionContent>
			</AccountSection>
		</AccountPage>
	);
};

export default account;
