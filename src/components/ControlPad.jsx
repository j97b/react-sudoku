import React from "react";
import PropTypes from "prop-types";

const ControlPad = (props) => {
	return (
		<div className='control-pad'>
			<button name={0} onClick={(e) => props.setMode(e.target.name)}>
				Normal
			</button>
			<button name={1} onClick={(e) => props.handleNumberInput(e.target.name)}>
				1
			</button>
			<button name={2} onClick={(e) => props.handleNumberInput(e.target.name)}>
				2
			</button>
			<button name={3} onClick={(e) => props.handleNumberInput(e.target.name)}>
				3
			</button>
			<button name={1} onClick={(e) => props.setMode(e.target.name)}>
				Corner Notes
			</button>
			<button name={4} onClick={(e) => props.handleNumberInput(e.target.name)}>
				4
			</button>
			<button name={5} onClick={(e) => props.handleNumberInput(e.target.name)}>
				5
			</button>
			<button name={6} onClick={(e) => props.handleNumberInput(e.target.name)}>
				6
			</button>
			<button name={2} onClick={(e) => props.setMode(e.target.name)}>
				Center Notes
			</button>
			<button name={7} onClick={(e) => props.handleNumberInput(e.target.name)}>
				7
			</button>
			<button name={8} onClick={(e) => props.handleNumberInput(e.target.name)}>
				8
			</button>
			<button name={9} onClick={(e) => props.handleNumberInput(e.target.name)}>
				9
			</button>
		</div>
	);
};

ControlPad.propTypes = {};

export default ControlPad;
