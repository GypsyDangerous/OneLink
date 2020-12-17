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

const useStyles = makeStyles(() =>
	createStyles({
		large: {
			width: "100px",
			height: "100px",
		},
	})
);

const AdminPage = styled(PaddingPage)`
	justify-content: center;
	height: 100%;
`;

const AdminSection = styled.div`
	flex: 1 1 50%;
	position: relative;
	background: ${(props: { left?: boolean }) => (props.left ? "#2b2b2b" : "")};
	/* overflow: auto; */
`;

const SectionHeader = styled.div`
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

const PreviewSection = styled.div`
	display: flex;
	height: calc(100% - 50px);
	/* align-items: center; */
	justify-content: center;
	width: 100%;
`;

const PreviewBody = styled.div`
	background: ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor};

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
`;

const AvatarContainer = styled.div`
	margin-top: 4rem;
`;

const ContentBody = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: auto;
`;

const ContentSection = styled.div`
	width: 100%;
	background: ${(props: { solid?: boolean }) => (props.solid ? "white" : "")};
	border-radius: 1rem;
	margin-bottom: 1.5rem;
	padding: 1rem;
	${(props: { solid?: boolean }) => (!props.solid ? "padding-left: 0;" : "")}
	color: black;
	.circle-picker {
		justify-content: center;
	}
`;

const AddLinkBody = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
`;

const AddLinkSection = styled.div`
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

const LinkItem = styled.div`
	border-radius: 0.25rem;
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

const Underline = styled(motion.div)`
	position: absolute;
	border-bottom: 3px solid;
	width: 100%;
	left: 0;
	bottom: -3px;
`;

const GrabLink = styled.div`
	padding: 0.5rem;
	background: ${({ back }: { back?: boolean }) => (back ? "lightgray" : "white")};
	opacity: ${({ back }: { back?: boolean }) => (back ? 0.5 : 1)};
	z-index: ${({ back }: { back?: boolean }) => (back ? -1 : 1)};
	margin: 1rem 0;
	min-height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* &.dragged{
		transform: rotate(30deg);
	} */
	cursor: grab;
	:active {
		cursor: grabbing;
	}
`;

const LinkButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const ItemButton = styled.button`
	border-radius: 0.25rem;
	padding: 0.5rem;
	border: none;
	outline: none !important;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border: 2px solid;
`;

const EditButton = styled(ItemButton)`
	background: #2b658a;
	border-color: #2b658a;
	color: white;
`;

const DeleteButton = styled(ItemButton)`
	background: #4e4e4e1a;
	border-color: var(--warn-red);
	color: var(--warn-red);
`;

const SectionContainer = styled(motion.section)`
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

const ContentHeader = styled.h2`
	font-size: 1rem;
	margin-bottom: 0.5rem;
	align-self: flex-start;
`;

const CustomizeLinksBody = styled.div`
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
];

const Content = ({ links, setLinks, remove, ...props }) => (
	<SectionContainer {...props}>
		<ContentSection solid>
			<h1>Add New</h1>
			<AddLinkBody>
				<AddLinkSection>
					<h2>Link</h2>
					<div>
						<LinkItem>
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
							<Avatar variant="square" src={link.image}>
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
	const classes = useStyles();
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
										<Avatar
											className={classes.large}
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
