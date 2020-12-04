import GlobalStyle from "../components/shared/GlobalStyle";
import SEO from "../components/shared/SEO";
import { UserContextProvider } from "../contexts/userContext";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";

function App({ children }) {
	return (
		<>
			<SEO title="OneLink | Get Started" />
			<GlobalStyle />

			{children}
		</>
	);
}

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<UserContextProvider>
				<App>
					<Component {...pageProps} />;
				</App>
			</UserContextProvider>
		</ApolloProvider>
	);
}

export default MyApp;
