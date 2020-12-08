import {gql} from "@apollo/client"

const logoutMutation = gql`
	mutation Logout{
		logout
	}
`

export default logoutMutation
