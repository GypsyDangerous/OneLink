import { gql } from "@apollo/client";

export default gql`
	mutation Register($email: String!, $password: String!, $username: String!) {
		register(email: $email, password: $password, username: $username) {
			user {
				bio
				email
				photo
				username
				Page {
					links {
						path
						image
						name
						order
						color
						active
						id
					}
				}
			}
			token
		}
	}
`;

export const googleRegister = gql`
	mutation Register($token: String!) {
		googleRegister(token: $token) {
			user {
				bio
				email
				photo
				username
				Page {
					links {
						path
						image
						name
						order
						color
						active
						id
					}
				}
			}
			token
		}
	}
`;
