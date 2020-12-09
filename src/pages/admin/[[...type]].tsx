import useUser from "../../hooks/useUser";
import styled from "styled-components";
import { useRouter } from "next/router";
import { PaddingPage } from "../../components/shared/Page.styled";
import { Avatar } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMemo, useState } from "react";
import Reorder, {
	reorder,
	reorderImmutable,
	reorderFromTo,
	reorderFromToImmutable,
} from "react-reorder";
import LinkComponent from "../../components/Link";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
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
	outline: solid;
`;

const SectionHeader = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	color: black;
	padding: 0 10rem;
	a {
		/* font-weight: bold; */
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
	flex: 1 1 50%;
	border-radius: 0.5rem;
	margin: 0.5rem 0;
	padding: 0.5rem;
`;

export default function Admin() {
	const {
		loading,
		user: { username },
	} = useUser({ redirectTo: "/auth/login" });
	const router = useRouter();
	const classes = useStyles();

	const [links, setLinks] = useState([]);

	return (
		<AdminPage>
			{!loading && (
				<>
					<AdminSection>
						<SectionHeader>
							<Link href="/admin">
								<a>Content</a>
							</Link>
							<Link href="/admin/customize">
								<a>Customize</a>
							</Link>
							<Link href="/admin/analytics">
								<a>Content</a>
							</Link>
						</SectionHeader>
						<ContentBody>
							<ContentSection solid>
								<h1>Add New</h1>
								<AddLinkBody>
									<AddLinkSection>
										<h2>Links</h2>
									</AddLinkSection>
									<AddLinkSection>
										<h2>Embeds</h2>
									</AddLinkSection>
								</AddLinkBody>
							</ContentSection>
							<ContentSection>
								<h1>Contact Info</h1>
							</ContentSection>
							<ContentSection>
								<h1>Content and Links</h1>
								<Reorder
									reorderId="my-list" // Unique ID that is used internally to track this list (required)
									reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
									component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
									placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
									draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
									lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
									onReorder={(event, previousIndex, nextIndex, fromId, toId) => {
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
						</ContentBody>
					</AdminSection>
					<AdminSection>
						<SectionHeader></SectionHeader>
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
	if (!type || ["Appearance", "customize", "analytics", "preview"].includes(type[0])) {
		return { props: {} };
	}
	return { notFound: true };
}
