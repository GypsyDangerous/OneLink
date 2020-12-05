import Head from "next/head"

const SEO = ({ title }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta httpEquiv="Content-Security-Policy" content="" />
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh//GypsyDangerous/simple-css-reset/reset.css"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Poppins:wght@300400500600700800900&display=swap"
				rel="stylesheet"
			/>
		</Head>
	)
}

export default SEO
