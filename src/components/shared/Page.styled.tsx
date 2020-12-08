import styled from "styled-components";

const Page = styled.div`
	min-height: 100vh;
	background: var(--clr-primary-300);
	color: var(--clr-neutral-100);
	display: flex;
`;

export const PaddingPage = styled(Page)`
    padding-top: 70px
`

export default Page
