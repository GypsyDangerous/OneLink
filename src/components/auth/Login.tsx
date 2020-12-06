import LoginComponent from "./Container.styled";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import FormButton, { FormLink } from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";

const Login = ({ ...props }) => {
	return (
		<LoginComponent {...props}>
			<H1>Login</H1>
			<Form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<TextField id="Email" label="Email" variant="outlined" required name="email" />
				<TextField
					required
					name="password"
					type="password"
					id="password"
					label="Password"
					variant="outlined"
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
