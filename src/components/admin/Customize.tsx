import { useContext } from "react";
import LinkComponent from "../../components/Link";
import { motion } from "framer-motion";
import { CirclePicker } from "react-color";
import defaultAnimations from "../../util/LinkAnimations.json";
import defaultTypes from "../../util/LinkTypes.json";
import { splitByCaps } from "../../util/functions";
import { settingsContext } from "../../contexts/settingsContext";
import {
	SectionContainer,
	ContentHeader,
	ContentSection,
	CustomizeLinksBody,
} from "./index.styled";
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
			{/* <ContentHeader>Style</ContentHeader>
			<ContentSection solid></ContentSection> */}
		</SectionContainer>
	);
};

export default Customize;
