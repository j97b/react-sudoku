import React, { useState } from "react";
import Cell from "./Cell";
import boardArray from "../consts/boardArray";
import inputModes from "../consts/inputModes";
import ControlPad from "./ControlPad";

const Board = () => {
	const [board, setBoard] = useState(boardArray);
	const [selected, setSelected] = useState({ row: 0, col: 0 });
	const [inputMode, setInputMode] = useState(0);

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

	const setNote = (value, position) => {
		setBoard((prevBoard) => {
			return prevBoard.map((row, rowIdx) => {
				if (rowIdx === selected.row) {
					return row.map((cell, colIdx) => {
						if (colIdx === selected.col) {
							return {
								...cell,
								notes: {
									...cell.notes,
									[value]: {
										...cell.notes[value],
										[position]: !cell.notes[value][position],
									},
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
					setInputMode((inputMode + 1) % 3);
				}
				if (e.key.match(/[1-9]/) !== null) {
					inputNumber(e.key);
				}
		}
	};

	const inputNumber = (value) => {
		if (inputMode === 0) {
			setCellValue(value);
		} else if (inputMode === 1) {
			setNote(value, "corner");
		} else if (inputMode === 2) {
			setNote(value, "center");
		}
	};

	return (
		<>
			<p>Input mode: {inputModes[inputMode]} (Press spacebar to change)</p>
			<div className='game-root'>
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
				</div>
				<ControlPad
					handleNumberInput={inputNumber}
					setMode={(mode) => setInputMode(mode)}
				/>
			</div>
		</>
	);
};

export default Board;
