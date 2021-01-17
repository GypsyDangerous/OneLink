import { useRouter } from "next/router";
import { Tooltip, useMediaQuery } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { settingsContext, SettingsContextProvider } from "../../contexts/settingsContext";
import {
	AdminPage,
	AdminSection,
	SectionHeader,
	ContentBody,
} from "../../components/admin/index.styled";
import Snackbar from "@material-ui/core/Snackbar";
import { Underline } from "../../components/shared/styles";
import _, { isEqual } from "lodash";
import styled from "styled-components";
import dynamic from "next/dynamic";
import useUserContext from "../../hooks/useUserContext";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import pageQuery from "../../graphql/pageQuery";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useGoogleLogin } from "react-google-login";
import { useRef } from "react";
import { useBeforeunload } from "react-beforeunload";
import { SaveContainer } from "../../components/admin/index.styled";
import { updatePage } from "../../graphql/pageMutation";
const Content = dynamic(() => import("../../components/admin/Content"));
const Analytics = dynamic(() => import("../../components/admin/Analytics"));
const Customize = dynamic(() => import("../../components/admin/Customize"));
const Preview = dynamic(() => import("../../components/admin/Preview"));

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CopyIcon = styled.div`
	padding: 0.25rem;
	height: 32px;
	border-radius: 0.1rem;
	&:hover {
		background: #282828;
	}
`;

const sectionProps = {
	exit: { x: -600, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	initial: { x: -600, opactiy: 0 },
};

const SmallSaveContainer = styled(SaveContainer)`
	position: relative;
	top: 0;
	width: 100%;
	max-width: 100%;
	border-radius: 0;
	@media screen and (max-width: 425px) {
		font-size: 0.75rem;
	}
`;

const AdminComponent = () => {
	const [copied, setCopied] = useState(false);
	const initalSettings = useRef<any>();

	const { user, loading } = useUserContext();
	const [settingsModified, setSettingsModified] = useState(false);
	const { settings, update, reset } = useContext(settingsContext);
	const {
		query: { type },
	} = useRouter();
	const section = type?.[0];

	const { links } = settings;

	const showPreview = useMediaQuery("(min-width: 64rem)");

	const [fetchPage, { data }] = useLazyQuery(pageQuery);

	useEffect(() => {
		if (user.username) {
			fetchPage({ variables: { name: user.username } });
		}
	}, [user]);

	useEffect(() => {
		const page = data?.page;
		if (page) {
			initalSettings.current = { links: page.links, ...page.theme };
			reset({ links: page.links, ...page.theme });
		}
	}, [data]);

	const remove = id => {
		update("links", prev => prev.filter(item => item.id !== id));
	};

	useEffect(() => {
		setSettingsModified(!isEqual(initalSettings.current, settings));
	}, [settings]);

	useBeforeunload(event => {
		if (settingsModified) event.preventDefault();
	});

	const [save] = useMutation(updatePage);

	const saveAndReset = () => {
		initalSettings.current = settings;
		setSettingsModified(false);
	};

	return (
		<AdminPage>
			<Head>
				<title>OneLink | Admin</title>
			</Head>
			{!loading && (
				<>
					<Snackbar
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						open={copied}
						autoHideDuration={6000}
						onClose={() => setCopied(false)}
					>
						<Alert onClose={() => setCopied(false)} severity="success">
							Link Copied!
						</Alert>
					</Snackbar>
					<AdminSection left>
						{!showPreview && settingsModified && (
							<SmallSaveContainer>
								<div>Your Page has unsaved changes</div>
								<div>
									<button
										onClick={() => {
											saveAndReset();
											save({
												variables: {
													links: links?.map(link => ({
														...link,
														__typename: undefined,
													})),
													theme: {
														linkColor: settings.linkColor,
														backgroundColor: settings.backgroundColor,
														animationType: settings.animationType,
														linkStyle: settings.linkStyle,
													},
												},
											});
										}}
									>
										Save
									</button>
									<button onClick={() => reset({ ...initalSettings.current })}>
										Reset
									</button>
								</div>
							</SmallSaveContainer>
						)}
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
								{!showPreview && (
									<Link href="/admin/preview">
										<a>
											Preview
											{section === "preview" && (
												<Underline layoutId="section-header" />
											)}
										</a>
									</Link>
								)}
							</AnimateSharedLayout>
						</SectionHeader>
						<ContentBody>
							<AnimatePresence exitBeforeEnter>
								{!section ? (
									<Content
										username={user.username}
										remove={remove}
										key="content"
										{...sectionProps}
										links={links}
										setLinks={links => update("links", links)}
									/>
								) : section === "customize" ? (
									<Customize key={section} {...sectionProps} />
								) : section === "analytics" ? (
									<Analytics key={section} {...sectionProps} />
								) : section === "preview" ? (
									<Preview
										{...sectionProps}
										key="preview"
										save={saveAndReset}
										initial={initalSettings.current}
										modified={false}
										user={user}
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
										{process.env.NEXT_PUBLIC_CLIENT_URL.replace(
											/https?:\/\//,
											""
										)}
										/{encodeURIComponent(user.username)}
									</a>
								</Link>
								<Tooltip
									title={<div style={{ fontSize: ".75rem" }}>Copy Link</div>}
								>
									<CopyToClipboard
										text={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${user.username}`}
										onCopy={() => setCopied(true)}
									>
										<CopyIcon>
											<FileCopyIcon />
										</CopyIcon>
									</CopyToClipboard>
								</Tooltip>
							</SectionHeader>
							<Preview
								save={saveAndReset}
								initial={initalSettings.current}
								modified={settingsModified}
								user={user}
							/>
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
