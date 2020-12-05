import { useRouter } from "next/router";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import Error from "next/error";
import useUser from "../../hooks/useUser";
import { motion } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";

const AuthPage = styled.div`
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AuthContainer = styled.div`
	width: 50%;
	min-height: 100px;
	outline: solid;
	max-width: 800px;
	position: relative;
	@media screen and (max-width: 425px) {
		width: 100%;
	}
`;

const AuthInfo = styled.div`
	position: absolute;
	top: 0;
	width: 50%;
	height: 100%;
	background: blue;
	transition: transform .25s;
	transform: translateX(${props => props.type === "register" ? "0" : "100%"});
`;

const AuthForms = styled.div`
	width: 100%;
	padding: 50px 0;
	background: red;
`;

const Auth = ({ type }) => {
	useUser({ loggedInRedirect: "/admin" });

	// if (type === "login") return <Login />;
	// if (type === "register") return <Register />;
	return (
		<AuthPage>
			<AuthContainer>
				<AuthInfo type={type}></AuthInfo>
				<AuthForms></AuthForms>
			</AuthContainer>
			<Link href="login"><a>Login</a></Link>
			<Link href="register"><a>Register</a></Link>
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
