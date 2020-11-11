import React from "react";
import PropTypes from "prop-types";

const Cell = (props) => {
	const classes = `cell${props.selected ? " selectedCell" : ""}${
		(props.column + 1) % 3 === 0 ? " regionRight" : ""
	}${(props.row + 1) % 3 === 0 ? " regionBottom" : ""}${
		props.value ? " cellValue" : " cellNotes"
	}`;

	return (
		<div
			className={classes}
			onClick={() => props.handleSelect(props.row, props.column)}>
			{props.value ? (
				<p>{props.value}</p>
			) : (
				Object.keys(props.notes).map((key) => {
					return props.notes[key] ? <p>{key}</p> : null;
				})
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
