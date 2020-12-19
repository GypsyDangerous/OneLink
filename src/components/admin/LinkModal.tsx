import {
	Dispatch,
	forwardRef,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
import styled from "styled-components";
import { settingsContext } from "../../contexts/settingsContext";
import { Link as LinkType, ModalMeta } from "../../util/types/Settings";
import Link from "../Link";
import Form from "../shared/Form";
import TextField from "@material-ui/core/TextField";
import {
	Avatar,
	createMuiTheme,
	InputAdornment,
	ThemeProvider,
	useMediaQuery,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { ItemButton } from "./index.styled";
import { LargeAvatar } from "../shared/styles";
import ImageIcon from "@material-ui/icons/Image";

const ModalComponent = styled.div`
	width: 50%;
	min-width: 500px;
	background: #c7e8f3;
	padding: 1.5rem;
	border-radius: 0.5rem;
	img {
		border-radius: 0.25rem;
	}
	form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto 1fr;
		gap: 0.5rem;
	}
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

const Button = styled(ItemButton)`
	background: none;
	border: 2px solid grey;
	&.save {
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		margin-top: 0.5rem;
		padding: 1rem 2rem;
		font-size: 1.25rem;
		color: white;
		background: #4556df;
		border: none;
	}
`;

interface ModalProps {
	metaData: ModalMeta;
	currentLink: LinkType;
	setCurrentLink: Dispatch<SetStateAction<LinkType>>;
	close: () => void;
}

const ImageUploadArea = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

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

		const [files, setFiles] = useState([]);
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(null);
		const [uploadedUrl, setUploadedUrl] = useState(null);
		const inputRef = useRef<HTMLInputElement>();

		const reset = () => {
			setFiles([]);
			setLoading(false);
			setError(null);
			setUploadedUrl(null);
		};

		const { getRootProps, getInputProps } = useDropzone({
			accept: "image/*",
			onDrop: useCallback(acceptedFiles => {
				(async () => {
					setError(null);
					setLoading(true);
					let url;
					try {
						const body = new FormData();
						body.append("image", acceptedFiles[0]);

						const response = await fetch(
							`${process.env.NEXT_PUBLIC_API_URL}/v1/upload`,
							{
								method: "POST",
								body,
							}
						);
						// const clone = response.clone();
						if (!response.ok) {
							return setError("Please Try again, you may have invalid image.");
						}
						try {
							const json = await response.json();
							url = `${process.env.NEXT_PUBLIC_API_URL}/${json.data.imageUrl}`.replace(
								"\\",
								"/"
							);
							setCurrentLink(prev => ({ ...prev, image: url }));
						} catch (err) {
							setError("Please Try again, you may have invalid image.");
						}
					} catch (err) {
						setError(err.message);
					}
					setTimeout(() => {
						setLoading(false);
						setUploadedUrl(url);
					}, 3000);
				})();

				acceptedFiles.forEach(file => {
					const reader = new FileReader();

					reader.onabort = () => console.log("file reading was aborted");
					reader.onerror = () => console.log("file reading has failed");
					reader.onload = () => {
						// Do whatever you want with the file contents
						const binaryStr = reader.result;
						console.log(binaryStr);
					};
					reader.readAsArrayBuffer(file);
				});
				setFiles(
					acceptedFiles.map(file =>
						Object.assign(file, { preview: URL.createObjectURL(file) })
					)
				);
			}, []),
		});

		const { ref: dragRef, ...inputProps }: any = getInputProps();

		return (
			<ThemeProvider theme={theme}>
				<ModalComponent ref={ref}>
					<Form
						onSubmit={() => {
							addLink(currentLink);
							close();
						}}
					>
						<h2>
							Add a{"eaiou".includes(metaData?.name?.[0]) && "n"} {metaData?.name}{" "}
							{metaData?.showUsername ? "username" : "Link"}
						</h2>
						<PreviewText>preview</PreviewText>
						<div>
							<ModalSection>
								<InputContainer>
									<TextField
										required
										value={currentLink.path}
										onChange={e =>
											setCurrentLink(prev => ({
												...prev,
												path: e.target.value,
											}))
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
											setCurrentLink(prev => ({
												...prev,
												name: e.target.value,
											}))
										}
										required
										id="outlined-required"
										label={"Title"}
										variant="outlined"
									/>
									<ImageUploadArea>
										<div className="drag-area" {...getRootProps()}>
											<input
												ref={node => {
													inputRef.current = node;
													dragRef.current = node;
												}}
												{...inputProps}
											/>
											<LargeAvatar
												variant="square"
												imgProps={{ width: 100 }}
												src={currentLink?.image}
											>
												<ImageIcon />
											</LargeAvatar>
											{/* {currentLink?.image?.length ? (
												<img
													src={currentLink?.image}
													width="133"
													id="preview"
													alt=""
												/>
											) : (
												<>
													<img
														src={`/preview.svg`}
														width="133"
														id="preview"
														alt=""
													/>
													
												</>
											)} */}
										</div>
										<div>
											<Button
												type="button"
												onClick={() => inputRef.current.click()}
											>
												{currentLink?.image?.length
													? "Replace"
													: "Add Image"}
											</Button>
										</div>
									</ImageUploadArea>
								</InputContainer>
							</ModalSection>
						</div>
						<div>
							<PreviewSection>
								<Link {...currentLink} {...settings} disabled></Link>
							</PreviewSection>
							<Button className="save">
								Save {metaData.name || "Link"}
							</Button>
						</div>
					</Form>
				</ModalComponent>
			</ThemeProvider>
		);
	}
);

export default LinkModal;
