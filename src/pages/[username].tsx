import client from "../graphql/client";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import pageQuery from "../graphql/pageQuery";
import { useMemo, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Head from "next/head";
import dynamic from "next/dynamic";
const Link = dynamic(() => import("../components/Link"));
const LinkList = dynamic(() => import("../components/shared/LinkList"));
const Avatar = dynamic(() => import("@material-ui/core/Avatar"));

import { getTextColor } from "../util/functions";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		large: {
			width: "100px",
			height: "100px",
			marginBottom: "2rem",
		},
	})
);

const UserPage = styled.div`
	min-height: 100vh;
	background: ${({ backgroundColor }: { backgroundColor: string }) =>
		backgroundColor || "var(--clr-primary-300)"};
	color: var(--clr-neutral-100);
	display: flex;
	/* justify-content: center; */
	flex-direction: column;
	align-items: center;
	padding-top: 6rem;
	img {
		/* width: 100px;
		height: 100px; */
	}
`;

const LinkSet = styled(LinkList)`
	margin-top: 2rem !important;
	max-width: 425px;
`;

interface NameProps {
	backgroundColor?: string;
}

const Name = styled.div`
	font-weight: bold;
	color: ${({ backgroundColor }: NameProps) => getTextColor(backgroundColor, true)};
`;

interface link {
	name: string;
	path: string;
	order: number;
	color: string;
	active: boolean;
	id: string;
}

const clickMutation = gql`
	mutation clickLink($linkId: ID!, $userId: ID!) {
		incrementCount(linkId: $linkId, userId: $userId) {
			clicks
		}
	}
`;

export default function Page(props) {
	const [links, setLinks] = useState(props.links);

	const displayLinks = useMemo(() => {
		return [...links].sort((a, b) => a.order - b.order);
	}, [links]);

	const classes = useStyles();

	const [clickLink, data] = useMutation(clickMutation);

	console.log(props);

	return (
		<UserPage backgroundColor={props.theme.backgroundColor}>
			<Head>
				<title>@{props.ownerData.username} | Onelink</title>

				<meta
					data-n-head="ssr"
					data-hid="og:image"
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${props.ownerData.photo}`}
				/>
				<meta
					data-n-head="ssr"
					data-hid="og:image:type"
					property="og:image:type"
					content="image/png"
				/>
				<meta
					data-n-head="ssr"
					data-hid="og:image:alt"
					property="og:image:alt"
					content="Users's Avatar"
				/>
			</Head>
			<Avatar
				alt="Avatar"
				imgProps={{ width: 100, height: 100 }}
				src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${props.ownerData.photo}?width=100`}
				className={classes.large}
			/>
			<Name backgroundColor={props.theme.backgroundColor}>@{props.ownerData.username}</Name>
			<LinkSet>
				{displayLinks.map((link: link) => (
					<Link
						{...props.theme}
						key={link.order}
						{...link}
						onClick={() => {
							console.log({ linkId: link.id, userId: props.ownerData.id });
							clickLink({
								variables: { linkId: link.id, userId: props.ownerData.id },
							}).catch(err => console.log(err.message));
						}}
					/>
				))}
			</LinkSet>
		</UserPage>
	);
}

export async function getServerSideProps(ctx) {
	const { username } = ctx.query;
	try {
		if (!username || username === "null") throw new Error("no user found");
		const response = await client.query({ query: pageQuery, variables: { name: username } });
		const { data } = response;
		if (!data?.page) throw new Error("invalid name");
		return { props: { ...data.page, ownerData: data.user } };
	} catch (err) {
		console.log(err.message);
		return { notFound: true };
	}
}
