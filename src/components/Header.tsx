import { AnimateSharedLayout, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowScroll } from "react-use";
import { useContext, useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../util/auth/accessToken";
import { useMutation } from "@apollo/client";
import logoutMutation from "../graphql/logoutMutation";
import Router from "next/router";
import { userContext } from "../contexts/userContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import dynamic from "next/dynamic";
import Skeleton from "@material-ui/lab/Skeleton";
import Image from "next/image";
import {
	HeaderComponent,
	ProfileItem,
	ProfileSection,
	HeaderContent,
	HeaderLink,
	Logo,
	headerVariants,
	HeaderRight,
	HeaderLeft,
	Chevron,
} from "./Header.styled";
import _ from "lodash";

import { Underline } from "./shared/styles";
import { useMediaQuery } from "@material-ui/core";

const ClickAwayListener = dynamic(() => import("@material-ui/core/ClickAwayListener"));
const Avatar = dynamic(() => import("@material-ui/core/Avatar"));
const KeyboardArrowDownIcon = dynamic(() => import("@material-ui/icons/KeyboardArrowDown"));
const ExitToAppIcon = dynamic(() => import("@material-ui/icons/ExitToApp"));
const PersonIcon = dynamic(() => import("@material-ui/icons/Person"));

const Header = () => {
	const router = useRouter();
	const { type } = router.query;
	const { y } = useWindowScroll();
	const token = getAccessToken();
	const isSmallScreen = useMediaQuery("(max-width: 425px)")

	const { user } = useContext(userContext);
	const [profileOpen, setProfileOpen] = useState(false);

	const [logout, { data }] = useMutation(logoutMutation);

	useEffect(() => {
		setProfileOpen(false);
	}, [token, router.pathname]);

	useEffect(() => {
		if (window) {
			(async () => {
				// We recommend to call `load` at application startup.
				const fp = await FingerprintJS.load();

				// The FingerprintJS agent is ready.
				// Get a visitor identifier when you'd like to.
				const result = await fp.get();

				// This is the visitor identifier:
				const visitorId = result.visitorId;
				// console.log(visitorId);
			})();
		}
	}, []);

	return (
		<HeaderComponent
		// variants={headerVariants}
		// transition={{ duration: 0.5, ease: "easeInOut" }}
		// animate={y > 80 ? "scrolled" : "top"}
		>
			<HeaderContent>
				<HeaderLeft>
					<Link href={router.pathname.includes("admin") ? "/admin" : "/"}>
						<a aria-label="logo">
							<Logo>
								<Image alt="onelink logo" src="/circle-cropped.png" width="100" height="100" />
							</Logo>
						</a>
					</Link>
					{user && !_.isEmpty(user) && (
						<Link href="/admin">
							<a>Your Page</a>
						</Link>
					)}
				</HeaderLeft>
				<HeaderRight>
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
							<div
								style={{ display: "flex", alignItems: "center", gap: "1rem" }}
								onClick={() => setProfileOpen(prev => !prev)}
							>
								<Avatar
									imgProps={{ width: 40, height: 40 }}
									alt="Avatar"
									src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${user?.photo}?width=40&height=40`}
								>
									<PersonIcon />
								</Avatar>
								{!isSmallScreen && <div>
									{user?.username || (
										<Skeleton variant="text" width={50} height={20} />
									)}
								</div>}
								<Chevron animate={profileOpen ? { rotate: 180 } : { rotate: 0 }}>
									<KeyboardArrowDownIcon />
								</Chevron>
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
														<PersonIcon /> My Account
													</ProfileItem>
												</a>
											</Link>
											<ProfileItem
												warn
												onClick={() => {
													logout().then(() => {
														setProfileOpen(false);
														setAccessToken(null);
														Router.push("/");
													});
												}}
											>
												<ExitToAppIcon />
												Logout
											</ProfileItem>
										</ProfileSection>
									</ClickAwayListener>
								)}
							</AnimatePresence>
						</>
					)}
				</HeaderRight>
			</HeaderContent>
		</HeaderComponent>
	);
};

export default Header;
