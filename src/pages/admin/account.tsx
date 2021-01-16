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
	&:disabled {
		background: grey;
	}
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
	const [validUserData, setValidUserData] = useState({ email: true, username: true });
	const [dataLoaded, setDataLoaded] = useState(false);
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

	useEffect(() => {
		if (!dataLoaded) {
			setDataLoaded(!!(userData.email && userData.username));
		}
	}, [userData]);

	const userDataModified = !isEqual(initialUserData.current, userData);

	useBeforeunload(event => {
		if (userDataModified) event.preventDefault();
	});

	const [save] = useMutation(UpdateUser);
	const [checkDetails, { data }] = useLazyQuery(checkUniqueDetails);

	const onInput = useCallback((id, value, isValid) => {
		setUserData(prev => ({ ...prev, email: value }));
		if (!isValid) {
			setValidUserData(prev => ({ ...prev, email: isValid }));
		} else {
			checkDetails({
				variables: { email: value },
			});
		}
	}, []);

	const UsernameInput = useCallback((id, value) => {
		setUserData(prev => ({
			...prev,
			username: value,
		}));
		checkDetails({
			variables: { username: value },
		});
	}, []);

	useEffect(() => {
		if (data?.checkUniqueDetails) {
			const { uniqueEmail, uniqueUsername } = data.checkUniqueDetails;
			const email =
				userData.email === initialUserData.current.email
					? true
					: uniqueEmail || uniqueEmail === null;
			const username =
				userData.username === initialUserData.current.username
					? true
					: uniqueUsername || uniqueUsername === null;

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
							{dataLoaded && (
								<Form>
									<CustomInput
										variant={null}
										id="username"
										name="username"
										placeholder="Name"
										validators={[]}
										value={userData.username}
										error={!validUserData.username}
										helpText="Username is invalid or taken"
										onInput={UsernameInput}
									/>
									<CustomInput
										error={!validUserData.email}
										variant={null}
										id="email"
										name="email"
										helpText="Email is invalid or taken"
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
					{/* <AccountSection>
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
					</AccountSection> */}
				</>
			)}
		</AccountPage>
	);
};

export default account;
