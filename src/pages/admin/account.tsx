import styled from "styled-components";
import Form from "../../components/shared/Form";
import { PaddingPage } from "../../components/shared/Page.styled";
import TextField from "@material-ui/core/TextField";
import useUserContext from "../../hooks/useUserContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";
import { useBeforeunload } from "react-beforeunload";
import { UpdateUser } from "../../graphql/userMutation";
import { useMutation, useLazyQuery } from "@apollo/client";
import { checkUniqueDetails } from "../../graphql/userQuery";
import CustomInput from "../../components/shared/Input";
import { VALIDATOR_EMAIL } from "../../util/validators";
import { useDropzone } from "react-dropzone";
import { LargeAvatar } from "../../components/shared/styles";
import ImageIcon from "@material-ui/icons/Image";
import Loading from "../../components/shared/Loading";
import dynamic from "next/dynamic";
const PersonIcon = dynamic(() => import("@material-ui/icons/Person"));

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

const ImageUploadArea = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const ErrorText = styled.p`
	font-size: 80%;
	color: #b33a3a;
	white-space: pre-wrap;
`;

const account = () => {
	const { user, loading, updateUser } = useUserContext();
	const [userData, setUserData] = useState(user);
	const [validUserData, setValidUserData] = useState({ email: true, username: true });
	const [dataLoaded, setDataLoaded] = useState(false);
	const initialUserData = useRef(user);
	const [files, setFiles] = useState([]);
	const [fileLoading, setFileLoading] = useState(false);
	const [error, setError] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState(null);
	const inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		setUserData({
			email: user.email,
			username: user.username,
		});
		setUploadedUrl(`${process.env.NEXT_PUBLIC_API_URL}/public/images/${user.photo}`);
		initialUserData.current = {
			email: user.email,
			username: user.username,
		};
	}, [loading, user]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		onDrop: useCallback(acceptedFiles => {
			(async () => {
				setError(null);
				setFileLoading(true);
				let url;
				try {
					const body = new FormData();
					body.append("image", acceptedFiles[0]);

					const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/upload`, {
						method: "POST",
						body,
					});
					// const clone = response.clone();
					if (!response.ok) {
						throw new Error("Please Try again, you may have an invalid image.");
					}
					try {
						const json = await response.json();
						await save({
							variables: { photo: json.data.imageUrl.replace("public\\images", "") },
						});
						url = `${process.env.NEXT_PUBLIC_API_URL}/${json.data.imageUrl}`.replace(
							"\\",
							"/"
						);
						// setCurrentLink(prev => ({ ...prev, image: url }));
					} catch (err) {
						setError("Please Try again, you may have an invalid image.");
						setFileLoading(false);
					}
				} catch (err) {
					setError(err.message);
					setFileLoading(false);
				}
				setFileLoading(false);
				if (!error) {
					setUploadedUrl(url);

					updateUser();
				}
			})();

			acceptedFiles.forEach(file => {
				const reader = new FileReader();

				reader.onabort = () => console.log("file reading was aborted");
				reader.onerror = () => console.log("file reading has failed");
				reader.onload = () => {
					// Do whatever you want with the file contents
					const binaryStr = reader.result;
					// console.log(binaryStr);
				};
				reader.readAsArrayBuffer(file);
			});
			setFiles(
				acceptedFiles.map(file =>
					Object.assign(file, { preview: URL.createObjectURL(file) })
				)
			);
		}, []),
	});

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
	const [checkDetails, { data }] = useLazyQuery(checkUniqueDetails, { fetchPolicy: "no-cache" });

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

	const { ref: dragRef, ...inputProps }: any = getInputProps();

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
										updateUser();
									}}
								>
									Save
								</Actionbutton>
							)}
						</AccountSectionContent>
					</AccountSection>
					<AccountSection>
						<h2>Avatar</h2>
						<AccountSectionContent>
							{<Loading loading={fileLoading} />}
							{dataLoaded && (
								<ImageUploadArea>
									<div className="drag-area" {...getRootProps()}>
										<input
											ref={node => {
												inputRef.current = node;
												dragRef.current = node;
											}}
											{...inputProps}
										/>
										<LargeAvatar
											imgProps={{ width: 100 }}
											src={`${uploadedUrl}`}
										>
											<PersonIcon />
										</LargeAvatar>
									</div>
									<div>
										<Actionbutton
											type="button"
											onClick={() => inputRef.current.click()}
										>
											{uploadedUrl?.length ? "Replace" : "Add Image"}
										</Actionbutton>
									</div>
								</ImageUploadArea>
							)}
							<ErrorText>{error}</ErrorText>
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
