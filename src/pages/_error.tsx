import Head from "next/head";

function CustomError({ statusCode }) {
	return (
		<>
			<Head>
				<title>OneLink | Page Not Found</title>
			</Head>
			<figure>
				<img
					alt="Showing a properly cat according the status code"
					width="100%"
					src={`https://http.cat/${statusCode}`}
				/>
				<figcaption>
					<h1>{statusCode}</h1>
				</figcaption>
			</figure>
		</>
	);
}

function getInitialProps({ res, err }) {
	let statusCode;
	// If the res variable is defined it means nextjs
	// is in server side
	if (res) {
		statusCode = res.statusCode;
	} else if (err) {
		// if there is any error in the app it should
		// return the status code from here
		statusCode = err.statusCode;
	} else {
		// Something really bad/weird happen and status code
		// cannot be determined.
		statusCode = null;
	}
	return { statusCode };
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;
