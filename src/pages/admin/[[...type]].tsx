import useUser from "../../hooks/useUser";
import styled from "styled-components";
import { useRouter } from "next/router";
import { PaddingPage } from "../../components/shared/Page.styled";
import { Avatar } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useState } from "react";
import Reorder, { reorder } from "react-reorder";
import LinkComponent from "../../components/Link";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LinkIcon from "@material-ui/icons/Link";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Head from "next/head";

const useStyles = makeStyles(() =>
	createStyles({
		large: {
			width: "100px",
			height: "100px",
			marginBottom: "2rem",
		},
	})
);

const AdminPage = styled(PaddingPage)`
	justify-content: center;
	height: 100%;
`;

const AdminSection = styled.div`
	flex: 1 1 50%;
	background: ${(props: { left?: boolean }) => (props.left ? "#2b2b2b" : "")};
`;

const SectionHeader = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 10rem;
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
	}
`;

const PreviewSection = styled.div`
	display: flex;
	height: calc(100% - 50px);
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const PreviewBody = styled.div`
	width: 340px;
	height: 650px;
	border: 10px solid black;
	background: #212121;
	border-radius: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AvatarContainer = styled.div`
	margin-top: 4rem;
`;

const ContentBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const ContentSection = styled.div`
	width: 80%;
	background: ${(props: { solid?: boolean }) => (props.solid ? "white" : "")};
	border-radius: 1rem;
	margin: 1.5rem;
	padding: 1rem;
	color: black;
`;

const AddLinkBody = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
`;

const AddLinkSection = styled.div`
	background: lightgrey;
	flex: 1 1 63%;
	&:first-child {
		flex: 1 1 35%;
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

const Content = ({ links, setLinks, ...props }) => (
	<motion.div {...props}>
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
				lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
				onReorder={(event, previousIndex, nextIndex) => {
					setLinks(prev => {
						const copy = [...prev];
						const previous = copy[previousIndex];
						const next = copy[nextIndex];
						let temp = next.order;
						next.order = previous.order;
						previous.order = temp;
						return reorder(copy, previousIndex, nextIndex);
					});
				}} // Callback when an item is dropped (you will need this to update your state)
				autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
				disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
				placeholder={
					<div style={{ height: "25px", background: "blue" }} /> // Custom placeholder element (optional), defaults to clone of dragged element
				}
			>
				{links.map(link => (
					<div key={link.order}>
						{link.order}: {link.name}
					</div>
				))}
			</Reorder>
		</ContentSection>
	</motion.div>
);

export default function Admin() {
	const {
		loading,
		user: { username },
	} = useUser({ redirectTo: "/auth/login" });
	const router = useRouter();
	const {
		query: { type },
	} = router;
	const classes = useStyles();

	const section = type?.[0];

	const [links, setLinks] = useState([]);

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
							<AnimatePresence>
								{!section ? (
									<Content
										key="content"
										exit={{ x: -500, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										initial={{ x: -500, opactiy: 0 }}
										links={links}
										setLinks={setLinks}
									/>
								) : (
									<motion.div
										key={section}
										initial={{ x: -500, opacity: 0 }}
										exit={{ x: -500, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
									>
										{section}
									</motion.div>
								)}
							</AnimatePresence>
						</ContentBody>
					</AdminSection>
					<AdminSection>
						<SectionHeader className="link-section">
							<Link href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${username}`}>
								<a>
									{process.env.NEXT_PUBLIC_CLIENT_URL}/{username}
								</a>
							</Link>
							<CopyToClipboard
								text={`${process.env.NEXT_PUBLIC_CLIENT_URL}${username}`}
							>
								<FileCopyIcon />
							</CopyToClipboard>
						</SectionHeader>
						<PreviewSection>
							<PreviewBody>
								<AvatarContainer>
									<Avatar className={classes.large} />
								</AvatarContainer>
								<div style={{ fontWeight: "bold" }}>@{username}</div>
								{links.map(link => (
									<LinkComponent {...link} />
								))}
							</PreviewBody>
						</PreviewSection>
					</AdminSection>
				</>
			)}
		</AdminPage>
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
