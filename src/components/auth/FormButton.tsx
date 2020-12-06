import styled from "styled-components";
import chroma from "chroma-js";

const FormButton = styled.button`
	padding: 0.5rem 1rem;
	border: none;
	outline: none;
	display: inline-block;
	padding: 0.75rem 2rem;
	cursor: pointer;
	color: white;
	background: var(--gradient-accent-200);
	border-radius: 100vh;
	transition: background 0.25s;
	text-transform: uppercase;
	position: relative;
	transition: transform .25s;
	/* font-weight: bold; */
	&:active{
		transform: translate(1px, 1px)
	}
	&:active::after{
		opacity: .65;
	}
	&::after {
		transition: opacity .25s;
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 100vh;
		box-shadow: 5px 5px 10px -5px rgba(255, 255, 255, 0.35);
	}
	/* &:hover {
		background: var(--gradient-accent-200);
	} */
`;

export const FormLink = styled.a`
	display: inline-block;
	padding: 0.5rem 2rem;
	cursor: pointer;
	border: 3px solid ${chroma("#4556DF").saturate(2)};
	border-radius: 100vh;
	transition: background 0.25s;
	text-transform: uppercase;
	box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.5);
	&:hover {
		background: ${chroma("#4556DF").darken().saturate(2)};
	}
`;

export default FormButton;
