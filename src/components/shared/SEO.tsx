import Head from "next/head";

const SEO = ({ title }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta httpEquiv="Content-Security-Policy" content="" />
			<link
				rel="preload"
				href="https://cdn.jsdelivr.net/gh//GypsyDangerous/simple-css-reset/reset.css"
				as="style"
			/>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/gh//GypsyDangerous/simple-css-reset/reset.css"
			/>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
			<link rel="icon" type="image/png" href="/circle-cropped.png" />
			<link
				href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
				rel="stylesheet"
			/>
			<meta
				data-n-head="ssr"
				data-hid="og:description"
				property="og:description"
				content="The only social link you will ever need in your bio"
			/>
			<meta
				data-n-head="ssr"
				data-hid="og:title"
				property="og:title"
				content="OneLink - The only social link you'll ever need"
			/>
			<meta data-n-head="ssr" data-hid="og:type" property="og:type" content="website" />
			<meta
				data-n-head="ssr"
				data-hid="og:site_name"
				property="og:site_name"
				content="OneLink"
			/>
			<meta
				name="description"
				content="OneLink is a tool for anyone with a digital voice to organize, promote, and amplify your online existence. OneLink curates all of your links into one clean page that is easily shareable."
			/>
			<meta
				data-n-head="ssr"
				data-hid="og:url"
				property="og:url"
				content="https://www.onelinkapp.xyz"
			/>
			<meta data-n-head="ssr" data-hid="og:locale" property="og:locale" content="en_US" />
		</Head>
	);
};

export default SEO;
