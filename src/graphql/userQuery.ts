import { gql } from "@apollo/client"


export default gql`
	query User {
		me {
			bio
			email
			photo
			username
		}
	}
`

export const publicUserQuery = gql`
	query getUser($name: String!) {
		user(name: $name) {
			bio
			username
			photo
		}
	}
`;
