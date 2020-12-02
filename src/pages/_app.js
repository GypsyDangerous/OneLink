function App({ children }) {
	return (
		<>
			<SEO title="OneLink | Get Started" />
			{children}
		</>
	);
}

function MyApp({ Component, pageProps }) {
	return (
		<App>
			<Component {...pageProps} />
		</App>
	);
}

export default MyApp;
