import React, { useContext, useEffect, useRef, useState } from "react";
import {
	AvatarContainer,
	PreviewBody,
	PreviewSection,
	SaveContainer,
} from "../../components/admin/index.styled";
import { LargeAvatar } from "../../components/shared/styles";
import { settingsContext } from "../../contexts/settingsContext";
import { Link } from "../../util/types/Settings";
import styled from "styled-components";
import { getTextColor } from "../../util/functions";
import LinkList from "../../components/shared/LinkList";
import LinkComponent from "../../components/Link";
import PersonIcon from "@material-ui/icons/Person";
import { useMutation } from "@apollo/client";
import { updatePage } from "../../graphql/pageMutation";

interface NameProps {
	backgroundColor?: string;
}

const Name = styled.div`
	font-weight: bold;
	color: ${({ backgroundColor }: NameProps) => getTextColor(backgroundColor, true)};
`;

interface Props {
	user: any;
	links?: any[];
	modified: boolean;
	initial?: any;
	save?: () => void
	key?: string,
	exit?: any,
	animate?: any,
}

const Preview = ({ save: outerSave, initial, modified, user, links: propsLinks = [], key, exit, animate }: Props) => {
	const [allLinks, setAllLinks] = useState<Link[]>([]);
	const { settings, update, reset } = useContext(settingsContext) || {};

	const { links } = settings || {};

	useEffect(() => {
		if (propsLinks?.length) setAllLinks([...propsLinks]);
		else if (links?.length) setAllLinks([...links]);
		else setAllLinks([]);
	}, [links]);

	const [save] = useMutation(updatePage);

	return (
		<PreviewSection key={key} exit={exit} animate={animate} initial={initial}>
			{modified && (
				<SaveContainer>
					<div>Your Page has unsaved changes</div>
					<div>
						<button
							onClick={() => {
								outerSave()
								save({
									variables: {
										links: links?.map(link => ({
											...link,
											__typename: undefined
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
						<button onClick={() => reset(initial)}>Reset</button>
					</div>
				</SaveContainer>
			)}
			<PreviewBody modified={modified} backgroundColor={settings?.backgroundColor}>
				<AvatarContainer>
					<LargeAvatar
						alt="Avatar"
						imgProps={{ width: 100, height: 100 }}
						src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${user.photo}?width=100`}
					>
						<PersonIcon />
					</LargeAvatar>
				</AvatarContainer>
				<Name backgroundColor={settings?.backgroundColor}>@{user.username}</Name>
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
