import GlobalStyle from "../components/shared/GlobalStyle";
import SEO from "../components/shared/SEO";
import { UserContextProvider } from "../contexts/userContext";

function App({ children }) {
	return (
		<>
			<SEO title="OneLink | Get Started" />
			<GlobalStyle />
			<UserContextProvider>{children}</UserContextProvider>
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
