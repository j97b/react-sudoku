import React from "react";
import PropTypes from "prop-types";

const Cell = (props) => {
	const classes = `cell${props.selected ? " selectedCell" : ""}${
		(props.column + 1) % 3 === 0 ? " regionRight" : ""
	}${(props.row + 1) % 3 === 0 ? " regionBottom" : ""}${
		props.value ? " cellNormal" : " cellNotes"
	}`;

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
							return props.notes[key].corner ? <p>{key}</p> : null;
						})}
					</div>
					<div className='centerNotes'>
						{Object.keys(props.notes).map((key) => {
							return props.notes[key].center ? <p>{key}</p> : null;
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
