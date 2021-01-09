import { gql } from "@apollo/client";

export const updatePage = gql`
	mutation Update($theme: NewTheme, $links: [LinkBody]) {
		updatePage(theme: $theme, links: $links) {
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
			theme {
				linkColor
				backgroundColor
				animationType
				linkStyle
			}
		}
	}
`;
