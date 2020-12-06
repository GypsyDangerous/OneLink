import GlobalStyle from "../components/shared/GlobalStyle";
import SEO from "../components/shared/SEO";
import { UserContextProvider } from "../contexts/userContext";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import useUser from "../hooks/useUser";
import Header from "../components/Header";
import styled from "styled-components";

// import FingerprintJS from '@fingerprintjs/fingerprintjs'

// (async () => {
//   // We recommend to call `load` at application startup.
//   const fp = await FingerprintJS.load()

//   // The FingerprintJS agent is ready.
//   // Get a visitor identifier when you'd like to.
//   const result = await fp.get()

//   // This is the visitor identifier:
//   const visitorId = result.visitorId
//   console.log(visitorId)
// })()


function App({ children }) {
	const { loading, ...userData } = useUser({ refresh: true });

	return (
		<>
			<SEO title="OneLink | Get Started" />
			<GlobalStyle />
			<Header />
			{children}
		</>
	);
}

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<UserContextProvider>
				<App>
					<Component {...pageProps} />
				</App>
			</UserContextProvider>
		</ApolloProvider>
	);
}

export default MyApp;
