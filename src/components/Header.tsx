import { AnimateSharedLayout, motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const HeaderComponent = styled.header`
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
	border-bottom: 3px solid black;
	width: 100%;
	bottom: -3px;
`;

const Header = () => {
	const router = useRouter();
	const { type } = router.query;
	return (
		<HeaderComponent>
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
