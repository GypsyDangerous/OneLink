import { gql } from "@apollo/client";

export default gql`
	mutation Register($email: String!, $password: String!, $username: String!) {
		register(email: $email, password: $password, username: $username) {
			user {
				email
			}
			token
		}
	}
`;
