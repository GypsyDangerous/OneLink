import { getAccessToken, setAccessToken } from "../auth/accessToken"
import { ApolloClient, InMemoryCache, createHttpLink, } from "@apollo/client"
// import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink, Observable } from "@apollo/client"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwtDecode from "jwt-decode"
const cache = new InMemoryCache({})

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable(observer => {
			let handle: any
			Promise.resolve(operation)
				.then(operation => {
					const accessToken = getAccessToken()
					if (accessToken) {
						operation.setContext({
							headers: {
								authorization: `Bearer ${accessToken}`,
							},
						})
					}
				})
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					})
				})
				.catch(observer.error.bind(observer))

			return () => {
				if (handle) handle.unsubscribe()
			}
		})
)

const refreshLink: any = new TokenRefreshLink({
	accessTokenField: "accessToken",
	isTokenValidOrUndefined: () => {
		const token = getAccessToken()

		if (!token) {
			return true
		}

		try {
			const { exp }: any = jwtDecode(token)
			if (Date.now() >= exp * 1000) {
				return false
			} else {
				return true
			}
		} catch {
			return false
		}
	},
	fetchAccessToken: () => {
		return fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
			method: "POST",
			credentials: "include",
		})
	},
	handleFetch: accessToken => {
		setAccessToken(accessToken)
	},
	handleError: err => {
		console.warn("Your refresh token is invalid. Try to relogin")
		console.error(err)
	},
})

const client = new ApolloClient({
	link: ApolloLink.from([
		refreshLink,
		onError(({ graphQLErrors, networkError }) => {
			console.log(graphQLErrors)
			console.log(networkError)
		}),
		requestLink,
		createHttpLink({
			uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
			credentials: "include",
		}),
	]),
	cache,
})

export default client
