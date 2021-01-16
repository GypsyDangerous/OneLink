import { gql } from "@apollo/client";

export const UpdateUser = gql`
	mutation UpdateUser($username: String, $email: String, $photo: String) {
		updateUserProfile(username: $username, email: $email, photo: $photo) {
			email
			username
			photo
		}
	}
`;
