import React from "react";
import Ripples from "react-ripples";

const RippleButton = (props) => {
	const classes = `my-button${props.selected ? " selected-mode" : ""}${
		props.numberButton ? " number-button" : ""
	}`;
	return (
		<Ripples className='ripple-container'>
			<button
				name={parseInt(props.name) || props.name}
				className={classes}
				onClick={(e) => props.handleClick(e)}>
				{props.children}
			</button>
		</Ripples>
	);
};

export default RippleButton;
