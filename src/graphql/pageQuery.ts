import { gql } from "@apollo/client";

const pageQuery = gql`
	query getPage($name: String!) {
		page(name: $name) {
			links {
				path
				image
				name
				order
				color
				active
				image
			}
			theme
		}
		user(name: $name) {
			bio
			username
			photo
		}
	}
`;

export default pageQuery;
