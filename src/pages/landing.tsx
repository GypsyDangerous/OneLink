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
	@media screen and (min-width: 800px) {
		height: calc(100vh - 125px);
	}
	/* width: 100vw; */
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10rem;
	width: calc(100% - 4rem);
	padding: 2rem;
	box-sizing: content-box;
	background: linear-gradient(45deg, rgba(65, 102, 208, 1) 0%, rgba(50, 154, 158, 1) 75%);
	@media screen and (max-width: 1000px) {
		gap: 5rem;
	}
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
	gap: 0.5rem;
`;

const Cards = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	padding: 8rem 1rem;
	gap: 10vw;
	margin-bottom: 8rem;
	justify-content: center;
	@media screen and (max-width: 800px) {
		gap: 4rem;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	div {
		z-index: 5;
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
	@media screen and (min-width: 800px) {
		transform: translateX(1rem);
	}
`;

const UnderCTASubmit = styled(CtaSubmit)`
	transform: none;
`;

const InputStart = styled.div`
	margin-right: 0.25rem;
`;

const Title = styled.span`
	line-height: 3rem;
`;

const Union = styled.svg`
	position: absolute;
	top: -50px;
	transform: scaleY(0.75);
	@media screen and (max-width: 1300px) {
		top: -100px;
	}
`;

const FinalSection = styled.section`
	width: 100%;
	padding: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: black;
	& > div {
		flex-direction: column;
		justify-content: center;
		display: flex;
		/* height: 100vh; */
		max-width: 25%;
		gap: 1rem;
		h5 {
			font-size: 2rem;
			text-align: center;
		}
	}
`;

export default function Landing() {
	const isTabletWidth = useMediaQuery("(max-width: 800px)");

	const title = (
		<Title>
			<BoldHero>One Link</BoldHero>
			<HeroText>to share them all</HeroText>
		</Title>
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
								endAdornment: !isTabletWidth ? (
									<CtaSubmit>Start Creating</CtaSubmit>
								) : null,
							}}
							variant="outlined"
						/>
						{isTabletWidth ? <CtaSubmit>Start Creating</CtaSubmit> : null}
					</CTA>
				</div>
				<div>
					<Image
						width="400"
						height={isTabletWidth ? "400" : "700"}
						src="/landing_post.svg"
						alt=""
					/>
				</div>
				{isTabletWidth && <div>{title}</div>}
			</Hero>
			<Cards>
				<Card
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare fermentum viverra consequat, fermentum urna. "
					icon={ShareIcon}
					title="Use it anywhere"
				></Card>
				<Card
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare fermentum viverra consequat, fermentum urna. "
					icon={LinkIcon}
					title="Link to everywhere"
				></Card>
				<Card
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare fermentum viverra consequat, fermentum urna. "
					icon={SettingsIcon}
					title="Manage easily"
				></Card>
				{!isTabletWidth && (
					<Union
						width="100%"
						height="905"
						viewBox="0 0 1907 905"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M79.8357 0H0V438V499V905H79.8357C159.671 905 320.329 905 480 837C549.778 807.283 619.556 764.58 689.416 721.827C779.415 666.749 869.552 611.587 960 584C1119.67 535 1279.34 574 1440 642C1599.67 711 1759.34 808 1839.18 857L1920 905V499V438V0L1839.18 51.2891C1759.34 103.647 1599.67 207.293 1440 281.021C1279.34 353.681 1119.67 395.353 960 342.996C869.552 313.519 779.415 254.577 689.416 195.725C619.556 150.042 549.778 104.412 480 72.6595C320.329 0 159.671 0 79.8357 0Z"
							fill="url(#paint0_linear)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear"
								x1="32.5"
								y1="483.001"
								x2="1920"
								y2="483"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#28BF7B" />
								<stop offset="1" stop-color="#4556DF" />
							</linearGradient>
						</defs>
					</Union>
				)}
			</Cards>

			<FinalSection>
				<div>
					<h5>Creating your Link takes 60 seconds. Seriously.</h5>
					<TextField
						// label="With normal TextField"
						id="outlined-start-adornment"
						InputProps={{
							placeholder: "Your Name",
							startAdornment: <InputStart>onelinkapp.xyz/</InputStart>,
						}}
						variant="outlined"
					/>
					{<UnderCTASubmit>Start Creating</UnderCTASubmit>}
				</div>
			</FinalSection>
		</LandingPage>
	);
}
