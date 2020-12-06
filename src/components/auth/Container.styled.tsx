import { motion } from "framer-motion";
import styled from "styled-components";

const AuthFormContainer = styled(motion.div)`
	width: 50%;
	text-align: center;
	position: absolute;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export default AuthFormContainer;
