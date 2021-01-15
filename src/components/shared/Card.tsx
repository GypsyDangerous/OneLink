import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import styled from "styled-components";

const CardComponent = styled.div`
	padding: 2rem;
	background: white;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	color: black;
	align-items: center;
	justify-content: space-around;
`;

const CardTitle = styled.h3`
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 39px;
`;

interface CardProps {
	title: string;
	icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const Card = (props: CardProps) => {
	return (
		<CardComponent>
			<props.icon/>
			<CardTitle>{props.title}</CardTitle>
		</CardComponent>
	);
};

export default Card;
