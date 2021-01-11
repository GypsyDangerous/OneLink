import styled from "styled-components";
import { PaddingPage } from "../components/shared/Page.styled";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";
import Image from "next/image";
const Hero = styled.section`
	height: calc(100vh - 80px);
	/* width: 100vw; */
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10rem;
`;

const HeroText = styled.h1`
	font-size: 3rem;
	font-weight: bold;
	text-transform: uppercase;
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
	/* outline: solid; */
	width: 100%;
	padding: 1rem 0;
`;

const LandingPage = styled(PaddingPage)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function Landing() {
	return (
		<LandingPage>
			<Hero>
				<div>
					<BoldHero>One Link</BoldHero>
					<HeroText>to share them all</HeroText>
					<CTA>
						create your link now
						<TextField
							// label="With normal TextField"
							id="outlined-start-adornment"
							InputProps={{
								placeholder: "Your Name",
								startAdornment: (
									<InputAdornment position="start">
										onelinkapp.xyz/
									</InputAdornment>
								),
							}}
							variant="outlined"
						/>
					</CTA>
				</div>
				<div>
					<Image width="400" height="700" src="/landing_post.svg" alt="" />
				</div>
			</Hero>
			<Cards></Cards>
		</LandingPage>
	);
}
