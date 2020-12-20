import React, { useContext } from "react";
import { AvatarContainer, PreviewBody, PreviewSection } from "../../components/admin/index.styled";
import { LargeAvatar } from "../../components/shared/styles";
import LinkList from "../../components/shared/LinkList";
import LinkComponent from "../../components/Link";
import { settingsContext } from "../../contexts/settingsContext";


const Preview = ({user}) => {

	const { settings, update } = useContext(settingsContext) || {};

	const { links } = settings || {};

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
					{links
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
