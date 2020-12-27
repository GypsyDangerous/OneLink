import GlobalStyle from "../components/shared/GlobalStyle";
import SEO from "../components/shared/SEO";
import { UserContextProvider } from "../contexts/userContext";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import useUser from "../hooks/useUser";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {  useMemo } from "react";
import Loading from "../components/shared/Loading";
import dynamic from "next/dynamic";
import Router from "next/router";
import NProgress from "nprogress";

const Footer = dynamic(() => import("../components/Footer"))
const Header = dynamic(import("../components/Header"), { ssr: false });

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
	NProgress.done();
});

Router.events.on("routeChangeError", () => {
	NProgress.done();
});

function App({ children }) {
	const { loading, ...userData } = useUser({ refresh: true });
	const router = useRouter();

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<SEO title="OneLink | Get Started" />
			<GlobalStyle />
			{!router.pathname.includes("preview") &&
				!router?.query?.username &&
				router.pathname !== "/404" && <Header />}
			<Loading loading={loading} />
			{children}
			<Footer></Footer>
		</ThemeProvider>
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
