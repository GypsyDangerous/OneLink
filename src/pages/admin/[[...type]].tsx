import useUser from "../../hooks/useUser";
import styled from "styled-components";
import { useRouter } from "next/router";
import { PaddingPage } from "../../components/shared/Page.styled";
import { Avatar, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";
import Reorder, { reorder } from "react-reorder";
import LinkComponent from "../../components/Link";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LinkIcon from "@material-ui/icons/Link";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Head from "next/head";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import AppsIcon from "@material-ui/icons/Apps";
import { PhotoshopPicker, CirclePicker } from "react-color";
import LinkList from "../../components/shared/LinkList";
import defaultAnimations from "../../util/LinkAnimations.json";
import defaultTypes from "../../util/LinkTypes.json";
import { splitByCaps } from "../../util/functions";
import { settingsContext, SettingsContextProvider } from "../../contexts/settingsContext";
import chroma from "chroma-js";
import Slide from "@material-ui/core/Slide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {
	AdminPage,
	AdminSection,
	StyledModal,
	SectionHeader,
	SectionContainer,
	PreviewBody,
	PreviewSection,
	ContentBody,
	ContentHeader,
	ContentSection,
	AvatarContainer,
	LinkButtons,
	LinkItem,
	EditButton,
	CustomizeLinksBody,
	AddLinkBody,
	AddLinkSection,
	GrabLink,
} from "../../components/admin/index.styled";

import { Underline, LargeAvatar } from "../../components/shared/styles";

const colors = [
	"#001aff",
	"#7000ff",
	"#ab68ff",
	"#bd00ff",
	"#ff6a85",
	"#282828",
	"#01a5c8",
	"#00ffd1",
	"#00ff19",
	"#7eff8b",
	"#ff6767",
	"#ff7a00",
	"#e40025",
	"#e8833e",
	"#306844",
	"#007bff",
	"#fdd618",
	"#6ab04c",
	"#e45f00",
	"#2c4d5a",
	"#09ad1e",
	"#ffbcb9",
].sort((a, b) => chroma(a).luminance() - chroma(b).luminance());

