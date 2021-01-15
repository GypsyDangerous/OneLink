import styled from "styled-components";
import Form from "../../components/shared/Form";
import { PaddingPage } from "../../components/shared/Page.styled";
import TextField from "@material-ui/core/TextField";
import useUserContext from "../../hooks/useUserContext";
import { useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";

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
	/* width: 25%; */
	min-width: 300px;
`;

const AccountSectionContent = styled.div`
	background: #212121aa;
	padding: 1rem;
	width: 100%;
	margin-top: 1rem;
	border-radius: 0.25rem;
`;

const Actionbutton = styled.button`
	padding: 0.5rem 1rem;
	background: var(--clr-accent-300);
	font-weight: bold;
	/* color: white; */
	border-radius: 0.5rem;
	border: none;
	outline: none;
`;

const DangerButton = styled(Actionbutton)`
	background: #b33a3a;
	color: white;
`;

const account = () => {
	const { user, loading } = useUserContext();
	const [userData, setUserData] = useState(user);

	const initialUserData = useRef(user);

	useEffect(() => {
		setUserData({
			email: user.email,
			username: user.username,
		});
		initialUserData.current = {
			email: user.email,
			username: user.username,
		};
	}, [loading, user]);

	const userDataModified = !isEqual(initialUserData.current, userData);

	return (
		<AccountPage>
			{user && !loading && (
				<>
					<AccountTitle>My Account</AccountTitle>
					<AccountSection>
						<h2>My information</h2>
						<AccountSectionContent>
							{userData.username && userData.email && (
								<Form>
									<TextField
										label="Name"
										value={userData.username}
										onChange={e =>
											setUserData(prev => ({
												...prev,
												username: e.target.value,
											}))
										}
									/>
									<TextField label="Email" value={userData.email} />
								</Form>
							)}
							{userDataModified && <button>Save</button>}
						</AccountSectionContent>
					</AccountSection>
					<AccountSection>
						<h2>Account actions</h2>
						<AccountSectionContent>
							<Actionbutton>Change Password</Actionbutton>
						</AccountSectionContent>
					</AccountSection>
					<AccountSection>
						<h2>Danger Zone</h2>
						<AccountSectionContent>
							<DangerButton>Delete Account</DangerButton>
						</AccountSectionContent>
					</AccountSection>
				</>
			)}
		</AccountPage>
	);
};

export default account;
