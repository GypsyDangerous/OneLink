import { AnimateSharedLayout, useViewportScroll, motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useWindowScroll } from "react-use";
import { useContext, useRef, useState } from "react";
import { getAccessToken, setAccessToken } from "../auth/accessToken";
import { useMutation } from "@apollo/client";
import logoutMutation from "../graphql/logoutMutation";
import Router from "next/router";
import { Avatar } from "@material-ui/core";
import { userContext } from "../contexts/userContext";

const HeaderComponent = styled(motion.header)`
	height: 80px;
	/* outline: solid; */
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 10;
	background: #212121;
`;

const HeaderContent = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled.div`
	width: 50px;
	height: 50px;
	outline: solid;
	color: white;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	color: white;
	gap: .5rem;
	a {
		margin: 0 0.5rem;
	}
`;

const HeaderLink = styled.span`
	a {
		position: relative;
		cursor: pointer;
	}
`;

const Underline = styled(motion.div)`
	position: absolute;
	border-bottom: 3px solid;
	width: 100%;
	left: 0;
`;

const headerVariants = {
	top: {
		background: "rgba(0, 0, 0, 0)",
		color: "rgb(255, 255, 255)",
	},
	scrolled: {
		color: "rgb(255, 255, 255)",
		background: "rgba(0, 0, 0, 1)",
	},
};

const Header = () => {
	const router = useRouter();
	const { type } = router.query;
	const { y } = useWindowScroll();
	const token = getAccessToken();

	const { user } = useContext(userContext);

	const [logout, { data }] = useMutation(logoutMutation);

	return (
		<HeaderComponent
		// variants={headerVariants}
		// transition={{ duration: 0.5, ease: "easeInOut" }}
		// animate={y > 100 ? "scrolled" : "top"}
		>
			<HeaderContent>
				<Link href="/">
					<a>
						<Logo />
					</a>
				</Link>
				<Buttons>
					{!token ? (
						<AnimateSharedLayout>
							<HeaderLink>
								<Link href="/auth/login">
									<a>
										Login
										{type === "login" && (
											<Underline layoutId="active-button"></Underline>
										)}
									</a>
								</Link>
							</HeaderLink>
							<HeaderLink>
								<Link href="/auth/register">
									<a>
										Register
										{type === "register" && (
											<Underline layoutId="active-button"></Underline>
										)}
									</a>
								</Link>
							</HeaderLink>
						</AnimateSharedLayout>
					) : (
						<>
							<button
								onClick={() => {
									setAccessToken("");
									logout();
									Router.push("/auth/login");
									// setState(Math.random());
								}}
							></button>
							<div>{user?.username}</div>
							<Avatar src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.photo}`} />
						</>
					)}
				</Buttons>
			</HeaderContent>
		</HeaderComponent>
	);
};

export default Header;
