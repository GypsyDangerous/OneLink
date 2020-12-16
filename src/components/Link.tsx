import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import chroma from "chroma-js";

interface LinkProps {
	backgroundColor?: string;
	capsule?: boolean;
}

const getTextColor = color => {
	return chroma(color).luminance() > 0.5 ? "black" : "white";
};

const LinkComponent = styled.li`
	a {
		padding: 1rem 0 !important;
		display: block;
		transition: color 0.5s;
		color: ${({ backgroundColor }: LinkProps) => getTextColor(backgroundColor || "#212121")};
	}
	width: 100%;
	background: ${({ backgroundColor }: LinkProps) => backgroundColor || "#212121"};
	transform: translate(0, 0);
	text-align: center;
	border: 2px solid white;
	display: block;
	position: relative;
	z-index: 5;
	border-radius: ${({ capsule }: LinkProps) => (capsule ? "100vw" : "0")};
	overflow: hidden;
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

const availableAnimations = {
	radial: {
		hovered: { clipPath: "circle(70.7% at 50% 50%)" },
		unhovered: { clipPath: "circle(0% at 50% 50%)" },
	},
	slideLeftToRight: {
		hovered: { clipPath: "inset(0 0% 0 0)" },
		unhovered: { clipPath: "inset(0 100% 0 0)" },
	},
	slideRightToLeft: {
		hovered: { clipPath: "inset(0 0 0 0%)" },
		unhovered: { clipPath: "inset(0 0 0 100%)" },
	},
	slideTopToBottom: {
		hovered: { clipPath: "inset(0 0 0% 0)" },
		unhovered: { clipPath: "inset(0 0 100% 0)" },
	},
	slideBottomToTop: {
		hovered: { clipPath: "inset(0% 0 00 0)" },
		unhovered: { clipPath: "inset(100% 0 0 0)" },
	},
};

const background = animationType => ({
	hovered: {
		...(availableAnimations[animationType]?.hovered || {}),
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	unhovered: {
		...(availableAnimations[animationType]?.unhovered || {}),
		opacity: 0,
		transition: {
			duration: 0.5,
		},
	},
});

const Link = ({
	name,
	path,
	animation = "radial",
	disabled = false,
	capsule = false,
	linkColor,
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<LinkComponent
			backgroundColor={linkColor}
			capsule={capsule}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<a href={disabled ? null : path}>{name}</a>
			<LinkBackground
				initial="unhovered"
				variants={background(animation)}
				animate={hovered ? "hovered" : "unhovered"}
			/>
		</LinkComponent>
	);
};

export default Link;
