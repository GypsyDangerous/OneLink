import LoginComponent from "./Container.styled";
import Form from "../shared/Form";
import FormButton, { FormLink } from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";
import Input from "../shared/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_EMAIL } from "../../util/validators";
import { useMutation } from "@apollo/client";
import loginMutation, { googleLogin } from "../../graphql/loginMutation";
import Router from "next/router";
import { setAccessToken } from "../../util/auth/accessToken";
import useUserContext from "../../hooks/useUserContext";
import Image from "next/image";
import { useGoogleLogin } from "react-google-login";
import { useState } from "react";
import { FormControl } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

const Login = ({ ...props }) => {
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
		},
		false
	);

	const [login] = useMutation(loginMutation);
	const [loginWithGoogle] = useMutation(googleLogin);
	const { setUser } = useUserContext();
	const [error, setError] = useState(null);
	const [googleError, setGoogleError] = useState(null);

	const handleSubmit = async e => {
		// console.log(formState);
		setError(null);
		const variables = Object.fromEntries(
			Object.entries(formState.inputs).map(([key, val]: any) => [key, val.value])
		);
		try {
			const data = await login({ variables });
			setUser(data.data.login.user);
			setAccessToken(data.data.login.token);
			Router.push("/admin");
		} catch (err) {
			console.log({ error: err.message });
			setError("Invalid email or password");
		}
	};

	const onSuccess = async res => {
		setGoogleError(null);
		try {
			const data = await loginWithGoogle({ variables: { token: res.tokenObj.id_token } });
			setUser(data.data.googleLogin.user);
			setAccessToken(data.data.googleLogin.token);
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
		<LoginComponent {...props}>
			<H1>Login</H1>
			<Form onSubmit={handleSubmit}>
				<Input
					validators={[VALIDATOR_EMAIL()]}
					value=""
					helpText="Invalid Email"
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
					name="password"
					placeholder="Password"
					type="password"
					helpText={error}
					error={error}
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
				<FormButton type="submit">Login</FormButton>
				<GoogleButton type="button" onClick={signIn}>
					<Image src="/google-g-2015.svg" width="25" height="25" />
					Sign in with Google
				</GoogleButton>
				<p>Forgot your Password?</p>
			</Form>
		</LoginComponent>
	);
};

export default Login;
