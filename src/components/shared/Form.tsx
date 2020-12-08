import styled from "styled-components";

const FormComponent = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Form = ({ children, onSubmit, ...props }) => {
	return (
		<FormComponent
			{...props}
			onSubmit={e => {
				e.preventDefault();
				if (onSubmit) onSubmit(e);
			}}
		>
			{children}
		</FormComponent>
	);
};

export default Form;
