import { gql } from "@apollo/client";

export default gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
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

export const googleLogin = gql`
	mutation Login($token: String!) {
		googleLogin(token: $token) {
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
