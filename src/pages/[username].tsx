import client from "../graphql/client";
import { gql } from "@apollo/client";
import styled from "styled-components";

const UserPage = styled.div`
	min-height: 100vh;
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Page(props) {
	console.log(props)
	return <UserPage></UserPage>;
}

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

const userQuery = gql`
	query getUser($name: String!) {
		user(name: $name) {
			bio
			username
			photo
		}
	}
`;

export async function getServerSideProps(ctx) {
	const { username } = ctx.query;
	try {
		const response = await client.query({ query: pageQuery, variables: { name: username } });
		if (!response.data.page) throw new Error("invalid name");
		const { data } = response;
		const userResponse = await client.query({
			query: userQuery,
			variables: { name: username },
		});
		const { data: userData } = userResponse;
		return { props: { ...data.page, ownerData: userData.user } };
	} catch (err) {
		console.log(err.message);
		return { notFound: true };
	}
}
