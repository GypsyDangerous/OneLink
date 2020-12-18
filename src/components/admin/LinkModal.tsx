import { forwardRef } from "react";
import styled from "styled-components";
import { ModalMeta } from "../../util/types/Settings";

const ModalComponent = styled.div`
	background: white;
	padding: 1rem;
	border-radius: 0.5rem;
`;

interface ModalProps {
	metaData: ModalMeta;
}

const LinkModal = forwardRef<HTMLDivElement, ModalProps>(({ metaData }, ref) => {
	return (
		<ModalComponent ref={ref}>
			<h2>Transition modal</h2>
			<p id="transition-modal-description">react-transition-group animates me.</p>
		</ModalComponent>
	);
});

export default LinkModal;
