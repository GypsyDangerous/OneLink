import LoginComponent from "./Container.styled";
import Form from "../shared/Form";
import FormButton, { FormLink } from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";
import Input from "../shared/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_EMAIL } from "../../util/validators";
import { useMutation } from "@apollo/client";
import loginMutation from "../../graphql/loginMutation";
import Router from "next/router";
import { setAccessToken } from "../../util/auth/accessToken";
import useUserContext from "../../hooks/useUserContext";
import Image from "next/image"

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

	const [login, { data }] = useMutation(loginMutation);
	const {setUser} = useUserContext()

	const handleSubmit = async e => {
		// console.log(formState);
		const variables = Object.fromEntries(
			Object.entries(formState.inputs).map(([key, val]: any) => [key, val.value])
		);
		try {
			const data = await login({ variables });
			setUser(data.data.login.user)
			setAccessToken(data.data.login.token)
			Router.push("/admin")
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<LoginComponent {...props}>
			<H1>Login</H1>
			<Form
				onSubmit={handleSubmit}
			>
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
					required
				/>
				<HR />
				<GoogleButton type="button">
					<Image src="/google-g-2015.svg" width="25" height="25" />
					Sign in with Google
				</GoogleButton>
				<FormButton type="submit">Login</FormButton>
				<p>Forgot your Password?</p>
			</Form>
		</LoginComponent>
	);
};

export default Login;
