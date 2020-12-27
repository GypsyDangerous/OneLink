import styled from "styled-components";
import { PaddingPage } from "../shared/Page.styled";
import { motion } from "framer-motion";

import Modal from "@material-ui/core/Modal";

export const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const AdminPage = styled(PaddingPage)`
	justify-content: center;
	height: 100%;
`;

export const AdminSection = styled.div`
	flex: 1 1 50%;
	position: relative;
	background: ${(props: { left?: boolean }) => (props.left ? "#2b2b2b" : "")};
	/* overflow: auto; */
`;

export const SectionHeader = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	/* padding: 0 10rem; */
	position: sticky;
	top: 80px;
	z-index: 100;
	&.link-section {
		justify-content: flex-start;
		padding-left: 0;
		* {
			cursor: pointer;
		}
		a {
			color: var(--clr-accent-300);
			margin-right: 0.5rem;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	background: var(--clr-primary-300);
	a {
		/* font-weight: bold; */
		outline: none;
		position: relative;
		display: inline-block;
		margin: 0 2rem;
		@media screen and (max-width: 400px) {
			margin: 0 1rem;
		}
	}
`;

export const PreviewSection = styled.div`
	display: flex;
	height: calc(100% - 50px);
	/* align-items: center; */
	justify-content: center;
	width: 100%;
`;

export const PreviewBody = styled.div`
	background: ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor};
	overflow: auto;
	padding-bottom: 1rem;
	width: 340px;
	height: 650px;
	position: sticky;
	top: calc(50px + 80px + 5rem);
	border: 10px solid black;
	/* background: #212121; */
	border-radius: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	img{
		border-radius: .25rem;
	}
	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-track {
		border-radius: 10px;
		background: var(--clr-primary-300);
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #28bf7b;
	}
`;

export const AvatarContainer = styled.div`
	margin-top: 4rem;
`;

export const ContentBody = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: auto;
`;

export const ContentSection = styled.div`
	width: 100%;
	background: ${(props: { solid?: boolean }) => (props.solid ? "white" : "")};
	border-radius: 1rem;
	margin-bottom: 1.5rem;
	padding: 1rem;
	${(props: { solid?: boolean }) => (!props.solid ? "padding-left: 0;" : "")}
	color: white;
	background: rgba(60, 60, 60);
	.circle-picker {
		justify-content: center;
	}
`;

export const AddLinkBody = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
`;

export const AddLinkSection = styled.div`
	background: lightgrey;
	flex: 1 1 50%;
	&:first-child {
		flex: 1 1 40%;
	}
	border-radius: 0.5rem;
	margin: 0.5rem 0;
	padding: 0.5rem;
	& > div {
		display: flex;
		padding: 0.25rem 0 0.25rem 0;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
`;

export const LinkItem = styled.div`
	border-radius: 0.25rem;
	cursor: pointer;
	border: 1px solid #3240a5;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #e9e9e9;
	color: #4556df;
	width: 40px;
	height: 40px;
	img {
		max-width: 100%;
	}
`;

export const GrabLink = styled.li`
	padding: 0.5rem !important;
	background: ${({ back }: { back?: boolean }) => (back ? "lightgray" : "white")};
	opacity: ${({ back }: { back?: boolean }) => (back ? 0.5 : 1)};
	z-index: ${({ back }: { back?: boolean }) => (back ? -1 : 1)};
	margin: 1rem 0 !important;
	min-height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* &.dragged{
		transform: rotate(30deg);
	} */
	img{
		border-radius: .25rem;
	}
	cursor: grab;
	:active {
		cursor: grabbing;
	}
`;

export const LinkButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const ItemButton = styled.button`
	border-radius: 0.25rem;
	padding: 0.5rem;
	border: none;
	outline: none !important;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border: 2px solid;
`;

export const EditButton = styled(ItemButton)`
	background: #2b658a;
	border-color: #2b658a;
	color: white;
`;

export const DeleteButton = styled(ItemButton)`
	background: #4e4e4e1a;
	border-color: var(--warn-red);
	color: var(--warn-red);
`;

export const SectionContainer = styled(motion.section)`
	/* position: absolute; */
	/* min-width: 50%; */
	margin-top: 2.5rem;
	display: flex;
	/* width: 30%; */
	max-width: 550px;
	padding: 0 1rem;
	@media screen and (max-width: 550px) {
		max-width: 300px;
	}
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const ContentHeader = styled.h2`
	font-size: 1rem;
	margin-bottom: 0.5rem;
	align-self: flex-start;
`;

export const CustomizeLinksBody = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: space-around;
	h2 {
		text-transform: capitalize;
	}
	& > div {
		/* outline: solid black; */
		min-width: 33%;
		flex: 1;
		transition: background 0.25s;
		padding: 1rem;
		&:hover {
			background: rgba(18, 18, 18, 0.404);
		}
	}
	&.column {
		flex-direction: column;
	}
`;
