import client from "../graphql/client";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { publicUserQuery } from "../graphql/userQuery";
import pageQuery from "../graphql/pageQuery";
import Link from "../components/Link";
import { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Head from "next/head";
import LinkList from "../components/shared/LinkList";

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
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
	/* justify-content: center; */
	flex-direction: column;
	align-items: center;
	padding-top: 6rem;
	img {
		width: 100px;
		height: 100px;
	}
`;

const LinkSet = styled(LinkList)`
	margin-top: 2rem !important;
	max-width: 425px;
`;

const Name = styled.div`
	font-weight: bold;
`;

interface link {
	name: string;
	path: string;
	order: number;
	color: string;
	active: boolean;
	id: string;
}

export default function Page(props) {
	const [links, setLinks] = useState(props.links);

	const displayLinks = useMemo(() => {
		return [...links].sort((a, b) => a.order - b.order);
	}, [links]);

	const classes = useStyles();

	return (
		<UserPage>
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
				src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${props.ownerData.photo}`}
				className={classes.large}
			/>
			<Name>@{props.ownerData.username}</Name>
			<LinkSet>
				{displayLinks.map((link: link) => (
					<Link key={link.order} {...link} />
				))}
			</LinkSet>
		</UserPage>
	);
}

export async function getServerSideProps(ctx) {
	const { username } = ctx.query;
	try {
		const response = await client.query({ query: pageQuery, variables: { name: username } });
		const { data } = response;
		if (!data?.page) throw new Error("invalid name");
		return { props: { ...data.page, ownerData: data.user } };
	} catch (err) {
		console.log(err.message);
		return { notFound: true };
	}
}
