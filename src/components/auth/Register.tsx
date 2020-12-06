import { motion } from "framer-motion";
import RegisterComponent from "./Container.styled";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import FormButton from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";
import { useForm } from "../../hooks/useForm";
import Input from "../shared/Input";

const Register = ({ ...props }) => {
	const [formState, inputHandler, setFormData] = useForm({}, {});

	return (
		<RegisterComponent {...props}>
			<H1>Register</H1>
			<Form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
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
					<img src="/google-g-2015.svg" width="25" />
					Sign in with Google
				</GoogleButton>
				<FormButton type="submit">Register</FormButton>
			</Form>
		</RegisterComponent>
	);
};

export default Register;
