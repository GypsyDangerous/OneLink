import client from "../graphql/client"
import { gql } from "@apollo/client"

export default function Page(props) {
	console.log(props)
	return <div></div>
}

const pageQuery = gql`
	query getPage($name: String!) {
		page(name: $name) {
			links {
				path,
				image,
				name,
				order,
				color,
				active,
				image
			}
			theme
		}
	}
`

export async function getServerSideProps(ctx) {
	const { username } = ctx.query
	try {
		const response = await client.query({ query: pageQuery, variables: {name: username} })
		if(!response.data.page) throw new Error("invalid name")
		const {data} = response
		return {props: data}
	} catch (err) {
		console.log(err.message)
		return { notFound: true}
	}
}
