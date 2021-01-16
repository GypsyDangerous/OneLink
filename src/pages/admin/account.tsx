import styled from "styled-components";
import Form from "../../components/shared/Form";
import { PaddingPage } from "../../components/shared/Page.styled";
import TextField from "@material-ui/core/TextField";
import useUserContext from "../../hooks/useUserContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";
import { useBeforeunload } from "react-beforeunload";
import { UpdateUser } from "../../graphql/userMutation";
import { useMutation, useLazyQuery } from "@apollo/client";
import { checkUniqueDetails } from "../../graphql/userQuery";
import CustomInput from "../../components/shared/Input";
import { VALIDATOR_EMAIL } from "../../util/validators";

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

const AccountSectionContent = styled.div`
	background: #212121aa;
	padding: 1rem;
	width: 100%;
	margin-top: 1rem;
	border-radius: 0.25rem;
	&[data-type="account"] ${Actionbutton} {
		margin-top: 1rem;
	}
`;

const account = () => {
	const { user, loading } = useUserContext();
	const [userData, setUserData] = useState(user);
	const [validUserData, setValidUserData] = useState({ email: false, username: false });

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

	useBeforeunload(event => {
		if (userDataModified) event.preventDefault();
	});

	const [save] = useMutation(UpdateUser);
	const [checkDetails, { data }] = useLazyQuery(checkUniqueDetails);

	const onInput = useCallback(
		(id, value) => setUserData(prev => ({ ...prev, email: value })),
		[]
	);

	useEffect(() => {
		if (data?.checkUniqueDetails) {
			const { uniqueEmail, uniqueUsername } = data.checkUniqueDetails;
			const email = uniqueEmail || uniqueEmail === null;
			const username = uniqueUsername || uniqueUsername === null;
			console.log({email, username})
			setValidUserData({ email, username });
		}
	}, [data]);

	return (
		<AccountPage>
			{user && !loading && (
				<>
					<AccountTitle>My Account</AccountTitle>
					<AccountSection>
						<h2>My information</h2>
						<AccountSectionContent data-type="account">
							{userData.username && userData.email && (
								<Form>
									<TextField
										label="Name"
										value={userData.username}
										onChange={async e => {
											setUserData(prev => ({
												...prev,
												username: e.target.value,
											}));
											checkDetails({
												variables: { username: e.target.value },
											});
										}}
									/>
									<CustomInput
										variant={null}
										id="email"
										name="email"
										validators={[VALIDATOR_EMAIL()]}
										onInput={onInput}
										placeholder="Email"
										value={userData.email}
									/>
								</Form>
							)}
							{userDataModified && (
								<Actionbutton
									disabled={!validUserData.email || !validUserData.username}
									onClick={() => {
										save({ variables: { ...userData } });
										initialUserData.current = userData;
									}}
								>
									Save
								</Actionbutton>
							)}
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
