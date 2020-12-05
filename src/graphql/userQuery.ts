import { gql } from "@apollo/client";


export default gql`
	query User {
		me {
			bio
			email
			photo
			username
		}
	}
`;
