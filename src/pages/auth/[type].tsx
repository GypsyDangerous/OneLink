import { useRouter } from "next/router";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import Error from "next/error";
import useUser from "../../hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
import FormButton, { FormLink } from "../../components/auth/FormButton";

const AuthPage = styled.div`
	min-height: 100vh;
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AuthContainer = styled(motion.div)`
	box-sizing: content-box;
	background: var(--clr-primary-400);
	padding: 3rem 0;
	width: 50%;
	min-height: 400px;
	box-shadow: 5px 5px 30px -7px rgba(0, 0, 0, 0.5);
	max-width: 800px;
	overflow: hidden;
	border-radius: 0.5rem;
	position: relative;
	@media screen and (max-width: 425px) {
		width: 100%;
	}
`;

const AuthInfo = styled(motion.div)`
	z-index: 5;
	position: absolute;
	top: 0;
	width: 50%;
	height: 100%;
	background: var(--gradient-accent-200);
	color: white;
	overflow: hidden;
	& > div {
		padding: 0 1.5rem;
		text-align: center;
		gap: 2rem;
		position: absolute;
		width: 100%;
		height: 100%;
		/* background: green; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		h1 {
			font-size: 36px;
			font-weight: bold;
		}
	}
`;

const AuthForms = styled.div`
	width: 100%;
	padding: 50px 0;
	display: flex;
	justify-content: space-between;
	/* background: red; */
	overflow: hidden;
`;

const duration = 0.5;

const transition = {
	duration: duration,
	ease: "easeInOut",
};

const sidebar = {
	login: {
		x: "0%",
		transition,
	},
	register: {
		x: "100%",
		transition,
	},
};

const Auth = ({ type }) => {
	return (
		<AuthPage>
			<AuthContainer>
				<AuthInfo variants={sidebar} animate={type}>
					<AnimatePresence>
						{type === "login" ? (
							<motion.div
								exit={{ x: "-100%", opacity: 0 }}
								initial={{ x: "-100%", opacity: 0 }}
								animate={{ x: "0%", opacity: 1 }}
								transition={transition}
								key="register-info"
							>
								<h1>Hello, Friend!</h1>
								<p>Enter your details and start your journey with us.</p>
								<Link href="register">
									<FormLink>Register</FormLink>
								</Link>
							</motion.div>
						) : (
							<motion.div
								exit={{ x: "100%", opacity: 0 }}
								initial={{ x: "100%", opacity: 0 }}
								animate={{ x: "0%", opacity: 1 }}
								key="login-info"
								transition={transition}
							>
								<h1>Welcome Back!</h1>
								<p>
									If you already have an account with us please login with your
									details.
								</p>
								<Link href="login">
									<FormLink>Login</FormLink>
								</Link>
							</motion.div>
						)}
					</AnimatePresence>
				</AuthInfo>
				<AuthForms>
					<AnimatePresence>
						{type === "login" ? (
							<Login
								key="login"
								transition={transition}
								initial={{ x: "50%", opacity: 0 }}
								animate={{ x: "100%", opacity: 1 }}
								exit={{ x: "50%", opacity: 0 }}
							/>
						) : (
							<Register
								key="register"
								transition={transition}
								initial={{ x: "50%", opacity: 0 }}
								animate={{ x: "0%", opacity: 1 }}
								exit={{ x: "50%", opacity: 0 }}
							/>
						)}
					</AnimatePresence>
				</AuthForms>
			</AuthContainer>
		</AuthPage>
	);
};

export async function getServerSideProps(ctx) {
	const { type } = ctx.query;
	if (!["login", "register"].includes(type)) {
		return { notFound: true };
	}
	return { props: { type: type } };
}

export default Auth;
