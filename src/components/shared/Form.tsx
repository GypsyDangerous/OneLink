import styled from "styled-components";
import { FC, FormEvent, ReactNode } from "react";

const FormComponent = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

interface FormProps {
	onSubmit?: (e?: FormEvent<HTMLFormElement>) => {};
	children?: ReactNode;
}

const Form = ({ children, onSubmit, ...props }: FormProps) => {
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
