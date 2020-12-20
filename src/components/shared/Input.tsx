import { useEffect, useReducer, useState, useCallback, FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { validate, Validator } from "../../util/validators";

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
	onInput: (id: string, value: string, isValid: boolean) => {};
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
}

const CustomInput: FC<Props> = (props: Props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.value || "",
		isValid: !props.value,
		isTouched: false,
	});
	const [labelSize, setLabelSize] = useState(0);
	const [showPassword, setShowPassword] = useState(false);

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

	const elt =
		props.element === "input" || props.type ? (
			<input
				required={props.required}
				min="0"
				id={props.id}
				type={props.type}
				name={props.name}
				placeholder={props.placeholder}
				onChange={changeHandler}
				value={inputState.value}
				onBlur={touchHandler}
				className={props.className}
			></input>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				placeholder={props.placeholder}
				name={props.name}
				onChange={changeHandler}
				value={inputState.value}
				onBlur={touchHandler}
				className={props.className}
			></textarea>
		);

	return (
		<FormControl error={inputState.isTouched && !inputState.isValid} variant="outlined">
			<InputLabel ref={calculateLabelSize} htmlFor={props.id}>
				{props.placeholder}
			</InputLabel>
			<OutlinedInput
				required={props.required}
				id={props.id}
				onBlur={touchHandler}
				name={props.name}
				type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
				value={inputState.value}
				onChange={changeHandler}
				startAdornment={props.icon}
				endAdornment={
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
					)
				}
				labelWidth={labelSize}
			/>
			{inputState.isTouched && !inputState.isValid && (
				<FormHelperText id="standard-weight-helper-text">{props.helpText}</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomInput;
