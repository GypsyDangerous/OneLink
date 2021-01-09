import { motion } from "framer-motion";
import styled from "styled-components";
import chroma from "chroma-js";

export const ProfileItem = styled(motion.div)`
	color: ${({ warn }: { warn?: boolean }): any =>
		warn ? chroma("#bb3535").brighten().saturate(2) : "white"};
	padding: 0.5rem;
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
	z-index: 100;
	gap: 0.5rem;
	&:hover::before {
		opacity: 1;
	}
	&::before {
		transition: opacity 0.25s;
		z-index: -1;
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		background: rgba(226, 226, 226, 0.055);
	}
`;

export const HeaderComponent = styled(motion.header)`
	height: 80px;
	/* outline: solid; */
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 10000;
	background: #212121;
`;

export const HeaderContent = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Chevron = styled(motion.div)`
	transform-origin: center;
	height: 24px;
	width: 24px;
`;

export const Logo = styled.div`
	width: 50px;
	height: 50px;
	outline: solid;
	color: white;
`;

export const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	color: white;
	gap: 0.5rem;
	position: relative;
	cursor: pointer;
	a {
		/* cursor: pointer; */
		margin: 0 0.5rem;
	}
`;

export const HeaderLeft = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	width: 15%;
	color: white;
	a:nth-child(2){
		display: inline-block;
		margin-left: 2rem;
		&:hover{
			text-decoration: underline;
		}
	}
`;

export const HeaderLink = styled.span`
	a {
		position: relative;
		cursor: pointer;
	}
`;

export const ProfileSection = styled(motion.div)`
	position: absolute;
	top: 100%;
	right: 0;
	width: 200px;
	z-index: 10000;
	background: #121212;
	a {
		outline: none;
		margin: 0;
		display: block;
	}
`;

export const headerVariants = {
	top: {
		background: "rgba(0, 0, 0, .25)",
		color: "rgb(255, 255, 255)",
	},
	scrolled: {
		color: "rgb(255, 255, 255)",
		background: "rgba(0, 0, 0, 1)",
	},
};

export const userTransition = {
	duration: 0.5,
};

export const userVariants = {
	open: {
		opacity: 1,
		y: -100,
		transition: {
			...userTransition,
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
	closed: {
		opacity: 0,
		y: 0,
	},
};
