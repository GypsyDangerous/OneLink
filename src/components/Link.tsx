import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { duration } from "@material-ui/core";

const LinkComponent = styled.li`
	a {
		padding: 1rem 6rem !important;
		display: block;
		transition: color 0.5s;
	}
	transform: translate(0, 0);
	text-align: center;
	margin: 1rem !important;
	border: 2px solid white;
	display: block;
	position: relative;
	z-index: 5;
	&:hover {
		a {
			color: black;
		}
	}
	&:first-child {
		margin-top: 0 !important;
	}
`;

const LinkBackground = styled(motion.span)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: white;
	z-index: -1;
	transform-origin: left center;
`;

const background = {
	hovered: {
		// clipPath: "inset(0 0% 0 0)",
		clipPath: "circle(70.7% at 50% 50%)",
		// scaleX: 1,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	unhovered: {
		// clipPath: "inset(0 100% 0 0)",
		clipPath: "circle(0% at 50% 50%)",
		// scaleX: 0,
		opacity: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const Link = ({ name, path }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<LinkComponent onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			<a href={path}>{name}</a>
			<LinkBackground
				initial="unhovered"
				variants={background}
				animate={hovered ? "hovered" : "unhovered"}
			/>
		</LinkComponent>
	);
};

export default Link;
