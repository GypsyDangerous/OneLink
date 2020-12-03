import { gql } from "@apollo/client";


export default gql`
	query User {
		user {
			bio
			email
			photo
			username
		}
	}
`;
