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
	max-width: 280px;
`;

const CardTitle = styled.h3`
	font-style: normal;
	font-weight: bold;
	font-size: 1.25rem;
	line-height: 2.25rem;
`;

const CardBody = styled.p`
	text-align: center;
`;

const CardIcon = styled.div`
	margin: 2rem 0;
	transform: scale(1.5);
`;

interface CardProps {
	title: string;
	icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
	text: string;
}

const Card = (props: CardProps) => {
	return (
		<CardComponent>
			<CardIcon>
				<props.icon />
			</CardIcon>
			<CardTitle>{props.title}</CardTitle>
			<CardBody>{props.text}</CardBody>
		</CardComponent>
	);
};

export default Card;
