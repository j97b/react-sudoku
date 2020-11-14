import React from "react";
import RippleButton from "./RippleButton";

const ControlPad = (props) => {
	return (
		<div className='control-pad'>
			<RippleButton
				name={0}
				handleClick={(e) => props.setInputMode(e.target.name)}
				selected={props.inputMode === 0 ? true : false}>
				Normal
			</RippleButton>
			<RippleButton
				name={1}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				1
			</RippleButton>
			<RippleButton
				name={2}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				2
			</RippleButton>
			<RippleButton
				name={3}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				3
			</RippleButton>
			<RippleButton
				name={1}
				handleClick={(e) => props.setInputMode(e.target.name)}
				selected={props.inputMode === 1 ? true : false}>
				Corner Notes
			</RippleButton>
			<RippleButton
				name={4}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				4
			</RippleButton>
			<RippleButton
				name={5}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				5
			</RippleButton>
			<RippleButton
				name={6}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				6
			</RippleButton>
			<RippleButton
				name={2}
				handleClick={(e) => props.setInputMode(e.target.name)}
				selected={props.inputMode === 2 ? true : false}>
				Center Notes
			</RippleButton>
			<RippleButton
				name={7}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				7
			</RippleButton>
			<RippleButton
				name={8}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				8
			</RippleButton>
			<RippleButton
				name={9}
				handleClick={(e) => props.handleNumberInput(e.target.name)}
				numberButton>
				9
			</RippleButton>
			<RippleButton name='' handleClick={props.clearCell}>
				Clear Cell
			</RippleButton>
		</div>
	);
};

export default ControlPad;
