import React from "react";
import PropTypes from "prop-types";

const Cell = (props) => {
	const classes = `cell${props.selected ? " selected-cell" : ""}${
		(props.column + 1) % 3 === 0 ? " region-right" : ""
	}${(props.row + 1) % 3 === 0 ? " region-bottom" : ""}${
		props.value ? " cell-normal" : " cell-notes"
	}${props.prefilled ? " prefilled" : ""}${props.conflict ? " conflict" : ""}`;

	return (
		<div
			className={classes}
			onClick={() => props.handleSelect(props.row, props.column)}>
			{props.value ? (
				<p>{props.value}</p>
			) : (
				<>
					<div>
						{Object.keys(props.notes).map((key) => {
							return props.notes[key].corner ? <p key={key}>{key}</p> : null;
						})}
					</div>
					<div className='center-notes'>
						{Object.keys(props.notes).map((key) => {
							return props.notes[key].center ? <p key={key}>{key}</p> : null;
						})}
					</div>
				</>
			)}
		</div>
	);
};

Cell.propTypes = {
	row: PropTypes.number,
	column: PropTypes.number,
	value: PropTypes.number,
	selected: PropTypes.bool,
	handleSelect: PropTypes.func,
	notes: PropTypes.object,
};

export default Cell;
