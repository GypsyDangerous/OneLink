import { AnimateSharedLayout, useViewportScroll, motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useWindowScroll } from "react-use";
import { useRef } from "react";

const HeaderComponent = styled(motion.header)`
	height: 70px;
	/* outline: solid; */
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 10;
`;

const HeaderContent = styled.div`
	width: 100%;
	height: 70px;
	padding: 0 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled.div`
	width: 50px;
	height: 50px;
	outline: solid;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	a {
		margin: 0 0.5rem;
	}
`;

const HeaderLink = styled.a`
	position: relative;
	cursor: pointer;
`;

const Underline = styled(motion.div)`
	position: absolute;
	border-bottom: 3px solid;
	width: 100%;
	bottom: -3px;
`;

const headerVariants = {
	top: {
		background: "rgba(0, 0, 0, 0)",
		color: "rgb(255, 255, 255)"
	},
	scrolled: {
		color: "rgb(255, 255, 255)",
		background: "rgba(0, 0, 0, 1)",
	},
};

const Header = () => {
	const router = useRouter();
	const { type } = router.query;
	const { scrollYProgress } = useViewportScroll();
	const { y } = useWindowScroll();

	return (
		<HeaderComponent variants={headerVariants} transition={{duration: .5}} animate={y > 100 ? "scrolled" : "top"}>
			<HeaderContent>
				<Link href="/">
					<a>
						<Logo />
					</a>
				</Link>
				<Buttons>
					<AnimateSharedLayout>
						<Link href="/auth/login">
							<HeaderLink>
								Login
								{type === "login" && (
									<Underline layoutId="active-button"></Underline>
								)}
							</HeaderLink>
						</Link>
						<Link href="/auth/register">
							<HeaderLink>
								Register
								{type === "register" && (
									<Underline layoutId="active-button"></Underline>
								)}
							</HeaderLink>
						</Link>
					</AnimateSharedLayout>
				</Buttons>
			</HeaderContent>
		</HeaderComponent>
	);
};

export default Header;
