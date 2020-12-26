import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Link from "next/link";
const FooterComponent = styled.footer`
	height: 80px;
	background: var(--clr-primary-300);
	display: flex;
	color: white;
    padding: 1rem;
    box-sizing: content-box !important;
    gap: .25rem;
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

`

const Footer = () => {
	return (
		<FooterComponent>
			<FooterItem>
				<li>
					<a href="https://github.com/GypsyDangerous" target="_blank" aria-label="github">
						<GitHubIcon />
					</a>
				</li>
				<a href="https://www.twitter.com/snyderling_" target="_blank" aria-label="twitter">
					<TwitterIcon />
				</a>
				<li></li>
			</FooterItem>
			<FooterItem>
				<li>
					<a href="mailto:davidgraygs4@gmail.com">Contact</a>
				</li>
				<li>
					<Link href="/privacy">
						<a>Privacy Policy</a>
					</Link>
				</li>
				<li>
					<Link href="/tos">
						<a>Terms of Service</a>
					</Link>
				</li>
			</FooterItem>
			<FooterItem>
				<Message>
					Made with{" "}
					<span style={{ color: "red", height: 23, marginLeft: ".25rem", marginRight: ".25rem" }}>
						<FavoriteIcon />
					</span>{" "}
					and Next by David Snyder
				</Message>
			</FooterItem>
		</FooterComponent>
	);
};

export default Footer;
