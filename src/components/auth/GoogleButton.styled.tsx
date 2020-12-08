import styled from "styled-components"
import FormButton from "./FormButton"

const GoogleButton = styled(FormButton)`
	background: white;
	color: black;
	display: flex;
	align-items: center;
	img{
		justify-self: flex-end;
		margin-right: .5rem;
	}
	
`

export default GoogleButton