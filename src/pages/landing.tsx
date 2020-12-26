import styled from "styled-components";
import { PaddingPage } from "../components/shared/Page.styled";
import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormControl, IconButton, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
const Hero = styled.section`
	/* background: blue; */
	height: calc(100vh - 80px);
	width: 100vw;
`;

export default function Landing() {
	return (
		<PaddingPage>
			<Hero>
				<h1>Onelink</h1>
				<TextField
					// label="With normal TextField"
					id="outlined-start-adornment"
					InputProps={{
						placeholder:"Your Name",
						startAdornment: <InputAdornment position="start">onelinkapp.xyz/</InputAdornment>,
					}}
					variant="outlined"
				/>
			</Hero>
		</PaddingPage>
	);
}
