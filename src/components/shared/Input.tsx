import { useEffect, useReducer, useState, useCallback, FC, memo, useMemo } from "react";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { validate, Validator } from "../../util/validators";
import Input from "@material-ui/core/Input";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			const valid = validate(action.val, action.validators);
			return {
				...state,
				value: action.val,
				isValid: valid ? valid : state.isValid,
			};
		case "TOUCH":
			return {
				...state,
				isValid: validate(action.val, action.validators),
				isTouched: true,
			};
		default:
			return state;
	}
};

interface Props {
	onInput: (id: string, value: string, isValid: boolean) => void;
	value: string | null;
	id: string;
	validators: Validator[];
	element?: string;
	type?: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	rows?: number;
	className?: string;
	icon?: string;
	helpText?: string;
	error?: string | null | boolean;
	variant?: "outlined" | "standard" | "filled" | null;
}

const CustomInput: FC<Props> = (props: Props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.value || "",
		isValid: !props.value,
		isTouched: false,
	});
	const [labelSize, setLabelSize] = useState(0);
	const [showPassword, setShowPassword] = useState(false);

	const invalid = (inputState.isTouched && !inputState.isValid) || !!props.error;

	const calculateLabelSize = node => {
		setLabelSize(node?.offsetWidth);
	};

	let { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = e => {
		dispatch({ type: "CHANGE", val: e.target.value, validators: props.validators || [] });
	};

	const touchHandler = e => {
		dispatch({ type: "TOUCH", val: e.target.value, validators: props.validators || [] });
	};

	const { variant } = props;

	const InputProps = {
		variant: props.variant === null ? null : props.variant || "outlined",
		required: props.required,
		id: props.id,
		onBlur: touchHandler,
		name: props.name,
		type: props.type === "password" ? (showPassword ? "text" : "password") : props.type,
		value: inputState.value,
		onChange: changeHandler,
		startAdornment: props.icon,
		endAdornment:
			props.type === "password" ? (
				<InputAdornment position="end">
					<IconButton
						aria-label="toggle password visibility"
						onClick={() => {
							setShowPassword(prev => !prev);
						}}
						onMouseDown={() => {
							setShowPassword(prev => !prev);
						}}
						edge="end"
					>
						{showPassword ? <Visibility /> : <VisibilityOff />}
					</IconButton>
				</InputAdornment>
			) : (
				<></>
			),
		labelWidth: labelSize,
	};

	return (
		<FormControl
			error={invalid}
			variant={props.variant === null ? null : props.variant || "outlined"}
		>
			<InputLabel ref={calculateLabelSize} htmlFor={props.id}>
				{props.placeholder}
			</InputLabel>
			{variant === undefined || variant === "outlined" ? <OutlinedInput {...InputProps}/> : <Input {...InputProps}/>}
			{invalid && (
				<FormHelperText id="standard-weight-helper-text">{props.helpText}</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomInput;
