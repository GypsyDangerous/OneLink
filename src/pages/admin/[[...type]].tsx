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
import Link from "../../components/Link";

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
	outline: solid;
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
	background: black;
	border-radius: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AvatarContainer = styled.div`
	margin-top: 4rem;
`;

export default function Admin() {
	const { loading } = useUser({ redirectTo: "/auth/login" });
	const router = useRouter();
	const classes = useStyles();

	const [links, setLinks] = useState([]);

	return (
		<AdminPage>
			{!loading && (
				<>
					<AdminSection>
						<SectionHeader>
							
						</SectionHeader>
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
					</AdminSection>
					<AdminSection>
						<SectionHeader></SectionHeader>
						<PreviewSection>
							<PreviewBody>
								<AvatarContainer>
									<Avatar className={classes.large} />
								</AvatarContainer>
								{links.map(link => (
									<Link {...link} />
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
	if (!type || ["Appearance", "Settings", "analytics", "preview"].includes(type[0])) {
		return { props: {} };
	}
	return { notFound: true };
}
