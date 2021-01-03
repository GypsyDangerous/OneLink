import { motion } from "framer-motion";
import RegisterComponent from "./Container.styled";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import FormButton from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";
import { useForm } from "../../hooks/useForm";
import Input from "../shared/Input";
import RegisterMutation from "../../graphql/registerMutation";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import Router from "next/router";
import { setAccessToken } from "../../util/auth/accessToken";
import useUserContext from "../../hooks/useUserContext";
import Image from "next/image"

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

	const {setUser} = useUserContext()

	const [register, { data }] = useMutation(RegisterMutation);

	const handleSubmit = async e => {
		// console.log(formState);
		const variables = Object.fromEntries(
			Object.entries(formState.inputs).map(([key, val]: any) => [key, val.value])
		);
		try {
			const data = await register({ variables });
			setUser(data.data.register.user)
			setAccessToken(data.data.register.token);
			Router.push("/admin");
		} catch (err) {
			console.log(err.message);
		}
	};

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
				<HR />
				<GoogleButton type="button">
					<Image src="/google-g-2015.svg" width="25" height="25" />
					Sign in with Google
				</GoogleButton>
				<FormButton type="submit">Register</FormButton>
			</Form>
		</RegisterComponent>
	);
};

export default Register;
