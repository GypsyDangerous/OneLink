import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import { useMediaQuery } from "@material-ui/core";
import { useContext, useEffect } from "react";
import LinkComponent from "../../components/Link";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { CirclePicker } from "react-color";
import LinkList from "../../components/shared/LinkList";
import defaultAnimations from "../../util/LinkAnimations.json";
import defaultTypes from "../../util/LinkTypes.json";
import { splitByCaps } from "../../util/functions";
import { settingsContext, SettingsContextProvider } from "../../contexts/settingsContext";
import {
	AdminPage,
	AdminSection,
	SectionHeader,
	SectionContainer,
	PreviewBody,
	PreviewSection,
	ContentBody,
	ContentHeader,
	ContentSection,
	AvatarContainer,
	CustomizeLinksBody,
} from "../../components/admin/index.styled";
import { Underline, LargeAvatar } from "../../components/shared/styles";
import Content from "../../components/admin/Content";
import { colors } from "../../util/constants";

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
