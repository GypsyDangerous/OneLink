import { Dispatch, forwardRef, SetStateAction, useContext, useMemo } from "react";
import styled from "styled-components";
import { settingsContext } from "../../contexts/settingsContext";
import { Link as LinkType, ModalMeta } from "../../util/types/Settings";
import Link from "../Link";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, InputAdornment, ThemeProvider, useMediaQuery } from "@material-ui/core";

const ModalComponent = styled.div`
	width: 50%;
	min-width: 500px;
	background: #c7e8f3;
	padding: 1.5rem;
	border-radius: 0.5rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto 1fr;
	gap: 0.5rem;
	h2 {
		text-transform: capitalize;
		font-size: 1.5rem;
		font-weight: bold;
	}
`;

const PreviewText = styled.p`
	justify-self: center;
`;

const ModalSection = styled.div`
	background: white;
	border-radius: 0.25rem;
	padding: 1rem;
	min-height: 200px;
`;

const PreviewSection = styled(ModalSection)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface ModalProps {
	metaData: ModalMeta;
	currentLink: LinkType;
	setCurrentLink: Dispatch<SetStateAction<LinkType>>;
	close: () => void
}

const LinkModal = forwardRef<HTMLDivElement, ModalProps>(
	({ metaData, currentLink, setCurrentLink, close }, ref) => {
		const { settings, addLink } = useContext(settingsContext);

		const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

		const theme = useMemo(
			() =>
				createMuiTheme({
					palette: {
						type: !prefersDarkMode ? "dark" : "light",
					},
				}),
			[prefersDarkMode]
		);

		return (
			<ThemeProvider theme={theme}>
				<ModalComponent ref={ref}>
					<h2>
						Add a{"eaiou".includes(metaData?.name?.[0]) && "n"} {metaData?.name}{" "}
						{metaData?.showUsername ? "username" : "Link"}
					</h2>
					<PreviewText>preview</PreviewText>
					<div>
						<ModalSection>
							<Form>
								<TextField
									required
									value={currentLink.path}
									onChange={e =>
										setCurrentLink(prev => ({ ...prev, path: e.target.value }))
									}
									id="outlined-required"
									label={metaData.showUsername ? "Username" : "URL"}
									variant="outlined"
									InputProps={
										metaData.showUsername
											? {
													startAdornment: (
														<InputAdornment position="start">
															@
														</InputAdornment>
													),
											  }
											: {}
									}
								/>
								<TextField
									value={currentLink.name}
									onChange={e =>
										setCurrentLink(prev => ({ ...prev, name: e.target.value }))
									}
									required
									id="outlined-required"
									label={"Title"}
									variant="outlined"
								/>
							</Form>
						</ModalSection>
					</div>
					<div>
						<PreviewSection>
							<Link {...currentLink} {...settings} disabled></Link>
						</PreviewSection>
						<button onClick={() => {
							addLink(currentLink)
							close()
						}}>Save {metaData.name || "Link"}</button>
					</div>
				</ModalComponent>
			</ThemeProvider>
		);
	}
);

export default LinkModal;
