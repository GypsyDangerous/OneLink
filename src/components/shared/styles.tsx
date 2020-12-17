import styled from "styled-components";
import { motion } from "framer-motion";
import { Avatar } from "@material-ui/core";
import { Theme, makeStyles, withStyles, createStyles } from "@material-ui/core/styles";

export const Underline = styled(motion.div)`
	position: absolute;
	border-bottom: 3px solid;
	width: 100%;
	left: 0;
	bottom: -3px;
`;

export const LargeAvatar = withStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 100,
			height: 100,
		},
	})
)(Avatar);
