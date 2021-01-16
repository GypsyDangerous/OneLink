import { gql } from "@apollo/client";

export const UpdateUser = gql`
	mutation UpdateUser($username: String, $email: String) {
		updateUserProfile(username: $username, email: $email ) {
			email
			username
		}
	}
`;