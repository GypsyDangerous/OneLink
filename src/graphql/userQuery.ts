import { gql } from "@apollo/client";

export default gql`
	query User {
		me {
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
	}
`;

export const publicUserQuery = gql`
	query getUser($name: String!) {
		user(name: $name) {
			bio
			username
			photo
			id
		}
	}
`;

export const checkUniqueDetails = gql`
	query checkUniqueDetails($email: String, $username: String){
		checkUniqueDetails(email: $email, username: $username){
			uniqueEmail
    		uniqueUsername
		}
	}
`;
