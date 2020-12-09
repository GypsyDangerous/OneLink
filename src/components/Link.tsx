import styled from "styled-components";

const LinkComponent = styled.li`
	a {
		padding: 1rem 6rem !important;
		display: inline-block;
	}
	text-align: center;
	margin: 1rem !important;
	border: 2px solid white;
	display: block;
	&:first-child {
		margin-top: 0 !important;
	}
`;

const Link = ({ name, path }) => {
	return (
		<LinkComponent>
			<a href={path}>{name}</a>
		</LinkComponent>
	);
};

export default Link;
