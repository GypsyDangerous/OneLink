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
	}
`;

export default pageQuery;
