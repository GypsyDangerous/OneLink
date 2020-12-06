import LoginComponent from "./Container.styled";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import FormButton, { FormLink } from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";
import Input from "../shared/Input";
import { useForm } from "../../hooks/useForm";
import {VALIDATOR_EMAIL} from "../../util/validators"

const Login = ({ ...props }) => {
	const [formState, inputHandler, setFormData] = useForm({}, {});

	return (
		<LoginComponent {...props}>
			<H1>Login</H1>
			<Form
				onSubmit={e => {
					e.preventDefault();
				}}
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
					<img src="/google-g-2015.svg" width="25" />
					Sign in with Google
				</GoogleButton>
				<FormButton type="submit">Login</FormButton>
				<p>Forgot your Password?</p>
			</Form>
		</LoginComponent>
	);
};

export default Login;
