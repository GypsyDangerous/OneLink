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

const LinkSet = styled.ul`
	margin-top: 2rem !important;
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
			</Head>
			<Avatar
				// alt={props.ownerData.username}
				src={`${process.env.NEXT_PUBLIC_API_URL}/public/imaes/${props.ownerData.photo}`}
				className={classes.large}
			/>
			<Name>@{props.ownerData.username}</Name>
			<LinkSet>
				{displayLinks.map((link: link) => (
					<Link key={link.id} {...link} />
				))}
			</LinkSet>
		</UserPage>
	);
}

export async function getServerSideProps(ctx) {
	const { username } = ctx.query;
	try {
		const response = await client.query({ query: pageQuery, variables: { name: username } });
		if (!response.data.page) throw new Error("invalid name");
		const { data } = response;
		const userResponse = await client.query({
			query: publicUserQuery,
			variables: { name: username },
		});
		const { data: userData } = userResponse;
		return { props: { ...data.page, ownerData: userData.user } };
	} catch (err) {
		console.log(err.message);
		return { notFound: true };
	}
}
