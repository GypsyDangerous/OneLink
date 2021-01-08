import RegisterComponent from "./Container.styled";
import Form from "../shared/Form";
import FormButton from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";
import { useForm } from "../../hooks/useForm";
import Input from "../shared/Input";
import RegisterMutation, { googleRegister } from "../../graphql/registerMutation";
import { useMutation } from "@apollo/client";
import Router from "next/router";
import { setAccessToken } from "../../util/auth/accessToken";
import useUserContext from "../../hooks/useUserContext";
import Image from "next/image";
import { useGoogleLogin } from "react-google-login";
import { useState } from "react";
import React from "react";
import { FormControl, FormHelperText } from "@material-ui/core";

const Register = ({ ...props }) => {
	const [formState, inputHandler, setFormData] = useForm(
		{
			password: {
				value: "",
				isValid: false,
			},
			email: {
				value: "",
				isValid: false,
			},
			username: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const { setUser } = useUserContext();

	const [register] = useMutation(RegisterMutation);
	const [registerWithGoogle] = useMutation(googleRegister);
	const [googleError, setGoogleError] = useState(null);

	const handleSubmit = async e => {
		const variables = Object.fromEntries(
			Object.entries(formState.inputs).map(([key, val]: any) => [key, val.value])
		);
		try {
			const data = await register({ variables });
			setUser(data.data.register.user);
			setAccessToken(data.data.register.token);
			Router.push("/admin");
		} catch (err) {
			console.log({ error: err.message });
		}
	};

	const onSuccess = async res => {
		setGoogleError(null);
		try {
			const data = await registerWithGoogle({ variables: { token: res.tokenObj.id_token } });
			setUser(data.data.googleRegister.user);
			setAccessToken(data.data.googleRegister.token);
			Router.push("/admin");
		} catch (err) {
			console.log(err.message);
			setGoogleError("An error occured, please try again");
		}
	};

	const onFailure = res => {
		setGoogleError("An error occured, please try again");
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
		accessType: "offline",
		prompt: "consent",
	});

	return (
		<RegisterComponent {...props}>
			<H1>Register</H1>
			<Form onSubmit={handleSubmit}>
				<Input
					validators={[]}
					value=""
					onInput={inputHandler}
					id="username"
					name="username"
					placeholder="Username"
					type="text"
					required
				/>
				<Input
					validators={[]}
					value=""
					onInput={inputHandler}
					id="email"
					name="email"
					placeholder="Email"
					required
				/>
				<Input
					validators={[]}
					value=""
					onInput={inputHandler}
					id="password"
					name="create-password"
					placeholder="Password"
					type="password"
					required
				/>
				{googleError && (
					<FormControl error={true}>
						<FormHelperText id="standard-weight-helper-text">
							{googleError}
						</FormHelperText>
					</FormControl>
				)}
				<HR />
				<FormButton type="submit">Register</FormButton>
				<GoogleButton type="button" onClick={signIn}>
					<Image src="/google-g-2015.svg" width="25" height="25" />
					Sign in with Google
				</GoogleButton>
			</Form>
		</RegisterComponent>
	);
};

export default Register;
