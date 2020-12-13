import { AnimateSharedLayout, useViewportScroll, motion, AnimatePresence } from "framer-motion";
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
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import chroma from "chroma-js";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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
	gap: 0.5rem;
	position: relative;
	a {
		/* cursor: pointer; */
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

const ProfileSection = styled(motion.div)`
	position: absolute;
	top: 100%;
	right: 0;
	width: 200px;
	background: #121212;
	a {
		outline: none;
		margin: 0;
		display: block;
	}
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

const userTransition = {
	duration: 0.5,
};

const userVariants = {
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

const ProfileItem = styled(motion.div)`
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

const profileVariants = {};

const Header = () => {
	const router = useRouter();
	const { type } = router.query;
	const { y } = useWindowScroll();
	const token = getAccessToken();

	const { user } = useContext(userContext);
	const [profileOpen, setProfileOpen] = useState(false);

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
							{/* <button
							onClick={() => {
								setAccessToken("");
								logout();
								Router.push("/auth/login");
								// setState(Math.random());
							}}
						></button> */}
							<div
								style={{ display: "flex", alignItems: "center", gap: "1rem" }}
								onClick={() => setProfileOpen(prev => !prev)}
							>
								<Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${user?.photo}`} />
								<div>{user?.username}</div>
								<motion.div
									style={{
										transformOrigin: "center",
										height: "24px",
										width: "24px",
									}}
									animate={profileOpen ? { rotate: 180 } : { rotate: 0 }}
								>
									<KeyboardArrowDownIcon />
								</motion.div>
							</div>
							<AnimatePresence>
								{profileOpen && (
									<ClickAwayListener onClickAway={() => setProfileOpen(false)}>
										<ProfileSection
											exit={{ y: -50, opacity: 0 }}
											initial={{ y: -50, opacity: 0 }}
											animate={{ y: 15, opacity: 1 }}
											transition={{
												duration: 0.25,
												staggerChildren: 0.1,
												when: "beforeChildren",
											}}
										>
											<Link href="/admin/account">
												<a>
													<ProfileItem>
														{" "}
														<PersonIcon /> My Account
													</ProfileItem>
												</a>
											</Link>
											<ProfileItem warn>
												{" "}
												<ExitToAppIcon />
												Logout
											</ProfileItem>
										</ProfileSection>
									</ClickAwayListener>
								)}
							</AnimatePresence>
						</>
					)}
				</Buttons>
			</HeaderContent>
		</HeaderComponent>
	);
};

export default Header;
