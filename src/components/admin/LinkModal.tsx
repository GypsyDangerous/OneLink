import { Dispatch, forwardRef, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { settingsContext } from "../../contexts/settingsContext";
import { Link as LinkType, ModalMeta } from "../../util/types/Settings";
import Link from "../Link";

const ModalComponent = styled.div`
	background: #c7e8f3;
	padding: 1rem;
	border-radius: 0.5rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0.5rem;
	h2 {
		text-transform: capitalize;
		font-size: 1.5rem;
		font-weight: bold;
	}
`;

const PreviewText = styled.p`
	justify-self: center;
`;

const ModalSection = styled.div`
	background: white;
	border-radius: 0.25rem;
	padding: 1rem;
`;

interface ModalProps {
	metaData: ModalMeta;
	currentLink: LinkType;
	setCurrentLink: Dispatch<SetStateAction<LinkType>>;
}

const LinkModal = forwardRef<HTMLDivElement, ModalProps>(
	({ metaData, currentLink, setCurrentLink }, ref) => {
		const { settings, update } = useContext(settingsContext);

		return (
			<ModalComponent ref={ref}>
				<h2>
					Add a{"eaiou".includes(metaData?.name?.[0]) && "n"} {metaData?.name}{" "}
					{metaData?.showUsername ? "username" : "Link"}
				</h2>
				<PreviewText>preview</PreviewText>
				<div>
					<ModalSection></ModalSection>
				</div>
				<div>
					<ModalSection>
						<Link {...currentLink} {...settings}></Link>
					</ModalSection>
				</div>
			</ModalComponent>
		);
	}
);

export default LinkModal;
