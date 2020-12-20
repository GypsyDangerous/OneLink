import React, { useContext, useEffect, useRef, useState } from "react";
import { AvatarContainer, PreviewBody, PreviewSection } from "../../components/admin/index.styled";
import { LargeAvatar } from "../../components/shared/styles";
import LinkList from "../../components/shared/LinkList";
import LinkComponent from "../../components/Link";
import { settingsContext } from "../../contexts/settingsContext";
import { Link } from "../../util/types/Settings";

const Preview = ({ user, links: propsLinks = [] }) => {
	const [allLinks, setAllLinks] = useState<Link[]>([]);
	const { settings, update } = useContext(settingsContext) || {};

	const { links } = settings || {};

	useEffect(() => {
		if (propsLinks?.length) setAllLinks(propsLinks);
		else setAllLinks(links);
	}, [propsLinks, links]);

	return (
		<PreviewSection>
			<PreviewBody backgroundColor={settings?.backgroundColor}>
				<AvatarContainer>
					<LargeAvatar
						alt="Avatar"
						imgProps={{ width: 100, height: 100 }}
						src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${user.photo}?width=100`}
					/>
				</AvatarContainer>
				<div style={{ fontWeight: "bold" }}>@{user.username}</div>
				<LinkList>
					{allLinks
						.sort((a, b) => a.order - b.order)
						.map(link => (
							<LinkComponent key={link.order} {...link} {...settings} />
						))}
				</LinkList>
			</PreviewBody>
		</PreviewSection>
	);
};

export default Preview;
