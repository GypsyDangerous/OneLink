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
				id
			}
			theme{
				linkColor,
				backgroundColor,
				animationType,
				linkStyle
			}
		}
		user(name: $name) {
			bio
			username
			photo
			id
		}
	}
`;

export default pageQuery;
