import { Dispatch, forwardRef, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { settingsContext } from "../../contexts/settingsContext";
import { Link as LinkType, ModalMeta } from "../../util/types/Settings";
import Link from "../Link";
import Form from "../shared/Form";

const ModalComponent = styled.div`
	width: 50%;
	min-width: 500px;
	background: #c7e8f3;
	padding: 1.5rem;
	border-radius: 0.5rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto 1fr;
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
	min-height: 200px;
`;

const PreviewSection = styled(ModalSection)`
	display: flex;
	justify-content: center;
	align-items: center;
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
					<ModalSection>
						<Form>
							
						</Form>
					</ModalSection>
				</div>
				<div>
					<PreviewSection>
						<Link {...currentLink} {...settings} disabled></Link>
					</PreviewSection>
					<button>Save {metaData.name || "Link"}</button>
				</div>
			</ModalComponent>
		);
	}
);

export default LinkModal;
