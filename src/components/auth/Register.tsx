import { motion } from "framer-motion";
import RegisterComponent from "./Container.styled";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import FormButton from "./FormButton";
import { H1, HR } from "../shared/Headers.styled";
import GoogleButton from "./GoogleButton.styled";

const Register = ({ ...props }) => {
	return (
		<RegisterComponent {...props}>
			<H1>Register</H1>
			<Form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<TextField
					id="username"
					name="username"
					label="Username"
					variant="outlined"
					required
				/>
				<TextField required id="email" name="username" label="Email" variant="outlined" />
				<TextField
					required
					type="password"
					id="create-password"
					name="create-password"
					label="Password"
					variant="outlined"
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
