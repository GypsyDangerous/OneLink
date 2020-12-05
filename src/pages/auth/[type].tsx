import { useRouter } from "next/router"
import Login from "../../components/auth/Login"
import Register from "../../components/auth/Register"
import Error from "next/error"

const Auth = () => {
	const router = useRouter()
	const { type } = router.query

	if (type === "login") return <Login />
	if (type === "register") return <Register />
	return <p>404</p>
}

export async function getServerSideProps(ctx) {
	const { type } = ctx.query
	if (!["login", "register"].includes(type)) {
		return { notFound: true }
	}
	return { props: {} }
}

export default Auth
