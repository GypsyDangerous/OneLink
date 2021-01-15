import styled from "styled-components";
import { PaddingPage } from "../components/shared/Page.styled";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link, TextField, useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import Card from "../components/shared/Card";
import LinkIcon from "@material-ui/icons/Link";
import ShareIcon from "@material-ui/icons/Share";
import SettingsIcon from "@material-ui/icons/Settings";

const Hero = styled.section`
	height: calc(100vh - 80px);
	/* width: 100vw; */
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10rem;
	width: calc(100% - 4rem);
	padding: 2rem;
	box-sizing: content-box;
	background: linear-gradient(45deg, rgba(65, 102, 208, 1) 0%, rgba(50, 154, 158, 1) 75%);
	@media screen and (max-width: 800px) {
		flex-direction: column-reverse;
		gap: 1rem;
	}
`;

const HeroText = styled.h1`
	font-size: 3rem;
	font-weight: bold;
	text-transform: uppercase;
	@media screen and (max-width: 800px) {
		font-size: 2rem;
	}
`;

const BoldHero = styled(HeroText)`
	color: var(--clr-accent-300);
`;

const CTA = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 1rem;
`;

const Cards = styled.div`
	display: flex;
	width: 100%;
	padding: 1rem;
	gap: 2rem;
	justify-content: space-around;
	@media screen and (max-width: 800px) {
		align-items: space-around;
		justify-content: center;
		flex-direction: column;
	}
`;

const LandingPage = styled(PaddingPage)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CtaSubmit = styled.button`
	background: var(--clr-accent-300);
	/* height: 100%; */
	width: 100%;
	padding: 18.5px 14px;
	border: none;
	font-weight: bold;
	transform: translateX(1rem);
`;

const InputStart = styled.div`
	margin-right: 0.25rem;
`;

export default function Landing() {
	const isTabletWidth = useMediaQuery("(max-width: 800px)");

	const title = (
		<>
			<BoldHero>One Link</BoldHero>
			<HeroText>to share them all</HeroText>
		</>
	);

	return (
		<LandingPage>
			<Hero>
				<div>
					{!isTabletWidth && title}
					<CTA>
						create your link now
						<TextField
							// label="With normal TextField"
							id="outlined-start-adornment"
							InputProps={{
								placeholder: "Your Name",
								startAdornment: <InputStart>onelinkapp.xyz/</InputStart>,
								endAdornment: <CtaSubmit>Start Creating</CtaSubmit>,
							}}
							variant="outlined"
						/>
					</CTA>
				</div>
				<div>
					<Image
						width="400"
						height={isTabletWidth ? "500" : "700"}
						src="/landing_post.svg"
						alt=""
					/>
				</div>
				{isTabletWidth && <div>{title}</div>}
			</Hero>
			<Cards>
				<Card icon={ShareIcon} title="Use it anywhere"></Card>
				<Card icon={LinkIcon} title="Link to everywhere"></Card>
				<Card icon={SettingsIcon} title="Manage easily"></Card>
			</Cards>
		</LandingPage>
	);
}
