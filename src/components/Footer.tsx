import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Link from "next/link";
import Anchor from "./shared/Anchor";
const FooterComponent = styled.footer`
	min-height: 80px;
	background: var(--clr-primary-300);
	display: flex;
	color: white;
	padding: 1rem;
	box-sizing: content-box !important;
	gap: 0.25rem;
	flex-direction: column;
`;

const FooterItem = styled.ul`
	display: flex;
	justify-content: center;
	gap: 1rem;
	text-align: center;
`;

const Message = styled.li`
	display: flex;
	align-items: center;
	white-space: pre;
	@media screen and (max-width: 425px){
		font-size: 80%;
	}
`;

const Footer = () => {
	return (
		<FooterComponent>
			<FooterItem>
				<li>
					<Anchor href="https://github.com/GypsyDangerous" newTab aria-label="github">
						<GitHubIcon />
					</Anchor>
				</li>
				<li>
					<Anchor href="https://www.twitter.com/snyderling_" newTab aria-label="twitter">
						<TwitterIcon />
					</Anchor>
				</li>
			</FooterItem>
			<FooterItem>
				<li>
					<Anchor href="mailto:davidgraygs4@gmail.com">Contact</Anchor>
				</li>
				<li>
					<Link href="/privacy" passHref>
						<Anchor>Privacy Policy</Anchor>
					</Link>
				</li>
				<li>
					<Link href="/tos" passHref>
						<Anchor>Terms of Service</Anchor>
					</Link>
				</li>
			</FooterItem>
			<FooterItem>
				<Message>
					Made with{" "}
					<span
						style={{
							color: "red",
							height: 23,
							marginLeft: ".25rem",
							marginRight: ".25rem",
						}}
					>
						<FavoriteIcon />
					</span>{" "}
					and{" "}
					<Anchor
						href="https://nextjs.org"
						newTab
						style={{
							marginLeft: ".25rem",
							marginRight: ".25rem",
							textDecoration: "underline",
						}}
					>
						Next.js
					</Anchor>{" "}
					by David Snyder
				</Message>
			</FooterItem>
		</FooterComponent>
	);
};

export default Footer;
