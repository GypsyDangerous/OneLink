import Link from "next/link";

function CustomError() {
	return (
		<div className="grid">
			<div className="header">
				<h1>404 Not Found</h1>
			</div>
			<img src="/Scarecrow.png" alt="" />
			<div className="text">
				<h1>I have bad news for you</h1>
				<p>The page you are looking for might be removed or is temporarily unavailable</p>
				<a href="#">Back to homepage</a>
			</div>
		</div>
	);
}

export default CustomError;