const Content = ({ links, setLinks, remove, ...props }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<SectionContainer {...props}>
			<StyledModal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Slide in={open} direction="up">
					<div>
						<h2 id="transition-modal-title">Transition modal</h2>
						<p id="transition-modal-description">react-transition-group animates me.</p>
					</div>
				</Slide>
			</StyledModal>
			<ContentSection solid>
				<h1>Add New</h1>
				<AddLinkBody>
					<AddLinkSection>
						<h2>Link</h2>
						<div>
							<LinkItem onClick={handleOpen}>
								<LinkIcon />
							</LinkItem>
							<LinkItem>
								<img src="/twitter.svg" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/tiktok.png" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/instagram.svg" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/snapchat.svg" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/twitch.webp" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/facebook.svg" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/spotify.png" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/discord-round.svg" alt="" />
							</LinkItem>
							<LinkItem>
								<img src="/youtube.svg" alt="" />
							</LinkItem>
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
								<EditButton>
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

const Customize = props => {
	const { settings, update } = useContext(settingsContext);

	return (
		<SectionContainer {...props}>
			<ContentHeader>Background Color</ContentHeader>
			<ContentSection solid>
				<CirclePicker
					colors={colors}
					width="100%"
					color={settings.backgroundColor}
					onChange={color => update("backgroundColor", color.hex)}
				/>
			</ContentSection>
			<ContentHeader>Link Color</ContentHeader>
			<ContentSection solid>
				<CirclePicker
					colors={colors}
					width="100%"
					color={settings.linkColor}
					onChange={color => update("linkColor", color.hex)}
				/>
			</ContentSection>
			<ContentHeader>Link Hover animation</ContentHeader>
			<ContentSection solid>
				<CustomizeLinksBody>
					{defaultAnimations.map(animation => (
						<motion.div onClick={() => update("animation", animation)}>
							<h2>{splitByCaps(animation)}</h2>

							<LinkComponent animation={animation} path="" disabled name="Hover Me" />
						</motion.div>
					))}
				</CustomizeLinksBody>
			</ContentSection>
			<ContentHeader>Link Style</ContentHeader>
			<ContentSection solid>
				<CustomizeLinksBody className="column">
					{defaultTypes.map(type => {
						return (
							<div onClick={() => update("linkStyle", type)}>
								<h2>{type}</h2>
								<LinkComponent
									capsule={type === "capsule"}
									path=""
									disabled
									name="example"
								/>
							</div>
						);
					})}
				</CustomizeLinksBody>
			</ContentSection>
			<ContentHeader>Style</ContentHeader>
			<ContentSection solid></ContentSection>
		</SectionContainer>
	);
};

const Analytics = props => {
	return <SectionContainer {...props}>analytics</SectionContainer>;
};

const AdminComponent = () => {
	const { loading, user } = useUser({ redirectTo: "/auth/login" });
	const { settings, update } = useContext(settingsContext);
	const {
		query: { type },
	} = useRouter();
	const section = type?.[0];

	const { links } = settings;

	const remove = id => {
		update("links", prev => prev.filter(item => item.id !== id));
	};

	const showPreview = useMediaQuery("(min-width: 64rem)");

	useEffect(() => {
		update("links", [...(user?.Page?.links || [])]);
	}, [user]);

	return (
		<AdminPage>
			<Head>
				<title>OneLink | Admin</title>
			</Head>
			{!loading && (
				<>
					<AdminSection left>
						<SectionHeader>
							<AnimateSharedLayout>
								<Link href="/admin">
									<a>
										Content
										{!section && <Underline layoutId="section-header" />}
									</a>
								</Link>
								<Link href="/admin/customize">
									<a>
										Customize
										{section === "customize" && (
											<Underline layoutId="section-header" />
										)}
									</a>
								</Link>
								<Link href="/admin/analytics">
									<a>
										Analytics
										{section === "analytics" && (
											<Underline layoutId="section-header" />
										)}
									</a>
								</Link>
							</AnimateSharedLayout>
						</SectionHeader>
						<ContentBody>
							<AnimatePresence exitBeforeEnter>
								{!section ? (
									<Content
										remove={remove}
										key="content"
										exit={{ x: -600, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										initial={{ x: -600, opactiy: 0 }}
										links={links}
										setLinks={links => update("links", links)}
									/>
								) : section === "customize" ? (
									<Customize
										key={section}
										initial={{ x: -600, opacity: 0 }}
										exit={{ x: -600, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
									/>
								) : section === "analytics" ? (
									<Analytics
										key={section}
										initial={{ x: -600, opacity: 0 }}
										exit={{ x: -600, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
									/>
								) : (
									<></>
								)}
							</AnimatePresence>
						</ContentBody>
					</AdminSection>
					{showPreview && (
						<AdminSection>
							<SectionHeader className="link-section">
								<Link href={`/${user.username}`}>
									<a>
										{process.env.NEXT_PUBLIC_CLIENT_URL}/{user.username}
									</a>
								</Link>
								<CopyToClipboard
									text={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${user.username}`}
								>
									<FileCopyIcon />
								</CopyToClipboard>
							</SectionHeader>
							<PreviewSection>
								<PreviewBody backgroundColor={settings.backgroundColor}>
									<AvatarContainer>
										<LargeAvatar
											alt="Avatar"
											src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${user.photo}`}
										/>
									</AvatarContainer>
									<div style={{ fontWeight: "bold" }}>@{user.username}</div>
									<LinkList>
										{links
											.sort((a, b) => a.order - b.order)
											.map(link => (
												<LinkComponent {...link} {...settings} />
											))}
									</LinkList>
								</PreviewBody>
							</PreviewSection>
						</AdminSection>
					)}
				</>
			)}
		</AdminPage>
	);
};

export default function Admin() {
	return (
		<SettingsContextProvider>
			<AdminComponent />
		</SettingsContextProvider>
	);
}

export async function getServerSideProps(ctx) {
	const { type } = ctx.query;
	if (type?.length > 1) return { notFound: true };
	if (!type || ["customize", "analytics", "preview"].includes(type[0])) {
		return { props: {} };
	}
	return { notFound: true };
}
