import GlobalStyle from "../components/shared/GlobalStyle";
import SEO from "../components/shared/SEO";
import { UserContextProvider } from "../contexts/userContext";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client"

function App({ children }) {
	return (
		<>
			<SEO title="OneLink | Get Started" />
			<GlobalStyle />
			<ApolloProvider client={client}>
				<UserContextProvider>{children}</UserContextProvider>
			</ApolloProvider>
		</>
	);
}

function MyApp({ Component, pageProps }) {
	return (
		<App>
			<Component {...pageProps} />;
		</App>
	);
}

export default MyApp;
