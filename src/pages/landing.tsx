import styled from "styled-components";
import { PaddingPage } from "../components/shared/Page.styled";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";
const Hero = styled.section`
	/* background: blue; */
	height: calc(100vh - 80px);
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 1rem;
`;

const HeroText = styled.h1`
	font-size: 3rem;
	font-weight: bold;
`;

const BoldHero = styled.span`
	color: var(--clr-accent-300);
`;

const CTA = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 1rem;
`

const Cards = styled.div`
	display: flex;
	/* outline: solid; */
	width: 100%;
	padding: 1rem 0;
`

export default function Landing() {
	return (
		<PaddingPage>
			<Hero>
				<div>
					<HeroText>
						<BoldHero>One Link</BoldHero> to share them all
					</HeroText>
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
				<Cards></Cards>
			</Hero>
		</PaddingPage>
	);
}
