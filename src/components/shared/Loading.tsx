import styled from "styled-components";
import Loader from "react-loader";

const Loading = ({ loading }) => {
	return (
		<Loader
			loaded={!loading}
			lines={13}
			length={20}
			width={10}
			radius={30}
			corners={1}
			rotate={0}
			direction={1}
			color="#fff"
			speed={1}
			trail={60}
			shadow={false}
			hwaccel={false}
			className="spinner"
			zIndex={2e9}
			top="50%"
			left="50%"
			scale={1.0}
			loadedClassName="loadedContent"
		/>
	);
};

export default Loading;
