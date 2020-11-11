import React, { useState } from "react";
import Cell from "./Cell";
import boardArray from "../consts/boardArray";

const Board = () => {
	const [board, setBoard] = useState(boardArray);
	const [selected, setSelected] = useState({ row: 0, col: 0 });
	const [inputMode, setInputMode] = useState("value");

	const handleSelect = (row, column) => {
		setSelected({ row: row, col: column });
	};

	const setCellValue = (value) => {
		setBoard((prevBoard) => {
			return prevBoard.map((row, rowIdx) => {
				if (rowIdx === selected.row) {
					return row.map((cell, colIdx) => {
						if (colIdx === selected.col) {
							return {
								...cell,
								value: cell.value === parseInt(value) ? null : parseInt(value),
							};
						} else {
							return cell;
						}
					});
				} else {
					return row;
				}
			});
		});
	};

	const setCellNote = (value) => {
		setBoard((prevBoard) => {
			return prevBoard.map((row, rowIdx) => {
				if (rowIdx === selected.row) {
					return row.map((cell, colIdx) => {
						if (colIdx === selected.col) {
							return {
								...cell,
								notes: {
									...cell.notes,
									[value]: !cell.notes[value],
								},
							};
						} else {
							return cell;
						}
					});
				} else {
					return row;
				}
			});
		});
	};

	const handleKeyDown = (e) => {
		switch (e.key) {
			case "ArrowUp":
				return setSelected({
					row: selected.row === 0 ? selected.row : selected.row - 1,
					col: selected.col,
				});
			case "ArrowDown":
				return setSelected({
					row: selected.row === 8 ? selected.row : selected.row + 1,
					col: selected.col,
				});
			case "ArrowRight":
				return setSelected({
					row: selected.row,
					col: selected.col === 8 ? selected.col : selected.col + 1,
				});
			case "ArrowLeft":
				return setSelected({
					row: selected.row,
					col: selected.col === 0 ? selected.col : selected.col - 1,
				});
			default:
				if (e.keyCode === 32) {
					setInputMode(inputMode === "value" ? "note" : "value");
				}
				if (e.key.match(/[1-9]/) !== null) {
					if (inputMode === "value") {
						setCellValue(e.key);
					} else if (inputMode === "note") {
						setCellNote(e.key);
					}
				}
		}
	};

	return (
		<>
			<p>
				Input mode: {inputMode} (Press spacebar to change) (Note styling is a
				work in progress)
			</p>
			<div className='board' onKeyDown={handleKeyDown} tabIndex='0'>
				{board.map((row, rowIdx) => {
					return row.map((cell, colIdx) => {
						return (
							<Cell
								value={cell.value}
								notes={cell.notes}
								row={rowIdx}
								column={colIdx}
								handleSelect={handleSelect}
								selected={rowIdx === selected.row && colIdx === selected.col}
							/>
						);
					});
				})}
				<button name={1} onClick={(e) => setCellValue(e.target.name)}>
					1
				</button>
				<button name={2} onClick={(e) => setCellValue(e.target.name)}>
					2
				</button>
				<button name={3} onClick={(e) => setCellValue(e.target.name)}>
					3
				</button>
				<button name={4} onClick={(e) => setCellValue(e.target.name)}>
					4
				</button>
				<button name={5} onClick={(e) => setCellValue(e.target.name)}>
					5
				</button>
				<button name={6} onClick={(e) => setCellValue(e.target.name)}>
					6
				</button>
				<button name={7} onClick={(e) => setCellValue(e.target.name)}>
					7
				</button>
				<button name={8} onClick={(e) => setCellValue(e.target.name)}>
					8
				</button>
				<button name={9} onClick={(e) => setCellValue(e.target.name)}>
					9
				</button>
			</div>
		</>
	);
};

export default Board;
