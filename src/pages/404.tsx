import styled from "styled-components";
import Link from "next/link";

const NotFoundContainer = styled.div`
	padding: 40px 77px;
	display: grid;
	width: 100vw;
	height: 100vh;
	grid-template-areas:
		"header header"
		"img text"
		"footer footer";
	img {
		grid-area: img;
		width: 80%;
		max-width: 540px;
		min-width: 200px;
	}
	@media screen and (max-width: 900px) {
		padding: 30px 67px;
		grid-template-areas:
			"header"
			"img"
			"text"
			"footer";
		justify-content: center;
		align-items: center;
	}
`;

const NotFoundHeader = styled.div`
	grid-area: header;
	/* padding: 1.5rem */
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1.5rem;
	/* font-family: Inconsolata, "sans-serif" */
	margin-bottom: 2rem;
`;

const NotFoundText = styled.div`
	h1 {
		font-size: 4rem;
		font-weight: bold;
		max-width: 590px;
		line-height: 1;
	}

	p {
		margin-top: 2.5rem;
		max-width: 390px;
		font-size: 1.5rem;
	}

	a {
		color: white;
		text-transform: uppercase;
		text-decoration: none;
		display: inline-block;
		margin-top: 4rem;
		font-size: 0.75rem;
		padding: 1.5rem 2rem;
		background: #333333;
	}
	@media screen and (max-width: 900px) {
		h1 {
			font-size: 2rem;
		}

		p {
			font-size: 1.25rem;
		}
	}
`;

function CustomError() {
	return (
		<NotFoundContainer>
			<NotFoundHeader>
				<h1>404 Not Found</h1>
			</NotFoundHeader>
			<img src="/Scarecrow.png" alt="" />
			<NotFoundText>
				<h1>I have bad news for you</h1>
				<p>
					The page you are looking for might have been removed or is temporarily
					unavailable
				</p>
				<Link href="/">
					<a>Back to homepage</a>
				</Link>
			</NotFoundText>
		</NotFoundContainer>
	);
}

export default CustomError;
