import { Avatar } from "@material-ui/core";
import { useState } from "react";
import Reorder, { reorder } from "react-reorder";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import ImageIcon from "@material-ui/icons/Image";
import AppsIcon from "@material-ui/icons/Apps";
import Slide from "@material-ui/core/Slide";
import Backdrop from "@material-ui/core/Backdrop";
import {
	StyledModal,
	SectionContainer,
	ContentSection,
	LinkButtons,
	LinkItem,
	EditButton,
	AddLinkBody,
	AddLinkSection,
	GrabLink,
} from "./index.styled";
import { Link as LinkType } from "../../util/types/Settings";
import { defaultImages, usernameLinks, defaultLinks } from "../../util/constants";
import LinkModal from "../../components/admin/LinkModal";

import { ModalMeta } from "../../util/types/Settings";

const defaultLink = (): LinkType => ({
	path: "",
	embed: false,
	image: "",
	name: "",
	order: -1,
	color: "",
	active: true,
	id: "",
});

const Content = ({ links, setLinks, remove, ...props }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [currentLink, setCurrentLink] = useState<LinkType | null>(defaultLink);
	const [metaData, setMetaData] = useState<ModalMeta>({ showUsername: false, name: "" });

	const handleOpen = (name?: string, linkToEdit?: LinkType) => {
		// setTimeout(() => {
		setModalOpen(true);
		// }, 50);
		if (name) {
			if (linkToEdit) {
				setCurrentLink(linkToEdit);
			} else {
				setCurrentLink({ ...defaultLink(), image: defaultImages[name] });
			}
			setMetaData({ name, showUsername: usernameLinks.includes(name) });
		}
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	return (
		<SectionContainer {...props}>
			<StyledModal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={modalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Slide in={modalOpen} direction="up">
					<LinkModal
						currentLink={currentLink}
						setCurrentLink={setCurrentLink}
						metaData={metaData}
					/>
				</Slide>
			</StyledModal>
			<ContentSection solid>
				<h1>Add New</h1>
				<AddLinkBody>
					<AddLinkSection>
						<h2>Link</h2>
						<div>
							<LinkItem onClick={e => handleOpen()}>
								<LinkIcon />
							</LinkItem>
							{defaultLinks.map(linkName => (
								<LinkItem onClick={e => handleOpen(linkName)}>
									<img src={defaultImages[linkName]} alt={`${linkName} icon`} />
								</LinkItem>
							))}
						</div>
					</AddLinkSection>
					<AddLinkSection>
						<h2>Embed</h2>
					</AddLinkSection>
				</AddLinkBody>
			</ContentSection>
			<ContentSection>
				<h1 style={{ color: "white" }}>Contact Info</h1>
			</ContentSection>
			<ContentSection>
				<h1 style={{ color: "white" }}>Content</h1>
				<Reorder
					reorderId="my-list" // Unique ID that is used internally to track this list (required)
					reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
					component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
					placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
					draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
					// lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
					holdTime={100} // Hold time before dragging begins with mouse (optional), defaults to holdTime
					onReorder={(event, previousIndex, nextIndex) => {
						setLinks(prev => {
							return reorder(
								[...prev].map(item => ({ ...item })),
								previousIndex,
								nextIndex
							).map((item, index) => ({ ...item, order: index }));
						});
					}} // Callback when an item is dropped (you will need this to update your state)
					placeholder={
						<GrabLink back={true} /> // Custom placeholder element (optional), defaults to clone of dragged element
					}
				>
					{links.map(link => (
						<GrabLink key={link.order}>
							<LinkButtons>
								<AppsIcon />
								<Avatar
									alt={`${link.name} image`}
									variant="square"
									src={link.image}
								>
									<ImageIcon />
								</Avatar>
								<h2>{link.name}</h2>
							</LinkButtons>
							<LinkButtons>
								<EditButton onClick={() => handleOpen(link.name, link)}>
									<EditIcon /> Edit
								</EditButton>
								{/* <DeleteButton onClick={() => remove(link.id)}>
								<DeleteIcon /> Remove
							</DeleteButton> */}
							</LinkButtons>
						</GrabLink>
					))}
				</Reorder>
			</ContentSection>
		</SectionContainer>
	);
};

export default Content;
